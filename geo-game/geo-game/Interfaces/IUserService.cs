using geo_game.Dtos;
using geo_game.Models;

namespace geo_game.Interfaces
{
    public interface IUserService
    {
        Task<UserInfoDto> GetUserInfoAsync(string? id);
        Task<string?> GetUserRoleAsync(string email);
        Task<Score> SaveScoreAsync(string? id, ScoreDto score);
        Task<PaginatedScoresDto> GetUserScoresAsync(string? id, int pageIndex, int pageSize, string? sortBy, string? sortDir);
        Task<bool> DeleteUserScoresAsync(string? id);
        Task<bool> DeleteUserAccountAsync(string? id);
        Task<User> GetOrCreateUserAsync(string? id);
        dynamic JWTGenerator(User user);
    }
}
