"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connect_room = new signalR.HubConnection(host + "/signalR/roomHub?authorization=Bearer " + localStorage.getItem('bear'));
var interval_room;
connect_room.start().then(function (rs) {}, function (error) {
  if (error.statusCode === 401) window.location.href = "login.html";
});

if (!User.UserName) window.location.href = "login.html";

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      main: +localStorage.getItem('main') || 1,
      screen: +localStorage.getItem('screen') || 1,
      roomId: +localStorage.getItem('roomId') || 0
    };

    return _this;
  }

  _createClass(App, [{
    key: "handleMenu",
    value: function handleMenu(id) {
      localStorage.setItem('screen', 1);
      if (id != 1) clearInterval(interval_room);else {
        interval_room = setInterval(function () {
          document.getElementById("getRoom").click();
        }, 1000);
      }
      localStorage.setItem('main', id);
      this.setState({ main: id });
    }
  }, {
    key: "handleScreen",
    value: function handleScreen(id) {
      clearInterval(interval_room);
      localStorage.setItem('screen', 2);
      localStorage.setItem('roomId', id);
      this.setState({ screen: 2, roomId: id });
    }
  }, {
    key: "handleBackMain",
    value: function handleBackMain() {
      localStorage.setItem('screen', 1);
      this.setState({ screen: 1 });
    }
  }, {
    key: "handleSelectRoom",
    value: function handleSelectRoom(id) {
      this.setState({ roomId: id });
    }
  }, {
    key: "switchScreen",
    value: function switchScreen() {
      var screen = void 0;
      switch (this.state.screen.toString()) {
        case "1":
          screen = React.createElement(
            "div",
            null,
            React.createElement(Main, { main: this.state.main, handleScreen: this.handleScreen.bind(this) }),
            React.createElement(Menu, { handleMenu: this.handleMenu.bind(this) })
          );
          break;
        case "2":
          screen = React.createElement(ChatRoom, { roomId: this.state.roomId,
            handleBackMain: this.handleBackMain.bind(this) });
          break;
        default:
          screen = React.createElement(
            "div",
            null,
            React.createElement(Main, { main: this.state.main }),
            React.createElement(Menu, { handleMenu: this.handleMenu.bind(this) })
          );
          break;
      }
      return screen;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.switchScreen()
      );
    }
  }]);

  return App;
}(React.Component);

// Start Menu


var MenuEntity = function MenuEntity(id, image) {
  _classCallCheck(this, MenuEntity);

  this.id = id, this.image = image;
};

var Menu = function (_React$Component2) {
  _inherits(Menu, _React$Component2);

  function Menu() {
    _classCallCheck(this, Menu);

    var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

    _this2.menu = [new MenuEntity(1, "images/icon1.png"), new MenuEntity(2, "images/menu4.png"), new MenuEntity(3, "images/icon3.png"), new MenuEntity(4, "images/setting.png")];
    return _this2;
  }

  _createClass(Menu, [{
    key: "handleMenu",
    value: function handleMenu(id) {
      this.props.handleMenu(id);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var listMenu = this.menu.map(function (v, k) {
        return React.createElement(MenuItem, { key: k, index: v.id, image: v.image, handleMenu: _this3.handleMenu.bind(_this3) });
      });
      return React.createElement(
        "div",
        { className: "menu-footer" },
        listMenu
      );
    }
  }]);

  return Menu;
}(React.Component);

var MenuItem = function (_React$Component3) {
  _inherits(MenuItem, _React$Component3);

  function MenuItem(props) {
    _classCallCheck(this, MenuItem);

    return _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));
  }

  _createClass(MenuItem, [{
    key: "handleMenu",
    value: function handleMenu() {
      this.props.handleMenu(this.props.index);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "col-md-3 col-xs-3" },
        React.createElement(
          "a",
          { href: "#" },
          React.createElement("img", { src: this.props.image, onClick: this.handleMenu.bind(this) })
        )
      );
    }
  }]);

  return MenuItem;
}(React.Component);
// End Menu

// Start Main


var Main = function (_React$Component4) {
  _inherits(Main, _React$Component4);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this5 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this5.state = {};
    return _this5;
  }

  _createClass(Main, [{
    key: "handleScreen",
    value: function handleScreen(id) {
      this.props.handleScreen(id);
    }
  }, {
    key: "switchMain",
    value: function switchMain() {
      return React.createElement(
        "div",
        null,
        React.createElement(ListRoom, { status: this.props.main === 1, handleScreen: this.handleScreen.bind(this) }),
        React.createElement(Contact, { status: this.props.main === 2 }),
        React.createElement(Website, { status: this.props.main === 3 }),
        React.createElement(Setting, { status: this.props.main === 4 })
      );
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.switchMain()
      );
    }
  }]);

  return Main;
}(React.Component);
// End Main

//Start website


