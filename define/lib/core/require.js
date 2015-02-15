/**
 * 模块化编程简易框架
 */
;(function() {
	//存放所有声明过的模块
	var modules  = {};
	//存放已解析的模块
	var dn = {}

	/**
	 * 判断是否为一个数组
	 */
	function isArray(arr){
		return Object.prototype.toString.call(arr) === '[object Array]';
	}

	/*
	 * 解析请求的模块
	 * @param {array} ids 模块id
	 * @param {function} callback 回调 
	 */
	function makeRequire(ids, callback) {
		var r = ids.length,
			shim = [];

		ids.forEach(function(name,i) {
			shim[i] = build(modules[name])
		})

		if (callback) {
			callback.apply(null,shim);
		} else {
			shim = null;
		}
	}

	/**
	 *解析依赖关系
	 * @param {object} module 模块对象
	 * @return {array} 一个由所有依赖模块所返的对象所组成的数组
	 */
	function parseDeps(module) {
		var deps = module['deps'],
			temp = [];
		deps.forEach(function(id, index) {
			temp.push(build(modules[id]))
		})
		return temp;
	}

	/**
	 * 返回模块中定义的对象
	 * @param {object} module 定义的模块
	 * @return 模块返回的对象
	 */
	function build(module){
		var factory = module['factory'],
			id = module['id'];
			exist = dn[id];

		if(exist){
			return exist;
		}

		var depsList,exports;

		if(module['deps']){
			depsList = parseDeps(module);
			exports = factory.apply(module, depsList);
		}else{
			exports = factory() || {};
		}

		dn[id] = exports;
		return exports;
	}

	/**
	 * 导入模块
	 * @param {id} id 模块ID
	 * @param {function} callback 回调函数
	 * @return {object} 
	 */
	function require(id,callback){
		if(isArray(id)){
			return makeRequire(id,callback);
		}

		if (!modules[id]) {
			throw "module " + id + " 模块不存在!";
		}

		if(callback){
			var module = build(modules[id]); 
			callback(module);
		}else{
			if(modules[id].factory){
				return build(modules[id]);
			}
		}
	}

	/**
	 * 定义一个模块
	 * @param {string} id   模块ID
	 * @param {array}  deps 依赖列表
	 * @param {function} factory 模块方法
	 */
	function define(id,deps,factory){
		if(modules[id]){
			throw "module " + id + " 模块已存在!";
		}

		//如果有依赖
		if(arguments.length > 2){
			modules[id] = {
				id : id,
				deps : deps,
				factory : factory
			}
		}else{
			modules[id] = {
				id : id,
				factory : deps
			}
		}
	}

	window.require = require;
	window.define = define;

})();