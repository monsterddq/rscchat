
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
class App extends React.Component {
    constructor()
    {
        super();
        this.state = {
            listRoom: [],
            search: ''
        }
    }

    getListRoom()
    {
        let that = this;
        setInterval(function () {
            let listRoom = JSON.parse(localStorage.getItem('list')) || [];
            let tempory = [];
            listRoom.forEach((v, k) => {
                if (v[1].toLocaleLowerCase().includes(that.state.search.toLocaleLowerCase())
                    || getTypeString(v[4]).toLocaleLowerCase().includes(that.state.search.toLocaleLowerCase())) 
                {
                    tempory.push(v);
                }
            })
            that.setState({ listRoom: tempory });
        }, 500);
        
    }

    actionSearch(id) {
        let listRoom = JSON.parse(localStorage.getItem('list'));
        let tempory = [];
        listRoom.forEach((v, k) => {
            if (v[1].toLocaleLowerCase().includes(id.toLocaleLowerCase())
                || getTypeString(v[4]).toLocaleLowerCase().includes(id.toLocaleLowerCase())) 
            {
                tempory.push(v);
            }
        })
        this.setState({ listRoom: tempory, search: id.toLocaleLowerCase() });
    }

    actionAdd(id) {
        $.ajax({
            type: "PUT",
            url: "/api/rooms/"+id,
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

    componentWillMount()
    {
        this.getListRoom();
    }

    render() {
        return (
            <div>
                <Search onSearch={this.actionSearch.bind(this)} onAdd={this.actionAdd.bind(this)} />
                <ListRoom ListRoom={this.state.listRoom} />
            </div>
        );
    }
}
class Search extends React.Component{

    handleSearch()
    {
        this.props.onSearch(this.refs.search.value);
    }

    handleAdd()
    {
        var s = prompt("Nhập tên nhớm: ");
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

ReactDOM.render(
    <App />,
    document.getElementById('root')
);