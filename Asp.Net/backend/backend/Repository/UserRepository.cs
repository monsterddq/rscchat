using backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class UserRepository : CommonRepositoryClass<User, string>, ICommonRepository<User, string>
    {
        public override User Add(User obj)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                db.Users.Add(obj);
                db.SaveChanges();
                tran.Commit();
                return obj;
            }
        }

        public override User Find(string key)
        {
            return db.Users
                 .Include(w => w.UserRoom)
                 .SingleOrDefault(w => w.UserName.Equals(key));
        }

        public override List<User> FindBy(Expression<Func<User, bool>> predicate)
        {
            return db.Users
                .Where(predicate)
                .Include(w => w.UserRoom)
                .ToList();
        }

        public override List<User> GetAll()
        {
            return db.Users
                .OrderBy(w => w.UserName)
                .Include(w => w.UserRoom)
                .ToList();
        }

        public override List<User> LimitedWithFindBy(Expression<Func<User, bool>> predicate, int start, int limit)
        {
            return db.Users
                .Where(predicate)
                .Skip(start * limit)
                .Take(limit)
                .OrderBy(w => w.UserName)
                .Include(w => w.UserRoom)
                .ToList();
        }

        public override List<User> LimitedWithGetAll(int start, int limit)
        {
            return db.Users
                .Skip(start * limit)
                .Take(limit)
                .OrderBy(w => w.UserName)
                .Include(w => w.UserRoom)
                .ToList();
        }

        public override User Modify(User obj)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                db.Entry(obj).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                tran.Commit();
                return obj;
            }
        }

        public override void Remove(User obj)
        {
            db.Users.Remove(obj);
            db.SaveChanges();
        }
    }
}
