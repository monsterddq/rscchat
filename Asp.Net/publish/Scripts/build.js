"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getTypeString(a) {
    switch (a) {
        case 0:
            return "Hỗ trợ chung";
        case 1:
            return "Kỹ thuật";
        default:
            return "Mua bán";
    }
}
function getTime(a) {
    if (a) return a.split('T')[1].substring(0, 5); else return "";
}

var Menu =
    // Class data menu
    function Menu(link, selector, id, src, content) {
        _classCallCheck(this, Menu);

        this.link = link;
        this.selector = selector;
        this.id = id;
        this.src = src;
        this.content = content;
    };

var Tab =
    // class data tab
    function Tab(link, selector, src) {
        _classCallCheck(this, Tab);

        this.link = link;
        this.selector = selector;
        this.src = src;
    };

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            tab: ""
        };
        return _this;
    }
    // danh sach menu


    _createClass(App, [{
        key: "getListMenu",
        value: function getListMenu() {
            var a = new Array();
            a.push(new Menu("/Home/Profile", "menu-profile", "", "/Content/images/logo.jpg", ""));
            a.push(new Menu("#", "menu-image", "product", "/Content/images/menu1.png", "Sản phẩm"));
            a.push(new Menu("/home/website", "menu-image", "", "/Content/images/menu2.png", "Website"));
            a.push(new Menu("/home/intro", "menu-image", "", "/Content/images/menu3.png", "Giới thiệu"));
            a.push(new Menu("/home/listroom", "menu-image", "", "/Content/images/menu4.png", "Nhóm hỗ trợ"));
            a.push(new Menu("#", "menu-image logout", "", "/Content/images/menu5.png", "Đăng xuất"));
            return a;
        }
        // danh sach tab

    }, {
        key: "getListTabs",
        value: function getListTabs() {
            var a = new Array();
            a.push(new Tab("#", "menu-left", "/Content/images/icon1.png"));
            a.push(new Tab("listroom", "", "/Content/images/icon2.png"));
            a.push(new Tab("website", "", "/Content/images/icon3.png"));
            a.push(new Tab("setting", "", "/Content/images/setting.png"));
            return a;
        }
        // hanh dong select tab
        // hanh dong nay se thay doi tab hien thi
        // prop tren MainTab se thay doi

    }, {
        key: "actionSelectTab",
        value: function actionSelectTab(e) {
            this.setState({ tab: e });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Aside, { ListMenu: this.getListMenu() }),
                React.createElement(MainTab, { tab: this.state.tab }),
                React.createElement(Tabs, { listTab: this.getListTabs(), onSelectTab: this.actionSelectTab.bind(this) })
            );
        }
    }]);

    return App;
}(React.Component);
// Menu


var Aside = function (_React$Component2) {
    _inherits(Aside, _React$Component2);

    function Aside() {
        _classCallCheck(this, Aside);

        return _possibleConstructorReturn(this, (Aside.__proto__ || Object.getPrototypeOf(Aside)).apply(this, arguments));
    }

    _createClass(Aside, [{
        key: "render",
        value: function render() {
            var listmenu = this.props.ListMenu.map(function (v, k) {
                return React.createElement(MenuItem, { key: k, value: v });
            });
            return React.createElement(
                "aside",
                { className: "sidebar", id: "aside" },
                React.createElement(
                    "div",
                    { className: "menu" },
                    listmenu
                )
            );
        }
    }]);

    return Aside;
}(React.Component);

var MenuItem = function (_React$Component3) {
    _inherits(MenuItem, _React$Component3);

    function MenuItem() {
        _classCallCheck(this, MenuItem);

        return _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));
    }

    _createClass(MenuItem, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "menu-item", id: this.props.id },
                React.createElement(
                    "a",
                    { href: this.props.value.link },
                    React.createElement(
                        "div",
                        { className: this.props.value.selector },
                        React.createElement("img", { src: this.props.value.src })
                    ),
                    React.createElement(
                        "p",
                        null,
                        this.props.value.content
                    )
                )
            );
        }
    }]);

    return MenuItem;
}(React.Component);
// Tab


