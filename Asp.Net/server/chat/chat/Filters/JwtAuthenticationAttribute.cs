﻿using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using chat.Models;
using System.Linq;

namespace chat.Filters
{
    public class JwtAuthenticationAttribute :Attribute, IAuthenticationFilter
    {
        public string Realm { get; set; }
        public bool AllowMultiple => false;

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;
            if (authorization == null || authorization.Scheme != "Bearer") return;
            if (string.IsNullOrEmpty(authorization.Parameter))
            {
                context.ErrorResult = new AuthenticationFailureResult("Missing Jwt Token", request);
                return;
            } 
            var token = authorization.Parameter;
            var principal = await AuthenticateJwtToken(token);
            if (principal == null) context.ErrorResult = new AuthenticationFailureResult("Invalid token", request);
            else context.Principal = principal;
        }

        protected Task<IPrincipal> AuthenticateJwtToken(string token)
        {
            string username,role,avatar,fullname,phone;
            if (ValidateToken(token, out username,out role, out avatar, out fullname,out phone))
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, role),
                    new Claim(ClaimTypes.Actor, avatar),
                    new Claim(ClaimTypes.Email,fullname),
                    new Claim(ClaimTypes.MobilePhone,phone)
                    // Add more claims if needed: Roles, ..
                };

                var identity = new ClaimsIdentity(claims, "Jwt");
                IPrincipal user = new ClaimsPrincipal(identity);
                return Task.FromResult(user);
            }
            return Task.FromResult<IPrincipal>(null);
        }

        private static bool ValidateToken(string token, out string username, out string role, out string avatar, out string fullname, out string phone)
        {
            username = null;
            role = null;
            avatar = null;
            fullname = null;
            phone = null;
            var simplePrinciple = JwtManager.GetPrincipal(token);
            if (simplePrinciple == null) return false;
            var identity = simplePrinciple.Identity as ClaimsIdentity;
            if (identity == null) return false;
            if (!identity.IsAuthenticated) return false;
            var usernameClaim = identity.FindFirst(ClaimTypes.Email);
            username = usernameClaim?.Value;
            role = identity.FindFirst(ClaimTypes.Role)?.Value;
            avatar = identity.FindFirst(ClaimTypes.Actor)?.Value;
            fullname = identity.FindFirst(ClaimTypes.Name)?.Value;
            phone = identity.FindFirst(ClaimTypes.MobilePhone)?.Value;
            if (string.IsNullOrEmpty(username)) return false;
            ChatDbContext db = new ChatDbContext();
            var user = username;
            if (!db.Users.Any(w => w.UserName == user)) return false;
            return true;
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            Challenge(context);
            return Task.FromResult(0);
        }

        private void Challenge(HttpAuthenticationChallengeContext context)
        {
            string parameter = null;

            if (!string.IsNullOrEmpty(Realm))
                parameter = "realm=\"" + Realm + "\"";
            context.ChallengeWith("Bearer", parameter);
        }
    }
}