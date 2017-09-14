using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace chat
{
    public static class Utility
    {
        public static string Secret;
        public static string Sha512Hash(string message)
        {
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            var b1 = System.Text.Encoding.UTF8.GetBytes(message);
            var b2 = System.Security.Cryptography.SHA512.Create().ComputeHash(b1);
            foreach (byte b in b2)
                sb.Append(b.ToString("x2"));
            return sb.ToString();
        }
        
    }
}