var Tabs = function (_React$Component4) {
    _inherits(Tabs, _React$Component4);

    function Tabs() {
        _classCallCheck(this, Tabs);

        return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this));
    }

    _createClass(Tabs, [{
        key: "handleSelectTab",
        value: function handleSelectTab(e) {
            this.props.onSelectTab(e);
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var listTabs = this.props.listTab.map(function (v, k) {
                return React.createElement(TabItem, { key: k, value: v, handleSelectTab: _this5.handleSelectTab.bind(_this5) });
            });
            return React.createElement(
                "div",
                { className: "menu-footer clearfix" },
                listTabs
            );
        }
    }]);

    return Tabs;
}(React.Component);

var TabItem = function (_React$Component5) {
    _inherits(TabItem, _React$Component5);

    function TabItem() {
        _classCallCheck(this, TabItem);

        return _possibleConstructorReturn(this, (TabItem.__proto__ || Object.getPrototypeOf(TabItem)).call(this));
    }

    _createClass(TabItem, [{
        key: "handleClick",
        value: function handleClick(e) {
            this.props.handleSelectTab(e);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "col-md-3 col-xs-3", onClick: this.handleClick.bind(this, this.props.value.link) },
                React.createElement(
                    "a",
                    { href: "#", className: this.props.value.selector },
                    React.createElement("img", { src: this.props.value.src })
                )
            );
        }
    }]);

    return TabItem;
}(React.Component);
//MainTab


var MainTab = function (_React$Component6) {
    _inherits(MainTab, _React$Component6);

    function MainTab() {
        _classCallCheck(this, MainTab);

        return _possibleConstructorReturn(this, (MainTab.__proto__ || Object.getPrototypeOf(MainTab)).apply(this, arguments));
    }

    _createClass(MainTab, [{
        key: "render",
        value: function render() {
            var a = this.props.tab === "#" || !this.props.tab ? "listroom" : this.props.tab;
            return React.createElement(
                "div",
                null,
                React.createElement(MainRoom, { hidden: a }),
                React.createElement(Website, { hidden: a }),
                React.createElement(Setting, { hidden: a })
            );
        }
    }]);

    return MainTab;
}(React.Component);
// MainRoom


var MainRoom = function (_React$Component7) {
    _inherits(MainRoom, _React$Component7);

    function MainRoom() {
        _classCallCheck(this, MainRoom);

        var _this8 = _possibleConstructorReturn(this, (MainRoom.__proto__ || Object.getPrototypeOf(MainRoom)).call(this));

        _this8.state = {
            listRoom: [],
            search: '',
            interval: function interval() { }

        };
        return _this8;
    }

    _createClass(MainRoom, [{
        key: "getListRoom",
        value: function getListRoom() {
            var that = this;
            this.setState({
                interval: setInterval(function () {
                    var listRoom = JSON.parse(localStorage.getItem('list')) || [];
                    var tempory = [];
                    listRoom.forEach(function (v, k) {
                        if (v[1].toLocaleLowerCase().includes(that.state.search.toLocaleLowerCase()) || getTypeString(v[4]).toLocaleLowerCase().includes(that.state.search.toLocaleLowerCase())) {
                            tempory.push(v);
                        }
                    });
                    that.setState({ listRoom: tempory });
                }, 500)
            });
        }
    }, {
        key: "actionSearch",
        value: function actionSearch(id) {
            var listRoom = JSON.parse(localStorage.getItem('list'));
            var tempory = [];
            listRoom.forEach(function (v, k) {
                if (v[1].toLocaleLowerCase().includes(id.toLocaleLowerCase()) || getTypeString(v[4]).toLocaleLowerCase().includes(id.toLocaleLowerCase())) {
                    tempory.push(v);
                }
            });
            this.setState({ listRoom: tempory, search: id.toLocaleLowerCase() });
        }
    }, {
        key: "actionAdd",
        value: function actionAdd(id) {
            $.ajax({
                type: "PUT",
                url: "/api/rooms/" + id,
                dataType: "json",
                headers: { 'Authorization': localStorage.getItem("token") },
                success: function success(data) {
                    if (data) {
                        window.location.href = "/home/chat?type=" + data.RoomId;
                    } else {
                        alert("Bạn không có đủ quyền hoặc tên nhóm đã tồn tại.");
                    }
                }
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.getListRoom();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.state.interval);
        }
    }, {
        key: "render",
        value: function render() {
            var hidden = this.props.hidden === "listroom" ? "block" : "hidden";
            return React.createElement(
                "div",
                { className: hidden },
                React.createElement(Search, { onSearch: this.actionSearch.bind(this), onAdd: this.actionAdd.bind(this) }),
                React.createElement(ListRoom, { ListRoom: this.state.listRoom })
            );
        }
    }]);

    return MainRoom;
}(React.Component);

var Search = function (_React$Component8) {
    _inherits(Search, _React$Component8);

    function Search() {
        _classCallCheck(this, Search);

        return _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));
    }

    _createClass(Search, [{
        key: "handleSearch",
        value: function handleSearch() {
            this.props.onSearch(this.refs.search.value);
        }
    }, {
        key: "handleAdd",
        value: function handleAdd() {
            var s = prompt("Nhập tên nhóm: ");
            if (s) this.props.onAdd(s); else alert("Tên nhóm không hợp lệ");
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "top-content" },
                React.createElement(
                    "div",
                    { className: "header-title" },
                    React.createElement(
                        "div",
                        { className: "search-icon" },
                        React.createElement("img", { src: "/Content/images/search.png", width: "30px" })
                    ),
                    React.createElement(
                        "div",
                        { className: "search-textbox" },
                        React.createElement("input", { type: "text", ref: "search", name: "search", className: "form-control", placeholder: "T\xECm ki\u1EBFm", onKeyUp: this.handleSearch.bind(this) })
                    ),
                    React.createElement(
                        "div",
                        { className: "search-add" },
                        React.createElement("img", { src: "/Content/images/60740.svg", width: "30px", onClick: this.handleAdd.bind(this) })
                    )
                )
            );
        }
    }]);

    return Search;
}(React.Component);

