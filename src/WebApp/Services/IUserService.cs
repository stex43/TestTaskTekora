using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Services
{
    public interface IUserService
    {
        Task<UserInfo> RegisterUserAsync(UserRegistration userRegistration);
    }
}
