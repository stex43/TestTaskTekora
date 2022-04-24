using System;

namespace Models.Users
{
    public sealed class User
    {
        public Guid Id { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public string Name { get; set; }

        public DateTimeOffset Birthday { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }
    }
}
