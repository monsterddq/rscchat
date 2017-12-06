using backend.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace backend.Repository
{
    public class RoomRepository : CommonRepositoryClass<Room, int>
    {
        public override Room Add(Room obj)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                db.Rooms.Add(obj);
                db.SaveChanges();
                tran.Commit();
                return obj;
            }
        }

        public override Room Find(int key) => db.Rooms.Include(w => w.UserRoom).SingleOrDefault(w => w.RoomId == key);

        public override List<Room> FindBy(Expression<Func<Room, bool>> predicate)
        {
            return db.Rooms
                     .Where(predicate)
                     .OrderBy(w => w.Name)
                     .Include(w => w.UserRoom)
                     .ToList();
        }

        public override List<Room> GetAll()
        {
            return db.Rooms
                     .OrderByDescending(w => w.Time)
                     .Include(w => w.UserRoom)
                     .ToList();
        }

        public override List<Room> LimitedWithFindBy(Expression<Func<Room, bool>> predicate, int start, int limit)
        {
            return db.Rooms
                     .Where(predicate)
                     .OrderByDescending(w => w.Time)
                     .Skip(start * limit)
                     .Take(limit)
                     .Include(w => w.UserRoom)
                     .ToList();
        }

        public override List<Room> LimitedWithGetAll(int start, int limit)
        {
            return db.Rooms
                 .OrderByDescending(w => w.Time)
                 .Skip(start * limit)
                 .Take(limit)
                 .Include(w => w.UserRoom)
                 .ToList();
        }

        public override Room Modify(Room obj)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                db.Entry(obj).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                tran.Commit();
                return obj;
            }
        }

        public override void Remove(Room obj)
        {
            db.Rooms.Remove(obj);
            db.SaveChanges();
        }
    }
}