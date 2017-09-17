using chat.Filters;
using chat.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace chat.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [JwtAuthentication]
    public class RoomController : ApiController
    {
        ChatDbContext db = new ChatDbContext();
        public List<Room> Get(int id)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                try
                {
                    return db.Rooms.Where(w => w.RoomId == id).Include(w => w.UserRoom).ToList();
                }
                catch (Exception)
                {
                    return null;
                }

            }
        }
    }
}
