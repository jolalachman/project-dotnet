using geo_game.Dtos;
using geo_game.Interfaces;
using geo_game.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Drawing.Printing;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace geo_game.Services
{
    public delegate void LogAction(string message);
    public class UserService : IUserService
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UserService> _logger;

        public event LogAction OnActionLogged;

        public UserService(DatabaseContext context, IConfiguration configuration, ILogger<UserService> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
            OnActionLogged += LogToConsole;
        }

        public async Task<User> GetOrCreateUserAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                user = new User
                {
                    Email = email,
                    Role = "User"
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                OnActionLogged?.Invoke($"Registered user: {user.Email}");
            }

            return user;
        }

        public async Task<string?> GetUserRoleAsync(string? id)
        {
            if(id == null)
            {
                return null;
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == id);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }
            return user.Role;
        }

        public async Task<UserInfoDto> GetUserInfoAsync(string? id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == id);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }
            return new UserInfoDto 
            {
                Email = user.Email,
                Role = user.Role
            };
        }

        public async Task<bool> DeleteUserScoresAsync(string? id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == id);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            var scoresToDelete = _context.Scores.Where(s => s.UserId == user.Id);

            _context.Scores.RemoveRange(scoresToDelete);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteUserAccountAsync(string? id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == id);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            var scoresToDelete = _context.Scores.Where(s => s.UserId == user.Id);

            _context.Scores.RemoveRange(scoresToDelete);

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<PaginatedScoresDto> GetUserScoresAsync(string? id, int pageIndex, int pageSize, string? sortBy, string? sortDir)
        {
            var user = await _context.Users
                .Include(u => u.Scores)
                .FirstOrDefaultAsync(u => u.Id.ToString() == id);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            IQueryable<Score> query = _context.Scores.Where(s => s.UserId == user.Id);

            if (sortDir != null && sortBy != null )
            {
                if (sortBy == "gameDate")
                {
                    query = sortDir == "asc" ? query.OrderBy(s => s.GameDate) : query.OrderByDescending(s => s.GameDate);
                }
                else if (sortBy == "gameTime")
                {
                    query = sortDir == "asc" ? query.OrderBy(s => s.GameTime) : query.OrderByDescending(s => s.GameTime);
                }
                else if (sortBy == "guessedCountries")
                {
                    query = sortDir == "asc" ? query.OrderBy(s => s.GuessedCountries) : query.OrderByDescending(s => s.GuessedCountries);
                }
            }

            var scores = await query
                 .Skip(pageIndex * pageSize)
                 .Take(pageSize)
                 .Select(s => new ScoreDto
                 {
                     GameDate = s.GameDate.ToString(),
                     GameTime = s.GameTime,
                     GuessedCountries = s.GuessedCountries
                 })
                 .ToListAsync();

            var totalCount = await _context.Scores
            .CountAsync(s => s.UserId == user.Id);


            return new PaginatedScoresDto
            {
                Data = scores,
                TotalCount = totalCount
            };
        }

        public async Task<Score> SaveScoreAsync(string? id, ScoreDto score)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == id);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            var addedScore = new Score(
                UserId: user.Id,
                GuessedCountries: score.GuessedCountries,
                GameTime: score.GameTime,
                GameDate: DateOnly.FromDateTime(DateTime.Parse(score.GameDate.ToString()))
            );

            user.Scores.Add(addedScore);

            await _context.SaveChangesAsync();

            OnActionLogged?.Invoke($"Saved score: {addedScore}");

            user = await _context.Users.Include(u => u.Scores).FirstOrDefaultAsync(u => u.Id == user.Id);

            var bestScore = user.Scores
                .Where(score => score.GuessedCountries.Split('/')[0] == user.Scores.Max(s => s.GuessedCountries.Split('/')[0]))
                .FirstOrDefault();

            return bestScore;
        }

        public dynamic JWTGenerator(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Authentication:SecretKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim(ClaimTypes.Role, user.Role) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);
            return new { token = encryptedToken, role = user.Role };

        }

        private void LogToConsole(string message)
        {
            _logger.LogInformation(message);
        }
    }
}