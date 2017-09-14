using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
namespace chat.Models
{
    public class ChatDbContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<UserRoom> UseRooms { get; set; }
        public virtual DbSet<Message> Messages { get; set; }

        public ChatDbContext() : base("ChatDB")
        {
            base.Configuration.ProxyCreationEnabled = false;
        }
    }
}