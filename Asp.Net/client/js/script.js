var host = `http://localhost:50487`;
var RegEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var User = {
  Name: "",
  Email: "",
  Avatar: "",
  Role: "",
  Phone: ""
}
function getParameterURL(a){
    let c = [];
    let b = window.location.search.substring(1).split('&');
    b.forEach(w => c.push({ "key": w.split('=')[0], "value": w.split('=')[1] }));
    return c.find(w => w.key === a);
}
function ajaxGetPromise(url, a) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: url,
            data:a,
            dataType: "json",
            crossDomain: true,
            headers: getHeaders(),
            success: function (data,textStatus,xhr) {
                resolve(data,textStatus,xhr);
            },
            error: function (textStatus,xhr) {
                reject(textStatus,xhr);
            }
        });
    });
}
function ajaxPostPromise(url, a) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: url,
            data: a,
            crossDomain: true,
            dataType: "json",
            headers: getHeaders(),
            success: function (data,textStatus,xhr) {
                resolve(data,textStatus,xhr);
            },
            error: function (textStatus,xhr) {
                reject(textStatus,xhr);
            }
        });
    });
}
function ajaxPutPromise(url, a) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "PUT",
            url: url,
            data: a,
            dataType: "json",
            crossDomain: true,
            headers: getHeaders(),
            success: function (data,textStatus,xhr) {
                resolve(data,textStatus,xhr);
            },
            error: function (textStatus,xhr) {
                reject(textStatus,xhr);
            }
        });
    });
}
function getHeaders() {
  if(localStorage.getItem("token"))  return {'Authorization': localStorage.getItem("token")};
  return {'Authorization': ""};
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
function getUserCurrent() {
  return new Promise(function(resolve, reject) {
    ajaxGetPromise(`${host}/api/users`)
    .then((data,textStatus,xhr) => {
      data = JSON.parse(data);
      User.Name = data[3].Value;
      User.Email = data[0].Value;
      User.Avatar = data[2].Value;
      User.Role = data[1].Value;
      User.Phone = data[4].Value;
      console.log(data);
      $(".menu-profile").next("p").html(data[3].Value);
    },(a,b)=>{
      if(a.status===401)
        window.location.href="login.html";
    })
    .then(() => {
      resolve();
    },()=>{
      reject();
    })
  });
}
function getTypeString(a){
    switch (a) {
      case 0: return "Hỗ trợ chung";
      case 1: return "Kỹ thuật";
      default: return "Mua bán";
    }
}
$(document).ready(function() {
  console.log(getHeaders());
  console.log(User);
  $.ajaxSetup({
    headers: getHeaders()
  });
  toggleMenu();
  $(`button.submit-register`).on('click', () => {
    let data = {
      FullName: $(`input[name=fullname]`).val(),
      UserName: $(`input[name=email]`).val(),
      Password: $(`input[name=password]`).val()
    };
    if(RegEmail.test(data.UserName) && data.Password && data.Password.length>=6){
      ajaxPutPromise(`${host}/api/token/register`,data)
      .then((a) => {
        switch (a) {
          case true:
            alert("Đăng ký thành công");
            window.location.href = "login.html";
            break;
          case false:
            alert("Dữ liệu bị trùng lặp");
            break;
          default:
            console.log(a);
            alert("Xảy ra lỗi khi đăng ký");
            break;
        }
      },(a)=>{
          console.log(a);
      });
    }
    else alert("Dữ liệu không đúng định dạng.Mật khẩu phải lớn hơn 6 ký tự");
    return false;
  })
  $(`button.submit-login`).off(`click`).on(`click`,()=>{
    let data = {
      UserName: $(`input[name=email]`).val(),
      Password: $(`input[name=password]`).val()
    }
    if(RegEmail.test(data.UserName) && data.Password.length>=6){
      ajaxPostPromise(`${host}/api/token`,data)
      .then((a) => {
        if(!a) alert("Thông tin tài khoản sai.");
        else {
          window.location.href = "main.html";
          localStorage.setItem("token",`Bearer ${a}`);
        }
      })
    }
    else alert("Dữ liệu không hợp lệ");
    return false;
  })
  $(`button.submit-forgot-password`).on('click', () => {
    let data = {
       Name: $(`input[name=email]`).val()
     }
    if(RegEmail.test(data.Name)){
      ajaxGetPromise(`${host}/api/token`, data )
      .then((a) => {
        if(a) alert(`Kiểm tra email để lấy lại mật khẩu`);
        else alert(`Không tìm thấy tài khoản với email của bạn`);
      })
    }
    else alert("Dữ liệu không đúng");
    return false;
  })
  switch (window.location.pathname) {
    case "/main.html":
      getUserCurrent().then(() => {
        if(User.Role==0) window.location.href="list-room.html";
        $(".new-room").on('click',function(e) {
          e.preventDefault();
          let type;
          switch ($(this).attr('ref')) {
            case "tech":
              type=0;
              break;
            case "gen":
              type=1;
              break;
            default:
              type=2;
              break;
          }
          let data ={
            Type: type,
            Email: User.Email
          }
          $.post(`${host}/api/rooms`, data, function(data, textStatus, xhr) {
            if(data) window.location.href= `room.html?type=${data.RoomId}`;
            else alert();
          });
          return false;
        });
      })
      break;
    case "/room.html":
      getUserCurrent().then(() => {
        ajaxGetPromise(`${host}/api/message`,{id: getParameterURL("type").value})
        .then((a) => {
          console.log(a);
          a.forEach((v,k)=>{
            let b = v.User.UserName==User.Email ? `<div class="detail-message-right">
                                        <div class="owner">
                                          ${v.Content}
                                        </div>
                                      </div><div class="clearfix"></div>` :
                                      `<div class="detail-message-left">
                                        <div class="other">
                                          ${v.Content}
                                        </div>
                                      </div>`;
            $('.list-message').append(b);
          })
          $(".room-name span").html(`${getTypeString(a[0].Room.Type)} - ${a[0].User.FullName}`);
          $("html, body").animate({ scrollTop: $(document).height() }, 1000);
        })
        var connection = $.hubConnection(`${host}/signalr`, { useDefaultPath: false, qs: `a=${User.Email}&b=${getParameterURL("type").value}`});
        var ChatHubProxy = connection.createHubProxy('chatHub');
        ChatHubProxy.on('addMessage', function(email, message,group) {
            if(group==getParameterURL("type").value)
            {
              let a = email==User.Email ? `<div class="detail-message-right">
                                          <div class="owner">
                                            ${message}
                                          </div>
                                        </div><div class="clearfix"></div>` :
                                        `<div class="detail-message-left">
                                          <div class="other">
                                            ${message}
                                          </div>
                                        </div>`;
              $('.list-message').append(a);
              $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            }
        });
        connection.start().done(function() {
        $('#send').click(function () {
            ChatHubProxy.invoke('sendMessage', User.Email, $('input[name=message]').val(),getParameterURL("type").value);
            $('input[name=message]').val('').focus();
            return false;
          });
        });
      })
      break;
    case "/list-room.html":
      getUserCurrent().then(() => {
        ajaxGetPromise(`${host}/api/rooms`)
        .then((a) => {
          a.forEach((v,k)=>{
            let b = `<div class="col-xs-12 room-detail" id="${v.RoomId}">
                      <div class="col-xs-3">
                        <img src="images/customer.png" alt="" class="img-rounded center-block img-room">
                      </div>
                      <div class="col-xs-9">
                      <a href="room.html?type=${v.RoomId}">
                        <p class="name-group">
                          ${getTypeString(v.Type)}
                          <br/>
                          ${v.Name.substring(v.Name.indexOf('-')+1)}
                        </p>
                        </a>
                      </div>
                    </div>`;
            $(".list-room").append(b);
          })
        })
      })
      break;
    case "/profile.html":
      getUserCurrent()
      .then(() => {
        $(`.profile-avatar img`).attr('src', ${User.Name});
        $(`.profile-name`).html(`<p>Họ và tên: ${User.Name}</p>`);
        $(`.profile-email`).html(`<p>Họ và tên: ${User.Email}</p>`);
        $(`.profile-phone`).html(`<p>Họ và tên: ${User.Phone}</p>`);
      });
      break;
    default:
      break;
  }

});
