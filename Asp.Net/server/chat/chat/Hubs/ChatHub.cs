using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using chat.Models;
using System.Data.Entity;
using Newtonsoft.Json;

namespace chat.Hubs
{
    public class ChatHub : Hub
    {
        private ChatDbContext db = new ChatDbContext();

        public override Task OnConnected()
        {
            var param = Context.QueryString["a"];
            var param1 = Context.QueryString["b"];
            var q = db.UseRooms.Include(w => w.User).Include(w => w.Room).ToList();
            q.ForEach(w => { if (w.User.UserName == param && w.Room.RoomId.ToString() == param1) { JoinRoom(w.RoomId.ToString()); } });
            return base.OnConnected();
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }

        public void JoinRoom(string roomName)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                Groups.Add(Context.ConnectionId, roomName);
            }
        }

        public void LeaveRoom(string roomName)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                Groups.Remove(Context.ConnectionId, roomName);
            }
        }

        public void SendMessage(string username, string message, string group)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                int roomid = Convert.ToInt32(group);
                try
                {
                    db.Messages.Add(new Message() { Content = message, RoomId = roomid, Time = DateTime.Now, UserName=username  });
                    db.SaveChanges();
                    tran.Commit();
                }
                catch (Exception)
                {
                    tran.Rollback();
                }
                finally
                {
                    var r = db.Rooms.Where(w => w.RoomId == roomid).SingleOrDefault();
                    if (r.Status) Clients.Caller.addMessage(username, "Nhóm chat đã đóng. Không thể chat trong nhóm này", group);
                    else Clients.Group(group).addMessage(username, message, group);
                }
            }

        }
        public void CloseRoom(int id)
        {
            var q = db.Rooms.Find(id);
            q.Status = true;
            db.SaveChanges();
        }

        public void AddMember(string username, string group)
        {
            int roomid = Convert.ToInt32(group);
            var u = db.Users.Where(w => w.UserName == username).SingleOrDefault();
            if (u == null)
            {
                Clients.Caller.addMember("Không tìm thấy admin nào với email/SĐT: " + username);
            }
            else
            {
                db.UseRooms.Add(new UserRoom() { RoomId = roomid, UserName = username });
                db.SaveChanges();
                Clients.Caller.addMember("Đã thêm admin có email/SĐT: " + username + " vào nhóm");
            }

        }

        public void LeaveRoom(int id, string username)
        {
            db.UseRooms.Remove(db.UseRooms.Where(w => w.UserName == username && w.RoomId == id).SingleOrDefault());
            db.SaveChanges();
            LeaveRoom(id.ToString());
            Clients.Caller.leaveRoom("Bạn đã rời khóm nhóm này");
        }
    }

    public class RoomHub : Hub
    {
        ChatDbContext db = new ChatDbContext();

        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public void GetListRoom(string username)
        {
            List<List<object>> list = new List<List<object>>();
            try
            {
                User u = db.Users.Where(w => w.UserName.Equals(username)).SingleOrDefault();
                var q = new List<Room>();
                switch (u.Role)
                {
                    case 0:
                        q = db.Rooms.OrderByDescending(w => w.Time).ToList();
                        break;
                    case 2:
                        q = db.Rooms.Where(w => w.Type == 0).OrderByDescending(w => w.Time).ToList();
                        break;
                    case 3:
                        q = db.Rooms.Where(w => w.Type == 1).OrderByDescending(w => w.Time).ToList();
                        break;
                    case 4:
                        q = db.Rooms.Where(w => w.Type == 2).OrderByDescending(w => w.Time).ToList();
                        break;
                }
                db.UseRooms.Where(w => w.UserName == username).ToList().ForEach(w => { if (!q.Any(e => e.RoomId == w.RoomId)) { q.Add(db.Rooms.Find(w.RoomId)); } });
                foreach (var item in q)
                {

                    if (db.UseRooms.Include(w => w.User).ToList().Where(w=>w.User.UserName.Equals(username)).Count()>0)
                    {
                        List<object> o = new List<object>();
                        o.Add(item.RoomId);
                        o.Add(item.Name);
                        o.Add(item.Status);
                        o.Add(item.Time);
                        o.Add(item.Type);
                        try
                        {
                            var p = db.Messages.Where(w => w.RoomId == item.RoomId).OrderByDescending(w=>w.Time).ToList().LastOrDefault();
                            if (p != null)
                            {
                                o.Add(p.Content);
                                o.Add(p.Time);
                            }
                            else
                            {
                                o.Add("");
                                o.Add("");
                            }
                        }
                        catch (Exception)
                        {}
                        list.Add(o);
                    }
                }
                Clients.Caller.getListRoom(list);
            }
            catch (Exception e)
            {
                Clients.Caller.getListRoom(e);
            }
            
        }

    }
}