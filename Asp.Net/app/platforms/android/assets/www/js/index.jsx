var connect_room = new signalR.HubConnection(`${host}/signalR/roomHub?authorization=Bearer ${localStorage.getItem('bear')}`);
var interval_room;
connect_room.start().then((rs)=>{},(error)=>{
  if(error.statusCode===401)
    window.location.href="login.html";
});
function compare(a, b) {
  const genreA = a.displayName.toUpperCase();
  const genreB = b.displayName.toUpperCase();
  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}
if(!User.UserName) window.location.href = "login.html";
class App extends React.Component {
    constructor(){
        super();
        this.state = {
          main: +localStorage.getItem('main') || 1,
          screen: +localStorage.getItem('screen') || 1,
          roomId: +localStorage.getItem('roomId') || 0,
        }
    }

    handleMenu(id){
      localStorage.setItem('screen',1);
      if(id!=1){
        clearInterval(interval_room);
      }
      else {
        interval_room = setInterval(function(){
          document.getElementById("getRoom").click();
        },1000);
      }
      localStorage.setItem('main',id);
      this.setState({main: id});
    }

    handleScreen(id){
      clearInterval(interval_room);
      localStorage.setItem('screen',2);
      localStorage.setItem('roomId',id);
      if(id===1){
        $("#root").attr('style', 'height:100%;');
        $("body").css("background-color","#e0dfdf");
      }
      this.setState({screen: 2, roomId: id});
    }

    handleBackMain(){
        localStorage.setItem('screen',1);
        this.setState({screen: 1});
    }

    handleSelectRoom(id){
      this.setState({roomId: id});
    }