;

var ListRoom = function (_React$Component9) {
    _inherits(ListRoom, _React$Component9);

    function ListRoom() {
        _classCallCheck(this, ListRoom);

        var _this10 = _possibleConstructorReturn(this, (ListRoom.__proto__ || Object.getPrototypeOf(ListRoom)).call(this));

        _this10.state = {
            ListRoom: []
        };
        return _this10;
    }

    _createClass(ListRoom, [{
        key: "render",
        value: function render() {
            var listRoom = void 0;
            if (this.props.ListRoom) {
                listRoom = this.props.ListRoom.map(function (w, index) {
                    return React.createElement(RoomItem, { key: index, value: w });
                });
            }

            return React.createElement(
                "div",
                { className: "Listdata" },
                listRoom
            );
        }
    }]);

    return ListRoom;
}(React.Component);

var RoomItem = function (_React$Component10) {
    _inherits(RoomItem, _React$Component10);

    function RoomItem() {
        _classCallCheck(this, RoomItem);

        return _possibleConstructorReturn(this, (RoomItem.__proto__ || Object.getPrototypeOf(RoomItem)).apply(this, arguments));
    }

    _createClass(RoomItem, [{
        key: "render",
        value: function render() {
            var b = this.props.value[0].Status ? "col-xs-12 room-detail lock" : "col-xs-12 room-detail";
            var a = "/Home/Chat?type=" + this.props.value[0];
            var name = this.props.value[4] != 3 ? getTypeString(this.props.value[4]) + ": " + this.props.value[1].substring(2) : this.props.value[1];
            return React.createElement(
                "div",
                { className: b, id: this.props.value[0] },
                React.createElement(
                    "div",
                    { className: "col-xs-2" },
                    React.createElement("img", { src: "/Content/images/customer.png", alt: "", className: "img-rounded center-block img-room" })
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-8" },
                    React.createElement(
                        "a",
                        { href: a },
                        React.createElement(
                            "p",
                            { className: "name-group" },
                            name
                        ),
                        React.createElement(
                            "p",
                            null,
                            this.props.value[5]
                        )
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "span",
                        null,
                        getTime(this.props.value[6])
                    )
                )
            );
        }
    }]);

    return RoomItem;
}(React.Component);
// Website


