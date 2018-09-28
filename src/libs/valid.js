// 各种验证方法


let valid = {

};
// 身份证号验证
valid.checkID = function (ID) {
  if(!/^\d{17}(\d|x)$/i.test(ID)) return false;
  return true
}
// valid.checkID = function (ID) {
//   if (typeof ID !== 'string') return false;
//   let city = {
//     11: "北京",
//     12: "天津",
//     13: "河北",
//     14: "山西",
//     15: "内蒙古",
//     21: "辽宁",
//     22: "吉林",
//     23: "黑龙江 ",
//     31: "上海",
//     32: "江苏",
//     33: "浙江",
//     34: "安徽",
//     35: "福建",
//     36: "江西",
//     37: "山东",
//     41: "河南",
//     42: "湖北 ",
//     43: "湖南",
//     44: "广东",
//     45: "广西",
//     46: "海南",
//     50: "重庆",
//     51: "四川",
//     52: "贵州",
//     53: "云南",
//     54: "西藏 ",
//     61: "陕西",
//     62: "甘肃",
//     63: "青海",
//     64: "宁夏",
//     65: "新疆",
//     71: "台湾",
//     81: "香港",
//     82: "澳门",
//     91: "国外"
//   };
//   var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
//   var d = new Date(birthday);
//   var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
//   var currentTime = new Date().getTime();
//   var time = d.getTime();
//   var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
//   var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
//   var sum = 0,
//     i, residue;

//   if (!/^\d{17}(\d|x)$/i.test(ID)) return false;
//   if (city[ID.substr(0, 2)] === undefined) return false;
//   if (time >= currentTime || birthday !== newBirthday) return false;
//   for (i = 0; i < 17; i++) {
//     sum += ID.substr(i, 1) * arrInt[i];
//   }
//   residue = arrCh[sum % 11];
//   if (residue !== ID.substr(17, 1)) return false;
//   console.log(city[ID.substr(0, 2)] + "," + birthday + "," + (ID.substr(16, 1) % 2 ? " 男" : "女"))
//   return true
// }

valid.isPhone = function (str) {
  let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (reg.test(str)) {
    console.log('手机号码格式输入正确');
    return true;
  } else {
    console.log('请输入正确格式的手机号码');
    return false;
  }
}
valid.isPassword = function (str) {
  // let reg = /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  let reg = /^[a-zA-Z0-9]{6,16}$/
  if (reg.test(str)) {
    return true
  } else {
    return false
  }
}

valid.isName = function (str) {
  let reg =/^[\u4e00-\u9fa5]{2,4}$/;
  if(reg.test(str)){
    return true;
  }else{
    return false
  }
}





export default valid