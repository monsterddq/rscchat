using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
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

        public static bool SendMail(string MailTo, string Subject,string Body)
        {
            string mail = "d3pluscompany@gmail.com";
            string passowrd = "@d3plus.com@";
            MailMessage cm = new MailMessage
            {
                From = new MailAddress(mail)
            };
            cm.To.Add(MailTo);
            cm.Subject = Subject;
            cm.Body = Body;
            cm.IsBodyHtml = true;
            cm.BodyEncoding = UTF8Encoding.UTF8;
            cm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
            SmtpClient client = new SmtpClient
            {
                Port = 587,
                Host = "smtp.gmail.com",
                EnableSsl = true,
                Timeout = 10000,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential("Chat App", passowrd)
            };
            try
            {
                client.Send(cm);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            
        }
    }
}