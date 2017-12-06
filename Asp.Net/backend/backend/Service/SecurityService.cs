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
        private UserRepository repository;
        private UserService userService;
        public SecurityService()
        {
            repository = new UserRepository();
            userService = new UserService();
        }

        public string Login(User user)
        {
            var u = repository.Find(user.UserName);
            if (u == null)
                throw new Exception("Can't find User by UserName");
            if (!userService.CheckPassword(user.Password, u))                                   
                throw new Exception("Password is not match");
            return GenerateToken(u.UserName, u.FullName, u.Phone, u.Email, u.Role.ToString(), u.Avatar);
        }
    }
}
