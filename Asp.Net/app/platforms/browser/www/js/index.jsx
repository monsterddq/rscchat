class App extends React.Component {
    constructor()
    {
        super();
        this.state = {
          main: 1,
        }
    }

    handleMenu(id){
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
    console.log(this.props)
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
  render(){
    let main;
    switch(this.props.main){
      case 1:
      case "1":
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
      return(
        <div>
            {main}
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

//Start contact
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

//Start listRoom
class ListRoom extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  handleSearch(id){
    alert(id);
  }

  handleAdd(id){
    alert(id);
  }

  render(){
      return (
        <Search handleSearch={this.handleSearch.bind(this)} handleAdd={this.handleAdd.bind(this)} />
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

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