var Website = function (_React$Component5) {
  _inherits(Website, _React$Component5);

  function Website() {
    _classCallCheck(this, Website);

    var _this6 = _possibleConstructorReturn(this, (Website.__proto__ || Object.getPrototypeOf(Website)).call(this));

    _this6.state = {
      w: window.innerWidth,
      h: window.innerHeight
    };
    return _this6;
  }

  _createClass(Website, [{
    key: "resizeWindow",
    value: function resizeWindow() {
      var _this7 = this;

      $(window).resize(function () {
        _this7.setState({
          w: window.innerWidth,
          h: window.innerHeight
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resizeWindow();
    }
  }, {
    key: "render",
    value: function render() {
      var name = this.props.status ? "block" : "block d-none";
      return React.createElement(
        "div",
        { className: name },
        React.createElement("iframe", { src: "http://jai.vn/", width: this.state.w, height: this.state.h })
      );
    }
  }]);

  return Website;
}(React.Component);
//End Website

//Start setting


var Contact = function (_React$Component6) {
  _inherits(Contact, _React$Component6);

  function Contact(props) {
    _classCallCheck(this, Contact);

    var _this8 = _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).call(this, props));

    _this8.state = {
      contacts: localStorage.getItem("contacts") || []
    };
    return _this8;
  }

  _createClass(Contact, [{
    key: "handleSearch",
    value: function handleSearch(id) {
      console.log(id);
    }
  }, {
    key: "render",
    value: function render() {
      var name = this.props.status ? "block" : "block d-none";
      var contact = [];
      for (var i = 0, size = this.state.contacts; i < size; i++) {
        contact.push(React.createElement(ContactItem, { contact: this.state.contacts[i], key: i }));
      }
      return React.createElement(
        "div",
        { className: name },
        React.createElement(Search, { handleSearch: this.handleSearch.bind(this), disableAdd: "true" }),
        contact
      );
    }
  }]);

  return Contact;
}(React.Component);

var ContactItem = function (_React$Component7) {
  _inherits(ContactItem, _React$Component7);

  function ContactItem() {
    _classCallCheck(this, ContactItem);

    return _possibleConstructorReturn(this, (ContactItem.__proto__ || Object.getPrototypeOf(ContactItem)).call(this));
  }

  _createClass(ContactItem, [{
    key: "render",
    value: function render() {
      console.log(this.props);
      return React.createElement(
        "div",
        { className: "col-xs-12 contact-detail" },
        React.createElement(
          "a",
          { href: "#" },
          React.createElement(
            "p",
            { className: "name-group" },
            this.props.contact.displayName
          ),
          React.createElement(
            "p",
            null,
            this.props.contact.phoneNumber[0].value
          )
        )
      );
    }
  }]);

  return ContactItem;
}(React.Component);
// End contact

//Start setting


var SettingUser = function SettingUser(ref, image, name) {
  _classCallCheck(this, SettingUser);

  this.ref = ref;
  this.image = image, this.name = name;
};

var SettingItem = function (_React$Component8) {
  _inherits(SettingItem, _React$Component8);

  function SettingItem(props) {
    _classCallCheck(this, SettingItem);

    return _possibleConstructorReturn(this, (SettingItem.__proto__ || Object.getPrototypeOf(SettingItem)).call(this, props));
  }

  _createClass(SettingItem, [{
    key: "handleSetting",
    value: function handleSetting() {
      this.props.handleSetting(this.props.value.ref);
    }
  }, {
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        { className: "setting", onClick: this.handleSetting.bind(this) },
        React.createElement(
          "div",
          { className: "text-center" },
          React.createElement("img", { src: this.props.value.image, width: "30px" })
        ),
        React.createElement(
          "div",
          { className: "text-left" },
          React.createElement(
            "h3",
            { className: "modal-title" },
            this.props.value.name
          )
        )
      );
    }
  }]);

  return SettingItem;
}(React.Component);

var Setting = function (_React$Component9) {
  _inherits(Setting, _React$Component9);

  function Setting(props) {
    _classCallCheck(this, Setting);

    var _this11 = _possibleConstructorReturn(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).call(this, props));

    _this11.state = {
      main: 0,
      src: host + "/" + User.Avatar || "images/customer.png"
    };
    return _this11;
  }

  _createClass(Setting, [{
    key: "listSetting",
    value: function listSetting() {
      return [new SettingUser("user", this.state.src, "Thông tin cá nhân"), new SettingUser("changePassword", "images/change_password.svg", "Thay đổi mật khẩu"), new SettingUser("logout", "images/logout.svg", "Đăng xuất")];
    }
  }, {
    key: "handleSetting",
    value: function handleSetting(id) {
      switch (id) {
        case "user":
          this.setState({ main: 1 });
          break;
        case "logout":
          clearLocalStorage();
          alertify.notify(notify("logout"));
          setTimeout(function () {
            window.location.href = "login.html";
          }, 1000);
          break;
        case "changePassword":
          this.handleChangePassword();
          break;
      }
    }
  }, {
    key: "handleBack",
    value: function handleBack() {
      this.setState({ main: 0 });
    }
  }, {
    key: "handleChangeInfo",
    value: function handleChangeInfo() {
      this.setState({ main: 2 });
    }
  }, {
    key: "handleShowInfo",
    value: function handleShowInfo() {
      this.setState({ main: 1 });
    }
  }, {
    key: "isValid",
    value: function isValid(data) {
      if (!data.oldPassword || !data.newPassword || !data.repeatPassword || data.newPassword <= 4 || !data.repeatPassword) {
        alertify.warning(notify("400"));
        return false;
      }
      if (data.newPassword !== data.repeatPassword) {
        alertify.warning(notify("changePassword"));
        return false;
      }
      return true;
    }
  }, {
    key: "handleChangePassword",
    value: function handleChangePassword() {
      var that = this;
      alertify.prompt('Đổi mật khẩu', "", "", function (a, value) {
        value = $(".ajs-input").val();
        if (!value) alertify.error("Mật khẩu không được để trống.");
        var data = {
          oldPassword: value,
          newPassword: $(".ajs-input[name=new_password]").val(),
          repeatPassword: $(".ajs-input[name=repeat_password]").val()
        };
        if (!that.isValid(data)) return;
        ajaxPromise(link.password, "PUT", data).then(function (rs) {
          if (rs.code === 200) {
            alertify.success(notify("updateSuccess"));
          } else alertify.error(notify(rs.code));
        });
      }, function (a) {});
      setTimeout(function () {
        $(".ajs-content").empty();
        $(".ajs-content").append("<input class=\"ajs-input\" name=\"old_password\" ref=\"old_password\" type=\"password\" placeholder=\"Nh\u1EADp m\u1EADt kh\u1EA9u c\u0169\">");
        $(".ajs-content").append("<input class=\"ajs-input\" name=\"new_password\" ref=\"new_password\" type=\"password\" placeholder=\"Nh\u1EADp m\u1EADt kh\u1EA9u m\u1EDBi\">");
        $(".ajs-content").append("<input class=\"ajs-input\" name=\"repeat_password\" ref=\"repeat_password\" type=\"password\" placeholder=\"Nh\u1EADp l\u1EA1i m\u1EADt kh\u1EA9u\">");
      }, 100);
    }
  }, {
    key: "switchMain",
    value: function switchMain() {
      var _this12 = this;

      var listSetting = this.listSetting().map(function (v, k) {
        return React.createElement(SettingItem, { key: k, value: v, handleSetting: _this12.handleSetting.bind(_this12) });
      });
      var name = this.state.main === 0 ? "" : "d-none";
      return React.createElement(
        "div",
        { className: "setting-block" },
        React.createElement(
          "div",
          { className: name },
          listSetting
        ),
        React.createElement(Information, { status: this.state.main === 1, handleBack: this.handleBack.bind(this),
          handleChangeInfo: this.handleChangeInfo.bind(this) }),
        React.createElement(EditInformation, { status: this.state.main === 2, handleBack: this.handleBack.bind(this),
          handleShowInfo: this.handleShowInfo.bind(this) })
      );
    }
  }, {
    key: "render",
    value: function render() {

      var name = this.props.status ? "menu-setting" : "menu-setting d-none";
      return React.createElement(
        "div",
        { className: name },
        this.switchMain()
      );
    }
  }]);

  return Setting;
}(React.Component);

