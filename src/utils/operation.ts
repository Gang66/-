//根据常规性判断是否是常规类 0是常规类 1是非常规类
export function BlRoutineType(val:any){
  var type=1;
  if (val == '常规常用' || val == '常规非常用') {
    type=0
  } 
  return type;
}


  /*-------------------------------
      一下是精准计算 乘法、加法、减法、除法
    --------------------------------*/

export function _numbersAfterPoint (arg:any) {
    try {
      return arg.toString().split(".")[1].length;
    } catch (e) {
      return 0;
    }
  }; 
  //高精度数据的乘法运算
  export function accMul (arg1:any, arg2:any) {
    var m = 0;
    if(arg1 == null || arg1 == '') {
      arg1 = 0
    }
    if(arg2 == null || arg2 == '') {
      arg2 = 0
    }
    m += _numbersAfterPoint(arg1);
    m += _numbersAfterPoint(arg2);
    var r1 = Number(arg1.toString().replace(".", ""));
    var r2 = Number(arg2.toString().replace(".", ""));
    return r1 * r2 / Math.pow(10, m);
  };
  //高精度数据的加法运算
  export function accAdd (arg1:any, arg2:any) {
    var t1 = _numbersAfterPoint(arg1);
    var t2 = _numbersAfterPoint(arg2);
    var m = Math.pow(10, Math.max(t1, t2));
    return (arg1 * m + arg2 * m) / m;
  };
  //高精度数据的减法运算
  export function  accSub (arg1:any, arg2:any) {
    var t1 = _numbersAfterPoint(arg1);
    var t2 = _numbersAfterPoint(arg2);
    var m = Math.pow(10, Math.max(t1, t2));
    var n = (t1 >= t2) ? t1 : t2;
    return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
  };
  //高精度数据的除法运算
  export function accDiv (arg1:any, arg2:any) {
    var t1 = _numbersAfterPoint(arg1);
    var t2 = _numbersAfterPoint(arg2);
    var r1 = Number(arg1.toString().replace(".", ""));
    var r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  }