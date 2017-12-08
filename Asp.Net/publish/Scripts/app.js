var RegEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var RegPhone = /^[0]{1}[1,9]{1}[0-9]{8,9}$/;
var User = {
    Name: "",
    UserName: "",
    Avatar: "",
    Role: "",
    Phone: ""
}
function forgotpassword() {
    $(`button.submit-forgot-password`).on('click', () => {
        let data = {
            Name: $(`input[name=email]`).val()
        }
        if (RegEmail.test(data.Name)) {
            ajaxGetPromise(`/api/token`, data)
                .then((a) => {
                    if (a) alert(`Kiểm tra email để lấy lại mật khẩu`);
                    else alert(`Không tìm thấy tài khoản với email của bạn`);
                })
        }
        else alert("Dữ liệu không đúng");
        return false;
    })
}
function getParameterURL(a) {
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
            data: a,
            dataType: "json",
            headers: getHeaders(),
            success: function (data, textStatus, xhr) {
                resolve(data, textStatus, xhr);
            },
            error: function (textStatus, xhr) {
                reject(textStatus, xhr);
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
            success: function (data, textStatus, xhr) {
                resolve(data, textStatus, xhr);
            },
            error: function (textStatus, xhr) {
                reject(textStatus, xhr);
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
            success: function (data, textStatus, xhr) {
                resolve(data, textStatus, xhr);
            },
            error: function (textStatus, xhr) {
                reject(textStatus, xhr);
            }
        });
    });
}
function getHeaders() {
    if (localStorage.getItem("token")) return { 'Authorization': localStorage.getItem("token") };
    return { 'Authorization': "" };
}
function toggleMenu() {
    document.getElementById('body').onclick = function (e) {
        if (e.target !== document.getElementById('aside')) {
            if ($("#aside").has(e.target).length === 0) {
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
    return new Promise(function (resolve, reject) {
        ajaxGetPromise(`/api/users`)
            .then((data, textStatus, xhr) => {
                data = JSON.parse(data);
                User.Name = data[3].Value;
                User.UserName = data[0].Value;
                User.Avatar = data[2].Value;
                User.Role = data[1].Value;
                User.Phone = data[4].Value;
                if (User.Role != 1) {
                    $("a[href='/Home/main']").attr("href", "/Home/ListRoom");
                }
                $(".menu-profile").next("p").html(data[3].Value);
            }, (a, b) => {
                if (a.status === 401)
                    window.location.href = "/Home/Login";
            })
            .then(() => {
                resolve();
            }, () => {
                reject();
            })
    });
}
function getTypeString(a) {
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
                          ${v.Type != 3 ? getTypeString(v.Type) : ""}
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
function register() {
    $(`button.submit-register`).on('click', () => {
        let data = {
            FullName: $(`input[name=fullname]`).val(),
            UserName: $(`input[name=email]`).val(),
            Password: $(`input[name=password]`).val()
        };
        if ((RegEmail.test(data.UserName) || RegPhone.test(data.UserName)) && data.Password && data.Password.length >= 6) {
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
function login() {
    $(`button.submit-login`).off(`click`).on(`click`, () => {
        let data = {
            UserName: $(`input[name=username]`).val(),
            Password: $(`input[name=password]`).val()
        }
        if ((RegEmail.test(data.UserName) || RegPhone.test(data.UserName)) && data.Password.length >= 6) {
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
function convertTime(a) {
    let b = new Date();
    let c = a.split('T');
    if (b.getFullYear() != c[0].split('-')[0] ||
        (b.getMonth() + 1) != c[0].split('-')[1] ||
        b.getDate() != c[0].split('-')[2])
    {
        return `${c[1].split(':')[0]}:${c[1].split(':')[1]} ${c[0].split('-')[2]}-${c[0].split('-')[1]}-${c[0].split('-')[0]}`;
    }
    else {
        return `${c[1].split(':')[0]}:${c[1].split(':')[1]}`;
    }
}
function image() {
    $("#image").click(function () {
        $("input[name=image]").trigger("click");
        return false;
    })
}
function image() {
    $("#image").click(function () {
        $("input[name=image]").trigger("click");
        return false;
    })
}
function changeBackground() {
    $("#changeBG").click(function () {
        $("input[name=background]").trigger("click");
        $(".note > a").trigger("click");
    })
    $("input[name=background]").change(() => {
        var fileUpload = $("#background").get(0);
        var files = fileUpload.files;
        console.log(files);
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }
        data.append("group", getParameterURL("type").value);
        $.ajax({
            url: `/media/group`,
            type: "POST",
            data: data,
            contentType: false,
            processData: false,
            success: function (result) {
                $("body").css('background', `url('${result}')  no-repeat center center fixed`);
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    })
}
function setBackground(id)
{
    console.log(id);
    $.ajax({
        url: `/media/fetchgroupbackground`,
        type: "GET",
        data: {id: id},
        contentType: 'json',
        success: function (result) {
            $("body").css('background', `url('${result}')  no-repeat center center fixed`);
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}
