using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public sealed class UserRegistrationRequest
    {
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string Login { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTimeOffset? Birthday { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }
    }
}
