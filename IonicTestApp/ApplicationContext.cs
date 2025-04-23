using System;
using IonicTestApp.Models;
using Microsoft.EntityFrameworkCore;

namespace IonicTestApp;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
}
