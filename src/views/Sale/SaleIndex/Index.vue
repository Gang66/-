<template>
  <div class='bf-content home-content'>
    <el-row :gutter='10'>
      <el-col :md='24' :lg='19'>
        <div class='home-bannder w-full p-8 h-40 rounded-lg mb-2 clear-both overflow-hidden flex'>
          <div class='w-1/3 text-gray-100'>
            <div class='text-3xl'>第一大区·潍坊事业部</div>
            <div class='text-base pt-1'>北京·山东·宁夏·甘肃·天津</div>
            <div class='text-2xl pt-4'>合计员工数：50人</div>
          </div>
          <div class='w-2/3 text-gray-100   text-left'>
            <div class='h-12  w-full'>
              <div class='float-right  w-40 h-12 bg-skybut rounded-2xl text-center text-gray-100'>
                <i class='iconfont icon-setting  leading-12' />
                <span class='text-base pl-3'>设置座右铭</span>
              </div>
            </div>
            <div class='-mt-4'>
              <div class='pt-1 text-xl '>
                <span>今天是</span><span class='pl-4'>2022年3月30日 星期三</span>
              </div>
              <div class='pt-4'>才华并不能使你坚韧不拔，宝剑锋从磨砺出，有辉煌成就的那些人，大抵都是用毅力获得成功的吧。</div>
            </div>

          </div>
          <!--<img src='../../../assets/img/hr/home/bannder_01.png' class='h-full float-left'>
                    <div class='float-right pr-3'>
                        <div class='w-52 h-16 overflow-hidden mb-3'><iframe src='https://i.tianqi.com/?c=code&a=getcode&id=76&icon=1' /></div>
                        <Clock />
                    </div> -->
        </div>
        <el-row :gutter='10'>
          <el-col :md='24' :lg='12'>
            <div class='bf-card mb-2'>
              <div class='rounded-lg bg-gradient-to-b from-blue-200 to-blue-50 pb-2'>
                <div class='bf-card-top'>
                  <div class='flex'>
                    <div class='text-2xl font-black bf-title-color'>客户库专栏</div>
                    <div class='flex'>
                      <div v-for='(item,index) in CumSelectType' :key='index' class='rounded-md text-center leading-8 ml-2 cursor-pointer'
                        :class='item.select==1?" w-8 h-8 bg-cusselect text-gray-100":""'>
                        {{ item.Name }}
                      </div>
                    </div>

                  </div>

                  <div class=''>
                    <div class='card-header-content text-xs text-gray-500 mr-1'>
                      <ul class='card-header-navi'>
                        <li>查看详情</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class='home-cusranking w-176 h-40 grid gap-3 grid-cols-4 ml-5 mr-5 mb-2' />

                <div class='grid gap-3 grid-cols-3 p-3'>
                  <div class='text-center rounded-lg bg-white overflow-hidden pb-2'>
                    <div class='p-2'>
                      <div class='flex justify-between ' style='border-bottom:2px solid #FFC598'>
                        <div class='font-600 '>
                          <i class='iconfont icon-setting  leading-3' />
                          等级统计
                        </div>
                        <div class='text-base'>全部</div>
                      </div>
                      <div class='pt-2'>
                        <div v-for='o in 4' :key='o' class='flex justify-between items-center text-center text-1xl'>
                          <div class='w-1/5 p-1'>
                            <div class='inline-block bg-blue-100 w-6 h-6 rounded'>
                              <span class='text-sm text-black'>{{ o }}</span>
                            </div>
                          </div>
                          <div class='w-2/5 p-1 text-gray-600 truncate'>类客户</div>
                          <div class='w-2/5 p-1 text-gray-600'>1200</div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class='text-center rounded-lg bg-white overflow-hidden pb-2'>
                    <div class='p-2'>
                      <div class='flex justify-between ' style='border-bottom:2px solid #75E1FF'>
                        <div class='font-600 '>
                          <i class='iconfont icon-setting  leading-3' />
                          行业排名
                        </div>

                        <div class='text-base'>全部</div>
                      </div>

                      <div class='pt-2'>
                        <div v-for='o in 4' :key='o' class='flex justify-between items-center text-center text-1xl'>
                          <div class='w-1/5 p-1'>
                            <div class='inline-block bg-blue-100 w-6 h-6 rounded'>
                              <span class='text-sm text-black'>{{ o }}</span>
                            </div>
                          </div>
                          <div class='w-2/5 p-1 text-gray-600 truncate'>化工类</div>
                          <div class='w-2/5 p-1 text-gray-600'>1200</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class='text-center rounded-lg bg-white overflow-hidden pb-2'>
                    <div class='p-2'>
                      <div class='flex justify-between ' style='border-bottom:2px solid #A491E9'>
                        <div class='font-600 '>
                          <i class='iconfont icon-setting  leading-3' />
                          区域排名
                        </div>
                        <div class='text-base'>全部</div>
                      </div>

                      <div class='pt-2'>
                        <div v-for='o in 4' :key='o' class='flex justify-between items-center text-center text-1xl'>
                          <div class='w-1/5 p-1'>
                            <div class='inline-block bg-blue-100 w-6 h-6 rounded'>
                              <span class='text-sm text-black'>{{ o }}</span>
                            </div>
                          </div>
                          <div class='w-2/5 p-1 text-gray-600 truncate'>山东省</div>
                          <div class='w-2/5 p-1 text-gray-600'>1200</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='home-cusdr w-180 h-20  ml-3 mr-3 mb-2 flex p-5'>
                  <div class='text-2xl font-bold pt-2'>客户达人</div>
                  <div class='pl-5'>
                    <img class='w-12 h-12' src='.././../../assets/img/icon_blue.png'>
                  </div>
                  <div class='pl-5'>
                    <div class='font-bold'>张铁锤</div>
                    <div class='text-gray-500'>潍坊事业部·业务一部</div>
                  </div>
                  <div class='pl-5'>
                    <div class='font-bold'>200</div>
                    <div class='text-gray-500'>客户数量（个）</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :md='24' :lg='12'>
            <div class='bf-card mb-2 '>
              <div class='rounded-lg bg-gradient-to-b from-orange-200 to-orange-0 pb-4'>
                <div class='bf-card-top'>
                  <div class='flex'>
                    <div class='text-2xl font-black text-orange-800'>报价库专栏</div>
                    <div class='flex'>
                      <div v-for='(item,index) in CumSelectType' :key='index' class='rounded-md text-center leading-8 ml-2 cursor-pointer'
                        :class='item.select==1?" w-8 h-8 bg-orange-400 text-gray-100":""'>
                        {{ item.Name }}
                      </div>
                    </div>

                  </div>

                  <div class=''>
                    <div class='card-header-content text-xs text-gray-500 mr-1'>
                      <ul class='card-header-navi'>
                        <li>查看详情</li>
                      </ul>
                    </div>

                  </div>
                </div>
                <div class='bg-white ml-5 mr-5 p-5'>
                  <div class='flex justify-between ' style='border-bottom:2px solid #FFC598'>
                    <div class='font-600 '>
                      <i class='iconfont icon-setting  leading-3' />
                      报价量统计排名
                    </div>
                    <div class=''>
                      <div class='card-header-content text-base text-gray-500'>
                        <ul class='card-header-navi'>
                          <li>详情</li>
                        </ul>
                      </div>

                    </div>
                  </div>
                  <el-row class='pt-4'>
                    <el-col :lg='7'>
                      <div class='text-center rounded-lg bg-white overflow-hidden pb-2'>
                        <div class='text-3xl font-medium pb-2'>1200</div>
                        <div class='text-base text-gray-500 '>报价金额（万元）</div>
                      </div>
                    </el-col>
                    <el-col :lg='5'>
                      <div class='text-center rounded-lg bg-white overflow-hidden pb-2'>
                        <div class='text-3xl font-medium pb-2'>1000</div>
                        <div class='text-base text-gray-500 '>报价数量</div>
                      </div>
                    </el-col>
                    <el-col :lg='7'>
                      <div class='text-center rounded-lg bg-white overflow-hidden pb-2'>
                        <div class='text-3xl font-medium pb-2'>20/10</div>
                        <div class='text-base text-gray-500 '>报价/未报价人数</div>
                      </div>
                    </el-col>
                    <el-col :lg='5'>
                      <div class='text-center rounded-lg bg-white overflow-hidden pb-2'>
                        <div class='text-3xl font-medium pb-2'>2</div>
                        <div class='text-base text-gray-500 '>集团排名</div>
                      </div>
                    </el-col>
                  </el-row>

                </div>
                <div class=' bg-white ml-5 mr-5 p-5 mt-5'>
                  <div class=' grid gap-1 grid-cols-3'>
                    <div class='flex'>
                      <div class='text-center rounded-lg bg-blue-200 w-12 h-12 leading-12'>A类</div>
                      <div class='pl-2'>
                        <div>数量 200个</div>
                        <div>金额 200万元</div>
                      </div>
                    </div>
                    <div class='flex'>
                      <div class='text-center rounded-lg bg-orange-200 w-12 h-12 leading-12'>B类</div>
                      <div class='pl-2'>
                        <div>数量 200个</div>
                        <div>金额 200万元</div>
                      </div>
                    </div>
                    <div class='flex'>
                      <div class='text-center rounded-lg bg-cyan-200 w-12 h-12 leading-12'>C类</div>
                      <div class='pl-2'>
                        <div>数量 200个</div>
                        <div>金额 200万元</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class=' ml-5 mr-5 mt-5'>
                  <div class=' grid gap-3 grid-cols-4'>
                    <div class='bg-white p-3 text-center pb-2'>
                      <div class='bg-orange-50 w-24 h-8 leading-8'>≥5次报价</div>
                      <div class='pl-2 '>
                        <div>200</div>
                      </div>
                    </div>
                    <div class='bg-white p-3 text-center pb-2'>
                      <div class='bg-orange-50 w-24 h-8 leading-8'>&lt5次报价</div>
                      <div class='pl-2 '>
                        <div>200</div>
                      </div>
                    </div>
                    <div class='bg-white p-3 text-center pb-2'>
                      <div class='bg-orange-50 w-24 h-8 leading-8'>失单数量</div>
                      <div class='pl-2 '>
                        <div>200</div>
                      </div>
                    </div>
                    <div class='bg-white p-3 text-center pb-2'>
                      <div class='bg-orange-50 w-24 h-8 leading-8'>待单数量</div>
                      <div class='pl-2 '>
                        <div>200</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='home-bjdr w-180 h-20  ml-3 mr-3 mt-4 flex pt-5 '>
                  <div class='text-2xl font-bold pt-2'>报价达人</div>
                  <div class='pl-3'>
                    <img class='w-12 h-12' src='.././../../assets/img/icon_blue.png'>
                  </div>
                  <div class='pr-2'>
                    <div class='font-bold'>张铁锤</div>
                    <div class='text-gray-500'>潍坊·业务一部</div>
                  </div>
                  <div>
                    <div class='font-bold'>200</div>
                    <div class='text-gray-500'>报价数量（个）</div>
                  </div>
                  <div>
                    <div class='font-bold'>200</div>
                    <div class='text-gray-500'>报价金额（万）</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :md='24' :lg='24'>
            <div class='bf-card mb-2'>
              <div class='bf-card mb-2 '>
                <div class='rounded-lg bg-gradient-to-b from-indigo-200 to-indigo-0 pb-4'>
                  <div class='bf-card-top'>
                    <div class='flex'>
                      <div class='text-2xl font-black text-indigo-800'>合同/应收/售后/诉讼库</div>
                      <div class='flex'>
                        <div v-for='(item,index) in CumSelectType' :key='index' class='rounded-md text-center leading-8 ml-2 cursor-pointer'
                          :class='item.select==1?" w-8 h-8 bg-indigo-400 text-gray-100":""'>
                          {{ item.Name }}
                        </div>
                      </div>

                    </div>

                    <div class=''>
                      <div class='card-header-content text-xs text-gray-500 mr-1'>
                        <ul class='card-header-navi'>
                          <li>查看详情</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class='bg-white ml-5 mr-5 p-5'>
                    <div class='flex justify-between '>
                      <div class='font-600 flex'>
                        <!--  <img class='w-4 h-5 mr-2' src='../../../assets/img/sale/home/homeht.png'> -->
                        合同统计
                      </div>
                      <div class=''>
                        <div class='card-header-content text-base text-gray-500 '>
                          <ul class='card-header-navi'>
                            <li>查看详情</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class='flex justify-around p-5 text-center '>
                      <div class='p-2'>
                        <div class='text-3xl font-medium pb-2'>340</div>
                        <div class='text-base text-gray-500 '>合同总额</div>
                      </div>
                      <div class='p-2'>
                        <div class='text-3xl font-medium pb-2'>100</div>
                        <div class='text-base text-gray-500 '>合同总数</div>
                      </div>
                      <div class='p-2'>
                        <div class='text-3xl font-medium pb-2'>100/20</div>
                        <div class='text-base text-gray-500 '>有业绩/无业绩人数</div>
                      </div>
                      <div class='p-2'>
                        <div class='text-3xl font-medium pb-2'>2</div>
                        <div class='text-base text-gray-500 '>集团排名</div>
                      </div>
                      <div class='p-2'>
                        <div class='text-3xl font-medium pb-2'>200/20</div>
                        <div class='text-base text-gray-500 '>应收金额/合同量</div>
                      </div>
                      <div class='p-2'>
                        <div class='text-3xl font-medium pb-2'>120/10</div>
                        <div class='text-base text-gray-500 '>逾期金额/合同量</div>
                      </div>
                      <div class='p-2'>
                        <div class='text-3xl font-medium pb-2'>8/2</div>
                        <div class='text-base text-gray-500 '>诉讼金额/合同量</div>
                      </div>
                      <div class='p-2'>
                        <div class='text-3xl font-medium pb-2'>8/2</div>
                        <div class='text-base text-gray-500 '>售后量/解决量</div>
                      </div>
                    </div>
                    <div class=' grid gap-1 grid-cols-5 pl-5 pr-5'>
                      <div class='flex'>
                        <div class='text-center rounded-lg bg-blue-200 w-12 h-12 leading-12'>≥10万</div>
                        <div class='pl-2'>
                          <div>数量 200个</div>
                          <div>金额 200万元</div>
                        </div>
                      </div>
                      <div class='flex'>
                        <div class='text-center rounded-lg bg-orange-200 w-12 h-12 leading-12'>≥1万</div>
                        <div class='pl-2'>
                          <div>数量 200个</div>
                          <div>金额 200万元</div>
                        </div>
                      </div>
                      <div class='flex'>
                        <div class='text-center rounded-lg bg-cyan-200 w-12 h-12 leading-12'>&lt1万</div>
                        <div class='pl-2'>
                          <div>数量 200个</div>
                          <div>金额 200万元</div>
                        </div>
                      </div>
                      <div class='flex'>
                        <div class='text-center rounded-lg bg-blue-200 w-12 h-12 leading-12'>≥5次</div>
                        <div class='leading-12 pl-2'>
                          <div>数量 200个</div>
                        </div>
                      </div>
                      <div class='flex'>
                        <div class='text-center rounded-lg bg-blue-200 w-12 h-12 leading-12'>&lt5万</div>
                        <div class='leading-12 pl-2 '>
                          <div>数量 200个</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>

          <el-col :md='24' :lg='24'>
            <div class='bg-white mb-2 p-3'>
              <el-row :gutter='5'>
                <el-col :lg='4'>
                  <div>
                    <div class='text-left text-xl font-semibold pb-5 pl-2 pt-2'>
                      达人排行榜
                    </div>
                    <div>
                      <div class='flex'>
                        <div v-for='(item,index) in CumSelectType' :key='index' class='rounded-md text-center leading-8 ml-2 cursor-pointer'
                          :class='item.select==1?" w-8 h-8 bg-indigo-400 text-gray-100":""'>
                          {{ item.Name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :lg='4'>
                  <div class='bg-gray-200 rounded-md text-sm'>
                    <div class='h-32'>
                      <div class='bg-gradient-to-l from-blue-400 to-blue-200 w-full h-1/2 rounded-md text-right text-xl font-semibold text-white pt-5 pr-9'>
                        客户达人
                      </div>
                      <div class='flex p-2'>
                        <div class='-mt-10 w-16'>
                          <img class='w-13 h-13' src='.././../../assets/img/icon_blue.png'>
                          <div class='pt-2'>张铁锤</div>
                        </div>
                        <div class='text-gray-500'>
                          <div>客户：10个</div>
                          <div>金额：100万元</div>
                        </div>

                      </div>
                    </div>

                  </div>
                </el-col>
                <el-col :lg='4'>
                  <div class='bg-gray-200 rounded-md text-sm'>
                    <div class='h-32'>
                      <div class='bg-gradient-to-l from-blue-400 to-blue-200 w-full h-1/2 rounded-md text-right text-xl font-semibold text-white pt-5 pr-9'>
                        应收达人
                      </div>
                      <div class='flex p-2'>
                        <div class='-mt-10 w-16'>
                          <img class='w-13 h-13' src='.././../../assets/img/icon_blue.png'>
                          <div class='pt-2'>张铁锤</div>
                        </div>
                        <div class='text-gray-500'>
                          <div>客户：10个</div>
                          <div>金额：100万元</div>
                        </div>

                      </div>
                    </div>

                  </div>
                </el-col>
                <el-col :lg='4'>
                  <div class='bg-gray-200 rounded-md text-sm'>
                    <div class='h-32'>
                      <div class='bg-gradient-to-l from-zinc-800 to-zinc-200  w-full h-1/2 rounded-md text-right text-xl font-semibold text-white pt-5 pr-9'>
                        逾期达人
                      </div>
                      <div class='flex p-2'>
                        <div class='-mt-10 w-16'>
                          <img class='w-13 h-13' src='.././../../assets/img/icon_blue.png'>
                          <div class='pt-2'>张铁锤</div>
                        </div>
                        <div class='text-gray-500'>
                          <div>客户：10个</div>
                          <div>金额：100万元</div>
                        </div>

                      </div>
                    </div>

                  </div>
                </el-col>
                <el-col :lg='4'>
                  <div class='bg-gray-200 rounded-md text-sm'>
                    <div class='h-32'>
                      <div class='bg-gradient-to-l from-zinc-800 to-zinc-200  w-full h-1/2 rounded-md text-right text-xl font-semibold text-white pt-5 pr-9'>
                        诉讼达人
                      </div>
                      <div class='flex p-2'>
                        <div class='-mt-10 w-16'>
                          <img class='w-13 h-13' src='.././../../assets/img/icon_blue.png'>
                          <div class='pt-2'>张铁锤</div>
                        </div>
                        <div class='text-gray-500'>
                          <div>客户：10个</div>
                          <div>金额：100万元</div>
                        </div>

                      </div>
                    </div>

                  </div>
                </el-col>
                <el-col :lg='4'>
                  <div class='bg-gray-200 rounded-md text-sm'>
                    <div class='h-32'>
                      <div class='bg-gradient-to-l from-zinc-800 to-zinc-200 w-full h-1/2 rounded-md text-right text-xl font-semibold text-white pt-5 pr-9'>
                        售后达人
                      </div>
                      <div class='flex p-2'>
                        <div class='-mt-10 w-16'>
                          <img class='w-13 h-13' src='.././../../assets/img/icon_blue.png'>
                          <div class='pt-2'>张铁锤</div>
                        </div>
                        <div class='text-gray-500'>
                          <div>客户：10个</div>
                          <div>金额：100万元</div>
                        </div>

                      </div>
                    </div>

                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :md='24' :lg='24'>
            <div class='bf-card mb-2'>
              <div class='bf-card mb-2 '>
                <div class='rounded-lg bg-white pb-4'>
                  <div class='bf-card-top'>
                    <div class='flex'>
                      <div class='text-2xl font-black text-blue-600'>销售平台/项目展示专栏</div>
                      <div class='flex'>
                        <div v-for='(item,index) in CumSelectType' :key='index' class='rounded-md text-center leading-8 ml-2 cursor-pointer'
                          :class='item.select==1?" w-8 h-8 bg-blue-400 text-gray-100":""'>
                          {{ item.Name }}
                        </div>
                      </div>

                    </div>

                    <div class=''>
                      <div class='card-header-content text-base text-gray-500 mr-1'>
                        <ul class='card-header-navi'>
                          <li>查看详情</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class='bg-white ml-5 mr-5 px-5 flex'>
                    <div class='w-full py-5'>
                      <el-row>
                        <el-col :lg='6' class='px-5'>
                          <div class='text-center text-3xl font-medium'>20</div>
                          <div class='hom_pt text-center text-xl text-white pt-6 pb-2'>
                            新增销售平台
                          </div>
                        </el-col>
                        <el-col :lg='6' class='px-5'>
                          <div class='text-center text-3xl font-medium'>20</div>
                          <div class='hom_ptsl text-center text-xl text-white pt-6 pb-2'>
                            平台总数量
                          </div>
                        </el-col>
                        <el-col :lg='6' class='px-5'>
                          <div class='text-center text-3xl font-medium'>20</div>
                          <div class='hom_xm text-center text-xl text-white pt-6 pb-2'>
                            新增项目
                          </div>
                        </el-col>
                        <el-col :lg='6' class='px-5'>
                          <div class='text-center text-3xl font-medium'>20</div>
                          <div class='hom_xmsl text-center text-xl text-white pt-6 pb-2'>
                            项目总数量
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div>
                      <img src='../../../assets/img/sale/home/xspt.png' alt=''>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :md='5' :lg='24'>
            <div class='bf-card w-full bg-white px-auto pt-5'>
              <div class='w-8/12 mx-auto'>
                <el-tabs v-model='activeName' stretch>
                  <el-tab-pane label='客户知识' name='first' />
                  <el-tab-pane label='报价知识' name='second' />
                  <el-tab-pane label='合同知识' name='third' />
                  <el-tab-pane label='售后知识' name='fourth' />
                  <el-tab-pane label='应收知识' name='ys' />
                  <el-tab-pane label='诉讼知识' name='su' />
                  <el-tab-pane label='平台知识' name='pt' />
                </el-tabs>

              </div>
              <div class='float-left -mt-14 pl-8 text-2xl font-black '>销售知识专栏</div>
              <div class='float-right  -mt-14  pr-8  text-gray-500'>更多>>></div>

            </div>
            <div v-for='o in 3' :key='o' class='bg-white '>
              <div class='flex p-5 ' style='border-bottom:1px solid #EEEEEE'>
                <div class='w-80 h-15'>
                  <img src='../../../assets/img/sale/home/zs.png' alt=''>
                </div>
                <div class='pl-5'>
                  <div class='text-xl font-black pb-5'>涨知识：怎样辨别阀门的识别涂漆？</div>
                  <div>阀门外表面应涂漆出厂，涂漆层应耐久、美规，并保证标志明显清晰。1、阀门产品按阀体材料进行识别涂漆，其颜色按下表,2、为了表示阀门产品密封面的材料，应在传动的手轮、手柄、板手上……</div>
                  <div class='flex bt-5 text-gray-500 pt-2 w-fill justify-between'>
                    <div>2022-03-01 系统管理员 </div>
                    <div><img class='w-16 ' src='../../../assets/img/sale/home/vx.png' alt=''></div>

                  </div>
                </div>
              </div>

            </div>

          </el-col>

        </el-row>

      </el-col>
      <el-col :md='24' :lg='5'>
        <div class='w-full h-40 mb-2 rounded-lg bg-gradient-to-b from-blue-500 to-blue-300'>
          <div class='w-full text-1xl text-white font-black shadow-lg p-2 mb-3'>创新直通车</div>
          <div class='grid gap-3 grid-cols-2 pl-2 pr-2'>
            <div class='h-10 relative cursor-pointer rounded-full flex justify-center items-center bg-gradient-to-b from-indigo-100 to-indigo-400'>
              <div class='absolute top-0 -left-1 border-2 border-solid border-white bg-indigo-900 rounded-full h-7 w-7 flex items-center justify-center'>
                <el-icon color='#fff'>
                  <el-icon-edit />
                </el-icon>
              </div>
              <div class='w-full pl-3 pr-3 font-black text-sm text-center truncate'>培训调研</div>
            </div>
            <div class='h-10 relative cursor-pointer rounded-full flex justify-center items-center bg-gradient-to-b from-red-100 to-red-400'>
              <div class='absolute top-0 -left-1 border-2 border-solid border-white bg-red-900 rounded-full h-7 w-7 flex items-center justify-center'>
                <el-icon color='#fff'>
                  <el-icon-edit />
                </el-icon>
              </div>
              <div class='w-full pl-3 pr-3 font-black text-sm text-center truncate '>意见建议</div>
            </div>
            <div class='h-10 relative cursor-pointer rounded-full flex justify-center items-center bg-gradient-to-b from-yellow-100 to-yellow-400'>
              <div class='absolute top-0 -left-1 border-2 border-solid border-white bg-yellow-900 rounded-full h-7 w-7 flex items-center justify-center'>
                <el-icon color='#fff'>
                  <el-icon-edit />
                </el-icon>
              </div>
              <div class='w-full pl-3 pr-3 font-black text-sm text-center truncate'>创新举措</div>
            </div>
            <div class='h-10 relative cursor-pointer rounded-full flex justify-center items-center bg-gradient-to-b from-green-100 to-green-400'>
              <div class='absolute top-0 -left-1 border-2 border-solid border-white bg-green-900 rounded-full h-7 w-7 flex items-center justify-center'>
                <el-icon color='#fff'>
                  <el-icon-edit />
                </el-icon>
              </div>
              <div class='w-full pl-3 pr-3 font-black text-sm text-center truncate'>其它建议</div>
            </div>
          </div>
        </div>
        <div class='bf-card mb-2'>
          <el-card shadow='hover'>
            <template #header>
              <div class='card-header flex justify-between items-center'>
                <div class='card-header-title'>
                  常用工具
                </div>
                <div class='card-header-content'>
                  <div class='cursor-pointer mt-1 mr-3 text-2xl'>
                    <el-icon color='#888'>
                      <el-icon-setting />
                    </el-icon>
                  </div>
                </div>
              </div>
            </template>
            <div class='flex flex-wrap p-2'>
              <div v-for='o in 7' :key='o' class='p-1 w-1/4 cursor-pointer'>
                <div class='flex items-center justify-center bg-blue-300 h-12 rounded text-2xl mb-1'>
                  <el-icon color='#fff'>
                    <el-icon-guide />
                  </el-icon>
                </div>
                <div class='text-xs text-center text-gray-500'>发起公告</div>
              </div>
            </div>
          </el-card>
        </div>
        <div class='bf-card mb-2'>
          <el-card shadow='hover'>
            <template #header>
              <div class='card-header flex justify-between items-center'>
                <div class='card-header-title truncate'>
                  绩效排行榜
                </div>
                <div class='card-header-content'>
                  <ul class='card-header-navi'>
                    <li class='truncate'>招聘排行</li>
                    <li class='truncate'>入职排行</li>
                    <li class='truncate'>离职排行</li>
                  </ul>
                </div>
              </div>
            </template>
            <div class='flex flex-col p-2 h-96'>
              <div class='flex justify-between items-center text-center text-1xl mb-1'>
                <div class='w-1/5 p-1 font-black text-blue-500'>排名</div>
                <div class='w-2/5 p-1 font-black text-blue-500'>事业部</div>
                <div class='w-2/5 p-1 font-black text-blue-500'>培训专员</div>
              </div>
              <div v-for='o in 10' :key='o' class='flex justify-between items-center text-center text-1xl'>
                <div class='w-1/5 p-1'>
                  <div class='inline-block bg-blue-100 w-6 h-6 rounded'>
                    <span class='text-sm text-black'>{{ o }}</span>
                  </div>
                </div>
                <div class='w-2/5 p-1 text-gray-600 truncate'>潍坊事业部</div>
                <div class='w-2/5 p-1 text-gray-600'>张一三</div>
              </div>
            </div>
          </el-card>
        </div>

        <div class='bf-card mb-2'>
          <div class='rounded-lg bg-gradient-to-b from-blue-300 to-blue-50'>
            <div class='p-3 pb-0'>
              <div class='inline-block text-2xl mr-2'>
                <svg-icon icon-class='svg-hr-home-jianbei' />
              </div>
              <span class='text-2xl font-black mr-3'>个人素养展示区</span>
              <el-button type='text'>查看详情</el-button>
            </div>
            <div class='grid gap-3 grid-cols-2 p-3'>
              <div class='p-1 text-center'>
                <div class='inline-block text-8xl relative'>
                  <svg-icon icon-class='svg-hr-home-jinpai' />
                  <div class='absolute left-4 right-4 bottom-1 rounded-full overflow-hidden border-2 border-solid border-white'><img
                      src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'></div>
                </div>
                <div class='text-sm text-gray-700'>第一名：张铁锤</div>
              </div>
              <div class='mt-9 p-1 text-center'>
                <div class='inline-block text-6xl'>
                  <svg-icon icon-class='svg-hr-home-zanmei' />
                </div>
                <div class='text-sm text-gray-700'>获赞：10个</div>
              </div>
            </div>
          </div>
        </div>

      </el-col>

    </el-row>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
// import Chart from '/@/views/Dashboard/Workplace/_Components/Chart.vue'
// import List from '/@/views/Dashboard/Workplace/_Components/List.vue'
import Clock from '/@/views/Dashboard/Workplace/_Components/Clock.vue'

export default defineComponent({
  name: 'SaleIndex',
  components: {
    Clock
  },
  setup() {
    const activeName = ref('first')
    const CumSelectType = ref([
      { Name: '日', Type: 0, select: 1 },
      { Name: '周', Type: 0, select: 0 },
      { Name: '月', Type: 0, select: 0 },
      { Name: '季', Type: 0, select: 0 },
      { Name: '年', Type: 0, select: 0 }
    ])
    const { getUserInfo, getUser } = useLayoutStore()
    const kaoqinValue = ref('今日')
    const onGetUser = async () => {
      await getUser()
    }
    return {
      activeName,
      CumSelectType,
      user: getUserInfo,
      onGetUser,
      kaoqinValue
    }
  }
})
</script>
<style type="postcss" scoped>
.home-content {
  .home-bannder {
    background: url(../../../assets/img/sale/home/SaleIndexTop.png) repeat-x
      left top;
    background-size: 100% 100%;
  }
  .home-cusranking {
    background: url(../../../assets/img/sale/home/homecusranking.png) repeat-x
      left top;
    background-size: 100% 100%;
  }
  .home-cusdr {
    background: url(../../../assets/img/sale/home/cusdr.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .home-bjdr {
    background: url(../../../assets/img/sale/home/bjdr.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .hom_pt {
    background: url(../../../assets/img/sale/home/pt.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .hom_ptsl {
    background: url(../../../assets/img/sale/home/ptsl.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .hom_xm {
    background: url(../../../assets/img/sale/home/xm.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .hom_xmsl {
    background: url(../../../assets/img/sale/home/xmsl.png) repeat-x left top;
    background-size: 100% 100%;
  }
}
</style>