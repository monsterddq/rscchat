const host = `http://localhost:50003`;
const RegEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function d(a){this.message=a}function e(a){var b=String(a).replace(/=+$/,"");if(b.length%4==1)throw new d("'atob' failed: The string to be decoded is not correctly encoded.");for(var c,e,g=0,h=0,i="";e=b.charAt(h++);~e&&(c=g%4?64*c+e:e,g++%4)?i+=String.fromCharCode(255&c>>(-2*g&6)):0)e=f.indexOf(e);return i}var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";d.prototype=new Error,d.prototype.name="InvalidCharacterError",b.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||e},{}],2:[function(a,b,c){function d(a){return decodeURIComponent(e(a).replace(/(.)/g,function(a,b){var c=b.charCodeAt(0).toString(16).toUpperCase();return c.length<2&&(c="0"+c),"%"+c}))}var e=a("./atob");b.exports=function(a){var b=a.replace(/-/g,"+").replace(/_/g,"/");switch(b.length%4){case 0:break;case 2:b+="==";break;case 3:b+="=";break;default:throw"Illegal base64url string!"}try{return d(b)}catch(c){return e(b)}}},{"./atob":1}],3:[function(a,b,c){"use strict";function d(a){this.message=a}var e=a("./base64_url_decode");d.prototype=new Error,d.prototype.name="InvalidTokenError",b.exports=function(a,b){if("string"!=typeof a)throw new d("Invalid token specified");b=b||{};var c=b.header===!0?0:1;try{return JSON.parse(e(a.split(".")[c]))}catch(f){throw new d("Invalid token specified: "+f.message)}},b.exports.InvalidTokenError=d},{"./base64_url_decode":2}],4:[function(a,b,c){(function(b){var c=a("./lib/index");"function"==typeof b.window.define&&b.window.define.amd?b.window.define("jwt_decode",function(){return c}):b.window&&(b.window.jwt_decode=c)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/index":3}]},{},[4]);
let tempUser = [];
if(localStorage.getItem('bear')){
  let decode = jwt_decode(localStorage.getItem('bear'));
  tempUser = Object.values(decode);
}
var User = {
  UserName: tempUser[0] || "",
  FullName: tempUser[1] || "",
  Phone: tempUser[2] || "",
  Email: tempUser[3] || "",
  Avatar: tempUser[4] || "",
  Role: tempUser[5] || ""
}
var link = {
  "post_room" : "/api/room"
}
if(!localStorage.getItem('language'))
  localStorage.setItem('language','vi');
alertify.set('notifier','position', 'bottom-left');
 alertify.prompt().setting('transition', 'zoom');
function notify(obj){
  switch(obj){
    case "fullname":
      return localStorage.getItem('language') === "vi" ? "Tên không được bỏ trống" : "FullName is not empty";
    case "email":
      return localStorage.getItem('language') === "vi" ? "Email không hợp lệ" : "Email is invalid";
    case "200":
    case 200:
      return localStorage.getItem('language') === "vi" ? "Thành công" : "Success";
    case 401:
    case "401":
      return localStorage.getItem('language') === "vi" ? "Bạn không đủ quyền để truy cập địa chỉ này" : "You don't unauthenticated to access this page.";
    case "login":
      return localStorage.getItem('language') === "vi" ? "Tên đăng nhập hoặc mật khẩu sai" : "UserName or Password is not match.";
    case "1":
    case 1:
      return localStorage.getItem('language') === "vi" ? "Dữ liệu bị trùng lặp" : "Duplicate data";
    case "2":
    case 2:
      return localStorage.getItem('language') === "vi" ? "Dữ liệu không đúng định dạng" : "Invalid data";
    case "errorcreateroom":
      return localStorage.getItem('language') === "vi" ? "Xảy ra lỗi khi tạo phòng" : "Create chat room faild.";
    case "notfoudnusername":
      return localStorage.getItem('language') === "vi" ? "Không tìm thấy UserName" : "Not found UserName";
    case "errorImage":
      return localStorage.getItem('language') === "vi" ? "Ảnh không đúng định dạng hoặc quá lớn" : "Image is incorrect or too large.";
    default:
      return localStorage.getItem('language') === "vi" ? "Các trường không được bỏ trống" : "Fields is not empty";
  }
}
function notifyResult(obj){
  switch(obj.item1){
    case 200:
      alertify.success(notify(200));
      break;
    case 1:
      alertify.error(notify(1));
      break;
    case 2:
      alertify.error(notify(2));
      break;
    case 401:
      alertify.warning(notify(401));
      break;
    default:
      break;
  }
}
function getParameterURL(a){
    let c = [];
    let b = window.location.search.substring(1).split('&');
    b.forEach(w => c.push({ "key": w.split('=')[0], "value": w.split('=')[1] }));
    return c.find(w => w.key === a);
}
function ajaxPromise(url="", method="GET",data={}) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: method,
            url: `${host}${url}` ,
            data:data,
            crossDomain: true,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('bear')}`
            },
            success: function (data,status,xhr) {
                resolve(data,status,xhr);
            },
            error: function (result,status,xhr) {
              if(xhr==="Unauthorized"){
                notifyResult(401);
                localStorage.removeItem('bear');
                setTimeout(function(){
                  window.location.href="login.html";
                },1000);
              }
                reject(status,xhr);
            }
        });
    });
}
function toggleMenu(){
  $("body").off('click').on('click', () => {
    $("aside").animate({left: "-200px"}, 300);
    $(".menu-left").off('click').on('click', () => {
      $("aside").animate({left: "0px"}, 300);
      toggleMenu();
    });
  });
}
function getTypeString(a){
    switch (a) {
      case 1:
      case "manager":
        return "Giám đốc";
      case 2:
      case "technical":
        return "Kỹ thuật";
      case 3:
      case "advisory":
        return "Tư vấn";
      default:
        return "";
    }
}
function convertTime(a){
  //2017-12-08T05:18:16.627Z
  if(!a) return "";
  let time = new Date(a);
  return IsDayNow(time) ? `${formatTime(time.getHours())}:${formatTime(time.getMinutes())}`
      : `${formatTime(time.getHours())}:${formatTime(time.getMinutes())} ${formatTime(time.getDate())}-${formatTime(time.getMonth())}-${time.getFullYear()}`;
}
function formatTime(a) {
  return a<10 ? `0${a}` : a;
}
function IsDayNow(a){
  let b = new Date();
  return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
}
File.prototype.toBase64 = function(callback) {
    var FR= new FileReader();
    FR.addEventListener("load", function(e) {
      // e.target.result
      callback(e.target.result);
    });
    FR.readAsDataURL(this);
};
$(document).ready(function() {
  //toggleMenu();
});
