using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(UserInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> RegisterAsync([FromBody] UserRegistration userRegistration)
        {
            var user = await this.userService.RegisterUserAsync(userRegistration);

            return this.Ok(user);
        }
    }
}
