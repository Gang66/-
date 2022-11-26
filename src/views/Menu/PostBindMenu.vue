<template>
	<div class="bf-content">
		<div class="bf-center-content">
			<el-row>
				<el-col :md='24' :lg="4">
					<el-row :gutter='5'>
						<el-col :span='16'>
							<el-input v-model="data.seachPostVal" size="small" placeholder="搜索" @change="seachPostValueChange"
								clearable />
						</el-col>
						<el-col :span='8'>
							<el-button type="success" size="small" @click='btn_PostSeach'>搜索</el-button>
						</el-col>
					</el-row>
					<el-row class='treeDiv'>
						<el-tree :data="data.seachPostData.length==0?data.PostData:data.seachPostData" :props="data.defaultProps"
							@node-click="handleTreeNodeClick" style="width: 100%;" />
					</el-row>
				</el-col>
				<el-col :md='24' :lg="20" class="bf-table-content">
					  <el-form label-width="70px" class="bf-search-formItem">
					    <div class="flex justify-between items-center">
					      <div class="bf-table-label">菜单绑定</div>
					      <el-row :gutter="10" justify="end" style="min-width: 670px;">
					        <el-col :md="24" :lg="9">
					          <el-form-item label="菜单名称">
					            <el-input v-model="data.seachMenuNameVal" placeholder="菜单名称" />
					          </el-form-item>
					        </el-col>
					        <el-col :md="24" :lg="9">
					          <el-form-item label="菜单路径">
					            <el-input v-model="data.seachMenuPathVal" placeholder="菜单路径" />
					          </el-form-item>
					        </el-col>
					        <el-col :md="24" :lg="6">
					          <el-button type="primary" @click="btn_TableSearch">搜索</el-button>
					          <el-button type="success" @click="data.CustomMenuWindow=true" :disabled="data.EditPostId==0">个性化</el-button>
					        </el-col>
					      </el-row>
					    </div>
					  </el-form>
					  <div class="bf-table-content">
						<el-table :data="data.tableTreeData" class="w-full" row-key='Id' default-expand-all>
							<el-table-column prop="Title" label="菜单名称" align="left" />
							<el-table-column prop="" label="菜单授权" align="center" >
								<template #default="scope">
									<el-checkbox v-model="scope.row.IsGet" v-if="!scope.row.children" @change="CheckMenuChange($event,scope.row)" size="large" />
								</template>
							</el-table-column>
							<el-table-column prop="Permission" label="指令授权" align="center" >
								<template #default="scope">
									<el-checkbox v-for='item in scope.row.Permission' v-model="item.IsGet" :label="item.Remark" @change="CheckPermissionChange($event,item.Id,scope.row)" size="large" />
								</template>
							</el-table-column>
							<template #empty>{{data.EditPostId==0?"请先选择岗位":"暂无数据"}}</template>
						</el-table>
					  </div>
				</el-col>
			</el-row>
		</div>
		<CustomMenu v-if='data.CustomMenuWindow' @closeWindow="data.CustomMenuWindow=false" :PostId="data.EditPostId"></CustomMenu>
	</div>
</template>