var Information = function (_React$Component10) {
  _inherits(Information, _React$Component10);

  function Information() {
    _classCallCheck(this, Information);

    var _this13 = _possibleConstructorReturn(this, (Information.__proto__ || Object.getPrototypeOf(Information)).call(this));

    _this13.state = {
      src: host + "/" + User.Avatar || "images/customer.png"
    };
    return _this13;
  }

  _createClass(Information, [{
    key: "handleBack",
    value: function handleBack() {
      this.props.handleBack();
    }
  }, {
    key: "handleChangeAvatar",
    value: function handleChangeAvatar() {
      this.refs.background.click();
    }
  }, {
    key: "handleSelectMedia",
    value: function handleSelectMedia() {
      var that = this;
      if (this.refs.background.value) {
        var data = void 0;
        var file = this.refs.background.files[0];
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
          data = {
            file: e.target.result,
            name: file.name,
            username: User.UserName
          };
        });
        FR.readAsDataURL(file);
        var loop = setInterval(function () {
          if (data) {
            clearInterval(loop);
            $.ajax({
              type: "PUT",
              url: "" + host + link.upload,
              data: data,
              headers: {
                'Authorization': "Bearer " + localStorage.getItem('bear')
              },
              success: function success(data, status, xhr) {
                localStorage.setItem('bear', xhr.getResponseHeader("authorization"));
                if (data) that.setState({ src: host + "/" + data });
                setUserCurrent();
                document.querySelector(".setting img").setAttribute("src", host + "/" + User.Avatar);
              },
              error: function error(result, status, xhr) {
                if (xhr === "Unauthorized") {
                  notifyResult(401);
                  localStorage.removeItem('bear');
                  setTimeout(function () {
                    window.location.href = "login.html";
                  }, 1000);
                }
              }
            });
          }
        }, 100);
      }
    }
  }, {
    key: "handleChangeInfo",
    value: function handleChangeInfo() {
      this.props.handleChangeInfo();
    }
  }, {
    key: "render",
    value: function render() {
      var name = this.props.status ? "info" : "info d-none";
      return React.createElement(
        "div",
        { className: name },
        React.createElement(
          "div",
          { className: "info-avatar" },
          React.createElement(
            "div",
            { className: "img", onClick: this.handleChangeAvatar.bind(this) },
            React.createElement("img", { src: this.state.src, alt: "Avatar", ref: "image" }),
            React.createElement(
              "span",
              null,
              "Thay \u0111\u1ED5i"
            ),
            React.createElement("input", { type: "file", name: "background", id: "background", ref: "background", className: "hidden", onChange: this.handleSelectMedia.bind(this) })
          )
        ),
        React.createElement(
          "table",
          { className: "table" },
          React.createElement(
            "tbody",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "T\xEAn \u0111\u0103ng nh\u1EADp"
              ),
              React.createElement(
                "td",
                null,
                User.UserName
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "H\u1ECD v\xE0 t\xEAn"
              ),
              React.createElement(
                "td",
                null,
                User.FullName
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i"
              ),
              React.createElement(
                "td",
                null,
                User.Phone
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "Email"
              ),
              React.createElement(
                "td",
                null,
                User.Email
              )
            )
          )
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.handleBack.bind(this) },
          "Quay l\u1EA1i"
        ),
        React.createElement(
          "button",
          { className: "btn btn-primary change-info", onClick: this.handleChangeInfo.bind(this) },
          "\u0110\u1ED5i th\xF4ng tin"
        )
      );
    }
  }]);

  return Information;
}(React.Component);

