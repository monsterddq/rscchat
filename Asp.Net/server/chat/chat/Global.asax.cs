using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using chat.Models;
using System.Data.Entity;

namespace chat
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            Utility.Secret = "pk78syiEByfpCRHp5GdA7K0Z4+4dvc1X73fibeF0yCdh3z4kvCOOobqfF/ewWQIbfQP+0wuBvH4S9sw9FD2OAA==";
            Database.SetInitializer<ChatDbContext>(new ChatInitializer());
        }
    }
}
