class UserLogin{
  constructor(FullName="",UserName="",Password ="")
  {
    this.FullName = FullName;
    this.UserName = UserName;
    this.Password = Password;
  }
}
function isValid(data){
  if(!data.FullName || !data.UserName || !data.Password){
    alertify.warning(notify());
    return false;
  }
  if(data.UserName.includes('@') && !RegEmail.test(data.UserName)){
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
