using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebApp.Models;

namespace WebApp.Infrastructure
{
    internal sealed class ExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            HandleException(context);
            context.ExceptionHandled = true;
        }

        private static void HandleException(ExceptionContext context)
        {
            var exception = context.Exception;

            context.Result = GetResult(exception);
        }

        private static IActionResult GetResult(Exception exception)
        {
            if (exception is ConflictException conflictException)
            {
                return new ConflictObjectResult(Error.ConflictError(conflictException));
            }

            var error = new Error
            {
                Code = "Internal error",
                Description = exception.Message
            };

            return new ObjectResult(error)
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
        }
    }
}