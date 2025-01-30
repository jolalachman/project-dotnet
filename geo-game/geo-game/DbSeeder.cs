using geo_game.Models;
using Google;

namespace geo_game
{
    public class DbSeeder
    {
        private readonly DatabaseContext _context;

        public DbSeeder(DatabaseContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            if (!_context.Users.Any())
            {
                var adminUser = new User
                {
                    Email = "geogame811@gmail.com",
                    Role = "Admin"
                };

                _context.Users.Add(adminUser);

                await _context.SaveChangesAsync();
            }
        }
    }

}
