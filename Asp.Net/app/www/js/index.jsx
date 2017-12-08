var connect_room = new signalR.HubConnection(`${host}/signalR/roomHub?authorization=Bearer ${localStorage.getItem('bear')}`);
var connect_chat = new signalR.HubConnection(`${host}/signalR/messageHub?authorization=Bearer ${localStorage.getItem('bear')}`);
console.log(connect_chat);
// connect_chat.hubs.qs = {"Authorization":``};
if(!User.UserName) window.location.href = "/login.html";
class App extends React.Component {
    constructor(){
        super();
        this.state = {
          main: localStorage.getItem('main') || 1,
          screen: localStorage.getItem('screen') || 1,
          roomId: localStorage.getItem('roomId') || 0,
        }
    }

    componentDidMount(){
      connect_room.start();
    }

    handleMenu(id){
      localStorage.setItem('screen',1);
      localStorage.setItem('main',id);
      this.setState({main: id});
    }

    handleScreen(id){
      localStorage.setItem('screen',2);
      localStorage.setItem('roomId',id);
      this.setState({screen: 2, roomId: id});
    }

    switchScreen(){
      let screen;
      switch (this.state.screen) {
        case 1:
        case "1":
          screen = <div>
                      <Main main={this.state.main} handleScreen={this.handleScreen.bind(this)} />
                      <Menu handleMenu={this.handleMenu.bind(this)}/>
                  </div>;
          break;
        case 2:
        case "2":
          screen = <ChatRoom roomId={this.state.roomId}/>;
          break;
        default:
          screen = <div>
                    <Main main={this.state.main} />
                    <Menu handleMenu={this.handleMenu.bind(this)}/>
                </div>;
          break;
      }
      return screen;
    }

    render() {
        return (
          <div>
            {this.switchScreen()}
          </div>
        )
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

  handleScreen(id){
    this.props.handleScreen(id);
  }

  switchMain(){
    let main;
    switch(this.props.main){
      case 1:
      case "1":
        console.log(User);
        main = <ListRoom handleScreen={this.handleScreen.bind(this)} />;
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
             ? <ListRoomUser handleScreen={this.handleScreen.bind(this)} />
           : <div>Admin</div>; // bind handleScreen
    this.setState({main: main});
  }

  handleScreen(id){
    this.props.handleScreen(id);
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
      if(typeof rs === "object"){
        this.props.handleScreen(rs.roomId);
      }else{
        notifyResult("errorcreateroom");
      }
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
//End ListRoom

//Start ChatRoom
class Message{
  constructor(MessageId=0,Time= new Date(),Content="",UserName=User.UserName,RoomId=localStorage.getItem("roomId")){
    this.MessageId = MessageId || 0,
    this.Time = Time || new Date(),
    this.Content = Content || "",
    this.UserName = UserName || User.UserName,
    this.RoomId = RoomId || localStorage.getItem("roomId")
  }
}
class ChatRoom extends React.Component{
  constructor(props){
    super();
  }
  // set connection to Hub
  componentWillMount(){
    connect_chat.start();
    // connect_chat.on('fetchmessagehistory', list =>
    // {
    // });
    connect_chat.on('fetchmessage', result =>
    {
        console.log(result);
    })
    //connect_chat.invoke('FetchHistoryMessage', this.props.roomId, User.UserName,20);
  }

  sendMessage(message){
    let msg = new Message(null,null,message,User.UserName,this.props.roomId);
     connect_chat.invoke('sendMessage',msg);
  }

  componentDidMount(){

  }

  render(){
    return (
      <div>
          <HeaderChatRoom />
          <InputMessageBox sendMessage={this.sendMessage.bind(this)} />
      </div>
    )
  }
}
class HeaderChatRoom extends React.Component{
  constructor(props){
    super();
    this.state = {
      show: false
    }
  }

  showMenu(){
    this.setState({show: !this.state.show});
  }

  render(){
    return (
        <header>
            <div className="button-back">
                <a href="#" className="display-block">
                    <img src="images/back.png" alt="" className="img-rounded center-block"/>
                </a>
            </div>
            <div className="room-name">
                <span>Tên nhóm</span>
            </div>
            <div className="note">
                <a href="#" className="display-block" onClick={this.showMenu.bind(this)}>
                    <img src="images/warning.png" alt="" className="img-rounded center-block" width="30px"/>
                </a>
            </div>
            <HeaderChatRoomMenu show={this.state.show} />
        </header>
    )
  }
}
class HeaderChatRoomMenu extends React.Component{
  constructor(props){
    super();
  }

  render(){
    let show = this.props.show ? "note-box" : "note-box hidden";
    return(
      <div className={show}>
          <input type="file" name="background" id="background" className="hide" />
          <div className="box-item">
              Thay đổi ảnh nền
          </div>
          <div className="box-item">
              Mời thêm người vào nhóm
          </div>
          <div className="box-item">
              Rời khỏi nhóm
          </div>
          <div className="box-item">
              Sao lưu dữ liệu
          </div>
          <div className="box-item">
              Đóng nhóm
          </div>
      </div>
    )
  }
}
class InputMessageBox extends React.Component{
  constructor(props){
    super();
  }

  sendMessage(){
    if(this.refs.message.value){
        this.props.sendMessage(this.refs.message.value);
        document.getElementsByName("message")[0].value = "";
    }
  }

  enterInput(e){
    if(e.key==="Enter")
      this.sendMessage();
  }

  render(){
    return (
      <footer>
          <div className="button-back">
              <a href="#" className="display-block">
                  <img src="images/media.png" alt="" id="image" className="img-rounded center-block" width="30px"/>
                  <input type="file" name="image" id="image1" className="hidden"/>
              </a>
          </div>
          <div className="input-message">
              <input type="text" name="message" ref="message" onKeyPress={this.enterInput.bind(this)}/>
              <a href="#" className="display-block" onClick={this.sendMessage.bind(this)}>
                  <img src="images/send.png" alt="" className="img-rounded center-block"/>
              </a>
          </div>
      </footer>
    )
  }
}

//End ChatRoom

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
