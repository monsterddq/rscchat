using backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace backend.Repository
{
    public abstract class CommonRepositoryClass<E, K> : ICommonRepository<E, K>
        where E : class
    {
        protected ChatDBContext db;
        public CommonRepositoryClass()
        {
            db = new ChatDBContext();
        }

        public abstract E Add(E obj);
        public abstract E Find(K key);
        public abstract List<E> FindBy(Expression<Func<E, bool>> predicate);
        public abstract List<E> GetAll();
        public abstract List<E> LimitedWithFindBy(Expression<Func<E, bool>> predicate, int start, int limit);
        public abstract List<E> LimitedWithGetAll(int start, int limit);
        public abstract E Modify(E obj);
        public abstract void Remove(E obj);

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }
    }
}
