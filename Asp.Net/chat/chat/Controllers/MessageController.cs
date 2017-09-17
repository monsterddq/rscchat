using chat.Filters;
using chat.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Data.Entity;

namespace chat.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [JwtAuthentication]
    public class MessageController : ApiController
    {
        ChatDbContext db = new ChatDbContext();
        public List<Message> Get(int id)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                return db.Messages.Where(w => w.RoomId == id).Include(w => w.Room).Include(w => w.User).OrderBy(w => w.Time).ToList();
            }
        }

    }
}
