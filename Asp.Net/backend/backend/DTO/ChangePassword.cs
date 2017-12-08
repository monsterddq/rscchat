using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class ChangePassword
    {
        [Required]
        [MinLength(6)]
        [MaxLength(20)]
        public string OldPassword { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(20)]
        public string NewPassword { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(20)]
        public string RepeatPassword { get; set; }
    }
}