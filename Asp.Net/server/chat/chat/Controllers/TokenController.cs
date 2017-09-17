using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using chat.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Web.Http.Results;
using System.Web.Http.Cors;

namespace chat.Controllers
{
    public class TokenController : ApiController
    {
        private ChatDbContext db = new ChatDbContext();
        [AllowAnonymous]
        public string Post([FromBody]Login login)
        {
            if (string.IsNullOrEmpty(login.UserName) || string.IsNullOrEmpty(login.Password)) return "";
            var user = db.Users.Where(w => w.UserName == login.UserName && w.Password == login.Password).FirstOrDefault();
            if (user != null) return JwtManager.GenerateToken(login.UserName, user.Role, user.Avatar, user.FullName,user.Phone);
            else return "";
        }
        [AllowAnonymous]
        public bool Put([FromBody]Register register)
        {
            if (string.IsNullOrEmpty(register.UserName) || string.IsNullOrEmpty(register.Password)) return false;
            if (!db.Users.Any(w => w.UserName == register.UserName))
            {
                db.Users.Add(new User()
                {
                    UserName = register.UserName,
                    Password = register.PasswordSha,
                    FullName = register.FullName,
                    Role = 1,
                    VerifyEmail = false,
                    Avatar=""
                });
                db.SaveChanges();
                return true;
            }
            else return false;
        }
        [AllowAnonymous]
        public bool Get([FromUri]string Name)
        {
            if (string.IsNullOrEmpty(Name)) return false;
            User u = db.Users.Where(w => w.UserName == Name).FirstOrDefault();
            if (u == null) return false;
            var password = System.Web.Security.Membership.GeneratePassword(16, 4);
            u.Password = Utility.Sha512Hash(password);
            db.SaveChanges();
            Utility.SendMail(u.UserName, "Thiết lập lại mật khẩu", "Mật khẩu mới của bạn là: " + password);
            return true;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
                db = null;
            }
            base.Dispose(disposing);
        }
    }
}
