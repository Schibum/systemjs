// SystemJS Loader Class and Extension helpers

function SystemJSLoader(options) {
  SystemLoader.call(this, options);

  systemJSConstructor.call(this, options);
}

// inline Object.create-style class extension
function SystemProto() {};
SystemProto.prototype = SystemLoader.prototype;
SystemJSLoader.prototype = new SystemProto();

var systemJSConstructor;

function hook(name, hook) {
  if (SystemJSLoader.prototype[name])
    SystemJSLoader.prototype[name] = hook(SystemJSLoader.prototype[name]);
}
function hookConstructor(hook) {
  systemJSConstructor = hook(systemJSConstructor || function() {});
}

function dedupe(deps) {
  var newDeps = [];
  for (var i = 0, l = deps.length; i < l; i++)
    if (indexOf.call(newDeps, deps[i]) == -1)
      newDeps.push(deps[i])
  return newDeps;
}

// if a module only has a default export, then take that as the module value
function checkGetDefault(module) {
  if (module && module.__useDefault)
    return module['default'];
  for (var p in module) {
    if (p != 'default')
      return module;
  }
  return 'default' in module ? module['default'] : module;
}