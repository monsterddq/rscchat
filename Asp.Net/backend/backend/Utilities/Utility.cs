using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Security.Claims;
using System.Globalization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;

namespace backend.Utilities
{
    public class Utility
    {
        public static readonly LoggerFactory CustomLoggerFactory
            = new LoggerFactory(new[] { new ConsoleLoggerProvider((_, __) => true, true) });
        public static string Sha512Hash(string message)
        {
            System.Text.StringBuilder Sb = new System.Text.StringBuilder();
            var b1 = System.Text.Encoding.UTF8.GetBytes(message);
            var bs = System.Security.Cryptography.SHA512.Create().ComputeHash(b1);
            foreach (byte b in bs)
                Sb.Append(b.ToString("x2"));
            return Sb.ToString();
        }

        public static object Room(string param)
        {
            switch (param)
            {
                case "1":
                    return "manager";
                case "manager":
                    return 1;
                case "2":
                    return "technical";
                case "technical":
                    return 2;
                case "3":
                    return "advisory";
                case "advisory":
                    return 3;
                default:
                    return string.Empty;

            }
        }
        public static async Task SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Thẻ thiết kế", "noreply.1@artgraphicstock.com"));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message };
            using (var client = new SmtpClient())
            {
                var credentials = new NetworkCredential
                {
                    UserName = "noreply.1@artgraphicstock.com", // replace with valid value
                    Password = "trannamtrang2017" // replace with valid value
                };

                client.LocalDomain = "domain.com";
                // check your smtp server setting and amend accordingly:
                await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.Auto).ConfigureAwait(false);
                await client.AuthenticateAsync(credentials);
                await client.SendAsync(emailMessage).ConfigureAwait(false);
                await client.DisconnectAsync(true).ConfigureAwait(false);
            }
        }
    }
}
