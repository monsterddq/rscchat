var RegEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var User = {
    Name: "",
    Email: "",
    Avatar: "",
    Role: "",
    Phone: ""
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
            crossDomain: true,
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
            crossDomain: true,
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
            crossDomain: true,
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
                User.Email = data[0].Value;
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
        case 0: return "Hỗ trợ chung";
        case 1: return "Kỹ thuật";
        default: return "Mua bán";
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
                          ${getTypeString(v.Type)}
                          <br/>
                          ${v.Name.substring(v.Name.indexOf('-') + 1)}
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
    })
}
$(document).ready(function () {
    $(`button.submit-login`).off(`click`).on(`click`, () => {
        let data = {
            UserName: $(`input[name=username]`).val(),
            Password: $(`input[name=password]`).val()
        }
        if (RegEmail.test(data.UserName) && data.Password.length >= 6) {
            ajaxPostPromise(`/api/admins`, data)
                .then((a) => {
                    if (!a) alert("Thông tin tài khoản sai.");
                    else {
                        window.location.href = "/admin/index";
                        localStorage.setItem("token", `Bearer ${a}`);
                    }
                })
        }
        else alert("Dữ liệu không hợp lệ");
        return false;
    })
    if (window.location.pathname != "/admin")
    {
        ajaxGetPromise("/api/admins")
            .then((a) => {
                a = JSON.parse(a);
                if (a[1].Value != "0") window.location.href = "/admin";
            }, () => {
                window.location.href = "/admin";
            })
    }
})