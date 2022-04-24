using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class UserInfo
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Login { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTimeOffset Birthday { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }
    }
}
