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
function toggleMenu() {
    document.getElementById('body').onclick = function (e) {
        if (e.target !== document.getElementById('aside'))
        {
            if($("#aside").has(e.target).length === 0) {
                if ($("aside").css('left') === "0px") $("aside").animate({ left: "-200px" }, 300);
            }
        }
    }
    $('.menu-left').click(function (event) {
        event.stopPropagation();
        if ($("aside").css('left') === "-200px") $("aside").animate({ left: "0px" }, 300);
    });
}
function getUserCurrent() {
  return new Promise(function(resolve, reject) {
    ajaxGetPromise(`/api/users`)
    .then((data,textStatus,xhr) => {
      data = JSON.parse(data);
      User.Name = data[3].Value;
      User.Email = data[0].Value;
      User.Avatar = data[2].Value;
      User.Role = data[1].Value;
      User.Phone = data[4].Value;
      if (User.Role != 1)
      {
          $("a[href='/Home/main']").attr("href", "/Home/ListRoom");
      }
      $(".menu-profile").next("p").html(data[3].Value);
    },(a,b)=>{
      if(a.status===401)
        window.location.href="/Home/Login";
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
      case 0: return "Giám đốc";
      case 1: return "Kỹ thuật";
      case 2: return "Tư vấn";
      default: return "";
    }
}
function pushList(a) {
    a.forEach((v, k) => {
        let b = `<div class="col-xs-12 room-detail" id="${v.RoomId}">
                      <div class="col-xs-3">
                        <img src="/Content/images/customer.png" alt="" class="img-rounded center-block img-room">
                      </div>
                      <div class="col-xs-9">
                      <a href="/Home/Chat?type=${v.RoomId}">
                        <p class="name-group">
                          ${v.Type!=3 ? getTypeString(v.Type) : ""}
                          <br/>
                          ${v.Type != 3 ? v.Name.substring(v.Name.indexOf('-') + 1) : v.Name}
                        </p>
                        </a>
                      </div>
                    </div>`;
        $(".list-room").append(b);
    })
}
function logout() {
    $(".logout").click(function () {
        localStorage.setItem("token", "");
        window.location.href = "/home/login";
    })
}

$(document).ready(function () {
  $.ajaxSetup({
    headers: getHeaders()
    });
  function register()
  {
      $(`button.submit-register`).on('click', () => {
          let data = {
              FullName: $(`input[name=fullname]`).val(),
              UserName: $(`input[name=email]`).val(),
              Password: $(`input[name=password]`).val()
          };
          if (RegEmail.test(data.UserName) && data.Password && data.Password.length >= 6) {
              ajaxPutPromise(`/api/token/register`, data)
                  .then((a) => {
                      switch (a) {
                          case true:
                              alert("Đăng ký thành công");
                              window.location.href = "/Home/Login";
                              break;
                          case false:
                              alert("Dữ liệu bị trùng lặp");
                              break;
                          default:
                              console.log(a);
                              alert("Xảy ra lỗi khi đăng ký");
                              break;
                      }
                  }, (a) => { });
          }
          else alert("Dữ liệu không đúng định dạng.Mật khẩu phải lớn hơn 6 ký tự");
          return false;
      })
  }
  function login()
  {
      $(`button.submit-login`).off(`click`).on(`click`, () => {
          let data = {
              UserName: $(`input[name=username]`).val(),
              Password: $(`input[name=password]`).val()
          }
          if (RegEmail.test(data.UserName) && data.Password.length >= 6) {
              ajaxPostPromise(`/api/token`, data)
                  .then((a) => {
                      if (!a) alert("Thông tin tài khoản sai.");
                      else {
                          window.location.href = "/Home/main";
                          localStorage.setItem("token", `Bearer ${a}`);
                      }
                  })
          }
          else alert("Dữ liệu không hợp lệ");
          return false;
      })
  }
  login();
  register();
  
  $(`button.submit-forgot-password`).on('click', () => {
    let data = {
       Name: $(`input[name=email]`).val()
     }
    if(RegEmail.test(data.Name)){
      ajaxGetPromise(`/api/token`, data )
      .then((a) => {
        if(a) alert(`Kiểm tra email để lấy lại mật khẩu`);
        else alert(`Không tìm thấy tài khoản với email của bạn`);
      })
    }
    else alert("Dữ liệu không đúng");
    return false;
  })

  switch (window.location.pathname.toLocaleLowerCase()) {
      case "/":
      case "/home/login":
        $('input').keyup(function (e) {
            if (e.keyCode === 13) {
                $(`button.submit-login`).trigger("click");
            }
        });
        break;
        case "/home/register":
            $('input').keyup(function (e) {
                if (e.keyCode === 13) {
                    $(`button.submit-register`).trigger("click");
                }
            });
        break;
      case "/home/main":
        getUserCurrent().then(() => {
        if(User.Role!="1") window.location.href="/Home/ListRoom";
        $(".new-room").on('click',function(e) {
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
          $.post(`/api/rooms`, data, function (data, textStatus, xhr) {
              console.log(data);
            if(data) window.location.href= `/Home/Chat?type=${data.RoomId}`;
            else alert();
          });
          return false;
        });
      })
        break;
        case "/home/chat":
          getUserCurrent().then(() => {
            if (User.Role == 1)
            {
                $(".note").remove();
                $(".note-box").remove();
            }
            ajaxGetPromise(`/api/message`,{id: getParameterURL("type").value})
                .then((a) => {
                
              a.forEach((v,k)=>{
                let b = v.User.UserName===User.Email ? `<div class="detail-message-right">
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
              try {
                  a[0].Room.Type != 3
                      ? $(".room-name span").html(`${getTypeString(a[0].Room.Type)} - ${a[0].User.FullName}`)
                      : $(".room-name span").html(`${a[0].Room.Name}`);
                  
                  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
              } catch (e) {
              }
            })
            var connection = $.hubConnection(`/signalr`, { useDefaultPath: false, qs: `a=${User.Email}&b=${getParameterURL("type").value}`});
            var ChatHubProxy = connection.createHubProxy('chatHub');
            ChatHubProxy.on('addMessage', function(email, message,group) {
                if(group===getParameterURL("type").value)
                {
                  let a = email===User.Email ? `<div class="detail-message-right">
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
            ChatHubProxy.on('addMember', function (message) {
                alert(message);
            });
            ChatHubProxy.on('leaveRoom', function (message) {
                alert(message);
                window.location.href = "/home/listroom";
            })
            connection.start().done(function() {
                $('#send').click(function () {
                    chat();
                    return false;
                });
                $('input[name=message]').bind("enterKey", function (e) {
                    chat();
                });
                $('input[name=message]').keyup(function (e) {
                    if (e.keyCode === 13) {
                        $(this).trigger("enterKey");
                    }
                });
                close();
                addMember();
            });
            function chat() {
                if ($('input[name=message]').val())
                {
                    ChatHubProxy.invoke('sendMessage', User.Email, $('input[name=message]').val(), getParameterURL("type").value);
                    $('input[name=message]').val('').focus();
                }
            }
            $(".note > a").click(function () {
                $(".note-box").toggleClass('hidden');
            })
            function close() {
                $(".note-box .box-item:nth-child(3)").off('click').on('click',function () {
                    ChatHubProxy.invoke('closeRoom', getParameterURL("type").value);
                    $(".note-box").toggleClass('hidden');
                })
            }
            function addMember()
            {
                $(".note-box .box-item:nth-child(1)").off('click').on('click', function () {
                    var email = prompt("Nhập email admin cần thêm: ");
                    if (RegEmail.test(email)) {
                        ChatHubProxy.invoke('addMember', email, getParameterURL("type").value);
                        $(".note-box").toggleClass('hidden');
                    }
                    else {
                        alert("Email không hợp lệ");
                    }
                })
            }
          })
          break;
        case "/home/profile":
          getUserCurrent()
          .then(() => {
              //$(`.profile-avatar img`).attr('src', User.Name);
              $(`.profile-name`).append(User.Name);
              $(`.profile-email`).append(User.Email);
              $(`.profile-phone`).append(User.Phone);
          });
          break;
     
        case "/home/intro":
        case "/home/product":
        case "/home/website":
            getUserCurrent().then(() => {
                toggleMenu();
            })
            break;
        case "/home/listroom":
              getUserCurrent().then(() => {
                  toggleMenu();
              })
            break;
        default:
          break;
  }
  $("iframe").css("width", window.innerWidth);
  $("iframe").css("height", window.innerHeight);
  logout();
});
