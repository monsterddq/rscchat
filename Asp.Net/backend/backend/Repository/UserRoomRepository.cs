using backend.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace backend.Repository
{
    public class UserRoomRepository : CommonRepositoryClass<UserRoom, (int RoomId, string UserName)>
                                    , ICommonRepository<UserRoom, (int RoomId, string UserName)>
    {
        public override UserRoom Add(UserRoom obj)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                db.UseRooms.Add(obj);
                db.SaveChanges();
                tran.Commit();
                return obj;
            }
        }

        public override UserRoom Find((int RoomId, string UserName) key)
        {
            return db.UseRooms
                 .Where(w => w.RoomId == key.RoomId && w.UserName.Equals(key.UserName))
                 .Include(w => w.User)
                 .Include(w => w.Room)
                 .SingleOrDefault();
        }

        public override List<UserRoom> FindBy(Expression<Func<UserRoom, bool>> predicate)
        {
            return db.UseRooms
                .Where(predicate)
                .OrderBy(w => w.UserName)
                .Include(w => w.User)
                 .Include(w => w.Room)
                .ToList();
        }

        public override List<UserRoom> GetAll()
        {
            return db.UseRooms
                .OrderByDescending(w => w.UserName)
                .Include(w => w.User)
                 .Include(w => w.Room)
                 .ToList();
        }

        public override List<UserRoom> LimitedWithFindBy(Expression<Func<UserRoom, bool>> predicate, int start, int limit)
        {
            return db.UseRooms
                .Where(predicate)
                .OrderBy(w => w.UserName)
                .Skip(start * limit)
                .Take(limit)
                .Include(w => w.User)
                 .Include(w => w.Room)
                 .ToList();
        }

        public override List<UserRoom> LimitedWithGetAll(int start, int limit)
        {
            return db.UseRooms
                .OrderBy(w => w.UserName)
                .Skip(start * limit)
                .Take(limit)
                .Include(w => w.User)
                 .Include(w => w.Room)
                 .ToList();
        }

        public override UserRoom Modify(UserRoom obj)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                db.Entry(obj).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                tran.Commit();
                return obj;
            }
        }

        public override void Remove(UserRoom obj)
        {
            db.UseRooms.Remove(obj);
            db.SaveChanges();
        }
    }
}