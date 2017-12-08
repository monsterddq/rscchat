using backend.Entity;
using backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static backend.Config.JwtManager;

namespace backend.Service
{
    public class SecurityService
    {
        private readonly UserRepository _repository;
        private readonly UserService _userService;
        public SecurityService()
        {
            _repository = new UserRepository();
            _userService = new UserService();
        }

        public string Login(User user)
        {
             var u = _repository.Find(user.UserName);
            if (u == null)
                throw new Exception("Can't find User by UserName");
            if (!_userService.CheckPassword(user.Password, u))                                   
                throw new Exception("Password is not match");
            return GenerateToken(u.UserName, u.FullName, u.Phone, u.Email, u.Role.ToString(), u.Avatar);
        }
    }
}
