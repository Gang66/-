<template>
    <!-- <div class='bg-white rounded-lg w-full shadow-md pb-4'> -->
    <div class='flex justify-between items-end mb-4 pr-6'>
        <div class='w-full flex-1'>
            <div class='flex justify-between items-center relative pt-4 pl-6'>
                <div class='absolute text-blue-100 font-bold text-2xl italic'>{{ bjlbInfo.nameInfo.english }}</div>
                <div class='text-blue-500 text-sm font-semibold relative z-1'>{{ bjlbInfo.nameInfo.name }}</div>
            </div>
            <div class='h-px w-16 bg-blue-500 ml-6' />
        </div>
        <div class='flex'>
            <template v-if='type == 1'>
                <el-button type='primary' size='small' color='#027AFF'><svg-icon icon-class='svg-xzbj' class='mr-1' />新增报价</el-button>
                <el-button type='primary' class='blue-btn' size='small'><svg-icon icon-class='svg-gdlr_new' class='mr-1' />跟单录入</el-button>
                <el-button type='primary' class='blue-btn' size='small'><svg-icon icon-class='svg-ypsq' class='mr-1' />样品申请</el-button>
                <el-button class='red-btn' size='small'><svg-icon icon-class='svg-bjsd' class='mr-1' />标记失单</el-button>
            </template>
            <template v-else-if='type == 2'>
                <el-button type='primary' size='small' color='#027AFF'><svg-icon icon-class='svg-xzbj' class='mr-1' />新增合同</el-button>
                <el-button type='primary' class='blue-btn' size='small'><svg-icon icon-class='svg-tbsp_new' class='mr-1' />提报审批</el-button>
            </template>
            <template v-else-if='type == 4'>
                <el-button type='primary' size='small' color='#027AFF'><svg-icon icon-class='svg-shlr' class='mr-1' />售后录入</el-button>
            </template>
            <template v-else-if='type == 6'>
                <el-button type='primary' size='small' color='#027AFF'><svg-icon icon-class='svg-xzxm' class='mr-1' />新增项目</el-button>
            </template>
            <template v-else-if='type == 7'>
                <div class='w-full text-sm font-bold'>
                    拜访次数：<span class='text-4xl text-yellow-900 pr-1 font-mono'>23</span>次
                </div>
            </template>
        </div>
    </div>
    <div class='px-6'>
        <!-- 报价列表 -->
        <template v-if='type == 1'>
            <el-table
                :data='bjlbInfo.tableData'
                style='width: 100%'
                :header-cell-style='bjlbInfo.headSty'
            >
                <el-table-column prop='id' label='序号' align='center' width='100' />
                <el-table-column prop='time' label='询价时间' align='center' />
                <el-table-column prop='name' label='询价单位' />
                <el-table-column prop='price' label='报价金额' />
                <el-table-column label='报价等级' align='center'>
                    <template #default='scope'>
                        <el-tag type='success'>A</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop='status' label='报价状态' align='center'>
                    <template #default='scope'>
                        <div class='text-yellow-600 font-bold'>单据录入</div>
                    </template>
                </el-table-column>
                <el-table-column prop='unit' label='报价单' align='center'>
                    <template #default='scope'>
                        <a href='javascript:;' class='text-blue-500'>查看</a>
                    </template>
                </el-table-column>
                <el-table-column prop='log' label='沟通记录' align='center'>
                    <template #default='scope'>
                        <a href='javascript:;' class='text-blue-500'>查看</a>
                    </template>
                </el-table-column>
                <el-table-column label='操作' align='center' width='100'>
                    <template #default='scope'>
                        <a href='javascript:;' class='text-blue-500'>编辑</a>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 合同列表 -->
        <template v-else-if='type == 2'>
            <el-table
                :data='bjlbInfo.tableData'
                style='width: 100%'
                :header-cell-style='bjlbInfo.headSty'
            >
                <el-table-column prop='id' label='序号' align='center' width='100' />
                <el-table-column prop='time' label='签订时间' align='center' />
                <el-table-column prop='time' label='生效时间' align='center' />
                <el-table-column prop='price' label='合同金额' />
                <el-table-column prop='time' label='发货时间' align='center' />
                <el-table-column prop='time' label='合同状态' align='center' />
                <el-table-column prop='time' label='发票状态' align='center' />
                <el-table-column prop='time' label='售后次数' align='center' />
                <el-table-column label='沟通记录' align='center' width='100'>
                    <template #default='scope'>
                        <a href='javascript:;' class='text-blue-500'>编辑</a>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 账款管理 -->
        <template v-else-if='type == 3'>
            <el-table
                :data='bjlbInfo.tableData'
                style='width: 100%'
                :header-cell-style='bjlbInfo.headSty'
            >
                <el-table-column prop='id' label='序号' align='center' width='100' />
                <el-table-column prop='time' label='合同时间' align='center' />
                <el-table-column prop='time' label='合同金额' align='center' />
                <el-table-column prop='price' label='未收金额' />
                <el-table-column prop='time' label='到货时间' align='center' />
                <el-table-column prop='time' label='开票时间' align='center' />
                <el-table-column prop='time' label='开票金额' align='center' />
                <el-table-column prop='time' label='逾期天数' align='center' />
                <el-table-column prop='time' label='逾期金额' align='center' />
                <el-table-column prop='time' label='法务处理' align='center' />
                <el-table-column prop='time' label='已收金额' align='center' />
            </el-table>
        </template>
        <!-- 售后管理 -->
        <template v-else-if='type == 4'>
            <el-table
                :data='bjlbInfo.tableData'
                style='width: 100%'
                :header-cell-style='bjlbInfo.headSty'
            >
                <el-table-column prop='id' label='序号' align='center' width='100' />
                <el-table-column prop='time' label='申请时间' align='center' />
                <el-table-column prop='time' label='合同金额' align='center' />
                <el-table-column prop='price' label='售后等级' />
                <el-table-column prop='time' label='售后原因' align='center' />
                <el-table-column prop='time' label='处理状态' align='center' />
                <el-table-column prop='time' label='处理详情' align='center'>
                    <template #default='scope'>
                        <a href='javascript:;' class='text-blue-500'>编辑</a>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 物流管理 -->
        <template v-else-if='type == 5'>
            <el-table
                :data='bjlbInfo.tableData'
                style='width: 100%'
                :header-cell-style='bjlbInfo.headSty'
            >
                <el-table-column prop='id' label='序号' align='center' width='100' />
                <el-table-column prop='time' label='发货时间' align='center' />
                <el-table-column prop='time' label='合同金额' align='center' />
                <el-table-column prop='price' label='发货清单' />
                <el-table-column prop='time' label='物流图集' align='center' />
                <el-table-column prop='time' label='签收时间' align='center' />
                <el-table-column prop='time' label='沟通记录' align='center'>
                    <template #default='scope'>
                        <a href='javascript:;' class='text-blue-500'>编辑</a>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 项目管理 -->
        <template v-else-if='type == 6'>
            <el-table
                :data='bjlbInfo.tableData'
                style='width: 100%'
                :header-cell-style='bjlbInfo.headSty'
            >
                <el-table-column prop='id' label='序号' align='center' width='100' />
                <el-table-column prop='time' label='申报时间' align='center' />
                <el-table-column prop='time' label='项目名称' align='center' />
                <el-table-column prop='price' label='项目地址' />
                <el-table-column prop='time' label='项目等级' align='center' />
                <el-table-column prop='time' label='投资金额' align='center' />
                <el-table-column prop='time' label='使用时间' align='center' />
                <el-table-column prop='time' label='操作' align='center'>
                    <template #default='scope'>
                        <a href='javascript:;' class='text-blue-500'>编辑</a>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 拜访记录 -->
        <template v-else-if='type == 7'>
            <el-table
                :data='bjlbInfo.tableData'
                style='width: 100%'
                :header-cell-style='bjlbInfo.headSty'
            >
                <el-table-column prop='id' label='序号' align='center' width='100' />
                <el-table-column prop='time' label='拜访时间' align='center' />
                <el-table-column prop='time' label='出差人员' align='center' />
                <el-table-column prop='price' label='拜访内容' />
                <el-table-column prop='time' label='拜访费用' align='center' />
                <el-table-column prop='time' label='拜访成果' align='center' />
                <el-table-column prop='time' label='备注' align='center'>
                    <template #default='scope'>
                        <a href='javascript:;' class='text-blue-500'>编辑</a>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        
        <div class='flex flex-row-reverse mt-2'>
            <el-pagination
                v-model:page-size='bjlbInfo.size'
                small
                :background='true'
                layout='prev, pager, next, jumper'
                :total='bjlbInfo.totals'
                @size-change='handleSizeChange'
                @current-change='handleCurrentChange'
            />
        </div>
                    
    </div>
    <!-- </div> -->
