using backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace backend.Service
{
    public abstract class CommonServiceClass<E, K> : ICommonService<E, K>
        where E : class
    {
        public abstract E Add(E obj);
        public abstract List<E> FindBy(Expression<Func<E, bool>> predicate);
        public abstract E FindOne(K key);
        public abstract List<E> GetAll();
        public abstract E Modify(K key, E obj);
        public abstract void Remove(K key);
    }
}
