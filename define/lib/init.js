//demo
//定义初始化模块，本模块对config模块有依赖
//返回处理结果
define('init',['config'],function(c){
    return {
        status : 'init',
        name   : c.name
    }
});