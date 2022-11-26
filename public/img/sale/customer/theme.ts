import { ITheme,ISaleDialog } from '/@/type/config/theme'
import { useLayoutStore } from '/@/store/modules/layout'

export const salerDialog:()=>ISaleDialog[]=()=>{
    return [
        {
            diaogBg:'linear-gradient(180deg, #E6F6FF 0%, #FEFEFF 100%)',
            diaogTitle:'#0B2564',
            diaogTop:'url(/img/sale/customer/contact_top.png)' ,
            diaogBottom:'url(/img/sale/customer/contact_bottom.png)',
            cardHeaderdLeft:'#027AFF',
            cardHeaderdRight:'linear-gradient(81deg, #E7F6FF 0%, #FFFFFF 100%)',
            cardFontColor:'#FFFFFF',
            cardBut:'#027AFF',
            cardButHover:'rgba(2, 122, 255, 0.7)'
        },{
            diaogBg:'linear-gradient(180deg, #EED7C0 0%, #FFFEFE 100%)',
            diaogTitle:'#8E5635',
            diaogTop:'url(/img/sale/customer/contact_top1.png)' ,
            diaogBottom:'url(/img/sale/customer/contact_bottom1.png)',
            cardHeaderdLeft:'#8E5635',
            cardHeaderdRight:'linear-gradient(81deg, #F5E7DA 0%, #FFFFFF 100%)',
            cardFontColor:'#FFFFFF',
            cardBut:'#8E5635',
            cardButHover:'rgba(142, 86, 53, 0.7)'
        },{
            diaogBg:'linear-gradient(180deg, #D7D8FF 0%, #E2E3FF 35%, #EFF0FF 70%, #FFFFFF 100%)',
            diaogTitle:'#0B2564',
            diaogTop:'url(/img/sale/customer/contact_top2.png)' ,
            diaogBottom:'url(/img/sale/customer/contact_bottom2.png)',
            cardHeaderdLeft:'#AFB1FF',
            cardHeaderdRight:'#E4E5FF',
            cardFontColor:'#FFFFFF',
            cardBut:'#4A4CAB',
            cardButHover:'rgba(74, 76, 171, 0.7)'
        },
    ]

}
  
const theme:() => ITheme[] = () => {
    const { color } = useLayoutStore().getSetting
    return [
        {
            tagsActiveColor: '#fff',
            tagsActiveBg: color.primary,
            navbarColor: '#243AA0',
            navbarBg: '#fff',
            mainBg: '#f0f2f5',
            sidebarColor: '#fff',
            sidebarBg: '#4372E3',
            sidebarChildrenBg: '#3C59D6',
            sidebarActiveColor: '#fff',
            sidebarActiveBg: color.primary,
            sidebarActiveBorderRightBG: '#243AA0'
        },
        {
            tagsActiveColor: '#fff',
            tagsActiveBg: color.primary,
            navbarColor: '#fff',
            navbarBg: '#393D49',
            mainBg: '#f0f2f5',
            sidebarColor: '#fff',
            sidebarBg: '#001529',
            sidebarChildrenBg: '#000c17',
            sidebarActiveColor: '#fff',
            sidebarActiveBg: color.primary,
            sidebarActiveBorderRightBG: '#1890ff'
        },
        {
            tagsActiveColor: '#fff',
            tagsActiveBg: color.primary,
            mainBg: '#f0f2f5',
            sidebarColor: '#333',
            sidebarBg: '#fff',
            sidebarChildrenBg: '#fff',
            sidebarActiveColor: color.primary,
            sidebarActiveBg: '#e6f7ff',
            sidebarActiveBorderRightBG: color.primary
        },
        {
            logoColor: 'rgba(255,255,255,.7)',
            logoBg: '#50314F',
            tagsColor: '#333',
            tagsBg: '#fff',
            tagsActiveColor: '#fff',
            tagsActiveBg: '#7A4D7B',
            mainBg: '#f0f2f5',
            sidebarColor: 'rgba(255,255,255,.7)',
            sidebarBg: '#50314F',
            sidebarChildrenBg: '#382237',
            sidebarActiveColor: '#fff',
            sidebarActiveBg: '#7A4D7B',
            sidebarActiveBorderRightBG: '#7A4D7B'
        },
        {
            logoColor: 'rgba(255,255,255,.7)',
            logoBg: '#50314F',
            navbarColor: 'rgba(255,255,255,.7)',
            navbarBg: '#50314F',
            tagsColor: '#333',
            tagsBg: '#fff',
            tagsActiveColor: '#fff',
            tagsActiveBg: '#7A4D7B',
            mainBg: '#f0f2f5',
            sidebarColor: 'rgba(255,255,255,.7)',
            sidebarBg: '#50314F',
            sidebarChildrenBg: '#382237',
            sidebarActiveColor: '#fff',
            sidebarActiveBg: '#7A4D7B',
            sidebarActiveBorderRightBG: '#7A4D7B'
        }
    ]
}

export default theme
