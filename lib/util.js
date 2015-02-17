var util = module.exports;

util.windDirectionCss = function(code) {
  var s = code.length == 3 ? code.substring(1) : code;
  return "wind-img wind-img-" + s;
};
