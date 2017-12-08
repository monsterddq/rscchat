using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entity
{
    public class User
    {

        [Key]
        [Required]
        public string UserName { get; set; }
        [MinLength(6)]
        [Required]
        public string Password { get; set; }
        public string Avatar { get; set; }
        [Required]
        public string FullName { get; set; }
        [Phone]
        public string Phone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public bool VerifyEmail { get; set; }
        public int Role { get; set; }

        public virtual ICollection<UserRoom> UserRoom { get; set; }

        public User()
        {
            this.UserRoom = new List<UserRoom>();
        }

        public User(ICollection<UserRoom> userRoom)
        {
            UserRoom = userRoom;
        }

        public User(string userName, string password, string avatar, string fullName, string phone, bool verifyEmail, int role, ICollection<UserRoom> userRoom,string email)
        {
            UserName = userName;
            Password = password;
            Avatar = avatar;
            FullName = fullName;
            Phone = phone;
            VerifyEmail = verifyEmail;
            Role = role;
            Email = email;
            UserRoom = userRoom;
        }
    }
}
