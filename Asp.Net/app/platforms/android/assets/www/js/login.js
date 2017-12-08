

class UserLogin{
  constructor(username="",password=""){
    this.username = username,
    this.password = password
  }
}
function isValid(data){
  if(!data.username || !data.password){
    alertify.warning(notify("400"))
    return false;
  }
  return true;
}
function login(){
  var data = new UserLogin(
    $("input[name=username]").val(),
    $("input[name=password]").val()
  )
  if(!isValid(data)) return false;
  ajaxPromise("/api/security/auth","POST",data)
  .then((a)=>{
    if(a.item1==="401"){
      alertify.warning(notify("login"));
      return false;
    }
    let decode = jwt_decode(a);
    let user = Object.values(decode);
    localStorage.setItem('bear',a);
    setTimeout(function() {
        window.location.href = "index.html";
    }, 50);
    //nativetransitions.flip(0.5, "right");
  })
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent();
    },
    receivedEvent: function() {
      var store = Object.entries(localStorage);
      store.forEach((v,k) => {
        localStorage.removeItem(v[0]);
      });
      localStorage.setItem("language","vi");
      $(".btn-login").click(()=>{
        login();
        return false;
      });
      $("input").keypress((e)=>{
        if(e.key=="Enter"){
          login();
          return false;
        }
      })
    }
};

app.initialize();
