using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using WebApp.Models;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationContext applicationContext;

        public UserController(ApplicationContext applicationContext)
        {
            this.applicationContext = applicationContext;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(UserInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> RegisterAsync([FromBody] UserRegistrationRequest registrationRequest)
        {
            var user = new User
            {
                Birthday = registrationRequest.Birthday.Value,
                Email = registrationRequest.Email,
                Id = Guid.NewGuid(),
                Login = registrationRequest.Login,
                Name = registrationRequest.Name,
                Password = registrationRequest.Password,
                Phone = registrationRequest.Phone
            };

            await this.applicationContext.AddAsync(user);
            await this.applicationContext.SaveChangesAsync();

            var t = await this.applicationContext.FindAsync<User>(user.Id);

            return this.Ok();
        }
    }
}
