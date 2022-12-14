import { IMenubarList } from "/@/type/store/layout";
export const user = [
  { name: "admin", pwd: "admin" },
  { name: "dev", pwd: "dev" },
  { name: "test", pwd: "test" },
];

export const role = [
  { name: "admin", description: "管理员" },
  { name: "dev", description: "开发人员" },
  { name: "test", description: "测试人员" },
];

export const user_role = [
  { userName: "admin", roleName: "admin" },
  { userName: "dev", roleName: "dev" },
  { userName: "test", roleName: "test" },
];

export const permission = [
  { name: "add", description: "新增" },
  { name: "update", description: "修改" },
  { name: "remove", description: "删除" },
];

export const role_route = [
  { roleName: "admin", id: 1, permission: [] },
  { roleName: "admin", id: 10, permission: [] },
  { roleName: "admin", id: 2, permission: [] },
  { roleName: "admin", id: 20, permission: [] },
  { roleName: "admin", id: 21, permission: [] },
  { roleName: "admin", id: 22, permission: [] },
  { roleName: "admin", id: 3, permission: [] },
  { roleName: "admin", id: 30, permission: [] },
  { roleName: "admin", id: 300, permission: [] },
  { roleName: "admin", id: 31, permission: [] },
  { roleName: "admin", id: 310, permission: [] },
  { roleName: "admin", id: 4, permission: [] },
  { roleName: "admin", id: 40, permission: [] },
  { roleName: "admin", id: 41, permission: [] },
  { roleName: "admin", id: 42, permission: [] },
  { roleName: "admin", id: 43, permission: [] },
  { roleName: "admin", id: 5, permission: [] },
  { roleName: "admin", id: 50, permission: ["add", "update", "remove"] },
  { roleName: "admin", id: 51, permission: ["add", "update", "remove"] },
  { roleName: "admin", id: 52, permission: [] },
  { roleName: "admin", id: 53, permission: [] },
  { roleName: "admin", id: 6, permission: [] },
  { roleName: "admin", id: 60, permission: ["add"] },
  { roleName: "admin", id: 61, permission: [] },
  { roleName: "admin", id: 62, permission: [] },
  { roleName: "admin", id: 63, permission: [] },
  { roleName: "admin", id: 64, permission: [] },
  { roleName: "admin", id: 65, permission: [] },
  
  { roleName: "admin", id: 7, permission: [] },
  { roleName: "admin", id: 71, permission: [] },
  { roleName: "admin", id: 66, permission: [] },

  { roleName: "dev", id: 1, permission: [] },
  { roleName: "dev", id: 10, permission: [] },
  { roleName: "dev", id: 5, permission: [] },
  { roleName: "dev", id: 50, permission: ["add"] },

  { roleName: "test", id: 1, permission: [] },
  { roleName: "test", id: 10, permission: [] },
  { roleName: "test", id: 5, permission: [] },
  { roleName: "test", id: 50, permission: ["update"] },
];

