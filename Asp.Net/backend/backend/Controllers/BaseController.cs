using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Entity;
using System.Security.Claims;
using backend.Utilities;
using Microsoft.AspNetCore.Hosting;

namespace backend.Controllers
{
    public class BaseController : Controller
    {
        public BaseController()
        {}

        public User GetUser()
        {
            string role = User?.Claims?.Where(w => w.Type.Equals(ClaimTypes.Role)).FirstOrDefault()?.Value ?? Constant.RoleUser.ToString();
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