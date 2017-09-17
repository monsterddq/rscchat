using chat.Filters;
using System.Linq;
using System.Security.Claims;
using System.Web.Http;
using Newtonsoft.Json;

namespace chat.Controllers
{
    public class UsersController : ApiController
    {
        [JwtAuthentication]
        public string Get()
        {
            var identity = User.Identity as ClaimsIdentity;
            var claims = identity.Claims.Select(w => new { Value=  w.Value, Key = w.Type.Substring(w.Type.LastIndexOf("/")+1)}).ToList();
            return JsonConvert.SerializeObject(claims);
        }
    }
}
