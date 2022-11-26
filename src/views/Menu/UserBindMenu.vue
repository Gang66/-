<template>
	<div class="bf-content">
		<div class="bf-center-content">
			<el-row>
				<el-col :md='24' :lg="4">
					<el-row :gutter='5'>
						<el-col :span='16'>
							<el-input v-model="data.seachUserVal" size="small" placeholder="搜索" @change="seachUserValueChange"
								clearable />
						</el-col>
						<el-col :span='8'>
							<el-button type="success" size="small" @click='btn_UserSeach'>搜索</el-button>
						</el-col>
					</el-row>
					<el-row class='treeDiv'>
						<el-tree :data="data.seachUserTree.length==0?data.TreeUserData:data.seachUserTree" :props="data.defaultProps"
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
					          <el-button type="success" @click="data.CustomMenuWindow=true" :disabled="data.EditUserId==0">个性化</el-button>
					        </el-col>
					      </el-row>
					    </div>
					  </el-form>
					  <div class="bf-table-content">
						<el-table :data="data.tableTreeData" class="w-full" row-key='Id' default-expand-all>
							<el-table-column prop="Title" label="菜单名称" align="left" />
							<el-table-column prop="Permission" label="菜单授权" align="center" >
								<template #default="scope">
									<el-checkbox v-model="scope.row.IsGet" v-if="!scope.row.children" @change="CheckMenuChange($event,scope.row)" size="large" />
								</template>
							</el-table-column>
							<el-table-column prop="Permission" label="指令授权" align="center" >
								<template #default="scope">
									<el-checkbox v-for='item in scope.row.Permission' v-model="item.IsGet" :label="item.Remark" @change="CheckPermissionChange($event,item.Id,scope.row)" size="large" />
								</template>
							</el-table-column>
							<template #empty>{{data.EditUserId==0?"请先选择人员":"暂无数据"}}</template>
						</el-table>
					  </div>
				</el-col>
			</el-row>
		</div>
		<CustomMenu v-if='data.CustomMenuWindow' @closeWindow="data.CustomMenuWindow=false" :UserId="data.EditUserId"></CustomMenu>
	</div>
</template>

