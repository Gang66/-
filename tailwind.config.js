module.exports = {
    // important: 'body',
    content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        
        extend: {
            backgroundImage:{
                'longin-bg':'url(\'/@/assets/img/login/longin_bg.jpg\')'
            },
            width: {
                1500:'1500px',
                1300:'1300px',
                1160:'1160px',
                1200:'1200px',
                1150:'1150px',
                1140:'1140px',
                1070:'1070px',
                1000:'1000px',
                900:'900px',
                950:'950px',
                940:'940px',
                800:'800px',
                810:'810px',
                820:'820px',
                830:'830px',
                840:'840px',
                850:'850px',
                880:'880px',
                700: '700px',
                740: '740px',
                760: '760px',
                600:'600px',
                650:'650px',
                660:'660px',
                500:'500px',
                520:'520px',
                540:'540px',
                400:'400px',
                450:'450px',
                460:'460px',
                480:'480px',
                360:'360px',
         
            },
            height:{
                1200:'1200px',
                800:'800px',
                350: '350px',
                150: '150px'
            },
            colors: {
                blue: {
                    light: '#76D2FF',
                    dark:'#6373c1',
                    bg:'#9AC8E3',
                    but:'#409eff',
                    bgc:'#E5F5FF'
                },
                yellow: {
                    light: '#FFA319',
                    bg: '#E6D6B2'
                },
                red: {
                    light: '#DB0C0C'
                },
                green: {
                    light: '#07C160'
                }
            }

        }
    },
    variants: {},
    plugins: []
}