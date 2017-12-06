using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace backend.Service
{
    public interface ICommonService<E, K> where E : class
    {
        List<E> GetAll();
        List<E> FindBy(Expression<Func<E, bool>> predicate);
        E FindOne(K key);
        E Add(E obj);
        E Modify(K key, E obj);
        void Remove(K key);
    }
}