var EditInformation = function (_React$Component11) {
  _inherits(EditInformation, _React$Component11);

  function EditInformation() {
    _classCallCheck(this, EditInformation);

    var _this14 = _possibleConstructorReturn(this, (EditInformation.__proto__ || Object.getPrototypeOf(EditInformation)).call(this));

    _this14.state = {
      src: host + "/" + User.Avatar || "images/customer.png"
    };
    return _this14;
  }

  _createClass(EditInformation, [{
    key: "handleBack",
    value: function handleBack() {
      this.props.handleBack();
    }
  }, {
    key: "handleChangeAvatar",
    value: function handleChangeAvatar() {
      this.refs.background.click();
    }
  }, {
    key: "handleSelectMedia",
    value: function handleSelectMedia() {
      var that = this;
      if (this.refs.background.value) {
        var data = void 0;
        var file = this.refs.background.files[0];
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
          data = {
            file: e.target.result,
            name: file.name,
            username: User.UserName
          };
        });
        FR.readAsDataURL(file);
        var loop = setInterval(function () {
          if (data) {
            clearInterval(loop);
            $.ajax({
              type: "PUT",
              url: "" + host + link.upload,
              data: data,
              headers: {
                'Authorization': "Bearer " + localStorage.getItem('bear')
              },
              success: function success(data, status, xhr) {
                localStorage.setItem('bear', xhr.getResponseHeader("authorization"));
                if (data) that.setState({ src: host + "/" + data });
                setUserCurrent();
                document.querySelector(".setting img").setAttribute("src", host + "/" + User.Avatar);
              },
              error: function error(result, status, xhr) {
                if (xhr === "Unauthorized") {
                  notifyResult(401);
                  localStorage.removeItem('bear');
                  setTimeout(function () {
                    window.location.href = "login.html";
                  }, 1000);
                }
              }
            });
          }
        }, 100);
      }
    }
  }, {
    key: "handleShowInfo",
    value: function handleShowInfo() {
      var that = this;
      alertify.prompt('Xác nhận mật khẩu', "Nhập mật khẩu: ", "", function (a, value) {
        value = $(".ajs-input").val();
        if (!value) alertify.error("Mật khẩu không được để trống.");
        var data = {
          username: User.UserName,
          user: {
            UserName: User.UserName,
            FullName: that.refs.FullName.value,
            Phone: that.refs.Phone.value,
            Email: that.refs.Email.value,
            Avatar: User.Avatar,
            Role: +User.Role,
            Password: value
          }
        };
        $.ajax({
          url: "" + host + link.user,
          method: "PUT",
          data: data,
          crossDomain: true,
          headers: {
            'Authorization': "Bearer " + localStorage.getItem('bear')
          }
        }).done(function (rs, status, xhr) {
          if (rs.code === 200) {
            alertify.success(notify("updateSuccess"));
            localStorage.setItem('bear', xhr.getResponseHeader("authorization"));
            setUserCurrent();
          } else alertify.error(notify(rs.code));
          that.props.handleShowInfo();
        });
      }, function (a) {});
      setTimeout(function () {
        $(".ajs-content").empty();
        $(".ajs-content").append("<input class=\"ajs-input\" name=\"password\" ref=\"password\" type=\"password\" placeholder=\"Nh\u1EADp m\u1EADt kh\u1EA9u c\u0169\">");
      }, 100);
    }
  }, {
    key: "render",
    value: function render() {
      var name = this.props.status ? "info" : "info d-none";
      return React.createElement(
        "div",
        { className: name },
        React.createElement(
          "div",
          { className: "info-avatar" },
          React.createElement(
            "div",
            { className: "img", onClick: this.handleChangeAvatar.bind(this) },
            React.createElement("img", { src: this.state.src, alt: "Avatar", ref: "image" }),
            React.createElement(
              "span",
              null,
              "Thay \u0111\u1ED5i"
            ),
            React.createElement("input", { type: "file", name: "background", id: "background", ref: "background", className: "hidden", onChange: this.handleSelectMedia.bind(this) })
          )
        ),
        React.createElement(
          "table",
          { className: "table" },
          React.createElement(
            "tbody",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "T\xEAn \u0111\u0103ng nh\u1EADp"
              ),
              React.createElement(
                "td",
                null,
                User.UserName
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "H\u1ECD v\xE0 t\xEAn"
              ),
              React.createElement(
                "td",
                null,
                React.createElement("input", { type: "text", ref: "FullName", defaultValue: User.FullName })
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i"
              ),
              React.createElement(
                "td",
                null,
                React.createElement("input", { type: "text", ref: "Phone", defaultValue: User.Phone })
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "Email"
              ),
              React.createElement(
                "td",
                null,
                React.createElement("input", { type: "email", ref: "Email", defaultValue: User.Email })
              )
            )
          )
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.handleBack.bind(this) },
          "Quay l\u1EA1i"
        ),
        React.createElement(
          "button",
          { className: "btn btn-primary change-info", onClick: this.handleShowInfo.bind(this) },
          "\u0110\u1ED5i th\xF4ng tin"
        )
      );
    }
  }]);

  return EditInformation;
}(React.Component);
// End setting

//Start listRoom


var ListRoom = function (_React$Component12) {
  _inherits(ListRoom, _React$Component12);

  function ListRoom(props) {
    _classCallCheck(this, ListRoom);

    var _this15 = _possibleConstructorReturn(this, (ListRoom.__proto__ || Object.getPrototypeOf(ListRoom)).call(this, props));

    _this15.state = {
      main: ""
    };
    return _this15;
  }

  _createClass(ListRoom, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var main = User.Role == "4" ? React.createElement(ListRoomUser, { handleScreen: this.handleScreen.bind(this) }) : React.createElement(ListRoomAdmin, { handleScreen: this.handleScreen.bind(this) }); // bind handleScreen
      this.setState({ main: main });
    }
  }, {
    key: "handleScreen",
    value: function handleScreen(id) {
      this.props.handleScreen(id);
    }
  }, {
    key: "render",
    value: function render() {
      var name = this.props.status ? "text list-room" : "text d-none list-room";
      return React.createElement(
        "div",
        { className: name },
        this.state.main
      );
    }
  }]);

  return ListRoom;
}(React.Component);

var Search = function (_React$Component13) {
  _inherits(Search, _React$Component13);

  function Search() {
    _classCallCheck(this, Search);

    return _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));
  }

  _createClass(Search, [{
    key: "handleSearch",
    value: function handleSearch() {
      this.props.handleSearch(this.refs.search.value);
    }
  }, {
    key: "handleAdd",
    value: function handleAdd() {
      var that = this;
      alertify.prompt('Tên nhóm', "", "", function (a, value) {
        value = $(".ajs-input").val();
        if (value) that.props.handleAdd(value);
      }, function (a) {});
      setTimeout(function () {
        $(".ajs-content").empty();
        $(".ajs-content").append("<input class=\"ajs-input\" type=\"text\" placeholder=\"Nh\u1EADp t\xEAn n\xF3m\">");
      }, 100);
    }
  }, {
    key: "render",
    value: function render() {
      var add = "",
          searchClass = "";
      if (!this.props.disableAdd) {
        add = React.createElement(
          "div",
          { className: "search-add" },
          React.createElement("img", { src: "/images/60740.svg", width: "30px", onClick: this.handleAdd.bind(this) })
        );
        searchClass = "search-textbox";
      } else {
        searchClass = "search-contact-textbox";
      }
      return React.createElement(
        "div",
        { id: "top-content" },
        React.createElement(
          "div",
          { className: "header-title" },
          React.createElement(
            "div",
            { className: "search-icon" },
            React.createElement("img", { src: "images/search.png" })
          ),
          React.createElement(
            "div",
            { className: searchClass },
            React.createElement("input", { type: "text", ref: "search", name: "search", className: "form-control", placeholder: "T\xECm ki\u1EBFm",
              onKeyUp: this.handleSearch.bind(this) })
          ),
          add
        )
      );
    }
  }]);

  return Search;
}(React.Component);

var RoomUser = function RoomUser(class_name, image, name, ref) {
  _classCallCheck(this, RoomUser);

  this.class_name = class_name;
  this.image = image;
  this.name = name;
  this.ref = ref;
};