    switchScreen(){
      let screen;
      switch (this.state.screen.toString()) {
        case "1":
          screen = <div className="screen">
                      <Main main={this.state.main} handleScreen={this.handleScreen.bind(this)} />
                      <Menu handleMenu={this.handleMenu.bind(this)}/>
                  </div>;
          break;
        case "2":
          screen = <ChatRoom roomId={this.state.roomId}
            handleBackMain={this.handleBackMain.bind(this)}/>;
          break;
        default:
          screen = <div className="screen">
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
    this.menu = [new MenuEntity(1,"images/home.svg"),
                 new MenuEntity(2,"images/contact.svg"),
                 new MenuEntity(3,"images/internet.svg"),
                 new MenuEntity(4,"images/settings.svg")];
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
          <img src={this.props.image} onClick={this.handleMenu.bind(this)}
            className="icon" />
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
    return ( <div className="screen">
      <ListRoom status={this.props.main===1} handleScreen={this.handleScreen.bind(this)} />
             <Contact status={this.props.main===2}/>
             <Website status={this.props.main===3}/>
             <Setting status={this.props.main===4}/>
           </div>);
  }

  render(){
      return(
        <div className="screen">
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
      let name = this.props.status ? "block" : "block d-none";
        return (
            <div className={name}>
              <div className="list-item clearfix no-padding-top">
                <iframe src="http://jai.vn/" width={this.state.w} height={this.state.h}></iframe>
              </div>
            </div>
            )
    }
}
//End Website

//Start setting
class Contact extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contacts: JSON.parse(localStorage.getItem("contacts")) ?
      JSON.parse(localStorage.getItem("contacts")).sort(compare) : [],
      contactsFilter: JSON.parse(localStorage.getItem("contacts")) ?
      JSON.parse(localStorage.getItem("contacts")).sort(compare) : [],
    }
  }

  handleSearch(id){
    this.setState({
      contactsFilter: this.state.contacts.filter(w=>w.displayName.includes(id))
    })
  }

  render(){
    let contact = [],that = this,name = this.props.status ? "block" : "block d-none";;
    for (let i = 0,size = this.state.contactsFilter.length; i < size; i++) {
      contact.push(<ContactItem contact={that.state.contactsFilter[i]} key={i} />);
    }
    return(
      <div className={name}>
        <Search handleSearch={this.handleSearch.bind(this)} disableAdd="true"/>
        <div className="list-item clearfix">
          {contact}
        </div>
      </div>
    )
  }
}
class ContactItem extends React.Component{
  render(){
    return (
      <div className="col-xs-12 contact-detail">
          <a href="#">
            <p className="name-group">{this.props.contact.displayName}</p>
            <p>{this.props.contact.phoneNumbers[0].value}</p>
          </a>
      </div>
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
      <div className="setting" onClick={this.handleSetting.bind(this)}>
        <div className="text-center" >
            <img src={this.props.value.image} width="30px" />
        </div>
        <div className="text-left">
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
    this.state = {
      main: 0,
      src: `${host}/${User.Avatar}` || "images/user.svg"
    }
  }

  listSetting(){
    return [new SettingUser("user",this.state.src,"Thông tin cá nhân"),
            new SettingUser("changePassword","images/change_password.svg","Thay đổi mật khẩu"),
            new SettingUser("logout","images/logout.svg","Đăng xuất")];
  }

  handleSetting(id){
    switch (id) {
      case "user":
        this.setState({main: 1});
        break;
      case "logout":
        clearLocalStorage();
        alertify.notify(notify("logout"));
        setTimeout(()=>{window.location.href = "login.html";},1000);
        break;
      case "changePassword":
        this.handleChangePassword();
        break;
    }
  }

  handleBack(){
    this.setState({main: 0});
  }
  handleChangeInfo(){
    this.setState({main: 2});
  }

  handleShowInfo(){
    this.setState({main: 1});
  }

  isValid(data){
    if(!data.oldPassword || !data.newPassword || !data.repeatPassword
      || data.newPassword<=4 || !data.repeatPassword){
          alertify.warning(notify("400"));
          return false;
      }
    if(data.newPassword !== data.repeatPassword){
      alertify.warning(notify("changePassword"));
      return false;
    }
    return true;
  }

  handleChangePassword(){
    let that = this;
      alertify.prompt('Đổi mật khẩu',"","",
          function(a,value){
            value = $(".ajs-input").val();
            if(!value) alertify.error("Mật khẩu không được để trống.");
            let data = {
              oldPassword: value,
              newPassword: $(".ajs-input[name=new_password]").val(),
              repeatPassword: $(".ajs-input[name=repeat_password]").val(),
            };
            if(!that.isValid(data)) return;
            ajaxPromise(link.password,"PUT",data)
            .then((rs) => {
              if(rs.code===200){
                alertify.success(notify("updateSuccess"));
              }
              else alertify.error(notify(rs.code));
            })
          },
          function(a){});
      setTimeout(()=>{
        $(".ajs-content").empty();
        $(".ajs-content").append(`<input class="ajs-input" name="old_password" ref="old_password" type="password" placeholder="Nhập mật khẩu cũ">`);
        $(".ajs-content").append(`<input class="ajs-input" name="new_password" ref="new_password" type="password" placeholder="Nhập mật khẩu mới">`);
        $(".ajs-content").append(`<input class="ajs-input" name="repeat_password" ref="repeat_password" type="password" placeholder="Nhập lại mật khẩu">`);
      },100);
  }

  switchMain(){
    let listSetting = this.listSetting().map((v,k)=>{
      return <SettingItem key={k} value={v} handleSetting={this.handleSetting.bind(this)} />
    })
    let name = this.state.main === 0 ? "" : "d-none";
    return (  <div className="setting-block">
                <div className={name}>{listSetting}</div>
                <Information status = {this.state.main === 1} handleBack={this.handleBack.bind(this)}
                  handleChangeInfo={this.handleChangeInfo.bind(this)}/>
                <EditInformation status = {this.state.main === 2} handleBack={this.handleBack.bind(this)}
                  handleShowInfo={this.handleShowInfo.bind(this)}/>
              </div>
            );
  }

  render(){

    let name = this.props.status ? "menu-setting" : "menu-setting d-none";
    return(
      <div className={name}>
        {this.switchMain()}
      </div>
    )
  }
}
class Information extends React.Component{
  constructor(){
    super();
    this.state ={
      src: `${host}/${User.Avatar}` || "images/user.svg"
    }
  }
  handleBack(){
    this.props.handleBack();
  }
  handleChangeAvatar(){
    this.refs.background.click();
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
          username: User.UserName
        };
      });
      FR.readAsDataURL(file);
      var loop = setInterval(function(){
        if(data){
          clearInterval(loop);
          $.ajax({
              type: "PUT",
              url: `${host}${link.upload}` ,
              data:data,
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('bear')}`
              },
              success: function (data,status,xhr) {
                localStorage.setItem('bear',xhr.getResponseHeader("authorization"));
                if(data) that.setState({src: `${host}/${data}`});
                setUserCurrent();
                document.querySelector(".setting img").setAttribute("src",`${host}/${User.Avatar}`);
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
  handleChangeInfo(){
    this.props.handleChangeInfo();
  }
  render(){
    let name = this.props.status ? "info" : "info d-none";
    return (
      <div className={name}>
        <div className="info-avatar">
          <div className="img"onClick={this.handleChangeAvatar.bind(this)}>
            <img src={this.state.src} alt="Avatar" ref="image"/>
            <span>Thay đổi</span>
            <input type="file" name="background" id="background" ref="background" className="hidden"  onChange={this.handleSelectMedia.bind(this)}/>
          </div>
        </div>
        <table className="table">
          <tbody>
            <tr>
              <td>Tên đăng nhập</td>
              <td>{User.UserName}</td>
            </tr>
            <tr>
              <td>Họ và tên</td>
              <td>{User.FullName}</td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>{User.Phone}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{User.Email}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-default" onClick={this.handleBack.bind(this)}>Quay lại</button>
        <button className="btn btn-primary change-info" onClick={this.handleChangeInfo.bind(this)}>Đổi thông tin</button>
      </div>
    );
  }
}
class EditInformation extends React.Component{
  constructor(){
    super();
    this.state ={
      src: `${host}/${User.Avatar}` || "images/user.svg"
    }
  }
  handleBack(){
    this.props.handleBack();
  }
  handleChangeAvatar(){
    this.refs.background.click();
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
          username: User.UserName
        };
      });
      FR.readAsDataURL(file);
      var loop = setInterval(function(){
        if(data){
          clearInterval(loop);
          $.ajax({
              type: "PUT",
              url: `${host}${link.upload}` ,
              data:data,
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('bear')}`
              },
              success: function (data,status,xhr) {
                localStorage.setItem('bear',xhr.getResponseHeader("authorization"));
                if(data) that.setState({src: `${host}/${data}`});
                setUserCurrent();
                document.querySelector(".setting img").setAttribute("src",`${host}/${User.Avatar}`);
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
  handleShowInfo(){
    let that = this;
      alertify.prompt('Xác nhận mật khẩu',"Nhập mật khẩu: ","",
          function(a,value){
            value = $(".ajs-input").val();
            if(!value) alertify.error("Mật khẩu không được để trống.");
            let data = {
              username: User.UserName,
              user: {
                UserName: User.UserName,
                FullName: that.refs.FullName.value,
                Phone: that.refs.Phone.value,
                Email: that.refs.Email.value,
                Avatar: User.Avatar,
                Role: + User.Role,
                Password: value
              }
            };
            $.ajax({
              url: `${host}${link.user}`,
              method: "PUT",
              data: data,
              crossDomain: true,
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('bear')}`
              },
            }).done((rs,status,xhr)=>{
              if(rs.code===200){
                alertify.success(notify("updateSuccess"));
                localStorage.setItem('bear',xhr.getResponseHeader("authorization"));
                setUserCurrent();
              }
              else alertify.error(notify(rs.code));
              that.props.handleShowInfo();
            })
          },
          function(a){});
      setTimeout(()=>{
        $(".ajs-content").empty();
        $(".ajs-content").append(`<input class="ajs-input" name="password" ref="password" type="password" placeholder="Nhập mật khẩu cũ">`);
      },100);
  }
  render(){
    let name = this.props.status ? "info" : "info d-none";
    return (
      <div className={name}>
        <div className="info-avatar">
          <div className="img"onClick={this.handleChangeAvatar.bind(this)}>
            <img src={this.state.src} alt="Avatar" ref="image"/>
            <span>Thay đổi</span>
            <input type="file" name="background" id="background" ref="background" className="hidden"  onChange={this.handleSelectMedia.bind(this)}/>
          </div>
        </div>
        <table className="table">
          <tbody>
            <tr>
              <td>Tên đăng nhập</td>
              <td>{User.UserName}</td>
            </tr>
            <tr>
              <td>Họ và tên</td>
              <td>
                <input type="text" ref="FullName" defaultValue={User.FullName} />
              </td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>
                <input type="text" ref="Phone" defaultValue={User.Phone}/>
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input type="email" ref="Email" defaultValue={User.Email}/>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-default" onClick={this.handleBack.bind(this)}>Quay lại</button>
        <button className="btn btn-primary change-info" onClick={this.handleShowInfo.bind(this)}>Đổi thông tin</button>
      </div>
    );
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
    let name = this.props.status ? "text list-room" : "text d-none list-room";
      return (
        <div className={name}>
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
        alertify.prompt('Tên nhóm',"","",
            function(a,value){
              value = $(".ajs-input").val();
              if(value) that.props.handleAdd(value);
            },
            function(a){});
        setTimeout(()=>{
          $(".ajs-content").empty();
          $(".ajs-content").append(`<input class="ajs-input" type="text" placeholder="Nhập tên nóm">`);
        },100);
    }
    render() {
      let add = "",searchClass="";
      if(!this.props.disableAdd){
        add = <div className="search-add">
            <img src="images/search.svg" width="30px" onClick={this.handleAdd.bind(this)} />
            </div>;
        searchClass="search-textbox";
      }else{
        searchClass="search-contact-textbox";
      }
        return (
            <div id="top-content">
                <div className="header-title">
                    <div className="search-icon">
                        <img src="images/search.svg" className="icon"/>
                    </div>
                    <div className={searchClass}>
                        <input type="text" ref="search" name="search" className="form-control" placeholder="Tìm kiếm"
                          onKeyUp={this.handleSearch.bind(this)} />
                    </div>
                    {add}
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
    return [new RoomUser("text-center","images/user.svg","Giám đốc","manager"),
            new RoomUser("text-center col-xs-6","images/user.svg","Kỹ thuật","technical"),
            new RoomUser("text-center col-xs-6","images/user.svg","Tư vấn","advisory")];
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
    try {
      this.connect_room.invoke("listroom",result=>{
      });
    } catch (err) { console.log(err); }
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
      listRoom: [],
      search: ""
    }
    interval_room = setInterval(function(){
      document.getElementById("getRoom").click();
    },1000);
  }
  componentWillMount(){
    connect_room.on("listroom",result =>{
      if(typeof result === "string"){
        alertify.warning(notify("notfoundusername"));
      }
      else {
        let listRoom=[];
        if(this.state.search){
            listRoom = result.filter(w=>w.Name.includes(this.state.search));
        }else{
          listRoom = result;
        }
        this.setState({listRoom: listRoom});
      }
    });
  }
  handleClick(){
    connect_room.invoke("FetchListRoom",User.UserName);
  }
  handleSearch(id){
    this.setState({ search: id });
  }
  handleAdd(id){
    ajaxPromise(link["post_room"],"POST",{roomtype: "general", roomName: id})
    .then((rs) => {
      if(rs!=="null" && rs){
        alertify.success(notify("createRoom"));
      }else {
        alertify.error(notify("errorCreateRoom"));
      }
    })
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
        <div className="list-item clearfix">
          {list}
        </div>
      </div>
    )
  }
}
class ListRoomAdminItem extends React.Component{
  handleScreen(){
    localStorage.setItem("roomDetail",JSON.stringify(this.props.room));
    this.props.handleScreen(this.props.room.RoomId);
  }

  render(){
    let name = localStorage.getItem("language") === "vi" ? "Nhóm" : "Group";
    let message = this.props.room.NewMessage.includes("/uploads/")
    ? "[images]" : this.props.room.NewMessage;
    return(
      <div className="col-xs-12 room-detail" onClick={this.handleScreen.bind(this)}>
        <div className="col-xs-2">
          <img src="images/user.svg" alt="" className="img-rounded center-block img-room"/>
        </div>
        <div className="col-xs-8">
          <a href="#">
            <p className="name-group">{this.props.room.Name}</p>
            <p>{message} ({name}: {getTypeString(this.props.room.Type)})</p>
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
      group: {}
    }
    this.connect_chat =
    new signalR.HubConnection(`${host}/signalR/messageHub?authorization=Bearer ${localStorage.getItem('bear')}&roomId=${props.roomId}`);
    this.connect_chat.start().then((value) => {},(error)=>{
        if(error.statusCode===401)
        window.location.href = "login.html";
    });
  }
  // set connection to Hub
  componentWillMount(){
    let room = JSON.parse(localStorage.getItem("roomDetail"));
    let that = this;
    let data = {
      RoomId: room.RoomId,
      UserName: User.UserName,
      Limit:20
    }
    Promise.all([ajaxPromise("/api/message","GET",data),
                 ajaxPromise("/api/room","GET",data)])
    .then((rs) => {
      this.setState({group: rs[1]});
      that.setState({listMessage: rs[0], members: rs[1],background: rs[1].find(w=>w.item1===User.UserName).item3});
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
    $("body").css("background-color","#fff");
    $("#root").attr('style', 'height:auto;');
    this.website = document.getElementsByClassName('chat-website')[0];
    this.chat = document.getElementsByClassName('chat-block')[0];
  }

  handleChangeBackgournd(id){
    this.setState({background: id});
  }

  handleViewWebsite(){
    setTimeout(function(){
      let website = document.getElementsByClassName('chat-website')[0];
      let chat = document.getElementsByClassName('chat-blur')[0];
      website.style.left = "0px";
      $(".chat-website > div").removeClass('d-none');
      chat.style.filter = "blur(3px)";
    },500)
  }

  handleCloseWebsite(){
      let website = document.getElementsByClassName('chat-website')[0];
      let chat = document.getElementsByClassName('chat-blur')[0];
      website.style.left = "-90%";
      chat.style.filter = "none";
  }

  render(){
    return (
      <div className="chat-block" onClick={this.handleCloseWebsite.bind(this)}>
          <div className="chat-website">
            <Website />
          </div>
          <div className="chat-blur">
            <a href="#last" id="golast">a</a>
            <HeaderChatRoom handleChangeBackgournd={this.handleChangeBackgournd.bind(this)}
              handleViewWebsite={this.handleViewWebsite.bind(this)}
              handleBackMain={this.handleBackMain.bind(this)} members={this.state.members}
              roomId={this.props.roomId}
              handleReturnListRoom={this.handleBackMain.bind(this)}/>
            <MessageBox background={this.state.background} message={this.state.message} listMessage={this.state.listMessage} connect_chat={this.connect_chat}/>
            <InputMessageBox sendMessage={this.sendMessage.bind(this)} />
          </div>
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

  showMenu(e){
    e.preventDefault();
    this.setState({show: !this.state.show});
    return false;
  }

  handleBackMain(){
    this.props.handleBackMain();
  }

  getNameGroup(members){
    let room = JSON.parse(localStorage.getItem("roomDetail"));
    switch (members.length) {
      case 1:
        return room.Type==="general" ? <span>{room.Name}</span> : <span>Nhóm mới: {User.item2 || User.item1}</span>;
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

  handleViewWebsite(){
    this.props.handleViewWebsite();
    this.setState({show: !this.state.show});
    return false;
  }
  handleReturnListRoom(){
    this.props.handleReturnListRoom();
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
                    <img src="images/warning.svg" alt="" className="img-rounded center-block" width="30px"/>
                </a>
            </div>
            <HeaderChatRoomMenu handleChangeBackgournd={this.handleChangeBackgournd.bind(this)}
              handleViewWebsite={this.handleViewWebsite.bind(this)}
              show={this.state.show} roomId={this.props.roomId} members={this.props.members}
              handleReturnListRoom={this.handleReturnListRoom.bind(this)}/>
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
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('bear')}`
              },
              success: function (data,status,xhr) {
                  if(data) that.props.handleChangeBackgournd(data);
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

  handleViewWebsite(){
    this.props.handleViewWebsite();
  }

  handleChatHistory(){
    ajaxPromise(link['history'],"POST",{roomId: this.props.roomId})
    .then((rs) => {
      if(rs==="true")
        notify("fetchHistory");
      else {
        notify("errorFetchHistory");
      }
    })
  }

  handleClose(){
    let that = this;
    ajaxPromise(link['close'],"PUT",{roomId: this.props.roomId})
    .then((rs) => {
      if(rs){
        alertify.success(notify("close"));
        setTimeout(()=>{
          that.props.handleReturnListRoom();
        },1000);
      }
      else {
        alertify.error(notify("errorClose"));
      }
    })
  }

  renderHTML(){
    if(User.Role=="4"){
      return (
        <div>
          <div className="box-item" onClick={this.handleViewWebsite.bind(this)}>
              Xem Website
          </div>
          <div className="box-item" onClick={this.handleChangeBackgournd.bind(this)}>
              Thay đổi ảnh nền
              <input type="file" name="background" id="background" ref="background" className="hidden"  onChange={this.handleSelectMedia.bind(this)}/>
          </div>
          <div className="box-item">
              Mời thêm người vào nhóm
          </div>
        </div>
       )
    } else {
      return (
        <div>
          <div className="box-item" onClick={this.handleViewWebsite.bind(this)}>
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
          <div className="box-item" onClick={this.handleChatHistory.bind(this)}>
              Sao lưu dữ liệu
          </div>
          <div className="box-item" onClick={this.handleClose.bind(this)}>
              Đóng nhóm
          </div>
        </div>
       )
    }
  }

  render(){
    let show = this.props.show ? "note-box" : "note-box hidden";
    return(
      <div className={show}>
          <input type="file" name="background" id="background" className="hide" />
          {this.renderHTML()}
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
                  <img src="images/media.svg" alt="" id="image" className="img-rounded center-block" width="30px"/>
                  <input type="file" name="images" id="images" ref="image" className="hidden" multiple  onChange={this.handleSelectMedia.bind(this)}/>
              </a>
            </form>
          </div>
          <div className="input-message">
              <input type="text" name="message" ref="message" onKeyPress={this.enterInput.bind(this)}/>
              <a href="#" className="display-block" onClick={this.sendMessage.bind(this)}>
                  <img src="images/send.svg" alt="" className="img-rounded center-block icon"/>
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
    let list="";
    if(this.listMessage){
       list = this.listMessage.map((v,k)=>{
          return v.userName===User.UserName
          ? <MyMessage key={k} message={v} isLast={k===this.listMessage.length-1} />
        : <OtherMessage key={k} message={v} isLast={k===this.listMessage.length-1} />;
      })
    }
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
    let message = this.props.message.content.startsWith(`/uploads/`)
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
    let message = this.props.message.content.startsWith(`/uploads/`)
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
