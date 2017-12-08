using System.Linq;
using Microsoft.AspNetCore.Mvc;
using backend.Entity;
using System.Security.Claims;
using backend.Utilities;

namespace backend.Controllers
{
    public class BaseController : Controller
    {
        public BaseController()
        {}

        public User GetUser()
        {
            var role = User?.Claims?.Where(w => w.Type.Equals(ClaimTypes.Role)).FirstOrDefault()?.Value ?? Constant.RoleUser.ToString();
            var user = new User
            {
                UserName = User?.Claims?.FirstOrDefault(w => w.Type.Equals(ClaimTypes.NameIdentifier))?.Value ?? "",
                FullName = User?.Claims?.FirstOrDefault(w => w.Type.Equals(ClaimTypes.Name))?.Value ?? "",
                Email = User?.Claims?.FirstOrDefault(w => w.Type.Equals(ClaimTypes.Email))?.Value ?? "",
                Phone = User?.Claims?.FirstOrDefault(w=>w.Type.Equals(ClaimTypes.MobilePhone))?.Value ?? "",
                Role = int.Parse(role),
                Avatar = User?.Claims?.FirstOrDefault(w => w.Type.Equals(ClaimTypes.Actor))?.Value ?? ""
            };
            return user;
        }
    }
}