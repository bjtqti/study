;
(function() {
	//版本标识
	var VERSION = '3.7.0-dev';
	//导出接口
	var exp = {};

	(function() {
		//收集定义的模块
		var modules = {},
			// Stack of moduleIds currently being built.
			requireStack = [],
			// Map of module ID -> index into requireStack of modules currently being built.
			inProgressModules = {};

		function build(module) {
			var factory = module.factory;
			module.exports = {};
			//避免重复运行
			delete module.factory;
			factory(require, module.exports, module);
			return module.exports;
		}

		function require(id) {

			if (!modules[id]) {
				throw "module " + id + " not found";
			} else if (id in inProgressModules) {
				var cycle = requireStack.slice(inProgressModules[id]).join('->') + '->' + id;
				throw "Cycle in require graph: " + cycle;
			}

			//检测是否循环依赖
			if (modules[id].factory) {
				try {
					inProgressModules[id] = requireStack.length;
					requireStack.push(id);
					return build(modules[id]);
				} finally {
					delete inProgressModules[id];
					requireStack.pop();
				}
			}
 
			return modules[id].exports;
		}

		function define(id, factory) {
			if (modules[id]) {
				throw "module " + id + " already defined";
			}

			modules[id] = {
				id: id,
				factory: factory
			};
		}

		define.remove = function(id) {
			delete modules[id];
		}

		define.moduleMap = modules;

		exp.define = define;
		exp.require = require;
	})();

	//Export for use in node
	if (typeof module === "object" && typeof require === "function") {
		module.exports.require = exp.require;
		module.exports.define = exp.define;
	}else{
	//导出全局接口
		require = exp.require;
		define = exp.define;
	}

})();

