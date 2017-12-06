using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Entity;
using backend.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class UserController : BaseController
    {
        private UserService service;

        public UserController()
        {
            service = new UserService();
        }

        [HttpPost]
        [Route("register")]
        public JsonResult Post(User user)
        {
            try
            {
                if (!ModelState.IsValid)
                    return Json((error: 002, message: "Error Data"));
                if (!user.UserName?.Contains("@") ?? true)
                    user.Phone = user.UserName;
                else
                    user.Email = user.UserName;
                service.Add(user);
                return Json((error: 200, message: "Success"));
            }
            catch (Exception)
            {
                return Json((error: 001, message: "Duplicate Data"));
            }
        }

    }
}