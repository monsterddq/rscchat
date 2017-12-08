using backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using backend.Repository;
using Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.Internal.Networking;
using static backend.Utilities.Utility;
using static backend.Utilities.Constant;

namespace backend.Service
{
    public class UserService : CommonServiceClass<User, string>, ICommonService<User, string>
    {
        private readonly UserRepository _repository;
        public UserService()
        {
            _repository = new UserRepository();
        }
        public override User Add(User obj)
        {
            if (!IsUniqueUserName(obj) && !IsUniquePhone(obj))
                throw new Exception("UserName or Phone is duplicate.");
            obj.Role = 4;
            obj.Password = Sha512Hash(obj.Password);
            _repository.Add(obj);
            return obj;
        }

        public override List<User> FindBy(Expression<Func<User, bool>> predicate)
        {
            return _repository.FindBy(predicate).ToList();
        }

        public override User FindOne(string key)
        {
            return _repository.Find(key);
        }

        public override List<User> GetAll()
        {
            return _repository.GetAll();
        }

        public override User Modify(string key, User obj)
        {
            var user = _repository.Find(key);
            if (user == null)
                throw new Exception("Can't find User by key");
            _repository.Modify(obj);
            return obj;
        }

        public override void Remove(string key)
        {
            var user = _repository.Find(key);
            if (user == null)
                throw new Exception("Can't find User by key");
            _repository.Remove(user);
        }

        public bool CheckPassword(string password, User user)
            => Sha512Hash(password).Equals(user.Password);

        private bool IsUniqueUserName(User user)
            => _repository.Find(user.UserName) == null;

        private bool IsUniquePhone(User user)
            => _repository.FindBy(w => w.Phone.Equals(user.Phone)).Count == 0;

        public bool IsExistsUserByUsername(string username)
            => _repository.Find(username) != null;

        public bool HasUserByEmail(string email)
            => _repository.FindBy(w => w.Email.Equals(email)).Count > 0;
        
        public bool HasUserByPhone(string phone)
            => _repository.FindBy(w => w.Phone.Equals(phone)).Count > 0;
    }
}