var ListRoomUser = function (_React$Component14) {
  _inherits(ListRoomUser, _React$Component14);

  function ListRoomUser(props) {
    _classCallCheck(this, ListRoomUser);

    var _this17 = _possibleConstructorReturn(this, (ListRoomUser.__proto__ || Object.getPrototypeOf(ListRoomUser)).call(this, props));

    _this17.state = {};

    return _this17;
  }

  _createClass(ListRoomUser, [{
    key: "listRoom",
    value: function listRoom() {
      return [new RoomUser("text-center", "images/customer.png", "Giám đốc", "manager"), new RoomUser("text-center col-xs-6", "images/customer.png", "Kỹ thuật", "technical"), new RoomUser("text-center col-xs-6", "images/customer.png", "Tư vấn", "advisory")];
    }
  }, {
    key: "handleSelectRoom",
    value: function handleSelectRoom(id) {
      var _this18 = this;

      ajaxPromise(link['post_room'], "POST", { roomtype: id }).then(function (rs) {
        if ((typeof rs === "undefined" ? "undefined" : _typeof(rs)) === "object") {
          _this18.props.handleScreen(rs.roomId);
        } else {
          notifyResult("errorcreateroom");
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      try {
        this.connect_room.invoke("listroom", function (result) {});
      } catch (err) {
        console.log(err);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this19 = this;

      var room = this.listRoom().map(function (v, k) {
        return React.createElement(ListRoomUserItem, { key: k, value: v, handleSelectRoom: _this19.handleSelectRoom.bind(_this19) });
      });
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "card card-container" },
          React.createElement(
            "h5",
            { className: "text-center" },
            React.createElement(
              "strong",
              null,
              "Ch\u1ECDn h\u1ED7 tr\u1EE3"
            )
          ),
          room,
          React.createElement("div", { className: "clearfix" })
        )
      );
    }
  }]);

  return ListRoomUser;
}(React.Component);

var ListRoomUserItem = function (_React$Component15) {
  _inherits(ListRoomUserItem, _React$Component15);

  function ListRoomUserItem(props) {
    _classCallCheck(this, ListRoomUserItem);

    return _possibleConstructorReturn(this, (ListRoomUserItem.__proto__ || Object.getPrototypeOf(ListRoomUserItem)).call(this, props));
  }

  _createClass(ListRoomUserItem, [{
    key: "handleSelectRoom",
    value: function handleSelectRoom() {
      this.props.handleSelectRoom(this.props.value.ref);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: this.props.value.class_name },
        React.createElement(
          "a",
          { href: "#", className: "new-room", ref: this.props.value.ref, onClick: this.handleSelectRoom.bind(this) },
          React.createElement("img", { src: this.props.value.image, width: "50px" }),
          React.createElement(
            "p",
            null,
            React.createElement(
              "strong",
              null,
              this.props.value.name
            )
          )
        )
      );
    }
  }]);

  return ListRoomUserItem;
}(React.Component);

var ListRoomAdmin = function (_React$Component16) {
  _inherits(ListRoomAdmin, _React$Component16);

  function ListRoomAdmin(props) {
    _classCallCheck(this, ListRoomAdmin);

    var _this21 = _possibleConstructorReturn(this, (ListRoomAdmin.__proto__ || Object.getPrototypeOf(ListRoomAdmin)).call(this));

    _this21.state = {
      listRoom: [],
      search: ""
    };
    interval_room = setInterval(function () {
      document.getElementById("getRoom").click();
    }, 1000);
    return _this21;
  }

  _createClass(ListRoomAdmin, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this22 = this;

      connect_room.on("listroom", function (result) {
        if (typeof result === "string") {
          alertify.warning(notify("notfoundusername"));
        } else {
          console.log(result);
          var listRoom = [];
          if (_this22.state.search) {
            listRoom = result.filter(function (w) {
              return w.Name.includes(_this22.state.search);
            });
          } else {
            listRoom = result;
          }
          _this22.setState({ listRoom: listRoom });
        }
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      connect_room.invoke("FetchListRoom", User.UserName);
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(id) {
      this.setState({ search: id });
    }
  }, {
    key: "handleAdd",
    value: function handleAdd(id) {
      ajaxPromise(link["post_room"], "POST", { roomtype: "general", roomName: id }).then(function (rs) {
        if (rs !== "null" && rs) {
          alertify.success(notify("createRoom"));
        } else {
          alertify.error(notify("errorCreateRoom"));
        }
      });
    }
  }, {
    key: "handleScreen",
    value: function handleScreen(id) {
      this.props.handleScreen(id);
    }
  }, {
    key: "render",
    value: function render() {
      var _this23 = this;

      var list = this.state.listRoom.map(function (v, k) {
        return React.createElement(ListRoomAdminItem, { key: k, room: v, handleScreen: _this23.handleScreen.bind(_this23) });
      });
      return React.createElement(
        "div",
        null,
        React.createElement(Search, { handleSearch: this.handleSearch.bind(this), handleAdd: this.handleAdd.bind(this) }),
        React.createElement(
          "div",
          { onClick: this.handleClick.bind(this), id: "getRoom", className: "d-none" },
          "get room"
        ),
        list
      );
    }
  }]);

  return ListRoomAdmin;
}(React.Component);

var ListRoomAdminItem = function (_React$Component17) {
  _inherits(ListRoomAdminItem, _React$Component17);

  function ListRoomAdminItem() {
    _classCallCheck(this, ListRoomAdminItem);

    return _possibleConstructorReturn(this, (ListRoomAdminItem.__proto__ || Object.getPrototypeOf(ListRoomAdminItem)).apply(this, arguments));
  }

  _createClass(ListRoomAdminItem, [{
    key: "handleScreen",
    value: function handleScreen() {
      localStorage.setItem("roomDetail", JSON.stringify(this.props.room));
      this.props.handleScreen(this.props.room.RoomId);
    }
  }, {
    key: "render",
    value: function render() {
      var name = localStorage.getItem("language") === "vi" ? "Nhóm" : "Group";
      return React.createElement(
        "div",
        { className: "col-xs-12 room-detail", onClick: this.handleScreen.bind(this) },
        React.createElement(
          "div",
          { className: "col-xs-2" },
          React.createElement("img", { src: "images/customer.png", alt: "", className: "img-rounded center-block img-room" })
        ),
        React.createElement(
          "div",
          { className: "col-xs-8" },
          React.createElement(
            "a",
            { href: "#" },
            React.createElement(
              "p",
              { className: "name-group" },
              this.props.room.Name
            ),
            React.createElement(
              "p",
              null,
              this.props.room.NewMessage,
              " (",
              name,
              ": ",
              getTypeString(this.props.room.Type),
              ")"
            )
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "span",
            null,
            convertTime(this.props.room.Time) || ""
          )
        )
      );
    }
  }]);

  return ListRoomAdminItem;
}(React.Component);
//End ListRoom