export const route: Array<IMenubarList> = [
  {
    id: 2,
    parentId: 0,
    name: "Recruit",
    path: "/Recruit",
    component: "Layout",
    redirect: "/Recruit",
    meta: { title: "招聘管理", icon: "el-icon-phone" },
  },
  {
    id: 20,
    parentId: 2,
    name: "HRInvite",
    path: "/HR/View/Invite/Index",
    component: "/HR/View/Invite/Index.vue",
    meta: { title: "邀约管理", icon: "el-icon-goods" },
  },
  {
    id: 21,
    parentId: 2,
    name: "HRInterview",
    path: "/HR/View/Interview/Index",
    component: "/HR/View/Interview/Index.vue",
    meta: { title: "面试管理", icon: "el-icon-goods" },
  },
  {
      id: 22,
      parentId: 2,
      name: "HRInduction",
      path: "/HR/View/Induction/Index",
      component: "/HR/View/Induction/Index.vue",
      meta: { title: "入职管理", icon: "el-icon-help" },
    },
  // {
  //   id: 22,
  //   parentId: 2,
  //   name: "ProjectImport",
  //   path: "/Project/ProjectImport",
  //   component: "ProjectImport",
  //   meta: { title: "入职管理", icon: "el-icon-help" },
  // },
  {
    id: 23,
    parentId: 2,
    name: "ProjectImport",
    path: "/Project/ProjectImport",
    component: "ProjectImport",
    meta: { title: "绩效管理", icon: "el-icon-help" },
  },
  {
    id: 3,
    parentId: 0,
    name: "Nav",
    path: "/Nav",
    component: "Layout",
    redirect: "/Nav/SecondNav/ThirdNav",
    meta: { title: "员工管理", icon: "el-icon-picture" },
  },
  {
    id: 30,
    parentId: 3,
    name: "SecondNav",
    path: "/Nav/SecondNav",
    redirect: "/Nav/SecondNav/ThirdNav",
    component: "SecondNav",
    meta: { title: "试用管理", icon: "el-icon-camera", alwaysShow: true },
  },
  {
    id: 300,
    parentId: 30,
    name: "ThirdNav",
    path: "/Nav/SecondNav/ThirdNav",
    component: "ThirdNav",
    meta: { title: "员工管理", icon: "el-icon-platform" },
  },
  {
    id: 31,
    parentId: 3,
    name: "SecondText",
    path: "/Nav/SecondText",
    redirect: "/Nav/SecondText/ThirdText",
    component: "SecondText",
    meta: { title: "社保管理", icon: "el-icon-opportunity", alwaysShow: true },
  },
  {
    id: 310,
    parentId: 31,
    name: "ThirdText",
    path: "/Nav/SecondText/ThirdText",
    component: "ThirdText",
    meta: { title: "离职管理", icon: "el-icon-menu" },
  },
  {
    id: 4,
    parentId:0,
    name: 'AttendanceManage',
    path: '/AttendanceManage',
    component: 'Layout',
    redirect: "/AttendanceManageIndex",
    meta: { title: '考勤管理', icon: 'el-icon-eleme' },
},
{
    id: 42,
    parentId: 4,
    name: "AttendanceManageIndex",
    path: "/AttendanceManageIndex",
    component: "/HR/View/Attendance/AttendanceManage/Index.vue",
    meta: { title: "考勤管理", icon: "el-icon-goods" },
  },
  // {
  //   id: 4,
  //   parentId:0,
  //   name: "AttendanceManage",
  //   component: "Layout",
  //   path: "/HR/View/AttendanceManage/Index",
  //   redirect: '/HR/View/AttendanceManage/Index.vue',
  //   meta: { title: "考勤管理", icon: "el-icon-phone"},
  //   children: [
  //     {
  //        name: 'Workplace',
  //        path: '/HR/View/AttendanceManage/Index',
  //        component: 'AttendanceManage',
  //        meta: { title: '首页', icon: 'el-icon-tools' }
  //    },
  //  ]
  // },
  // {
  //   id: 42,
  //   parentId: 4,
  //   name: "AttendanceManageIndexs",
  //   path: "/HR/View/AttendanceManage/Index",
  //   component: "/HR/View/AttendanceManage/Index.vue",
  //   meta: { title: "选择页", icon: "el-icon-goods" },
  // },
  // {
  //   id: 41,
  //   parentId: 4,
  //   name: "HRInterview",
  //   path: "/HR/View/Interview/Index",
  //   component: "/HR/View/Interview/Index.vue",
  //   meta: { title: "面试管理", icon: "el-icon-goods" },
  // },
  // {
  //   id: 4,
  //   parentId: 0,
  //   name: "Components",
  //   path: "/Components",
  //   component: "Layout",
  //   redirect: "/Components/OpenWindowTest",
  //   meta: { title: "档案管理", icon: "el-icon-phone" },
  // },
  // {
  //   id: 40,
  //   parentId: 4,
  //   name: "OpenWindowTest",
  //   path: "/Components/OpenWindowTest",
  //   component: "OpenWindowTest",
  //   meta: { title: "选择页", icon: "el-icon-goods" },
  // },
  // {
  //   id: 41,
  //   parentId: 4,
  //   name: "CardListTest",
  //   path: "/Components/CardListTest",
  //   component: "CardListTest",
  //   meta: { title: "卡片列表", icon: "el-icon-question-filled" },
  // },
  // {
  //   id: 42,
  //   parentId: 4,
  //   name: "TableSearchTest",
  //   path: "/Components/TableSearchTest",
  //   component: "TableSearchTest",
  //   meta: { title: "考勤管理", icon: "el-icon-question-filled" },
  // },
  // {
  //   id: 43,
  //   parentId: 4,
  //   name: "ListTest",
  //   path: "/Components/ListTest",
  //   component: "ListTest",
  //   meta: { title: "标签页列表", icon: "el-icon-question-filled" },
  // },
  {
    id: 5,
    parentId: 0,
    name: "Permission",
    path: "/Permission",
    component: "Layout",
    redirect: "/Permission/Directive",
    meta: { title: "个人中心", icon: "el-icon-phone", alwaysShow: true },
  },
  {
    id: 50,
    parentId: 5,
    name: "Directive",
    path: "/Permission/Directive",
    component: "Directive",
    meta: { title: "指令管理", icon: "el-icon-goods" },
  },
  {
    id: 51,
    parentId: 5,
    name: "HRInnovate",
    path: "/HR/View/Innovate/Index",
    component: "/HR/View/Innovate/Index.vue",
    meta: { title: "创新举措", icon: "el-icon-phone", alwaysShow: true },
  },
  {
    id: 52,
    parentId: 5,
    name: "HRMyAttendance",
    path: "/HR/View/Attendance/MyAttendance",
    component: "/HR/View/Attendance/MyAttendance/Index.vue",
    meta: { title: "我的考勤", icon: "el-icon-phone", alwaysShow: true },
  },
  {
    id: 53,
    parentId: 5,
    name: "HRMyWhereabouts",
    path: "/HR/View/MyWhereabouts/Index",
    component: "/HR/View/MyWhereabouts/Index.vue",
    meta: { title: "我的去向", icon: "el-icon-phone", alwaysShow: true },
  },
  {
    id: 6,
    parentId: 0,
    name: "System",
    path: "/System",
    component: "Layout",
    redirect: "/System",
    meta: { title: "系统设置", icon: "el-icon-phone", alwaysShow: true },
  },
  {
    id: 60,
    parentId: 6,
    name: "SystemDictionary",
    path: "/System/Dictionary/Index",
    component: "/System/Dictionary/Index.vue",
    meta: { title: "字典管理", icon: "el-icon-phone", alwaysShow: true },
  },
  {
    id: 61,
    parentId: 6,
    name: "SystemDictionaryType",
    path: "/System/Dictionary/Type",
    component: "/System/Dictionary/Type.vue",
    meta: { title: "字典类型", icon: "el-icon-phone", alwaysShow: true, hidden: true },
  },
  {
    id: 62,
    parentId: 6,
    name: "SystemOrganization",
    path: "/System/Organization/Index",
    component: "/System/Organization/Index.vue",
    meta: { title: "组织架构", icon: "el-icon-phone", alwaysShow: true },
  },
  {
    id: 63,
    parentId: 6,
    name: "AttendanceSettings",
    path: "/System/AttendanceSettings/Index",
    component: "/System/AttendanceSettings/Index.vue",
    meta: { title: "考勤设置", icon: "el-icon-phone", alwaysShow: true },
  },
  {
    id: 64,
    parentId: 6,
    name: "SystemContractSetting",
    path: "/System/ContractSetting/Index",
    component: "/System/ContractSetting/Index.vue",
    meta: { title: "合同设置", icon: "el-icon-phone", alwaysShow: true },
  },
  {
    id: 65,
    parentId: 6,
    name: "SystemMap",
    path: "/System/Map/Index",
    component: "/System/Map/Index.vue",
    meta: { title: "位置设置", icon: "el-icon-phone", alwaysShow: true },
  },
  
  {
    id: 7,
    parentId: 0,
    name: "Tech",
    path: "/Tech",
    component: "Layout",
    redirect: "/Tech/ProductFormula/Index",
    meta: { title: "技术系统", icon: "el-icon-phone", alwaysShow: true },
  },
  {
    id: 71,
    parentId: 7,
    name: "TechProductFormula",
    path: "/Tech/ProductFormula",
    component: "/Tech/ProductFormula/Index.vue",
    meta: { title: "阀门解析", icon: "el-icon-phone", alwaysShow: true },
  },
  
  
  {
    id: 66,
    parentId: 6,
    name: "SystemRichText",
    path: "/System/RichText/Index",
    component: "/System/RichText/Index.vue",
    meta: { title: "富文本设置", icon: "el-icon-phone", alwaysShow: true },
  },
];
