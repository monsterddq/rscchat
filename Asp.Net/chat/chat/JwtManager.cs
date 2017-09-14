using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
namespace chat
{
    public class JwtManager
    {
        public static string GenerateToken(string UserName, int Role, string Avatar, string FullName,int expireMinutes = 20) 
        {
            var symmetricKey = Convert.FromBase64String(Utility.Secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            var now = DateTime.UtcNow;
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                        new Claim(ClaimTypes.Email,UserName),
                        new Claim(ClaimTypes.Role, Role.ToString()),
                        new Claim(ClaimTypes.Actor, Avatar),
                        new Claim(ClaimTypes.Name,FullName)
                        }),
                Expires = now.AddMilliseconds(Convert.ToInt32(expireMinutes)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var stoken = tokenHandler.CreateToken(tokenDescription);
            return tokenHandler.WriteToken(stoken);
        }

        public static ClaimsPrincipal GetPrincipal(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(token) as JwtSecurityToken;
                if (jwtToken == null) return null;
                var symmetriKey = Convert.FromBase64String(Utility.Secret);
                var validationParameter = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(symmetriKey)
                };
                SecurityToken securityToken;
                return tokenHandler.ValidateToken(token, validationParameter, out securityToken);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}