mini-require
===========

简化版的前端模块化框架(II)

-------
说明：
   移除了模块的url加载处理
   简化了模块的调用

用法
-------

定义一个模块
>define(id,factory);
id : 模块名 ，如 'core';
factory : 回调函数，即这个模块要实现的功能

```javascript 

//demo1:
定义一个空的模块 , 没有任何意思。
define('test');

//demo2:

/**
 * 定义一个标准的模块,取名为core
 */
define('core',function(require, exports, module){
 	//console.log(require,exports,module);

 	// 下面两种返回值的方法是等效的:
 	// export:1
 	module.exports = {
 		name :'core'
 	}

 	// export:2
 	//exports.name = 'core'

 	// 默认返回的是{}

 	// return 的值会被忽略
});

```

调用一个模块
>require(id);
id  : 之前用define定义的模块名


```javascript 
//demo3:
// 调用test模块将返回 undefined
var a = require('test');

//console.log(a); // return undefined;

//demo4:
//调用core模块,返回module.exports定义的内容
var b = require('core');
//console.log(b);

//综合应用
//demo5:

/**
 *  定义一个有依赖的模块
 */

define('init',function(require,exports,module){
	//依赖core
	var core = require('core');
	//下面就可以使用core模块了
	console.log(core.name);
})


```
调用init模块
>require('init');
 

优点：
-------
1. 就是奔着模块化去的
2. 追求的就是简单易用
3. 最大限度的适应规范

License
-------

This work is licensed under the [MIT License](LICENSE).