//Start ChatRoom


var Message = function Message(MessageId, Time, Content, UserName, RoomId) {
  _classCallCheck(this, Message);

  var now = new Date();
  this.MessageId = MessageId || 0, this.Time = Time || now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(), this.Content = Content || "", this.UserName = UserName || User.UserName, this.RoomId = RoomId || localStorage.getItem("roomId");
};

var ChatRoom = function (_React$Component18) {
  _inherits(ChatRoom, _React$Component18);

  function ChatRoom(props) {
    _classCallCheck(this, ChatRoom);

    var _this25 = _possibleConstructorReturn(this, (ChatRoom.__proto__ || Object.getPrototypeOf(ChatRoom)).call(this));

    _this25.state = {
      listMessage: [],
      message: "",
      members: [],
      background: "#fff",
      group: {}
    };
    _this25.connect_chat = new signalR.HubConnection(host + "/signalR/messageHub?authorization=Bearer " + localStorage.getItem('bear') + "&roomId=" + props.roomId);
    _this25.connect_chat.start().then(function (value) {}, function (error) {
      if (error.statusCode === 401) window.location.href = "login.html";
    });
    return _this25;
  }
  // set connection to Hub


  _createClass(ChatRoom, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this26 = this;

      var room = JSON.parse(localStorage.getItem("roomDetail"));
      var that = this;
      var data = {
        RoomId: room.RoomId,
        UserName: User.UserName,
        Limit: 20
      };
      Promise.all([ajaxPromise("/api/message", "GET", data), ajaxPromise("/api/room", "GET", data)]).then(function (rs) {
        _this26.setState({ group: rs[1] });
        that.setState({ listMessage: rs[0], members: rs[1], background: rs[1].find(function (w) {
            return w.item1 === User.UserName;
          }).item3 });
      });
      this.connect_chat.on('fetchmessage', function (result) {
        that.setState({ message: result });
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(message) {
      var msg = new Message(null, null, message, User.UserName, this.props.roomId);
      this.connect_chat.invoke('sendMessage', msg);
    }
  }, {
    key: "handleBackMain",
    value: function handleBackMain() {
      this.props.handleBackMain();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.getElementsByName("message")[0].focus();
      this.website = document.getElementsByClassName('chat-website')[0];
      this.chat = document.getElementsByClassName('chat-block')[0];
    }
  }, {
    key: "handleChangeBackgournd",
    value: function handleChangeBackgournd(id) {
      this.setState({ background: id });
    }
  }, {
    key: "handleViewWebsite",
    value: function handleViewWebsite() {
      setTimeout(function () {
        var website = document.getElementsByClassName('chat-website')[0];
        var chat = document.getElementsByClassName('chat-blur')[0];
        website.style.left = "0px";
        chat.style.filter = "blur(3px)";
      }, 500);
    }
  }, {
    key: "handleCloseWebsite",
    value: function handleCloseWebsite() {
      var website = document.getElementsByClassName('chat-website')[0];
      var chat = document.getElementsByClassName('chat-blur')[0];
      website.style.left = "-80%";
      chat.style.filter = "none";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "chat-block", onClick: this.handleCloseWebsite.bind(this) },
        React.createElement(
          "div",
          { className: "chat-website" },
          React.createElement(Website, null)
        ),
        React.createElement(
          "div",
          { className: "chat-blur" },
          React.createElement(
            "a",
            { href: "#last", id: "golast" },
            "a"
          ),
          React.createElement(HeaderChatRoom, { handleChangeBackgournd: this.handleChangeBackgournd.bind(this),
            handleViewWebsite: this.handleViewWebsite.bind(this),
            handleBackMain: this.handleBackMain.bind(this), members: this.state.members,
            roomId: this.props.roomId,
            handleReturnListRoom: this.handleBackMain.bind(this) }),
          React.createElement(MessageBox, { background: this.state.background, message: this.state.message, listMessage: this.state.listMessage, connect_chat: this.connect_chat }),
          React.createElement(InputMessageBox, { sendMessage: this.sendMessage.bind(this) })
        )
      );
    }
  }]);

  return ChatRoom;
}(React.Component);

var HeaderChatRoom = function (_React$Component19) {
  _inherits(HeaderChatRoom, _React$Component19);

  function HeaderChatRoom(props) {
    _classCallCheck(this, HeaderChatRoom);

    var _this27 = _possibleConstructorReturn(this, (HeaderChatRoom.__proto__ || Object.getPrototypeOf(HeaderChatRoom)).call(this));

    _this27.state = {
      show: false
    };
    return _this27;
  }

  _createClass(HeaderChatRoom, [{
    key: "handleChangeBackgournd",
    value: function handleChangeBackgournd(id) {
      this.props.handleChangeBackgournd(id);
      this.setState({ show: !this.state.show });
    }
  }, {
    key: "showMenu",
    value: function showMenu(e) {
      e.preventDefault();
      this.setState({ show: !this.state.show });
      return false;
    }
  }, {
    key: "handleBackMain",
    value: function handleBackMain() {
      this.props.handleBackMain();
    }
  }, {
    key: "getNameGroup",
    value: function getNameGroup(members) {
      var room = JSON.parse(localStorage.getItem("roomDetail"));
      switch (members.length) {
        case 1:
          return room.Type === "general" ? React.createElement(
            "span",
            null,
            room.Name
          ) : React.createElement(
            "span",
            null,
            "Nh\xF3m m\u1EDBi: ",
            User.item2 || User.item1
          );
        case 2:
          var user = members.find(function (w) {
            return w.item1 !== User.UserName;
          });
          return React.createElement(
            "span",
            null,
            user.item2 || user.item1
          );
        default:
          return;
          React.createElement(
            "div",
            null,
            React.createElement("img", { src: "images/multiple_user.svg" }),
            React.createElement(
              "span",
              null,
              members[0].item2 || members[0].item1,
              ",.."
            )
          );
      }
    }
  }, {
    key: "handleViewWebsite",
    value: function handleViewWebsite() {
      this.props.handleViewWebsite();
      this.setState({ show: !this.state.show });
      return false;
    }
  }, {
    key: "handleReturnListRoom",
    value: function handleReturnListRoom() {
      this.props.handleReturnListRoom();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "header",
        null,
        React.createElement(
          "div",
          { className: "button-back" },
          React.createElement(
            "a",
            { href: "#", className: "display-block", onClick: this.handleBackMain.bind(this) },
            React.createElement("img", { src: "images/back.png", alt: "", className: "img-rounded center-block" })
          )
        ),
        React.createElement(
          "div",
          { className: "room-name" },
          this.getNameGroup(this.props.members)
        ),
        React.createElement(
          "div",
          { className: "note" },
          React.createElement(
            "a",
            { href: "#", className: "display-block", onClick: this.showMenu.bind(this) },
            React.createElement("img", { src: "images/warning.png", alt: "", className: "img-rounded center-block", width: "30px" })
          )
        ),
        React.createElement(HeaderChatRoomMenu, { handleChangeBackgournd: this.handleChangeBackgournd.bind(this),
          handleViewWebsite: this.handleViewWebsite.bind(this),
          show: this.state.show, roomId: this.props.roomId, members: this.props.members,
          handleReturnListRoom: this.handleReturnListRoom.bind(this) })
      );
    }
  }]);

  return HeaderChatRoom;
}(React.Component);

