using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace backend.Repository
{
    public interface ICommonRepository<E,K> 
        where E : class
    {
        List<E> GetAll();

        List<E> LimitedWithGetAll(int start, int limit);
        E Find(K key);
        List<E> FindBy(Expression<Func<E, bool>> predicate);
        List<E> LimitedWithFindBy(Expression<Func<E, bool>> predicate, int start, int limit);
        E Add(E obj);
        E Modify(E obj);
        void Remove(E obj);
    }
}