var Website = function (_React$Component11) {
    _inherits(Website, _React$Component11);

    function Website() {
        _classCallCheck(this, Website);

        var _this12 = _possibleConstructorReturn(this, (Website.__proto__ || Object.getPrototypeOf(Website)).call(this));

        _this12.state = {
            w: window.innerWidth,
            h: window.innerHeight

        };
        return _this12;
    }

    _createClass(Website, [{
        key: "resizeWindow",
        value: function resizeWindow() {
            var _this13 = this;

            $(window).resize(function () {
                _this13.setState({
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
            var hidden = this.props.hidden === "website" ? "block product" : "hidden";
            return React.createElement(
                "div",
                { className: hidden },
                React.createElement("iframe", { src: "http://vinhlocgroup.com/san-pham/page", width: this.state.w, height: this.state.h })
            );
        }
    }]);

    return Website;
}(React.Component);
//Setting


var Setting = function (_React$Component12) {
    _inherits(Setting, _React$Component12);

    function Setting() {
        _classCallCheck(this, Setting);

        return _possibleConstructorReturn(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).apply(this, arguments));
    }

    _createClass(Setting, [{
        key: "render",
        value: function render() {
            var hidden = this.props.hidden === "setting" ? "block" : "hidden";
            return React.createElement(
                "div",
                { className: hidden },
                React.createElement(Person, null),
                React.createElement(AddFriend, null),
                React.createElement(MenuSetting, null)
            );
        }
    }]);

    return Setting;
}(React.Component);

var Person = function (_React$Component13) {
    _inherits(Person, _React$Component13);

    function Person(props) {
        _classCallCheck(this, Person);

        var _this15 = _possibleConstructorReturn(this, (Person.__proto__ || Object.getPrototypeOf(Person)).call(this, props));

        _this15.actionNavigate = _this15.navigateToProfile.bind(_this15);
        return _this15;
    }

    _createClass(Person, [{
        key: "navigateToProfile",
        value: function navigateToProfile() {
            window.location.href = '/home/profile';
        }
    }, {
        key: "render",
        value: function render() {
            var data = JSON.parse(localStorage.getItem("user"));
            return React.createElement(
                "div",
                { className: "profile-info clearfix", role: "button", onClick: this.actionNavigate },
                React.createElement(
                    "div",
                    { className: "col-md-3 col-xs-3 col-sm-3 text-center" },
                    React.createElement("img", { src: data[2].Value })
                ),
                React.createElement(
                    "div",
                    { className: "col-md-9 col-xs-9 col-sm-9 text-left" },
                    React.createElement(
                        "h3",
                        { className: "modal-title" },
                        data[3].Value
                    )
                )
            );
        }
    }]);

    return Person;
}(React.Component);

var MenuSetting = function (_React$Component14) {
    _inherits(MenuSetting, _React$Component14);

    function MenuSetting(props) {
        _classCallCheck(this, MenuSetting);

        var _this16 = _possibleConstructorReturn(this, (MenuSetting.__proto__ || Object.getPrototypeOf(MenuSetting)).call(this, props));

        _this16.logout = _this16.handleLogout.bind(_this16);
        return _this16;
    }

    _createClass(MenuSetting, [{
        key: "handleLogout",
        value: function handleLogout() {
            localStorage.clear();
            window.location.href = "/home/login";
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "profile-info clearfix", role: "button", onClick: this.logout },
                React.createElement(
                    "div",
                    { className: "col-md-3 col-xs-3 col-sm-3 text-center" },
                    React.createElement("img", { src: "/Content/Images/icon4.png" })
                ),
                React.createElement(
                    "div",
                    { className: "col-md-9 col-xs-9 col-sm-9 text-left" },
                    React.createElement(
                        "h3",
                        { className: "modal-title" },
                        "\u0110\u0103ng xu\u1EA5t"
                    )
                )
            );
        }
    }]);

    return MenuSetting;
}(React.Component);

var AddFriend = function (_React$Component15) {
    _inherits(AddFriend, _React$Component15);

    function AddFriend() {
        _classCallCheck(this, AddFriend);

        return _possibleConstructorReturn(this, (AddFriend.__proto__ || Object.getPrototypeOf(AddFriend)).apply(this, arguments));
    }

    _createClass(AddFriend, [{
        key: "handleClick",
        value: function handleClick() {
            alert("Chức năng đang cập nhập");
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "profile-info clearfix", role: "button", onClick: this.actionNavigate },
                React.createElement(
                    "div",
                    { className: "col-md-3 col-xs-3 col-sm-3 text-center" },
                    React.createElement("img", { src: "/Content/Images/addicon.png" })
                ),
                React.createElement(
                    "div",
                    { className: "col-md-9 col-xs-9 col-sm-9 text-left" },
                    React.createElement(
                        "h3",
                        { className: "modal-title", onClick: this.handleClick.bind(this) },
                        "Th\xEAm b\u1EA1n"
                    )
                )
            );
        }
    }]);

    return AddFriend;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));