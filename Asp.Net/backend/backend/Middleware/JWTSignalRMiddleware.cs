using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace backend.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class JWTSignalRMiddleware
    {
        private readonly RequestDelegate _next;

        public JWTSignalRMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext httpContext)
        {
            if (httpContext.Request.Path.Value.Contains("signalR"))
            {
                var qs = httpContext.Request.Query["authorization"].ToString();
                httpContext.Request.Headers.Add("Authorization", qs);
            }
            return _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
}
