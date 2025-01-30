using geo_game;
using geo_game.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity;
    public class DatabaseContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Score> Scores { get; set; }
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
       
}
