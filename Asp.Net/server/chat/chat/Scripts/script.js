$(document).ready(function () {
  $.ajaxSetup({
    headers: getHeaders()
    });
  switch (window.location.pathname.toLocaleLowerCase()) {
      case "/":
      case "/home/login":
        login();
        forgotpassword();
        $('input').keyup(function (e) {
            if (e.keyCode === 13) {
                $(`button.submit-login`).trigger("click");
            }
          });
        break;
      case "/home/register":
          register();
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
            UserName: User.UserName
          }
          $.post(`/api/rooms`, data, function (data, textStatus, xhr) {
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
                    a.forEach((v, k) => {
                        let b;
                        if (v.User.UserName === User.UserName) {
                            if (v.Content.includes("/Content/Image/")) {
                                b = `<div class="detail-message-right">
                                <div class="owner">
                                    <img src="${v.Content}" style="max-width: ${window.innerWidth-100}px"/>
                                </br>
                                <p style="margin-bottom:0px;text-align: right;">${convertTime(v.Time)}</p>
                                </div>
                            </div><div class="clearfix"></div>`;
                            }
                            else {
                                b = `<div class="detail-message-right">
                                <div class="owner">
                                <span>${v.Content}</span>
                                </br>
                                <p style="margin-bottom:0px;text-align: right;">${convertTime(v.Time)}</p>
                                </div>
                            </div><div class="clearfix"></div>`;
                            }

                        }
                        else {
                            if (v.Content.includes("/Content/Image/")) {
                                b = `<div class="detail-message-left">
                                <div class="other">
                                    <img src="${v.Content}" style="max-width: ${window.innerWidth - 100}px"/>
                                </br>
                                <p style="margin-bottom:0px">${convertTime(v.Time)}</p>
                                </div>
                            </div>`;
                            }
                            else {
                                b = `<div class="detail-message-left">
                                <div class="other">
                                <span>${v.Content}</span>
                                </br>
                                <p style="margin-bottom:0px">${convertTime(v.Time)}</p>
                                </div>
                            </div>`;
                            }
                        }
                $('.list-message').append(b);
                    })
                    try {
                        $("body").css('background', a[0].Room.Background.includes("#") ? a[0].Room.Background :  `url('${a[0].Room.Background}')  no-repeat center center fixed`);
                        a[0].Room.Type != 3
                          ? $(".room-name span").html(`${getTypeString(a[0].Room.Type)} - ${a[0].User.FullName}`)
                          : $(".room-name span").html(`${a[0].Room.Name}`);
                  
                        

                      } catch (e) {
                    }
                    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                })
            var connection = $.hubConnection(`/signalr`, { useDefaultPath: false, qs: `a=${User.UserName}&b=${getParameterURL("type").value}`});
            var ChatHubProxy = connection.createHubProxy('chatHub');
            ChatHubProxy.on('addMessage', function(email, message,group) {
                if(group===getParameterURL("type").value)
                {
                    let f = new Date();
                    let a;
                    if (email === User.UserName)
                    {
                        if (message.includes("/Content/Image/"))
                        {
                            a = `<div class="detail-message-right">
                                <div class="owner">
                                    <img src="${message}" style="max-width: ${window.innerWidth - 100}px" />
                                </br>
                                <p style="margin-bottom:0px;text-align: right;">${f.getHours()}:${f.getMinutes()}</p>
                                </div>
                            </div><div class="clearfix"></div>`;
                        }
                        else {
                            a = `<div class="detail-message-right">
                                <div class="owner">
                                <span>${message}</span>
                                </br>
                                <p style="margin-bottom:0px;text-align: right;">${f.getHours()}:${f.getMinutes()}</p>
                                </div>
                            </div><div class="clearfix"></div>`;
                        }
                        
                    }
                    else {
                        if (message.includes("/Content/Image/")) {
                            a = `<div class="detail-message-left">
                                <div class="other">
                                    <img src="${message}" style="max-width: ${window.innerWidth - 100}px" />
                                </br>
                                <p style="margin-bottom:0px">${f.getHours()}:${f.getMinutes()}</p>
                                </div>
                            </div>`;
                        }
                        else {
                            a = `<div class="detail-message-left">
                                <div class="other">
                                <span>${message}</span>
                                </br>
                                <p style="margin-bottom:0px">${f.getHours()}:${f.getMinutes()}</p>
                                </div>
                            </div>`;
                        }
                    }
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
            image();
            document.getElementsByName("image")[0].addEventListener("change", function () {
                setTimeout(() => {
                    var fileUpload = $("#image1").get(0);
                    var files = fileUpload.files;
                    var data = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        data.append(files[i].name, files[i]);
                    }
                    data.append("username", User.UserName);
                    data.append("group", getParameterURL("type").value);
                    $.ajax({
                        url: `/media/index`,
                        type: "POST",
                        data: data,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            ChatHubProxy.invoke('sendMessage', User.UserName, result, getParameterURL("type").value);
                        },
                        error: function (err) {
                            alert(err.statusText);
                        }
                    });

                }, 1000);
               
            });
            $(".note > a").click(function () {
                $(".note-box").toggleClass('hidden');
                return false;
            })
            changeBackground();
            $("#backup").click(function () {
                ajaxGetPromise("/api/chat", { id: getParameterURL("type").value })
                    .then((a) => {
                        alert("Nội dung chat được gửi vào email quản trị.");
                        $(".note > a").trigger("click");
                    })
            })
          })
          break;
        case "/home/profile":
          getUserCurrent()
              .then(() => {
              if (User.Avatar != "") $(`.profile-avatar img`).attr('src', User.Avatar);
              $(`.profile-name`).append(User.Name);
              $(`.profile-email`).append(User.UserName);
              $(`.profile-phone`).append(User.Phone);
              image();
              document.getElementsByName("image")[0].addEventListener("change", function () {
                  setTimeout(() => {
                      var fileUpload = $("#image1").get(0);
                      var files = fileUpload.files;
                      var data = new FormData();
                      for (var i = 0; i < files.length; i++) {
                          data.append(files[i].name, files[i]);
                      }
                      data.append("username", User.UserName);
                      $.ajax({
                          url: `/media/avatar`,
                          type: "POST",
                          data: data,
                          contentType: false,
                          processData: false,
                          success: function (result) {
                              if (result.includes("/Content/Image/"))
                              {
                                  $(`.profile-avatar img`).attr('src', result);
                              }
                              else {
                                  alert(result);
                              }
                          },
                          error: function (err) {
                              alert(err.statusText);
                          }
                      });

                  }, 1000);

              });
          });
          break;
        case "/home/intro":
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
