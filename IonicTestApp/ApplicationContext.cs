using System;
using Microsoft.EntityFrameworkCore;

namespace IonicTestApp;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

}
