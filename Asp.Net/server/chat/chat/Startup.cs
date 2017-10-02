using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Cors;

namespace chat
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //app.Map("/signalr", map =>
            //{
            //    var hubConfiguration = new HubConfiguration
            //    {
            //        EnableDetailedErrors = true,
            //        EnableJavaScriptProxies = true
            //    };
            //    map.RunSignalR(hubConfiguration);
            //});
            app.MapSignalR();
        }
    }
}