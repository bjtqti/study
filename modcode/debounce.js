function debounce(func, wait){
  var timeID = null;
  return function(){
    // 首先是清空定时器
    clearTimeout(timeID);
    // 延迟 wait ms后执行真正的事件处理函数
    timeID = setTimeOut(func, wait);
  }
}
function hanlder(){
  console.log('Hanlde the scroll event.');
}
window.addEventListener('scroll', debounce(hanlder, 400));


var throttle = function (func, wait){
  var timeout,
      context,
      args,
      startTime = Date.parse(new Date());
  
  return function(){
    var curTime = Date.parse(new Date());
    var remaining = wait - (curTime - startTime);
    context = this;
    args = arguments;
    
    clearTimeout(timeout);
    
    if(remaining <= 0){
      func.apply(context, args);
      startTime = Date.parse(new Date());
    }else{
      timeout = setTimeout(func, remaining);
    }
  }
};