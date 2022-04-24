using System;
using AutoMapper;
using Models.Users;
using WebApp.Models;

namespace WebApp.Infrastructure
{
    internal sealed class MapperProfile : Profile
    {
        public MapperProfile()
        {
            this.CreateMap<UserRegistration, User>()
                .ForMember(x => x.Id, opt => opt.MapFrom(_ => Guid.NewGuid()));

            this.CreateMap<User, UserInfo>();
        }
    }
}
