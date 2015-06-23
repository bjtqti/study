/**
 * js代码的模块化管理工具
 * @date 2015.3.23
 * @author frog
 * @email 278500368@qq.com
 */
;
(function(r) {
	if (typeof module === "object" && typeof require === "function") {
		module.exports.require = r.require;
		module.exports.define = r.define;
	} else {
		require = r.require;
		define = r.define;
	}
})(function() {

	var objtoString = Object.prototype.toString,
		nativeForEach = Array.prototype.forEach,
		modules = {},
		pushStack = {};


	function isFunction(it) {
		return objtoString.call(it) === '[object Function]';
	}

	function isArray(it) {
		return objtoString.call(it) === '[object Array]';
	}

	function each(obj, callback, context) {
		if (!isArray(obj)) return;
		//如果支持forEach方法
		if (nativeForEach) {
			obj.forEach(callback, context);
		} else {
			//for循环迭代
			for (var i = 0, l = obj.length; i < l; i++) {
				if (callback.call(context, obj[i], i, obj) === 'break') break;
			}
		}
	}

	/**
	 * 解析依赖关系
	 * @param {array} deps 依赖模块
	 * @return {array} 
	 */
	function parseDeps(deps) {
		var exports = [];
		each(deps, function(id) {
			if (!modules[id]) {
				throw "module " + id + " not found";
			}
			exports.push(build(modules[id]))
		})
		return exports;
	}

	/**
	 * 解析模块
	 * @param {object} module 模块对象
	 * @param {object} module.exptort 模块返回的内容
	 */
	function build(module) {
		var depsList, existMod,
			factory = module['factory'],
			id = module['id'];

		if (existMod = pushStack[id]) { //去重复执行
			return existMod;
		}

		//将数据或方法暴露给外部调用。
		module.exports = {};

		//防止重复解析
		delete module.factory;

		if (module['deps']) {
			//依赖数组列表
			depsList = parseDeps(module.deps);
			module.exports = factory.apply(module, depsList);
		} else {
			// exports 支持直接 return 或 modulejs.exports 方式
			module.exports = factory(exp.require, module.exports, module) || module.exports;
		}

		pushStack[id] = module.exports;

		return module.exports;
	}

	//接口
	var exp = {
		/**
		 * 调用一个或多个模块
		 * @param {mixed} id 模块名
		 * @param {function} callback 回调函数
		 * @return {mixed}
		 */
		require: function(id, callback) {
			var exports;
			 
			if(isArray(id)){
				// require(['a','b',...],callback);
				exports = parseDeps(id);
			}else{
				// requireC('a',callback);
				exports = build(modules[id]);
			}
			 
			if (callback && isFunction(callback)) {
				callback.apply(null, exports);
			}

			return exports;
		},

		/**
		 * 定义模块
		 * @param {string} id 模块名
		 * @param {array} deps 依赖列表
		 * @param {function} factory 模块功能函数
		 */
		define: function(id, deps, factory) {
			if (modules[id]) {
				throw "module " + id + " 模块已存在!";
			}
			//存在依赖模块
			if (arguments.length > 2) {
				modules[id] = {
					id: id,
					deps: deps,
					factory: factory
				}
			} else {
				factory = deps;
				modules[id] = {
					id: id,
					factory: factory
				}
			}
		}
	}

	return exp;
}());
