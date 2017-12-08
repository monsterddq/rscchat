using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using backend.Config;
using backend.DTO;
using Microsoft.AspNetCore.Mvc;
using backend.Entity;
using backend.Service;
using backend.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class UserController : BaseController
    {
        private readonly UserService _userService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public UserController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = new UserService();
        }

        [HttpPost]
        [Route("register")]
        public JsonResult Post(User user)
        {
            try
            {
                if (!ModelState.IsValid)
                    return Json((error: 002, message: "Error Data"));
                if (!user.UserName?.Contains("@") ?? true)
                    user.Phone = user.UserName;
                else
                    user.Email = user.UserName;
                user.Role = Constant.RoleUser;
                _userService.Add(user);
                return Json((error: 200, message: "Success"));
            }
            catch (Exception)
            {
                return Json((error: 001, message: "Duplicate Data"));
            }
        }

        [HttpPut]
        [Authorize]
        [Route("/api/user/upload")]
        public string Put(string username, string file,string name)
        {
            var path = $"uploads/{name}";
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, path);
            try
            {
                System.IO.File.WriteAllBytes(uploads, Convert.FromBase64String(file.Split(',')[1]));
                var userCurrent = GetUser();
                var user = _userService.FindOne(userCurrent.UserName);
                if (user == null) return string.Empty;
                user.Avatar = path;
                var userUpdate = _userService.Modify(user.UserName, user);
                Response.Headers.Add(Constant.HeaderAuthorization,
                    JwtManager.GenerateToken(userUpdate.UserName,userUpdate.FullName,userUpdate.Phone
                        ,userUpdate.Email,userUpdate.Role.ToString(),userUpdate.Avatar));
                return path;
            }
            catch (Exception)
            {
                return "";
            }
        }

        [HttpPut]
        [Authorize]
        [Route("/api/user/change-password")]
        public Result<User> ChangePassword(ChangePassword changePassword)
        {
            if (ModelState.IsValid)
            {
                var userCurrent = GetUser();
                var user = _userService.FindOne(userCurrent.UserName);
                try
                {
                    return IsValidChangePassword(changePassword, user);
                }
                catch (Exception)
                {
                    user.Password = Utility.Sha512Hash(changePassword.NewPassword);
                    return new Result<User>(ResultCodes.Success, ResultCodes.Success.GetDescription(),
                        _userService.Modify(user.UserName, user));
                }
            }
            else
            {
                var list = new List<string>();
                foreach (var modelStateValue in ModelState.Values)
                {
                    list.AddRange(modelStateValue.Errors.Select(w=>w.ErrorMessage)); 
                }
                return new Result<User>(ResultCodes.DataInvalid,list.ToString(),null);
            }
        }

        private Result<User> IsValidChangePassword(ChangePassword changePassword, User user)
        {
            if (changePassword.NewPassword != changePassword.RepeatPassword)
                return new Result<User>(Errors.RepeatPasswordIsNotMatch,
                    Errors.RepeatPasswordIsNotMatch.GetDescription(), null);

            if (!user.Password.Equals(Utility.Sha512Hash(changePassword.OldPassword)))
                return new Result<User>(Errors.PasswordIsNotMatch,
                    Errors.PasswordIsNotMatch.GetDescription(), null);
            throw new Exception("999");
        }

        [HttpPut]
        [Authorize]
        public Result<User> Put(string username, User user)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var userDb = _userService.FindOne(user.UserName);
                    try
                    {
                        return ValidateUser(user,userDb);
                    }
                    catch (Exception)
                    {
                        user.Avatar = userDb.Avatar;
                        user.Role = userDb.Role;
                        user.Password = userDb.Password;
                        user.VerifyEmail = userDb.VerifyEmail;
                        Response.Headers.Add(Constant.HeaderAuthorization,
                            JwtManager.GenerateToken(user.UserName,user.FullName,user.Phone,user.Email,user.Role.ToString(),user.Avatar));
                        return new Result<User>(ResultCodes.Success,ResultCodes.Success.GetDescription()
                            ,_userService.Modify(username, user));    
                    }
                }
                catch (Exception)
                {
                    return new Result<User>(ResultCodes.Fatal,ResultCodes.Fatal.GetDescription(),null);
                }
            }
            else
            {
                var list = new List<string>();
                foreach (var modelStateValue in ModelState.Values)
                {
                   list.AddRange(modelStateValue.Errors.Select(w=>w.ErrorMessage)); 
                }
                return new Result<User>(ResultCodes.DataInvalid,list.ToString(),null);
            }
        }

        private Result<User> ValidateUser(User user,User userDb)
        {
            if (!userDb.Password.Equals(Utility.Sha512Hash(user.Password))) 
                return new Result<User>(Errors.PasswordIsNotMatch,Errors.PasswordIsNotMatch.GetDescription(),null);
            if (!userDb.Email.Equals(user.Email) && _userService.HasUserByEmail(user.Email)) 
                return new Result<User>(Errors.EmailIsExists,Errors.EmailIsExists.GetDescription(),null);
            if (!userDb.Phone.Equals(user.Phone) && _userService.HasUserByPhone(user.Phone)) 
                return new Result<User>(Errors.PhoneIsExitst,Errors.PhoneIsExitst.GetDescription(),null);
            throw new Exception("999");
        }
    }
}