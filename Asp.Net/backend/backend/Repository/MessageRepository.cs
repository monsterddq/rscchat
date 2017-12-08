using backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class MessageRepository : CommonRepositoryClass<Message, int>, ICommonRepository<Message, int>
    {
        public override Message Add(Message obj)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                db.Messages.Add(obj);
                db.SaveChanges();
                tran.Commit();
                return obj;
            }
        }

        public override Message Find(int key)
        {
            return db.Messages
                     .Include(w => w.Room)
                     .Include(w => w.User)
                     .SingleOrDefault(w => w.MessageId == key);
        }

        public override List<Message> FindBy(Expression<Func<Message, bool>> predicate)
        {
            return db.Messages
                     .Include(w => w.Room)
                     .Include(w => w.User)
                     .Where(predicate)
                     .OrderByDescending(w => w.Time)
                     .ToList();
        }

        public override List<Message> GetAll()
        {
           return db.Messages
                    .Include(w => w.Room)
                    .Include(w => w.User)
                    .OrderByDescending(w => w.Time)
                    .ToList();
        }

        public override List<Message> LimitedWithFindBy(Expression<Func<Message, bool>> predicate, int start, int limit)
        {
            return db.Messages
                     .Include(w => w.Room)
                     .Include(w => w.User)
                     .Where(predicate)
                     .OrderByDescending(w => w.Time)
                     .Skip(start * limit)
                     .Take(limit)
                     .ToList();
        }
        public override List<Message> LimitedWithGetAll(int start, int limit)
        {
            return db.Messages
                     .Include(w => w.Room)
                     .Include(w => w.User)
                     .OrderByDescending(w => w.Time)
                     .Skip(start * limit)
                     .Take(limit)
                     .ToList();
        }

        public IEnumerable<Message> LimitedWithGetAllByRoomId(int roomId, int start, int limit)
        {
            return db.Messages
                .Include(w => w.Room)
                .Include(w => w.User)
                .Where(w=>w.RoomId == roomId)
                .OrderByDescending(w => w.Time)
                .Skip(start * limit)
                .Take(limit)
                .ToList();
        }

        public override Message Modify(Message obj)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                db.Entry(obj).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                tran.Commit();
                return obj;
            }
        }

        public override void Remove(Message obj)
        {
            db.Messages.Remove(obj);
            db.SaveChanges();
        }
    }
}