using chat.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace chat.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Login() => View();
        public ActionResult Main() => View();
        public ActionResult ListRoom() => View();
        public ActionResult Chat() => View();
        public ActionResult Profile() => View();
        public ActionResult ReactJS() => View();
    }
}
