$('body').css('background', '#eee')
var tooltip = require('@/plugin/tooltip');

function a(){
    location.href="";
} 

tooltip({
    dom: 'tooltip',
    tips: 'rel', 
    reqPath: { 
        found: false,
        regexp: /^.*\.jpg$/,
        dir: '../../view/index/img/'
    },
    loading: 'static/img/loading.gif'
});        