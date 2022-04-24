using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Models
{
    internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(x => x.Birthday)
                .HasConversion(offset => offset.ToString("dd.MM.yyyy"), s => DateTimeOffset.Parse(s));

            builder.HasKey(x => x.Id);
            builder.HasAlternateKey(x => x.Login);
        }
    }
}
