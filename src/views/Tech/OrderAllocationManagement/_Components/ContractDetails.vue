<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 relative">
      <div class="w-1160 h-60 border">
        <div class="h-12 border-b-4 clearfix p-3">
          <div class="float-left">
            <i class="iconfont icon-shujuku mr-2"></i>
            <span>基础信息</span>
            <span class="ml-8">润扬事业部</span>
            <span class="text-red-500 ml-8">紧急</span>
            <span class="text-blue-500">一般</span>
            <span class="text-green-500 ml-8">已完成</span>
            <span class="text-red-500">已超时</span>
            <span class="text-green-500 ml-2">(2021-11-06 15:02)</span>
          </div>
          <div class="float-right mr-5"><span>固定合同（SE2111060001）</span></div>
        </div>

        <div class="flex">
          <div class="w-1/3">
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">需求方</span>
              <div class="w-72 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                黑龙江信维源化工有限公司
                <div class="float-right w-5 h-5 border border-yellow-500 rounded-t-none rounded-br-full rounded-bl-full inline-block text-center text-sm text-yellow-500">
                  <span>良</span>
                </div>
                <div class="float-right w-5 h-5 border border-green-500 rounded-t-none rounded-br-full rounded-bl-full inline-block text-center text-sm text-green-500">
                  <span>优</span>
                </div>
                <div class="float-right w-5 h-5 border border-gray-400 rounded-t-none rounded-br-full rounded-bl-full inline-block text-center text-sm text-gray-400">
                  <span>差</span>
                </div>
              </div>
            </div>
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">供货方</span>
              <div class="w-72 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">上海阀门二厂有限公司</div>
            </div>
            <div>
              <div class="ml-3 inline-block">
                <span class="float-left mt-3 text-sm">居间费</span>
                <div class="w-24 h-10 inline-block border-b ml-4 pt-3 text-sm">
                  <span>-</span>
                </div>
              </div>
              <div class="inline-block ml-6">
                <span class="float-left mt-3 text-sm">加价费</span>
                <div class="w-24 h-10 inline-block border-b ml-4 pt-3 text-sm">
                  <span>12</span>
                </div>
              </div>
            </div>
            <div>
              <div class="ml-3 inline-block">
                <span class="float-left mt-3 text-sm">供货期</span>
                <div class="w-24 h-10 inline-block border-b ml-4 pt-3 text-sm">
                  <span>19</span>
                  <span class="float-right">天</span>
                </div>
              </div>
              <div class="inline-block ml-6">
                <span class="float-left mt-3 text-sm">业务员</span>
                <div class="w-24 h-10 inline-block border-b ml-4 pt-3 text-sm">
                  <span>王迪</span>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">签约时间</span>
              <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">2021-11-06</div>
            </div>
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">签约地点</span>
              <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">上海闵行区</div>
            </div>
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">发票税费</span>
              <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">1957</div>
            </div>
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">标牌证件</span>
              <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">中字版</div>
            </div>
          </div>
          <div class="">
            <div>
              <div class="inline-block">
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">合同金额</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">11744</div>
                </div>
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">最低售价</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">21430</div>
                </div>
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">合作状态</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">合作客户-执行完毕</div>
                </div>
              </div>
              <div class="inline-block">
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">实际金额</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                    <span class="text-sm">11744</span>
                    <span class="float-right text-sm text-red-500">-15.2%</span>
                  </div>
                </div>
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">提成费用</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                    <span class="text-sm">117.4</span>
                    <span class="float-right text-sm text-red-500">2%</span>
                  </div>
                </div>
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">物流费用</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                    <span class="text-sm">489.4</span>
                    <span class="float-right text-sm">8%</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">备注说明</span>
                <div class="w-96 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">月底之前到货</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <el-tabs type="border-card">
          <el-tab-pane label="联系人">
            <div class="bf-table-content">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="姓名" align="center">
                  <template #default="scope">
                    <span>唐经理</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="电话" align="center">
                  <template #default="scope">
                    <span>-</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="手机" align="center">
                  <template #default="scope">
                    <span>1555555555</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="职务" align="center">
                  <template #default="scope">
                    <span>采购经理</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="类别" align="center">
                  <template #default="scope">
                    <span>决策人</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="用途" align="center">
                  <template #default="scope">
                    <span>收货</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="付款/开票计划">
            <div class="bf-table-content float-left w-540 mr-10">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="付款日期" align="center">
                  <template #default="scope">
                    <span>2021-09-15</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="付款阶段" align="center">
                  <template #default="scope">
                    <span>发货款</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="付款占比%" align="center">
                  <template #default="scope">
                    <span>100</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="付款金额" align="center">
                  <template #default="scope">
                    <span>10800.00</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="bf-table-content float-left w-540">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="开票日期" align="center">
                  <template #default="scope">
                    <span>2021-09-30</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="开票阶段" align="center">
                  <template #default="scope">
                    <span>发货后</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="开票金额" align="center">
                  <template #default="scope">
                    <span>10800.00</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="备注" align="center">
                  <template #default="scope">
                    <span>-</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="收货人">
            <div class="bf-table-content">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="收货人" align="center">
                  <template #default="scope">
                    <span>唐经理</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="联系方式" align="center">
                  <template #default="scope">
                    <span>15555555555</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="收货地址" align="center" min-width="300">
                  <template #default="scope">
                    <span>山东威海荣成市河阳东路198号凯丽特种纸</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="所属批次" align="center">
                  <template #default="scope">
                    <span>-</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="合同清单">
            <div class="pt-1 pb-1 clearfix">
              <div class="flex">
                <div class="flex-auto"></div>
                <div>
                  <el-button type="primary"> <i class="iconfont icon-dingdan4"></i> 预览报价单</el-button>
                  <el-button type="warning" @click="openWindowHechnicalMarkup()"> <i class="iconfont icon-jiage"></i> 加价记录</el-button>
                </div>
              </div>
              <div class="text-sm">
                <span>表单1</span>
                <div class="inline-block w-1070 h-1 ml-3 bg-slate-100"></div>
              </div>
              <div class="bf-table-content">
                <el-table :data="data.tableData" stripe>
                  <el-table-column type="index" label="序号" width="54" align="center" />
                  <el-table-column prop="ProductName" label="产品名称" align="center">
                    <template #default="scope">
                      <span>阀门</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="型号" align="center">
                    <template #default="scope">
                      <span>11111111</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="规格" align="center">
                    <template #default="scope">
                      <span>11111111</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="单位" align="center">
                    <template #default="scope">
                      <span>台</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="数量" align="center">
                    <template #default="scope">
                      <span>200</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="金额" align="center">
                    <template #default="scope">
                      <span>20000.00</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="备注" align="center">
                    <template #default="scope">
                      <span>12222222222</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="h-10 bg-sky-50 leading-10 text-center text-sm">
                  <div class="w-14 float-left">
                    <span>合计</span>
                  </div>
                  <div class="w-400 inline-block">
                    <p>
                      （大写）：人民币<span class="ml-3 font-semibold">{{ toChies(27750) }}</span>
                    </p>
                  </div>
                  <div class="w-400 inline-block">
                    <p>（小写）：¥<span class="font-semibold">27750</span>元</p>
                  </div>
                </div>
              </div>
              <div class="text-sm pt-4 pb-3">
                <span>表单2</span>
                <div class="inline-block w-1070 h-1 ml-3 bg-slate-100"></div>
              </div>
              <div class="text-sm leading-6">
                <p>合同附件</p>
                <p>甲方：唐山东江化工有限公司</p>
                <p>乙方：北方高中压阀门有限公司</p>
              </div>
              <div class="bf-table-content">
                <el-table :data="data.tableData" stripe>
                  <el-table-column type="index" label="序号" width="54" align="center" />
                  <el-table-column prop="ProductName" label="产品名称" align="center">
                    <template #default="scope">
                      <span>衬氟手动球阀</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="型号" align="center">
                    <template #default="scope">
                      <span>J41H-16C</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="规格" align="center">
                    <template #default="scope">
                      <span>DN150</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="单位" align="center">
                    <template #default="scope">
                      <span>个</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="数量" align="center">
                    <template #default="scope">
                      <span>200</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="单价" align="center">
                    <template #default="scope">
                      <span>3654</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="最低价" align="center">
                    <template #default="scope">
                      <span>2753</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="金额" align="center">
                    <template #default="scope">
                      <span>10800</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="备注" align="center">
                    <template #default="scope">
                      <span>12222222222</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="h-10 bg-sky-50 leading-10 text-center text-sm">
                  <div class="w-14 float-left">
                    <span>合计</span>
                  </div>
                  <div class="w-400 inline-block">
                    <p>
                      （大写）：人民币<span class="ml-3 font-semibold">{{ toChies(27750) }}</span>
                    </p>
                  </div>
                  <div class="w-400 inline-block">
                    <p>（小写）：¥<span class="font-semibold">27750</span>元</p>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="合同条款">
            <div class="text-sm">
              <p>二、质量要求、技术要求、乙方对质量负责的条件和限期</p>
              <p>1．质量以采购标的物要求品名，主要技术参数按国家标准进行制造和验收；</p>
              <p>2．乙方在认可约定质量要求和技术标准条件下对标的产品的质量负责，因产品质量问题而发生损坏时（不包括易损件），我方将为用户更换损坏件。质保期为收货后12个月。</p>
              <p>三、交（提）货时间、地点、方式及退货期限、数量</p>
              <p>1．交（提）货时间：合同生效后5天发货。</p>
              <p>2. 交（提）货地点: 唐山市南堡开发区西外环东侧，荣福道南侧</p>
              <p>3．交（提）货方式：汽车配送。</p>
              <p>4．收货人： 田经理 电话：18713859771</p>
              <p>四、运输方式和费用负担</p>
              <p>1．运输方式：货运。</p>
              <p>2．费用负担：乙方负责支付。</p>
              <p>五、验收标准、方式及提出异议的期限</p>
              <p>1．验收标准以本合同“一”、“二”条款规定执行；验收方式为甲方当场验收；</p>
              <p>2．提出异议的期限：甲方收货后7天内以书面形式提出。</p>
              <p>六、付款、结算方式及期限 合同生效，乙方安排生产备货，发货前甲方支付合同金额95% 留5%质保，质保期满支付</p>
              <p>七、违约责任</p>
              <p>1．甲方在规定期限内对货物未提出异议，视为甲方认为满足验收条件。</p>
              <p>2．乙方提供的货物未能达到本合同规定的验收标准，则乙方应予以维修、更换。</p>
              <p>3、如甲方逾期付款，则每日按照货款总额的0.5%计算违约金。</p>
              <p>八、解决合同纠纷的方式 执行本合同发生争议，由当事人双方协商，协商不成，可向合同签订地法院提起诉讼。</p>
              <p>九、双方协商的其他条款</p>
              <p>1、本合同执行过程中所涉及到的价位、费用等均属甲、乙方双方商业机密，甲、乙方人员不得以任何方式向任何第三方泄露。</p>
              <p>2、本合同未尽事宜由双方协商解决，协商不成均可向合同签订地法院起诉。</p>
              <p>3、本合同一式两份，甲乙双方各壹份。传真件、复印件、扫描件具有与本合同同等的法律效力。</p>
              <p>4、本合同条款均由甲乙双方共同协商制定，经甲乙双方签字或盖章后回传。</p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="供需方信息">
            <div class="w-540 border inline-block mr-10 ml-2 p-4 pl-8 rounded-md relative">
              <div class="w-20 text-center h-7 bg-white absolute -top-3 left-3"><span>供货方</span></div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">单位名称</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">河北省唐山市曹妃甸区 唐山市南堡开发区西外环东侧、荣福道南侧</div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">单位地址</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">黑龙江信维源化工有限公司</div>
              </div>
              <div>
                <span class="float-left mt-3 text-sm">法定代表人</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">李星明</div>
              </div>
              <div>
                <span class="float-left mt-3 text-sm">委托代理人</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">-</div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">开户银行</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">-</div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">银行账号</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">-</div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">电话</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">-</div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">传真</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">-</div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">税号</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">-</div>
              </div>
            </div>
            <div class="w-540 border inline-block rounded-md relative p-4 pl-8">
              <div class="w-20 text-center h-7 bg-white absolute -top-3 left-3"><span>需求方</span></div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">单位名称</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">北方高中压阀门有限公司</div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">单位地址</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">山东省济南市天桥区小清河北路8888号滨海商务中心D座602室</div>
              </div>
              <div>
                <span class="float-left mt-3 text-sm">法定代表人</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">贺利娟</div>
              </div>
              <div>
                <span class="float-left mt-3 text-sm">委托代理人</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">-</div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">开户银行</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">中国工商银行济南明湖支行</div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">银行账号</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">1602003209200096163</div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">电话</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">0531-88703355</div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">传真</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">0531-88703355</div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">税号</span>
                <div class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">91370105MA3MJ33K79</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审批记录">
            <div class="bf-table-content">
              <el-table :data="data.tableData" stripe>
                <el-table-column type="index" label="序号" width="54" align="center" />
                <el-table-column prop="ProductName" label="审批时间" align="center">
                  <template #default="scope">
                    <span>2021-09-08 10:46</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="审批人" align="center">
                  <template #default="scope">
                    <span>刘某某</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="岗位" align="center">
                  <template #default="scope">
                    <span>销售经理</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="审批结果" align="center">
                  <template #default="scope">
                    <!-- <span class="text-red-500">驳回</span> -->
                    <span class="text-green-500">通过</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="审批意见" align="center">
                  <template #default="scope">
                    <span class="text-gray-400">无</span>
                    <!-- <span>低于最低销售价</span> -->
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="操作" align="center">
                  <template #default="scope">
                    <span class="text-blue-500 cursor-pointer">撤销</span>
                    <!-- <span>-</span> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="text-sm text-blue-500 pt-5">
        <div class="inline-block cursor-pointer">
          <i class="iconfont icon-mxjl mr-1"></i>
          <span>预览合同</span>
        </div>
        <div class="inline-block ml-10 cursor-pointer">
          <i class="iconfont icon-shujuku mr-1"></i>
          <span>审批记录</span>
        </div>
      </div>
      <!--  （加价记录） 销售加价 -->
      <PriceIncreaseManagement title="加价管理" v-if="hechnicalMarkupOpenData.visible" :FormData="hechnicalMarkupOpenData.formData" @closeWindow="closeWindowHechnicalMarkup($event)" />
      <!--  -->
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { toChies } from '/@/utils/tools'
import PriceIncreaseManagement from '../../OrderAllocationManagement/_Components/PriceIncreaseManagement.vue'

export default defineComponent({
  components: {
    OpenWindow,
    InfoFilled,
    PriceIncreaseManagement
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      input: '',
      value: '',
      tableData: [{ value: 1 }]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })
    // 加价记录
    const hechnicalMarkupOpen = (data: any) => {
      let hechnicalMarkupOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowHechnicalMarkup = (val: any) => {
        hechnicalMarkupOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        hechnicalMarkupOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowHechnicalMarkup = (type: string) => {
        hechnicalMarkupOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        hechnicalMarkupOpenData,
        openWindowHechnicalMarkup,
        closeWindowHechnicalMarkup
      }
    }

    return {
      boxStyle,
      closeWindow,
      data,
      toChies,
      ...hechnicalMarkupOpen({ data })
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-collapse-item__header) {
  background: #fbfbfbbf;
}
:deep(#tab-6) {
  position: absolute;
  right: -570px;
}
</style>
