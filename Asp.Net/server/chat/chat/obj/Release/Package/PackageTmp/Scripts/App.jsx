function getTypeString(a) {
    switch (a) {
        case 0: return "Hỗ trợ chung";
        case 1: return "Kỹ thuật";
        default: return "Mua bán";
    }
}
function getTime(a) {
    if (a) return (a.split('T')[1]).substring(0, 5);
    else return "";
}
class Menu
{
    // Class data menu
    constructor(link,selector,id,src,content)
    {
        this.link = link
        this.selector = selector
        this.id = id
        this.src = src
        this.content = content
    }
}
class Tab
{
    // class data tab
    constructor(link, selector, src)
    {
        this.link = link
        this.selector = selector
        this.src = src
    }
}
class App extends React.Component {
    constructor()
    {
        super();
        this.state = {
            tab: ""
        }
    }
    // danh sach menu
    getListMenu() {
        let a = new Array();
        a.push(new Menu("/Home/Profile", "menu-profile", "", "/Content/images/logo.jpg", ""));
        a.push(new Menu("#", "menu-image", "product", "/Content/images/menu1.png", "Sản phẩm"));
        a.push(new Menu("/home/website", "menu-image", "", "/Content/images/menu2.png", "Website"));
        a.push(new Menu("/home/intro", "menu-image", "", "/Content/images/menu3.png", "Giới thiệu"));
        a.push(new Menu("/home/listroom", "menu-image", "", "/Content/images/menu4.png", "Nhóm hỗ trợ"));
        a.push(new Menu("#", "menu-image logout", "", "/Content/images/menu5.png", "Đăng xuất"));
        return a;
    }
    // danh sach tab
    getListTabs()
    {
        let a = new Array();
        a.push(new Tab("#", "menu-left","/Content/images/icon1.png"));
        a.push(new Tab("listroom", "", "/Content/images/icon2.png"));
        a.push(new Tab("website", "", "/Content/images/icon3.png"));
        a.push(new Tab("setting", "", "/Content/images/setting.png"));
        return a;
    }
    // hanh dong select tab
    // hanh dong nay se thay doi tab hien thi
    // prop tren MainTab se thay doi
    actionSelectTab(e)
    {
        this.setState({ tab: e });
    }

    render() {
        return (
            <div>
                <Aside ListMenu={this.getListMenu()} />
                <MainTab tab={this.state.tab} />
                <Tabs listTab={this.getListTabs()} onSelectTab={this.actionSelectTab.bind(this)} />
            </div>
        );
    }
}
// Menu
class Aside extends React.Component {
    render() {
        let listmenu = this.props.ListMenu.map((v, k) => {
            return (
                <MenuItem key={k} value={v} />
            )
        });
        return (
            <aside className="sidebar" id="aside">
                <div className="menu">
                    {listmenu}
                </div>
            </aside>
        );
    }
}
class MenuItem extends React.Component {
    render() {
        return (
            <div className="menu-item" id={this.props.id} >
                <a href={this.props.value.link}>
                    <div className={this.props.value.selector}>
                        <img src={this.props.value.src} />
                    </div>
                    <p>
                        {this.props.value.content}
                    </p>
                </a>
            </div>
        )

    }
}
// Tab
class Tabs extends React.Component {
    constructor() {
        super();
    }
    handleSelectTab(e)
    {
        this.props.onSelectTab(e);
    }

    render()
    {
        let listTabs = this.props.listTab.map((v, k) => {
            return (
                <TabItem key={k} value={v} handleSelectTab={this.handleSelectTab.bind(this)} />
                )
        })
        return (
            <div className="menu-footer clearfix" >
                {listTabs}
            </div>
        )
    }
}
class TabItem extends React.Component{
    constructor()
    {
        super();
    }
    handleClick(e)
    {
        this.props.handleSelectTab(e);
    }

    render()
    {
        return (
            <div className="col-md-3 col-xs-3" onClick={this.handleClick.bind(this, this.props.value.link)}>
                <a href="#" className={this.props.value.selector}>
                    <img src={this.props.value.src} />
                </a>
            </div>
            )
    }
}
//MainTab
class MainTab extends React.Component
{
    render()
    {
        let a = (this.props.tab === "#" || !this.props.tab) ? "listroom" : this.props.tab;
        return (
            <div>
                <MainRoom hidden={a} />
                <Website hidden={a} />
                <Setting hidden={a} />
            </div>
        );
    }
}
// MainRoom
class MainRoom extends React.Component
{
    constructor() {
        super();
        this.state = {
            listRoom: [],
            search: '',
            interval: function () { }

        }
    }
    getListRoom() {
        let that = this;
        this.setState({
            interval: setInterval(function () {
                let listRoom = JSON.parse(localStorage.getItem('list')) || [];
                let tempory = [];
                listRoom.forEach((v, k) => {
                    if (v[1].toLocaleLowerCase().includes(that.state.search.toLocaleLowerCase())
                        || getTypeString(v[4]).toLocaleLowerCase().includes(that.state.search.toLocaleLowerCase())) {
                        tempory.push(v);
                    }
                })
                that.setState({ listRoom: tempory });
            }, 500)
        }) 

    }
    actionSearch(id) {
        let listRoom = JSON.parse(localStorage.getItem('list'));
        let tempory = [];
        listRoom.forEach((v, k) => {
            if (v[1].toLocaleLowerCase().includes(id.toLocaleLowerCase())
                || getTypeString(v[4]).toLocaleLowerCase().includes(id.toLocaleLowerCase())) {
                tempory.push(v);
            }
        })
        this.setState({ listRoom: tempory, search: id.toLocaleLowerCase() });
    }
    actionAdd(id) {
        $.ajax({
            type: "PUT",
            url: "/api/rooms/" + id,
            dataType: "json",
            headers: { 'Authorization': localStorage.getItem("token") },
            success: function (data) {
                if (data) {
                    window.location.href = `/home/chat?type=${data.RoomId}`;
                }
                else {
                    alert("Bạn không có đủ quyền hoặc tên nhóm đã tồn tại.")
                }
            }
        })
    }
    componentDidMount() {
        this.getListRoom();
    }

