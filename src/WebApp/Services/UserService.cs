using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.Users;
using WebApp.Infrastructure;
using WebApp.Models;

namespace WebApp.Services
{
    public sealed class UserService : IUserService
    {
        private readonly ApplicationContext applicationContext;
        private readonly IMapper mapper;

        public UserService(ApplicationContext applicationContext, IMapper mapper)
        {
            this.applicationContext = applicationContext;
            this.mapper = mapper;
        }

        public async Task<UserInfo> RegisterUserAsync(UserRegistration userRegistration)
        {
            var user = this.mapper.Map<User>(userRegistration);

            try
            {
                await this.applicationContext.AddAsync(user);
                await this.applicationContext.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new ConflictException("Users", "login", user.Login);
            }

            return this.mapper.Map<UserInfo>(user);
        }
    }
}
