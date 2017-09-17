using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using chat.Models;
using System.Data.Entity;

namespace chat.Hubs
{
    public class ChatHub : Hub
    {
        private ChatDbContext db = new ChatDbContext();

        public override Task OnConnected()
        {
            var param = Context.QueryString["a"];
            var param1 = Context.QueryString["b"];
            var q = db.UseRooms.Include(w => w.User).Include(w=>w.Room).ToList();
            q.ForEach(w => { if (w.User.UserName == param && w.Room.RoomId.ToString()==param1) { JoinRoom(w.RoomId.ToString()); } });
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

        public void SendMessage(string email, string message, string group)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                try
                {
                    int roomid = Convert.ToInt32(group);
                    var u = db.Users.Where(w => w.UserName == email).SingleOrDefault();
                    db.Messages.Add(new Message() { Content = message, RoomId = roomid, Time = DateTime.Now, UserId = u.UserId });
                    db.SaveChanges();
                    tran.Commit();
                }
                catch (Exception)
                {
                    tran.Rollback();
                }
                finally
                {
                    Clients.Group(group).addMessage(email, message, group);
                }
            }
                
        }
    }
}