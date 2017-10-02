using chat.Filters;
using chat.Models;
using Newtonsoft.Json;
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
                    if (string.IsNullOrEmpty(cr.UserName)) return null;
                    var room = db.Rooms.Where(w => w.Name == cr.Name).ToList();
                    var q = new Room();
                    if (room.Count == 0 || room.LastOrDefault().Status == true)
                    {
                        q.Name = cr.Name;
                        q.Status = false;
                        q.Type = cr.Type;
                        q.Time = DateTime.Now;
                        db.Rooms.Add(q);
                        db.SaveChanges();
                        db.UseRooms.Add(new UserRoom() { RoomId = q.RoomId, UserName = db.Users.Where(w => w.Role == 0).SingleOrDefault().UserName });
                        db.UseRooms.Add(new UserRoom() { RoomId = q.RoomId, UserName = db.Users.Where(w => w.UserName == User.Identity.Name).SingleOrDefault().UserName });
                        int type = 4;
                        switch (q.Type)
                        {
                            case 0:
                                type = 2;
                                break;
                            case 1:
                                type = 3;
                                break;
                            default:
                                type = 4;
                                break;
                        }
                        db.Users.Where(w => w.Role == type).ToList().ForEach(w => db.UseRooms.Add(new UserRoom() { RoomId = q.RoomId, UserName = w.UserName}));
                        db.SaveChanges();
                        tran.Commit();
                        return q;
                    }
                    else
                    {
                        return room.LastOrDefault();
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
        [HttpPut]
        public string Put(string id)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                try
                {
                    User u = db.Users.Where(w => w.UserName.Equals(User.Identity.Name)).SingleOrDefault();
                    if (u.Role == 0 && !db.Rooms.Any(w=>w.Name== id))
                    {
                        Room q = new Room() { Name = id, Status = false, Type = 3, Time= DateTime.Now };
                        db.Rooms.Add(q);
                        db.SaveChanges();
                        db.UseRooms.Add(new UserRoom() { RoomId = q.RoomId, UserName = u.UserName});
                        db.SaveChanges();
                        tran.Commit();
                        return JsonConvert.SerializeObject(q);
                    }
                    else return null;
                }
                catch (Exception){
                    tran.Rollback();
                    return null;
                }
            }
        }
    }
}
