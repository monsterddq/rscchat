using System;
using Microsoft.AspNetCore.Mvc;
using backend.Service;
using backend.Entity;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class SecurityController : BaseController
    {
        private readonly SecurityService _service;

        public SecurityController()
        {
            _service = new SecurityService();
        }

        [HttpPost]
        [Route("auth")]
        public JsonResult Get(User user)
        {
            try
            {
                return Json(_service.Login(user));
            }
            catch (Exception e)
            {
                return Json((error: "401", message: $"Unauthenticate: {e.Message}"));
            }
        }
    }
}