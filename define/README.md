mini-define
===========

简易的前端模块化框架

用法
-------
首先定义模块

<b>定义模块</b>
<br>
####一：定义模块用define函数

	1.1 根据是否有依赖,有两种情况：

	1.1.1：没有依赖的模块
```javascript
		define('id',function(){
			// put your code here
		});
```
	1.1.2：有依赖的模块
```javascript
		define('id',['modeA','modeB'],function(A,B){
			// put your code here
		});
```
	1.2 根据是否需要返回处理结果给外部使用，又可以分两种情况：

	1.2.1有返回对象：
```javascript
			define('id',function(){
				return {
					// put your code here
				}
			});
```
	1.2.2 没有返回对象
```javascript
			define('id',function(){
				// put your code here
			});
```
####二： 调用模块用require()函数

	2.1 根据请求的模块数，可以有两情况：

		2.1.1.调用单个模块

			require('modeId')

		2.1.2.调用多个模块
```javascript
			require(['modeA','modeB']);
```
	2.2 根据是否有回调处理，又可以分为两种情况：
		
		2.2.1 有回调处理函数
```javascript		
			require('modeId',function(mode){
				//put your code here
			});

			require(['modeA','modeB'],function(A,B){
				//put your code here
			});
```
		2.2.2 没有回调处理
```javascript
			require('modeId');
```
然后在index.html页面依次引用所需模块

	<!--核心模块-->
    <script src="lib/core/require.js"></script>
    <!--用于演示的模块-->
    <script src="lib/main.js"></script>
    <script src="lib/config.js"></script>
    <script src="lib/init.js"></script>

最后就是用你喜欢的方式对lib目录进行合并压缩，生成一个min.js文件。
在发布应用的时候，相应的index.html也需要调整一下：

	<script src="lib/min.js"></script>

优点：
-------
1. 相对于seajs.js或原版的require.js来说，加注释才一百来行的代码用轻量来形容都显胖，完全是骨感。
2. 完全没有什么高深的内容，也没有复杂的技巧，几乎是零学习成本。
3. 其它

License
-------

This work is licensed under the [MIT License](LICENSE).