<script lang='ts'>
	import { defineComponent,reactive } from "vue";
	import {
		GetPostList,
		GetMenulistForPostList,
		EditPostBindMenuSave
	} from "/@/api/menu/menu";
	import {
		ElMessageBox,
		ElMessage,
		ElNotification 
	} from 'element-plus'
	import CustomMenu from './_Components/CustomMenu.vue'
	
	interface PostData{
		Id:number,
		PostName:string,
		IsDel:number
	}
	
	interface MenuDataToList{
		Id:number,
		ParentId:number,
		Name:string,
		Title:string,
		Icon:string,
		Path:string,
		NoCache:boolean,
		OrderBy:number,
		Redirect:string,
		Component:string,
		IsGet:boolean,
		Permission:string[]
	}
	interface MenuDataToTree{
		Id:number,
		ParentId:number,
		Name:string,
		Title:string,
		Icon:string,
		Path:string,
		NoCache:boolean,
		OrderBy:number,
		Redirect:string,
		Component:string,
		IsGet:boolean,
		Permission:string[],
		children?:Array<MenuDataToTree>
	}
	
	
	interface GetMenuListParam{
		PostId:number,
		MenuName:string,
		MenuPath:string
	}
	interface EditMenuData{
		PostId:number,
		MenuId:number,
		PermissionId:number,
		State:boolean
	}
	
	//获取岗位数据
	const GetPostData=async(data:any)=>{
		await GetPostList().then(res=>{
			if (res.code == 1) {
				data.PostData = res.data;
			}else
				ElNotification({
				  title:'错误',
				  message:res.message,
				  type: "error",
				});
		})
	}
	//获取菜单数据
	const GetMenuData=async(data:any)=>{
		
		const MenuListToTree=(mneuData:Array<MenuDataToList>, pid:number):Array<MenuDataToTree>=> {
			const d:Array<MenuDataToTree> = [];
			mneuData.forEach(item => {
				if (item.ParentId == pid) {
					const childrenList = MenuListToTree(mneuData, item.Id)
					if (childrenList.length > 0)
						item.children = childrenList;
					d.push(item)
				}
			})
			return d;
		}
		//没有父级菜单的子菜单统一放到一个目录下
		const OtherMenuListToTree=(mneuData:Array<MenuDataToList>,pid:number):Array<MenuDataToTree>=>{
			let d:Array<MenuDataToTree>=MenuListToTree(mneuData,pid);
			let other:MenuDataToTree={	
				ParentId: 0,
				Id: '999999999',
				Name: 'other',
				Path: '/other',
				Component: 'Layout',
				Icon: 'Expand',
				Title: '其他菜单',
				NoCache:false,
				OrderBy:999,
				Redirect:"",
				IsGet:false,
				Permission:[],
				children: []
			};
			mneuData.forEach(item=>{
				if(item.ParentId==pid||mneuData.findIndex(v => v.Id == item.ParentId) > -1)
					return;
				other.children.push(item);
			})
			if(other.children.length>0)
				d.push(other)
			return d;
		}
	
		const d:GetMenuListParam={'PostId':data.EditPostId,'MenuName':data.seachMenuNameVal,'MenuPath':data.seachMenuPathVal};
		
		await GetMenulistForPostList(d).then(res=>{			
			if (res.code == 1) {
				data.tableTreeData = OtherMenuListToTree(res.data, 0);
			}else
				ElNotification({
				  title:'错误',
				  message:res.message,
				  type: "error",
				});
		})
	}
	//提交授权操作数据
	const submitMenuChange=async(editData:EditMenuData,item:MenuDataToTree)=>{
		
		await EditPostBindMenuSave(editData).then(res=>{
			if(res.code==1){
				ElMessage.success(res.message);
				//只修改了页面授权
				if(editData.PermissionId==0){
					item.IsGet=editData.State;
					//如果是取消页面授权则同时取消指令授权
					if(!editData.State)
						item.Permission.forEach(i=>{
							i.IsGet=false;
						})
				//如果修改的是指令授权
				}else{
					//如果是新增指令授权则同时授权页面
					if(editData.State)
						item.IsGet=true;
					//更改指令状态
					const i = item.Permission.findIndex(x=>x.Id==editData.PermissionId);
					item.Permission[i].IsGet=editData.State;							
				}
			}else{
				ElNotification({
				  title:'错误',
				  message:res.message,
				  type: "error",
				});
			}
		})
	}
	
	//岗位相关操作
	const postOperation=(data:any)=>{
		//点击岗位列表
		const handleTreeNodeClick=(d:PostData):void=>{
			data.EditPostId=d.Id;
			GetMenuData(data)
		}
		
		const seachPostValueChange=(val:string):void=>{
			if(val=="")
				data.seachPostData=[];
		}
		const btn_PostSeach=():void=>{
			if (data.seachPostVal == "") return;
			let d = data.PostData.filter(x => x.PostName.indexOf(data.seachPostVal) != -1);
			if (d.length == 0) {
				ElMessage.warning("无匹配项");
			}
			data.seachPostData = d;
		}
		return{
			handleTreeNodeClick,
			seachPostValueChange,
			btn_PostSeach
			}
	}
	//菜单相关操作
	const tableOperation=(data:any)=>{
		//搜索
		const btn_TableSearch=():void=>{
			if(data.EditPostId!=0)
				GetMenuData(data)
			else			
				ElMessage.warning("请先选择岗位")
		}
		//菜单授权
		const CheckMenuChange=(val:boolean,item:MenuDataToTree):void=>{
			item.IsGet=!val;
			submitMenuChange({"PostId":data.EditPostId,"MenuId":item.Id,"PermissionId":0,"State":val},item)
		}
		//指令授权
		const CheckPermissionChange=(val:boolean,perid:number,item:MenuDataToTree):void=>{
			const i = item.Permission.findIndex(x=>x.Id==perid);
			item.Permission[i].IsGet=!val;
			submitMenuChange({"PostId":data.EditPostId,"MenuId":item.Id,"PermissionId":perid,"State":val},item)
		}
		return {
			btn_TableSearch,
			CheckMenuChange,
			CheckPermissionChange
		}
	}
	
	export default defineComponent({
		// 想要被keep-alive缓存必须设置name
		name: 'PostBindMenu',
		components: {
			CustomMenu
		},
		setup(){
			const data = reactive({
				PostData: [],
				tableTreeData: [],
				seachPostData: [],
				defaultProps: {
					label: 'PostName'
				},
				seachPostVal: '',
				EditPostId:0,
				seachMenuNameVal:'',
				seachMenuPathVal:'',
				CustomMenuWindow:false
			});
			
			return {data,...postOperation(data),...tableOperation(data),...GetPostData(data)};
		}
	})
</script>

<style scoped>
	.treeDiv {
		max-height: 85vh;
		overflow: hidden;
		overflow-y: scroll;
	}

	/* 设置滚动条的样式 */
	.treeDiv::-webkit-scrollbar {
		width: 1px;
	}

	/* 滚动槽 */
	.treeDiv::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 1px rgba(0, 0, 0, 0.3);
		border-radius: 1px;
	}

	/* 滚动条滑块 */
	.treeDiv::-webkit-scrollbar-thumb {
		border-radius: 1px;
		background: rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: inset 1px rgba(0, 0, 0, 0.5);
	}

	.treeDiv::-webkit-scrollbar-thumb:window-inactive {
		background: #fff;
	}
</style>
