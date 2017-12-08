using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using backend.Entity;
using backend.Config;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using static backend.Utilities.Constant;
using backend.Hubs;

namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            using (var db = new ChatDBContext())
            {
                db.Database.EnsureCreated();
            }
            Configuration = configuration;
           
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            AutoMapperConfiguration.Configure();
            services.AddMvc((options =>
            {
                options.CacheProfiles.Add("Default",
                    new CacheProfile()
                    {
                        Duration = 60
                    });
                options.CacheProfiles.Add("LogTime",
                    new CacheProfile()
                    {
                        Location = ResponseCacheLocation.Any,
                        NoStore = true,
                        Duration = 60
                    });
            }))
            .AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore); // fix self reference loop
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtBearer";
                options.DefaultChallengeScheme = "JwtBearer";
                options.DefaultForbidScheme = "JwtBearer";
            })
            .AddJwtBearer("JwtBearer", jwtBearerOption =>
            {
                jwtBearerOption.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(Serect)),

                    ValidateIssuer = true,
                    ValidIssuer = "Chat.NetCore",

                    ValidateAudience = true,
                    ValidAudience = "ChatClient",

                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(5)
                };
            });
            services.AddCors(option =>
            {
                option.AddPolicy("AllowAllOrigin",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader()
                               .AllowCredentials();
                    });
            });
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.Cookie.Name = ".AdventureWorks.Session";
                options.IdleTimeout = TimeSpan.FromMinutes(2);
            });
            services.AddMemoryCache();
            services.AddSignalR();
            services.AddSignalRCore();
            services.AddMvc();
            services.AddDbContext<ChatDBContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory
               .AddConsole(LogLevel.Debug)  // This will output to the console/terminal
               .AddDebug(LogLevel.Debug);   // This will output to Visual Studio Output window7
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseSession();
            app.UseCors("AllowAllOrigin");
            app.UseAuthentication();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
            app.UseSignalR(routes =>
            {
                routes.MapHub<RoomHub>("roomHub");
            });
            app.UseMvc();
        }
    }
}