    componentWillUnmount()
    {
        clearInterval(this.state.interval);
    }

    render()
    {
        let hidden = this.props.hidden === "listroom" ? "block" : "hidden";
        return (
            <div className={hidden}>
                <Search onSearch={this.actionSearch.bind(this)} onAdd={this.actionAdd.bind(this)} />
                <ListRoom ListRoom={this.state.listRoom} />
            </div>
        )
    }
}
class Search extends React.Component{
    handleSearch()
    {
        this.props.onSearch(this.refs.search.value);
    }
    handleAdd()
    {
        var s = prompt("Nhập tên nhóm: ");
        if (s) this.props.onAdd(s);
        else alert("Tên nhóm không hợp lệ");
    }
    render() {
        return (
            <div id="top-content">
                <div className="header-title">
                    <div className="search-icon">
                        <img src="/Content/images/search.png" width="30px" />
                    </div>
                    <div className="search-textbox">
                        <input type="text" ref="search" name="search" className="form-control" placeholder="Tìm kiếm" onKeyUp={this.handleSearch.bind(this)} />
                    </div>
                    <div className="search-add">
                        <img src="/Content/images/60740.svg" width="30px" onClick={this.handleAdd.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
};
class ListRoom extends React.Component {
    constructor()
    {
        super();
        this.state = {
            ListRoom: []
        }
    }

    render() {
        let listRoom;
        if (this.props.ListRoom)
        {
            listRoom = this.props.ListRoom.map((w, index) => {
                return (
                    <RoomItem key={index} value={w} />
                );
            })
        }
        
        return (
            <div className="Listdata">
                {listRoom}
            </div>
        );
    }
}
class RoomItem extends React.Component
{
    render() {
        let b = this.props.value[0].Status ? "col-xs-12 room-detail lock" : "col-xs-12 room-detail";
        let a = "/Home/Chat?type=" + this.props.value[0];
        let name = this.props.value[4] != 3
            ? `${getTypeString(this.props.value[4])}: ${this.props.value[1].substring(2)}`
            : this.props.value[1];
        return (
            <div className={b} id={this.props.value[0]} >
                <div className="col-xs-2">
                    <img src="/Content/images/customer.png" alt="" className="img-rounded center-block img-room" />
                </div>
                    <div className="col-xs-8">                      
                    <a href={a}>
                        <p className="name-group">
                            {name}
                            </p>
                            <p>
                                {this.props.value[5]}
                            </p>
                        </a>
                    </div>
                    <div>
                        <span>{getTime(this.props.value[6])}</span>
                    </div>
                </div>
            )
    }
}
// Website
class Website extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            w: window.innerWidth,
            h: window.innerHeight

        }
    }

    resizeWindow()
    {
        $(window).resize(() => {
            this.setState({
                w: window.innerWidth,
                h: window.innerHeight
            })
        })
    }

    componentDidMount()
    {
        this.resizeWindow();
    }

    render()
    {
        let hidden = this.props.hidden === "website" ? "block product" : "hidden";
        return (
            <div className={hidden}>
                <iframe src="http://vinhlocgroup.com/san-pham/page" width={this.state.w} height={this.state.h}></iframe>
            </div>
            )
    }
}
//Setting
class Setting extends React.Component
{
    render()
    {
        let hidden = this.props.hidden === "setting" ? "block" : "hidden";
        return (
            <div className={hidden}>
                <Person />
                <MenuSetting />
            </div>
        )
    }
}
class Person extends React.Component
{
    constructor(props)
    {
        super(props);
        this.actionNavigate = this.navigateToProfile.bind(this);
    }

    navigateToProfile()
    {
        window.location.href = '/home/profile';
    }

    render()
    {
        let data = JSON.parse(localStorage.getItem("user"));
        return (
            <div className="profile-info clearfix" role="button" onClick={this.actionNavigate}>
                <div className="col-md-3 col-xs-3 col-sm-3 text-center">
                    <img src={data[2].Value} />
                </div>
                <div className="col-md-9 col-xs-9 col-sm-9 text-left">
                    <h3 className="modal-title">
                        {data[3].Value}
                    </h3>
                </div>
            </div>
        )
    }
}
class MenuSetting extends React.Component
{
    constructor(props)
    {
        super(props);
        this.logout = this.handleLogout.bind(this);
    }
    handleLogout()
    {
        localStorage.clear();
        window.location.href = "/home/login";
    }
    render()
    {
        return  (
            <div className="profile-info clearfix" role="button" onClick={this.logout}>
                <div className="col-md-3 col-xs-3 col-sm-3 text-center">
                    <img src="/Content/Images/icon4.png" />
                </div>
                <div className="col-md-9 col-xs-9 col-sm-9 text-left">
                    <h3 className="modal-title">
                        Đăng xuất
                    </h3>
                </div>
            </div>
            )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);

