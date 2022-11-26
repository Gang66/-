<template>
	<OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow({'type':'close'})" title="指令管理">
		<el-form ref="rulePermissionFormRef" :model="data.rulePermissionForm" :rules="rules" label-width="80px" class="bf-window-padding"
			hide-required-asterisk>
			<el-form-item label="指令名称" prop="Code">
			  <el-input v-model="data.rulePermissionForm.Code" placeholder="请输入指令名称" />
			</el-form-item>
			<el-form-item label="指令描述" prop="Remark">
			  <el-input v-model="data.rulePermissionForm.Remark" placeholder="请输入指令描述" />
			</el-form-item>
			
			<div class="bf-search-formItem">
				<el-form-item class="justify-center" label-width="0">
					<div class="text-center w-full">
						<el-button @click="closeWindow({'type':'close'})">取 消</el-button>
						<el-button type="primary" @click="submitPermissionForm(rulePermissionFormRef)">提 交</el-button>
					</div>
				</el-form-item>
			</div>
		</el-form>
	</OpenWindow>
</template>

<script lang="ts">
	import OpenWindow from "/@/components/OpenWindow/index.vue";
	import {
		defineComponent,
		onMounted,
		reactive,
		ref,
		SetupContext
	} from "vue";

	// 表单事件
	const formEvent = (data: any, closeWindow: any) => {
		const rulePermissionFormRef = ref < FormInstance > ();
		// 表单提交
		const submitPermissionForm = async (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			await formEl.validate((valid, fields) => {
				if (valid) {
					var arr = JSON.parse(JSON.stringify(data.rulePermissionForm));
					//判断是否是编辑
					if(data.IsEdit)
						closeWindow({type:'edit',Id:arr.Id,Code:arr.Code,Remark:arr.Remark,IsDel:0});
					else
						closeWindow({type:'add',Code:arr.Code,Remark:arr.Remark,IsDel:0});
				}
			});
		};
		//校验
		const rules = reactive < FormRules > ({
			Code: [{
				required: true,
				message: "请填写指令名",
				trigger: "change"
			}, ],
			Remark: [{
				required: true,
				message: "请填写描述",
				trigger: "change"
			}]
		});
		// 表单重置
		const resetForm = (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			formEl.resetFields();
		};

		return {
			rules,
			submitPermissionForm,
			resetForm,
			rulePermissionFormRef,
		};
	};

	export default defineComponent({
		components: {
			OpenWindow
		},
		emits: ["closeWindow"],
		props: {
			EditData: {
				default: null,
			}
		},
		setup(props, context: SetupContext){
			let data = reactive({
				rulePermissionForm: {
					Code: "", 
					Remark: "", 
					IsDel:0
				},
				IsEdit:false
			});
			// 页面样式
			const boxStyle = reactive({
				boxWidth: "w-700",
				boxHeight: "",
			});
			// 监听页面关闭
			const closeWindow = (d: any) => {
				context.emit("closeWindow", d);
			};
			onMounted(() => {
				if(props.EditData!=null){
					data.IsEdit=true;
					let d = JSON.parse(JSON.stringify(props.EditData));
					data.rulePermissionForm=d;
				}
			});
			return{
				data,
				boxStyle,
				...formEvent(data,closeWindow),
				closeWindow
			}
		}
		
	})
</script>

<style>
</style>
