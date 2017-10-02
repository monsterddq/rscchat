using chat.Filters;
using chat.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Data.Entity;

namespace chat.Controllers
{
    [JwtAuthentication]
    public class MessageController : ApiController
    {
        ChatDbContext db = new ChatDbContext();
        public List<Message> Get(int id)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                return db.Messages.Where(w => w.RoomId == id).Include(w => w.Room).Include(w => w.User).OrderByDescending(w => w.Time).Take(100).ToList().OrderBy(w=>w.Time).ToList();
            }
        }

    }
}
