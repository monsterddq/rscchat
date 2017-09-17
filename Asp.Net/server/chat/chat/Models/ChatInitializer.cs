using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
namespace chat.Models
{
    public class ChatInitializer: DropCreateDatabaseIfModelChanges<ChatDbContext>
    {
        protected override void Seed(ChatDbContext context)
        {
            context.Users.Add(new User() { UserId= 1,UserName = "thaidq@d3plus.com",Password = Utility.Sha512Hash("12345678"),Avatar= "",FullName= "Admin",VerifyEmail= true, Role=0, Phone="0987212122" });
            context.SaveChanges();
            base.Seed(context);
        }
    }
}