<script lang="ts">
	import { defineComponent,reactive } from "vue";
	import {
		GetUserList,
		GetMenulistForUserList,
		EditUserBindMenuSave
	} from "/@/api/menu/menu";
	import {
		ElMessageBox,
		ElMessage,
		ElNotification
	} from 'element-plus'
	import CustomMenu from './_Components/CustomMenu.vue'
	
	interface UserDataToList{
		Id:number,
		DeptId:number,
		RealName:string,
		DepName:string
	}
	interface UserDataToTree{
		Id:number|string,
		RealName:string,
		children:Array<UserDataToTree>
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
		UserId:number,
		MenuName:string,
		MenuPath:string
	}
	interface EditMenuData{
		UserId:number,
		MenuId:number,
		PermissionId:number,
		State:boolean
	}

	//将用户数据转为树结构
	const listUserToTree=(data:Array<UserDataToList>):Array<UserDataToTree>=> {
		let treeData:Array<UserDataToTree> = [];
		let id = 0;
		data.forEach(item => {
			if (id == item.DeptId||item.DepName==null) return;
	
			id = item.DeptId;
			let d:UserDataToTree = {};
			d.Id = item.DeptId;
			d.RealName = item.DepName;
			d.children = data.filter(x => x.DeptId == id);
	
			treeData.push(d)
		})
		let noDep=data.filter(x=>x.DepName==null);
		if(noDep.length>0){
			treeData.push({Id:'--',RealName:'无部门',children:noDep})
		}
		return treeData;
	}
	//获取用户数据
	const GetUserListData=async(data:any)=> {
		
		await GetUserList().then(res => {
			if (res.code == 1) {
				data.UserData = res.data;
				data.TreeUserData = listUserToTree(res.data);
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
		const MenuListToTree=(d:Array<MenuDataToList>, pid:number):Array<MenuDataToTree>=> {
			const d2:Array<MenuDataToTree> = [];
			d.forEach(item => {
				if (item.ParentId == pid) {
					const childrenList = MenuListToTree(d, item.Id)
					if (childrenList.length > 0)
						item.children = childrenList;
					d2.push(item)
				}
			})
			return d2;
		}
		
		//没有父级菜单的子菜单统一放到一个目录下
		const OtherMenuListToTree=(d:Array<MenuDataToList>,pid:number):Array<MenuDataToTree>=>{
			let d2:Array<MenuDataToTree>=MenuListToTree(d,pid);
			let other:MenuDataToTree={	
				ParentId: pid,
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
			d.forEach(item=>{
				if(item.ParentId==pid||d.findIndex(v => v.Id == item.ParentId) > -1)
					return;
				other.children.push(item);
			})
			if(other.children.length>0)
				d2.push(other)
			return d2;
		}
				
		//根据用户ID和搜索条件获取菜单绑定信息
		const d:GetMenuListParam={"UserId":data.EditUserId,"MenuName":data.seachMenuNameVal,"MenuPath":data.seachMenuPathVal};
		await GetMenulistForUserList(d).then(res => {
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
	const submitMenuChange=async(data:EditMenuData,item:MenuDataToTree)=>{		
		await EditUserBindMenuSave(data).then(res=>{
			if(res.code==1){
				ElMessage.success(res.message);
				//只修改了页面授权
				if(data.PermissionId==0){
					item.IsGet=data.State;
					//如果是取消页面授权则同时取消指令授权
					if(!data.State)
						item.Permission.forEach(i=>{
							i.IsGet=false;
						})
				//如果修改的是指令授权
				}else{
					//如果是新增指令授权则同时授权页面
					if(data.State)
						item.IsGet=true;
					//更改指令状态
					const i = item.Permission.findIndex(x=>x.Id==data.PermissionId);
					item.Permission[i].IsGet=data.State;							
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
	
	//用户树相关操作
	const userOperation=(data:any)=>{		
		//搜索框为空时清空搜索结果
		const seachUserValueChange=(val:string):void=> {
			if(val=="")
				data.seachUserTree = [];
		}
		
		//点击搜索
		const btn_UserSeach=():void =>{
			if (data.seachUserVal == "") return;
			let d = data.UserData.filter(x => x.RealName.indexOf(data.seachUserVal) != -1);
			if (d.length == 0) {
				ElMessage.warning("无匹配项");
			}
			data.seachUserTree = listUserToTree(d);
		}
		
		//用户树点击
		const handleTreeNodeClick=(d:UserDataToTree):void =>{
			if (!d.children){
				data.EditUserId=d.Id;
				GetMenuData(data);
			}
		}
		
		return{
			seachUserValueChange,
			btn_UserSeach,
			handleTreeNodeClick
		}
	}

	//菜单相关操作
	const tableOperation=(data:any)=>{
		//菜单搜索
		const btn_TableSearch=():void=>{
			if(data.EditUserId!=0)
				GetMenuData(data);
			else
			ElMessage.warning("请先选择人员")
		}
		//菜单授权
		const CheckMenuChange=(val:boolean,item:MenuDataToTree):void=>{
			item.IsGet=!val;
			submitMenuChange({"UserId":data.EditUserId,"MenuId":item.Id,"PermissionId":0,"State":val},item)
		}
		//指令授权
		const CheckPermissionChange=(val:boolean,perid:number,item:MenuDataToTree):void=>{
			const i = item.Permission.findIndex(x=>x.Id==perid);
			item.Permission[i].IsGet=!val;
			submitMenuChange({"UserId":data.EditUserId,"MenuId":item.Id,"PermissionId":perid,"State":val},item)
		}
		
		return{
			btn_TableSearch,
			CheckMenuChange,
			CheckPermissionChange
		}
	}

	export default {
		// 想要被keep-alive缓存必须设置name
		name: 'UserBindMenu',
		components: {
			CustomMenu
		},
		setup(){
			const data=reactive({
				UserData: [],
				tableTreeData: [],
				TreeUserData: [],
				seachUserTree: [],
				defaultProps: {
					label: 'RealName'
				},
				seachUserVal: '',
				EditUserId:0,
				seachMenuNameVal:'',
				seachMenuPathVal:'',
				CustomMenuWindow:false
			});
			return{data,...GetUserListData(data),...userOperation(data),...tableOperation(data)}
		}
		
	}
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
