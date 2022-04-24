using System;

namespace WebApp.Infrastructure
{
    public sealed class ConflictException : Exception
    {
        public string Target { get; }

        public string ConflictResource { get; }

        public string ConflictedValue { get; }

        public ConflictException(string target, string conflictResource, string conflictedValue)
        {
            this.Target = target;
            this.ConflictResource = conflictResource;
            this.ConflictedValue = conflictedValue;
        }

        public override string Message => $"{this.Target} conflict for resource {this.ConflictResource} with value {this.ConflictedValue}";
    }
}
