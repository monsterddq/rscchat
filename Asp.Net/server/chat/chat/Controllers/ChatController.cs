using chat.Filters;
using chat.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Data.Entity;

namespace chat.Controllers
{
    [JwtAuthentication]
    public class ChatController : ApiController
    {
        private ChatDbContext db = null;
        public ChatController()
        {
            db = new ChatDbContext();
        }
        public bool Get(int id)
        {
            try
            {
                var u = db.Users.Where(w => w.Role == 0).SingleOrDefault();
                var q = db.Messages.Where(w => w.RoomId == id).Include(w => w.User).Include(w => w.Room).OrderBy(w => w.Time).ToList();
                StringBuilder ct = new StringBuilder();
                foreach (var item in q)
                {
                    ct.AppendLine(item.UserName);
                    ct.AppendLine($" [{item.Time}] :");
                    if (item.Content.Contains("/Content/Image/")) ct.AppendLine($"http://localhost:50000{item.Content}");
                    else ct.AppendLine(item.Content +"<br>");
                }
                Utility.SendMail(u.UserName, $"Nội dung chat trong nhóm", ct.ToString());
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            
        }

        public (string name,int type) Get(int id, string username)
        {
            var q = db.UseRooms.Include(w => w.User).Include(w=>w.Room).Where(w => w.RoomId == id && !w.UserName.Equals(username)).FirstOrDefault();
            return (q.User.FullName, q.Room.Type);
        }
    }
}