var HeaderChatRoomMenu = function (_React$Component20) {
  _inherits(HeaderChatRoomMenu, _React$Component20);

  function HeaderChatRoomMenu(props) {
    _classCallCheck(this, HeaderChatRoomMenu);

    return _possibleConstructorReturn(this, (HeaderChatRoomMenu.__proto__ || Object.getPrototypeOf(HeaderChatRoomMenu)).call(this));
  }

  _createClass(HeaderChatRoomMenu, [{
    key: "handleChangeBackgournd",
    value: function handleChangeBackgournd() {
      this.refs.background.click();
      return false;
    }
  }, {
    key: "handleSelectMedia",
    value: function handleSelectMedia() {
      var that = this;
      if (this.refs.background.value) {
        var data = void 0;
        var file = this.refs.background.files[0];
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
          data = {
            file: e.target.result,
            name: file.name,
            roomId: localStorage.getItem('roomId')
          };
        });
        FR.readAsDataURL(file);
        var loop = setInterval(function () {
          if (data) {
            clearInterval(loop);
            $.ajax({
              type: "PUT",
              url: host + "/api/room",
              data: data,
              headers: {
                'Authorization': "Bearer " + localStorage.getItem('bear')
              },
              success: function success(data, status, xhr) {
                if (data) that.props.handleChangeBackgournd(data);
              },
              error: function error(result, status, xhr) {
                if (xhr === "Unauthorized") {
                  notifyResult(401);
                  localStorage.removeItem('bear');
                  setTimeout(function () {
                    window.location.href = "login.html";
                  }, 1000);
                }
              }
            });
          }
        }, 100);
      }
    }
  }, {
    key: "handleViewWebsite",
    value: function handleViewWebsite() {
      this.props.handleViewWebsite();
    }
  }, {
    key: "handleChatHistory",
    value: function handleChatHistory() {
      ajaxPromise(link['history'], "POST", { roomId: this.props.roomId }).then(function (rs) {
        if (rs === "true") notify("fetchHistory");else {
          notify("errorFetchHistory");
        }
      });
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      var that = this;
      ajaxPromise(link['close'], "PUT", { roomId: this.props.roomId }).then(function (rs) {
        if (rs) {
          alertify.success(notify("close"));
          setTimeout(function () {
            that.props.handleReturnListRoom();
          }, 1000);
        } else {
          alertify.error(notify("errorClose"));
        }
      });
    }
  }, {
    key: "renderHTML",
    value: function renderHTML() {
      if (User.Role == "4") {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "box-item", onClick: this.handleViewWebsite.bind(this) },
            "Xem Website"
          ),
          React.createElement(
            "div",
            { className: "box-item", onClick: this.handleChangeBackgournd.bind(this) },
            "Thay \u0111\u1ED5i \u1EA3nh n\u1EC1n",
            React.createElement("input", { type: "file", name: "background", id: "background", ref: "background", className: "hidden", onChange: this.handleSelectMedia.bind(this) })
          ),
          React.createElement(
            "div",
            { className: "box-item" },
            "M\u1EDDi th\xEAm ng\u01B0\u1EDDi v\xE0o nh\xF3m"
          )
        );
      } else {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "box-item", onClick: this.handleViewWebsite.bind(this) },
            "Xem Website"
          ),
          React.createElement(
            "div",
            { className: "box-item", onClick: this.handleChangeBackgournd.bind(this) },
            "Thay \u0111\u1ED5i \u1EA3nh n\u1EC1n",
            React.createElement("input", { type: "file", name: "background", id: "background", ref: "background", className: "hidden", onChange: this.handleSelectMedia.bind(this) })
          ),
          React.createElement(
            "div",
            { className: "box-item" },
            "M\u1EDDi th\xEAm ng\u01B0\u1EDDi v\xE0o nh\xF3m"
          ),
          React.createElement(
            "div",
            { className: "box-item" },
            "R\u1EDDi kh\u1ECFi nh\xF3m"
          ),
          React.createElement(
            "div",
            { className: "box-item", onClick: this.handleChatHistory.bind(this) },
            "Sao l\u01B0u d\u1EEF li\u1EC7u"
          ),
          React.createElement(
            "div",
            { className: "box-item", onClick: this.handleClose.bind(this) },
            "\u0110\xF3ng nh\xF3m"
          )
        );
      }
    }
  }, {
    key: "render",
    value: function render() {
      var show = this.props.show ? "note-box" : "note-box hidden";
      return React.createElement(
        "div",
        { className: show },
        React.createElement("input", { type: "file", name: "background", id: "background", className: "hide" }),
        this.renderHTML()
      );
    }
  }]);

  return HeaderChatRoomMenu;
}(React.Component);

