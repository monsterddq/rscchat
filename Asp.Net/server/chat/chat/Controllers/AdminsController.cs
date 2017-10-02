using chat.Filters;
using chat.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace chat.Controllers
{
    public class AdminsController : ApiController
    {
        private ChatDbContext db = new ChatDbContext();
        [AllowAnonymous]
        public string Post([FromBody]Login login)
        {
            if (string.IsNullOrEmpty(login.UserName) || string.IsNullOrEmpty(login.Password)) return "";
            var user = db.Users.Where(w => w.UserName == login.UserName && w.Password == login.Password).FirstOrDefault();
            if (user != null)
            {
                if (user.Role == 1) return "";
                else return JwtManager.GenerateToken(login.UserName, user.Role, user.Avatar, user.FullName, user.Phone);
            }
            else return "";
        }
        [JwtAuthentication]
        public string Get()
        {
            var identity = User.Identity as ClaimsIdentity;
            var claims = identity.Claims.Select(w => new { Value = w.Value, Key = w.Type.Substring(w.Type.LastIndexOf("/") + 1) }).ToList();
            return JsonConvert.SerializeObject(claims);
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
                    Phone = "0936748822",
                    Avatar = " "
                });
                db.SaveChanges();
                return true;
            }
            else return false;
        }
    }
}
