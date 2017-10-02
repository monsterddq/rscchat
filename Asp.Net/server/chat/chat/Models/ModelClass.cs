using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace chat.Models
{
    public class ModelClass
    {
    }
    public class Login
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string PasswordSha;
        public string Password {
            get
            {
                return this.PasswordSha;
            }
            set
            {
                this.PasswordSha = Utility.Sha512Hash(value);
            }
        }
    }
    public class Register
    {
        [Required]
        [EmailAddress]
        public string UserName { get; set; }
        [Required]
        public string PasswordSha;
        public string Password
        {
            get
            {
                return this.PasswordSha;
            }
            set
            {
                this.PasswordSha = Utility.Sha512Hash(value);
            }
        }
        public string FullName { get; set; }
    }
    public class UserName
    {
        public string Name { get; set; }
    }
    public class CreateRoom
    {
        public int Type { get; set; }
        public string UserName { get; set; }
        public string Name
        {
            get
            {
                return this.Type + "-" + this.UserName;
            }
        }
    }
}