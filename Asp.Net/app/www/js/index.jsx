var connection = new signalR.HubConnection(`${host}/roomHub`);
connection.on('addMessage', (message) => {
    console.log(message);
});
if(!User.UserName) window.location.href = "/login.html";
class App extends React.Component {
    constructor()
    {
        super();
        this.state = {
          main: 1,
        }
    }

    componentDidMount(){
      connection.start();
    }

    handleMenu(id){
      connection.invoke('addMessage', id);
      this.setState({main: id});
    }

    render() {
        return (
            <div>
                <Main main={this.state.main} />
                <Menu handleMenu={this.handleMenu.bind(this)}/>
            </div>
        );
    }
}

// Start Menu
class MenuEntity{
  constructor(id,image){
    this.id = id,
    this.image = image
  }
}
class Menu extends React.Component{
  constructor(){
    super();
    this.menu = [new MenuEntity(1,"images/icon1.png"),
                 new MenuEntity(2,"images/menu4.png"),
                 new MenuEntity(3,"images/icon3.png"),
                 new MenuEntity(4,"images/setting.png")];
  }

  handleMenu(id){
    this.props.handleMenu(id);
  }

  render(){
    let listMenu = this.menu.map((v,k)=>{
      return <MenuItem key={k} index={v.id} image={v.image} handleMenu={this.handleMenu.bind(this)}/>
    })
    return (
      <div className="menu-footer">
        {listMenu}
      </div>
    )
  }

}
class MenuItem extends React.Component{
  constructor(props){
    super(props);
  }

  handleMenu(){
    this.props.handleMenu(this.props.index);
  }

  render(){
    return (
      <div className="col-md-3 col-xs-3">
        <a href="#">
          <img src={this.props.image} onClick={this.handleMenu.bind(this)} />
        </a>
      </div>
    )
  }

}
// End Menu

// Start Main
class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  switchMain(){
    let main;
    switch(this.props.main){
      case 1:
      case "1":
        console.log(User);
        main = <ListRoom />;
        break;
      case 2:
      case "2":
        main = <Contact />;
        break;
      case 3:
      case "3":
        main = <Website/>;
        break;
      case 4:
      case "4":
        main = <Setting />;
        break;
      default:
        main = <ListRoom />;
        break;
    }
    return main;

  }

  render(){

      return(
        <div>
            {this.switchMain()}
        </div>
      )
  }
}
// End Main

//Start website
class Website extends React.Component{
    constructor(){
        super();
        this.state = {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }

    resizeWindow(){
        $(window).resize(() => {
            this.setState({
                w: window.innerWidth,
                h: window.innerHeight
            })
        })
    }

    componentDidMount(){
        this.resizeWindow();
    }

    render(){
        return (
            <div className="block">
                <iframe src="http://d3plus.com" width={this.state.w} height={this.state.h}></iframe>
            </div>
            )
    }
}
//End Website

//Start setting
class Contact extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return(
      <div>This is Contact</div>
    )
  }
}
// End contact

//Start setting
class SettingUser{
  constructor(ref,image,name){
    this.ref= ref;
    this.image = image,
    this.name = name
  }
}
class SettingItem extends React.Component{
  constructor(props){
    super(props);
  }

  handleSetting(){
    this.props.handleSetting(this.props.value.ref);
  }

  render(){
    return (
      <div className="setting">
        <div className="col-md-3 col-xs-3 col-sm-3 text-center" onClick={this.handleSetting.bind(this)}>
            <img src={this.props.value.image} width="30px" />
        </div>
        <div className="col-md-9 col-xs-9 col-sm-9 text-left">
            <h3 className="modal-title">
                {this.props.value.name}
            </h3>
        </div>
      </div>
    )
  }
}
class Setting extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  listSetting(){
    return [new SettingUser("user","images/user.svg","Thông tin cá nhân"),
            new SettingUser("logout","images/logout.svg","Đăng xuất")];
  }

  handleSetting(id){
    alertify.warning(id);
  }

  render(){
    let listSetting = this.listSetting().map((v,k)=>{
      return <SettingItem key={k} value={v} handleSetting={this.handleSetting.bind(this)} />
    })
    return(
      <div className="menu-setting">
        {listSetting}
      </div>
    )
  }
}
// End setting

//Start listRoom
class ListRoom extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      main: ""
    }
  }

  componentWillMount(){
    let main = User.Role=="4"
             ? <ListRoomUser />
             : <div>Admin</div>;
    this.setState({main: main});
  }

  handleSearch(id){
    alert(id);
  }

  handleAdd(id){
    alert(id);
  }
  // <Search handleSearch={this.handleSearch.bind(this)} handleAdd={this.handleAdd.bind(this)} />
  render(){
      return (
        <div className="text">
          {this.state.main}
        </div>
      )
  }
}
class Search extends React.Component{
    handleSearch(){
        this.props.handleSearch(this.refs.search.value);
    }
    handleAdd(){
      let that = this;
        alertify.prompt('Tên nhóm',"Nhập tên nhóm: ","",
            function(a,value){
              if(value) that.props.handleAdd(value);
            },
            function(a){});
    }
    render() {
        return (
            <div id="top-content">
                <div className="header-title">
                    <div className="search-icon">
                        <img src="images/search.png"/>
                    </div>
                    <div className="search-textbox">
                        <input type="text" ref="search" name="search" className="form-control" placeholder="Tìm kiếm" onKeyUp={this.handleSearch.bind(this)} />
                    </div>
                    <div className="search-add">
                        <img src="/images/60740.svg" width="30px" onClick={this.handleAdd.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}
class RoomUser{
  constructor(class_name,image, name,ref){
    this.class_name = class_name;
    this.image = image;
    this.name = name;
    this.ref = ref
  }
}

class ListRoomUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  listRoom(){
    return [new RoomUser("text-center","images/customer.png","Giám đốc","manager"),
            new RoomUser("text-center col-xs-6","images/customer.png","Kỹ thuật","technical"),
            new RoomUser("text-center col-xs-6","images/customer.png","Tư vấn","advisory")];
  }

  handleSelectRoom(id){
    ajaxPromise(link['post_room'],"POST",{roomtype: id})
    .then(rs => {
      console.log(rs);
    })
  }

  render(){
    let room = this.listRoom().map((v,k)=>{
      return <ListRoomUserItem key={k} value={v} handleSelectRoom={this.handleSelectRoom.bind(this)} />
    })
    return (
      <div className="container">
          <div className="card card-container" >
              <h5 className="text-center"><strong>Chọn hỗ trợ</strong></h5>
              {room}
              <div className="clearfix">
              </div>
          </div>
      </div>
    )
  }

}
class ListRoomUserItem extends React.Component{
  constructor(props){
    super(props);
  }

  handleSelectRoom(){
    this.props.handleSelectRoom(this.props.value.ref);
  }

  render(){
    return (
      <div className={this.props.value.class_name}>
          <a href="#" className="new-room" ref={this.props.value.ref} onClick={this.handleSelectRoom.bind(this)}>
              <img src={this.props.value.image} width="50px" />
              <p><strong>{this.props.value.name}</strong></p>
          </a>
      </div>
    )
  }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
