using backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using backend.Repository;
using static backend.Utilities.Utility;
using static backend.Utilities.Constant;

namespace backend.Service
{
    public class UserService : CommonServiceClass<User, string>, ICommonService<User, string>
    {
        private UserRepository repository;
        public UserService()
        {
            repository = new UserRepository();
        }
        public override User Add(User obj)
        {
            if (!IsUniqueUserName(obj) && !IsUniquePhone(obj))
                throw new Exception("UserName or Phone is duplicate.");
            obj.Role = 4;
            obj.Password = Sha512Hash(obj.Password);
            repository.Add(obj);
            return obj;
        }

        public override List<User> FindBy(Expression<Func<User, bool>> predicate)
        {
            return repository.FindBy(predicate).ToList();
        }

        public override User FindOne(string key)
        {
            return repository.Find(key);
        }

        public override List<User> GetAll()
        {
            return repository.GetAll();
        }

        public override User Modify(string key, User obj)
        {
            var user = repository.Find(key);
            if (user == null)
                throw new Exception("Can't find User by key");
            repository.Modify(obj);
            return obj;
        }

        public override void Remove(string key)
        {
            var user = repository.Find(key);
            if (user == null)
                throw new Exception("Can't find User by key");
            repository.Remove(user);
        }

        public bool CheckPassword(string password, User user)
            => Sha512Hash(password).Equals(user.Password);

        private bool IsUniqueUserName(User user)
            => repository.Find(user.UserName) == null;

        private bool IsUniquePhone(User user)
            => repository.FindBy(w => w.Phone.Equals(user.Phone)).Count == 0;

        public bool IsExistsUserByUsername(string username)
            => repository.Find(username) != null;
    }
}
