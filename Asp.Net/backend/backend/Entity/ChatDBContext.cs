using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Utilities;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace backend.Entity
{
    public class ChatDBContext : DbContext
    {
        public ChatDBContext() : base()
        {}

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<UserRoom> UseRooms { get; set; }
        public virtual DbSet<Message> Messages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory(Utility.CustomLoggerFactory)
                .UseSqlite("Data Source=chat.db")
                .ConfigureWarnings(warnings => warnings.Throw(CoreEventId.IncludeIgnoredWarning));
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRoom>().HasKey(w => new { w.RoomId, w.UserName });
            base.OnModelCreating(modelBuilder);
        }
    }
}