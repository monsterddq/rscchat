using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Service;
using backend.Entity;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class SecurityController : BaseController
    {
        private SecurityService service;

        public SecurityController()
        {
            service = new SecurityService();
        }

        [HttpPost]
        [Route("auth")]
        public JsonResult Get(User user)
        {
            try
            {
                    return Json(service.Login(user));
            }
            catch (Exception e)
            {
                return Json((error: "401", message: $"Unauthenticate: {e.Message}"));
            }
        }
    }
}