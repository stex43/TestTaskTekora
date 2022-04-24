using System.ComponentModel.DataAnnotations;
using WebApp.Infrastructure;

namespace WebApp.Models
{
    public sealed class Error
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Description { get; set; }

        public static Error ConflictError(ConflictException conflictException)
        {
            return new Error
            {
                Code = "database:conflict",
                Description = conflictException.Message
            };
        }
    }
}
