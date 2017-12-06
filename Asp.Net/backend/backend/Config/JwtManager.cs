using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using static backend.Utilities.Constant;

namespace backend.Config
{
    public static class JwtManager
    {
        public static string GenerateToken(string UserName, string FullName, string Phone, string Email, string Role,string Avatar, int expireMinutes = 60)
        {
            var symmetricKey = Convert.FromBase64String(Serect);
            var now = DateTime.UtcNow;
            var claims = new Claim[] {
                    new Claim(ClaimTypes.NameIdentifier, UserName ?? ""),
                    new Claim(ClaimTypes.Name, FullName ?? ""),
                    new Claim(ClaimTypes.MobilePhone, Phone ?? ""),
                    new Claim(ClaimTypes.Email, Email ?? ""),
                    new Claim(ClaimTypes.Actor, Avatar ?? ""),
                    new Claim(ClaimTypes.Role, Role ?? "4")
                };
            var token = new JwtSecurityToken(
                issuer: "Chat.NetCore",
                audience: "ChatClient",
                claims: claims,
                expires: now.AddMinutes(expireMinutes),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256Signature)
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
