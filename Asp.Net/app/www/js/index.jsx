var connect_room = new signalR.HubConnection(`${host}/signalR/roomHub?authorization=Bearer ${localStorage.getItem('bear')}`);
var interval_room;
connect_room.start().then((rs)=>{},(error)=>{
  if(error.statusCode===401)
    window.location.href="login.html";
});
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

    handleMenu(id){
      localStorage.setItem('screen',1);
      localStorage.setItem('main',id);
      this.setState({main: id});
    }

    handleScreen(id){
      clearInterval(interval_room);
      localStorage.setItem('screen',2);
      localStorage.setItem('roomId',id);
      this.setState({screen: 2, roomId: id});
    }

    handleBackMain(){
      localStorage.setItem('screen',1);
      this.setState({screen: 1});
    }

    handleSelectRoom(id){

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
          screen = <ChatRoom roomId={this.state.roomId} handleBackMain={this.handleBackMain.bind(this)}/>;
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
           : <ListRoomAdmin handleScreen={this.handleScreen.bind(this)}  />; // bind handleScreen
    this.setState({main: main});
  }

  handleScreen(id){
    this.props.handleScreen(id);
  }

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

  componentDidMount(){
    this.connect_room.invoke("listroom",result=>{
      console.log(result)
    });
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

class ListRoomAdmin extends React.Component{
  constructor(props){
    super();
    this.state = {
      listRoom: []
    }
    interval_room = setInterval(function(){
      document.getElementById("getRoom").click();
    },1000);
  }
  componentWillMount(){
    connect_room.on("listroom",result =>{
      if(typeof a === "string"){
        alertify.warning(notify("notfoundusername"));
      }
      else {
        this.setState({listRoom: result});
      }
    });
  }

  handleClick(){
    connect_room.invoke("FetchListRoom",User.UserName);
  }

  handleSearch(id){
    console.log(id);
  }
  handleAdd(id){
    console.log(id);
  }

  handleScreen(id){
    this.props.handleScreen(id);
  }

  render(){
    let list = this.state.listRoom.map((v,k)=>{
      return <ListRoomAdminItem key={k} room={v} handleScreen={this.handleScreen.bind(this)} />
    })
    return(
      <div>
        <Search handleSearch={this.handleSearch.bind(this)} handleAdd={this.handleAdd.bind(this)} />
        <div onClick={this.handleClick.bind(this)} id="getRoom" className="d-none">get room</div>
        {list}
      </div>
    )
  }
}
class ListRoomAdminItem extends React.Component{
  constructor(props){
    super();
  }

  handleScreen(){
    this.props.handleScreen(this.props.room.RoomId);
  }

  render(){
    return(
      <div className="col-xs-12 room-detail" onClick={this.handleScreen.bind(this)}>
        <div className="col-xs-2">
          <img src="images/customer.png" alt="" className="img-rounded center-block img-room"/>
        </div>
        <div className="col-xs-8">
          <a href="#">
            <p className="name-group">{this.props.room.Name}</p>
            <p>{this.props.room.NewMessage} (Group: {getTypeString(this.props.room.Type)})</p>
          </a>
        </div>
        <div>
          <span>{convertTime(this.props.room.Time) || ""}</span>
        </div>
      </div>
    )
  }
}
//End ListRoom

//Start ChatRoom
class Message{
  constructor(MessageId,Time,Content,UserName,RoomId){
    let now = new Date();
    this.MessageId = MessageId || 0,
    this.Time = Time || `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
    this.Content = Content || "",
    this.UserName = UserName || User.UserName,
    this.RoomId = RoomId || localStorage.getItem("roomId")
  }
}
class ChatRoom extends React.Component{
  constructor(props){
    super();
    this.state = {
      listMessage: [],
      message: "",
      members: [],
      background: "#fff",
    }
    this.connect_chat =
    new signalR.HubConnection(`${host}/signalR/messageHub?authorization=Bearer ${localStorage.getItem('bear')}&roomId=${props.roomId}`);
    this.connect_chat.start().then((value) => {},(error)=>{
        if(error.statusCode===401)
        window.location.href = "/login.html";
    });
  }
  // set connection to Hub
  componentWillMount(){
    let that = this;
    let data = {
      RoomId: this.props.roomId,
      UserName: User.UserName,
      Limit:20
    }
    Promise.all([ajaxPromise("/api/message","GET",data),
                 ajaxPromise("/api/room","GET",data)])
    .then((rs) => {
      console.log(rs[1][0].item3);
      that.setState({listMessage: rs[0], members: rs[1],background: rs[1][0].item3});
    })
    this.connect_chat.on('fetchmessage', result =>{
        that.setState({message: result});
    });
  }

  sendMessage(message){
    let msg = new Message(null,null,message,User.UserName,this.props.roomId);
    this.connect_chat.invoke('sendMessage',msg);
  }

  handleBackMain(){
    this.props.handleBackMain();
  }

  componentDidMount(){
    document.getElementsByName("message")[0].focus();
  }

  handleChangeBackgournd(id){
    this.setState({background: id});
  }

  render(){
    return (
      <div>
          <a href="#last" id="golast">a</a>
          <HeaderChatRoom handleChangeBackgournd={this.handleChangeBackgournd.bind(this)} handleBackMain={this.handleBackMain.bind(this)} members={this.state.members}/>
          <MessageBox background={this.state.background} message={this.state.message} listMessage={this.state.listMessage} connect_chat={this.connect_chat}/>
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

  handleChangeBackgournd(id){
    this.props.handleChangeBackgournd(id);
    this.setState({show: !this.state.show});
  }

  showMenu(){
    this.setState({show: !this.state.show});
    return false;
  }

  handleBackMain(){
    this.props.handleBackMain();
  }

  getNameGroup(members){
    switch (members.length) {
      case 1:
          return <span>Nhóm mới: ${User.item2 || User.item1}</span>;
      case 2:
        let user = members.find(w => w.item1!==User.UserName);
        return <span>{user.item2 || user.item1}</span>;
      default:
        return
        <div>
          <img src="images/multiple_user.svg" />
          <span>{members[0].item2 || members[0].item1},..</span>
        </div>
    }
  }

  render(){
    return (
        <header>
            <div className="button-back">
                <a href="#" className="display-block" onClick={this.handleBackMain.bind(this)}>
                    <img src="images/back.png" alt="" className="img-rounded center-block"/>
                </a>
            </div>
            <div className="room-name">
                {this.getNameGroup(this.props.members)}
            </div>
            <div className="note">
                <a href="#" className="display-block" onClick={this.showMenu.bind(this)}>
                    <img src="images/warning.png" alt="" className="img-rounded center-block" width="30px"/>
                </a>
            </div>
            <HeaderChatRoomMenu handleChangeBackgournd={this.handleChangeBackgournd.bind(this)} show={this.state.show} />
        </header>
    )
  }
}
class HeaderChatRoomMenu extends React.Component{
  constructor(props){
    super();
  }

  handleChangeBackgournd(){
    this.refs.background.click();
    return false;
  }

  handleSelectMedia(){
    let that = this;
    if(this.refs.background.value){
      let data;
      let file = this.refs.background.files[0];
      var FR= new FileReader();
      FR.addEventListener("load", function(e) {
        data = {
          file: e.target.result,
          name: file.name,
          roomId: localStorage.getItem('roomId')
        };
      });
      FR.readAsDataURL(file);
      var loop = setInterval(function(){
        if(data){
          clearInterval(loop);
          $.ajax({
              type: "PUT",
              url: `${host}/api/room` ,
              data:data,
              crossDomain: true,
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('bear')}`
              },
              success: function (data,status,xhr) {
                  if(data)
                    that.props.handleChangeBackgournd(data);
              },
              error: function (result,status,xhr) {
                if(xhr==="Unauthorized"){
                  notifyResult(401);
                  localStorage.removeItem('bear');
                  setTimeout(function(){
                    window.location.href="login.html";
                  },1000);
                }
              }
          });
        }
      },100);
    }
  }

  render(){
    let show = this.props.show ? "note-box" : "note-box hidden";
    return(
      <div className={show}>
          <input type="file" name="background" id="background" className="hide" />
          <div className="box-item">
              Xem Website
          </div>
          <div className="box-item" onClick={this.handleChangeBackgournd.bind(this)}>
              Thay đổi ảnh nền
              <input type="file" name="background" id="background" ref="background" className="hidden"  onChange={this.handleSelectMedia.bind(this)}/>
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

  handleTriggerMedia(e){
    this.refs.image.click();
    return false;
  }

  handleSelectMedia(){
    let that = this;
    if(this.refs.image.value){
      let data;
      let file = this.refs.image.files[0];
      var FR= new FileReader();
      FR.addEventListener("load", function(e) {
        data = {
          file: e.target.result,
          name: file.name
        };
      });
      FR.readAsDataURL(file);
      var loop = setInterval(function(){
        if(data){
          clearInterval(loop);
          $.ajax({
              type: "POST",
              url: `${host}/api/media` ,
              data:data,
              crossDomain: true,
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('bear')}`
              },
              success: function (data,status,xhr) {
                  that.refs.message.value = data;
                  that.sendMessage();
              },
              error: function (result,status,xhr) {
                if(xhr==="Unauthorized"){
                  notifyResult(401);
                  localStorage.removeItem('bear');
                  setTimeout(function(){
                    window.location.href="login.html";
                  },1000);
                }
                console.log(result);
              }
          });
        }
      },100);
    }
  }

  render(){
    let action = `${host}/api/media`;
    return (
      <footer>
          <div className="button-back">
            <form action={action} method="POST" encType="multipart/form-data" id="postmedia">
              <a href="#golast" className="display-block" onClick={this.handleTriggerMedia.bind(this)}>
                  <img src="images/media.png" alt="" id="image" className="img-rounded center-block" width="30px"/>
                  <input type="file" name="images" id="images" ref="image" className="hidden" multiple  onChange={this.handleSelectMedia.bind(this)}/>
              </a>
            </form>
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

class MessageBox extends React.Component{
  constructor(props){
    super();
    this.listMessage = props.listMessage;
  }

  componentWillReceiveProps(props){
    this.listMessage = props.listMessage;
    if(props.message){
      this.listMessage.push(
        {
          messageId: props.message.MessageId,
          content: props.message.Content,
          roomId: props.message.RoomId,
          time: props.message.Time,
          userName: props.message.UserName
        });
    }
  }

  componentDidMount(){
    document.getElementById("golast").click();
  }

  render(){
    let background = this.props.background.startsWith("#")
    ? this.props.background : `url("${host}/${this.props.background}") no-repeat center center fixed`;
    let list = this.listMessage.map((v,k)=>{
        return v.userName===User.UserName
        ? <MyMessage key={k} message={v} isLast={k===this.listMessage.length-1} />
      : <OtherMessage key={k} message={v} isLast={k===this.listMessage.length-1} />;
    })
    return(
      <div className="list-message" style={{background: background }}>
        {list}
      </div>
    )
  }
}
class MyMessage extends React.Component{
  componentDidMount(){
    document.getElementById("golast").click();
    document.getElementsByName("message")[0].focus();
  }

  render(){
    console.log(this.props.message.content);
    let message = this.props.message.content.startsWith(`uploads/`)
                ? <img src={host+"\\"+this.props.message.content} style={{ maxWidth: window.innerWidth-100 }} />
              : this.props.message.content;
    return(
      <div>
        <div className="detail-message-right clearfix" id={this.props.isLast ? "last" : "top"}>
            <div className="owner">
              <span>{message}</span>
              <br/>
              <p>{convertTime(this.props.message.time)}</p>
            </div>
        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
}
class OtherMessage extends React.Component{
  componentDidMount(){
    document.getElementById("golast").click();
    document.getElementsByName("message")[0].focus();
  }

  render(){
    let message = this.props.message.content.startsWith(`uploads/`)
                ? <img src={host+"\\"+this.props.message.content} style={{ maxWidth: window.innerWidth-100 }} />
              : this.props.message.content;
    return(
      <div>
        <div className="detail-message-left" id={this.props.isLast ? "last" : "top"}  >
            <div className="other">
              <span>{message}</span>
              <br/>
              <p>{convertTime(this.props.message.time)}</p>
            </div>
        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
}
//End ChatRoom

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
document.getElementsByName("message")[0].focus();
