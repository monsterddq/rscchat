class UserLogin{
  constructor(fullname="",username="",password ="")
  {
    this.fullname = fullname;
    this.username = username;
    this.password = password;
  }
}
function isValid(data){
  if(!data.fullname || !data.username || !data.password){
    alertify.warning(notify());
    return false;
  }
  if(data.username.includes('@') && !RegEmail.test(data.username)){
    alertify.warning(notify("email"));
    return false;
  }
  return true;
}

function register(){
  var data = new UserLogin(
    $("input[name=fullname]").val(),
    $("input[name=username]").val(),
    $("input[name=password]").val(),
  );
  console.log(data);
  if(!isValid(data)) return false;
  ajaxPromise("/api/user/register","POST",data)
  .then((a)=>{
    notifyResult(a);
    if(a.item1===200) window.location.href="login.html";
  })
}

$(document).ready(function(){
  $(".btn-register").click(()=>{
    register();
    return false;
  });
  $("input").keypress((e)=>{
    if(e.key=="Enter"){
      register();
      return false;
    }
  })
})
