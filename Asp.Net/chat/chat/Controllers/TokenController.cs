using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using chat.Models;
using System.IdentityModel.Tokens.Jwt;
namespace chat.Controllers
{
    public class TokenController : ApiController
    {
        private ChatDbContext db = new ChatDbContext();

        [AllowAnonymous]
        public string Get(Login login)
        {
            if (ModelState.IsValid)
            {
                var user = db.Users.Where(w => w.UserName == login.UserName && w.Password == Utility.Sha512Hash(login.Password)).FirstOrDefault();
                if(user!=null) JwtManager.GenerateToken(login.UserName, user.Role, user.Avatar, user.FullName);
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }
            throw new HttpResponseException(HttpStatusCode.Unauthorized);
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