</template>

<script lang="ts">
const text_list = [
    { name:'报价列表',english: 'QUOTATION LIST' },
    { name:'合同列表',english: 'CONTRACT' },
    { name:'账款管理',english: 'ACCOUNTS' },
    { name:'售后管理',english: 'AFTER SALES' },
    { name:'物流管理',english: 'LOGISTICS' },
    { name:'项目管理',english: 'PROJECT' },
    { name:'拜访记录',english: 'VISIT RECORDS' }
]
</script>

<script lang="ts" setup>
import { reactive } from 'vue'
import { validate } from '/@/utils/formExtend'
const prop = defineProps({
    // 栏目类型
    type: {
        type: Number,
        default() {
            return 0
        }
    }
})
const { type } = reactive(prop)
const bjlbInfo:any = reactive({
    // 名称
    nameInfo: {
        name: '',
        english: ''
    },
    // 分页
    pahe: 1,
    size: 10,
    totals: 0,
    
    tableData: [
        {
            id: 1,
            time: '2022-9-30',
            name: '山东XXX装备',
            price: '99.99',
            status: '单据录入'
        },
        {
            id: 2,
            time: '2022-9-30',
            name: '山东XXX装备',
            price: '99.99',
            status: '单据录入'
        },
        {
            id: 3,
            time: '2022-9-30',
            name: '山东XXX装备',
            price: '99.99',
            status: '单据录入'
        },
        {
            id: 4,
            time: '2022-9-30',
            name: '山东XXX装备',
            price: '99.99',
            status: '单据录入'
        }
    ],
    // 列表样式
    headSty: {
        color: '#303133',
        background: '#E7F4FE'
    }
})
// 切换table
bjlbInfo.nameInfo = text_list[type - 1]

// 分页
const handleSizeChange = (val: number) => {
    bjlbInfo.size = validate
}
const handleCurrentChange = (val: number) => {
    bjlbInfo.page = val
}



</script>

<style type="postcss" scoped>
.red-btn {
    color: #DB0C0C !important;
    background: #fff;
    border: 1px solid #DB0C0C;
}
.red-btn:hover {
    background: rgba(255, 0, 0, 0.1);
}
.blue-btn {
    color: #027AFF !important;
    background: #fff;
    border: 1px solid #027AFF;
}
.blue-btn:hover {
    background: #0278ff15;
}
</style>
