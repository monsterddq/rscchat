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
    public class RoomsController : ApiController
    {
        ChatDbContext db = new ChatDbContext();
        public Room Post([FromBody]CreateRoom cr)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                try
                {
                    if (string.IsNullOrEmpty(cr.Email)) return null;
                    var room = db.Rooms.Where(w => w.Name == cr.Name).ToList();
                    var q = new Room();
                    if (room.Count == 0 || room.LastOrDefault().Status == true)
                    {
                        q.Name = cr.Name;
                        q.Status = false;
                        q.Type = cr.Type;
                        db.Rooms.Add(q);
                        db.SaveChanges();
                        db.UseRooms.Add(new UserRoom() { RoomId = q.RoomId, UserId = db.Users.Where(w => w.Role == 0).SingleOrDefault().UserId });
                        db.UseRooms.Add(new UserRoom() { RoomId = q.RoomId, UserId = db.Users.Where(w => w.UserName == User.Identity.Name).SingleOrDefault().UserId });
                        db.SaveChanges();
                        tran.Commit();
                        return q;
                    }
                    else
                    {
                        return room.FirstOrDefault();
                    }
                    
                }
                catch (Exception)
                {
                    tran.Rollback();
                    return null;
                }
            }
        }
        
        public List<Room> Get() => db.Rooms.ToList();
    }
}