var InputMessageBox = function (_React$Component21) {
  _inherits(InputMessageBox, _React$Component21);

  function InputMessageBox(props) {
    _classCallCheck(this, InputMessageBox);

    return _possibleConstructorReturn(this, (InputMessageBox.__proto__ || Object.getPrototypeOf(InputMessageBox)).call(this));
  }

  _createClass(InputMessageBox, [{
    key: "sendMessage",
    value: function sendMessage() {
      if (this.refs.message.value) {
        this.props.sendMessage(this.refs.message.value);
        document.getElementsByName("message")[0].value = "";
      }
    }
  }, {
    key: "enterInput",
    value: function enterInput(e) {
      if (e.key === "Enter") this.sendMessage();
    }
  }, {
    key: "handleTriggerMedia",
    value: function handleTriggerMedia(e) {
      this.refs.image.click();
      return false;
    }
  }, {
    key: "handleSelectMedia",
    value: function handleSelectMedia() {
      var that = this;
      if (this.refs.image.value) {
        var data = void 0;
        var file = this.refs.image.files[0];
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
          data = {
            file: e.target.result,
            name: file.name
          };
        });
        FR.readAsDataURL(file);
        var loop = setInterval(function () {
          if (data) {
            clearInterval(loop);
            $.ajax({
              type: "POST",
              url: host + "/api/media",
              data: data,
              crossDomain: true,
              headers: {
                'Authorization': "Bearer " + localStorage.getItem('bear')
              },
              success: function success(data, status, xhr) {
                that.refs.message.value = data;
                that.sendMessage();
              },
              error: function error(result, status, xhr) {
                if (xhr === "Unauthorized") {
                  notifyResult(401);
                  localStorage.removeItem('bear');
                  setTimeout(function () {
                    window.location.href = "login.html";
                  }, 1000);
                }
              }
            });
          }
        }, 100);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var action = host + "/api/media";
      return React.createElement(
        "footer",
        null,
        React.createElement(
          "div",
          { className: "button-back" },
          React.createElement(
            "form",
            { action: action, method: "POST", encType: "multipart/form-data", id: "postmedia" },
            React.createElement(
              "a",
              { href: "#golast", className: "display-block", onClick: this.handleTriggerMedia.bind(this) },
              React.createElement("img", { src: "images/media.png", alt: "", id: "image", className: "img-rounded center-block", width: "30px" }),
              React.createElement("input", { type: "file", name: "images", id: "images", ref: "image", className: "hidden", multiple: true, onChange: this.handleSelectMedia.bind(this) })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "input-message" },
          React.createElement("input", { type: "text", name: "message", ref: "message", onKeyPress: this.enterInput.bind(this) }),
          React.createElement(
            "a",
            { href: "#", className: "display-block", onClick: this.sendMessage.bind(this) },
            React.createElement("img", { src: "images/send.png", alt: "", className: "img-rounded center-block" })
          )
        )
      );
    }
  }]);

  return InputMessageBox;
}(React.Component);

var MessageBox = function (_React$Component22) {
  _inherits(MessageBox, _React$Component22);

  function MessageBox(props) {
    _classCallCheck(this, MessageBox);

    var _this30 = _possibleConstructorReturn(this, (MessageBox.__proto__ || Object.getPrototypeOf(MessageBox)).call(this));

    _this30.listMessage = props.listMessage;
    return _this30;
  }

  _createClass(MessageBox, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.listMessage = props.listMessage;
      if (props.message) {
        this.listMessage.push({
          messageId: props.message.MessageId,
          content: props.message.Content,
          roomId: props.message.RoomId,
          time: props.message.Time,
          userName: props.message.UserName
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.getElementById("golast").click();
    }
  }, {
    key: "render",
    value: function render() {
      var _this31 = this;

      var background = this.props.background.startsWith("#") ? this.props.background : "url(\"" + host + "/" + this.props.background + "\") no-repeat center center fixed";
      var list = "";
      if (this.listMessage) {
        list = this.listMessage.map(function (v, k) {
          return v.userName === User.UserName ? React.createElement(MyMessage, { key: k, message: v, isLast: k === _this31.listMessage.length - 1 }) : React.createElement(OtherMessage, { key: k, message: v, isLast: k === _this31.listMessage.length - 1 });
        });
      }
      return React.createElement(
        "div",
        { className: "list-message", style: { background: background } },
        list
      );
    }
  }]);

  return MessageBox;
}(React.Component);

var MyMessage = function (_React$Component23) {
  _inherits(MyMessage, _React$Component23);

  function MyMessage() {
    _classCallCheck(this, MyMessage);

    return _possibleConstructorReturn(this, (MyMessage.__proto__ || Object.getPrototypeOf(MyMessage)).apply(this, arguments));
  }

  _createClass(MyMessage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.getElementById("golast").click();
      document.getElementsByName("message")[0].focus();
    }
  }, {
    key: "render",
    value: function render() {
      var message = this.props.message.content.startsWith("/uploads/") ? React.createElement("img", { src: host + "\\" + this.props.message.content, style: { maxWidth: window.innerWidth - 100 } }) : this.props.message.content;
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "detail-message-right clearfix", id: this.props.isLast ? "last" : "top" },
          React.createElement(
            "div",
            { className: "owner" },
            React.createElement(
              "span",
              null,
              message
            ),
            React.createElement("br", null),
            React.createElement(
              "p",
              null,
              convertTime(this.props.message.time)
            )
          )
        ),
        React.createElement("div", { className: "clearfix" })
      );
    }
  }]);

  return MyMessage;
}(React.Component);

var OtherMessage = function (_React$Component24) {
  _inherits(OtherMessage, _React$Component24);

  function OtherMessage() {
    _classCallCheck(this, OtherMessage);

    return _possibleConstructorReturn(this, (OtherMessage.__proto__ || Object.getPrototypeOf(OtherMessage)).apply(this, arguments));
  }

  _createClass(OtherMessage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.getElementById("golast").click();
      document.getElementsByName("message")[0].focus();
    }
  }, {
    key: "render",
    value: function render() {
      var message = this.props.message.content.startsWith("/uploads/") ? React.createElement("img", { src: host + "\\" + this.props.message.content, style: { maxWidth: window.innerWidth - 100 } }) : this.props.message.content;
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "detail-message-left", id: this.props.isLast ? "last" : "top" },
          React.createElement(
            "div",
            { className: "other" },
            React.createElement(
              "span",
              null,
              message
            ),
            React.createElement("br", null),
            React.createElement(
              "p",
              null,
              convertTime(this.props.message.time)
            )
          )
        ),
        React.createElement("div", { className: "clearfix" })
      );
    }
  }]);

  return OtherMessage;
}(React.Component);
//End ChatRoom

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
try {
  document.getElementsByName("message")[0].focus();
} catch (err) {}
