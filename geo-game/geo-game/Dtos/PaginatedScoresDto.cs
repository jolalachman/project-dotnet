using geo_game.Models;

namespace geo_game.Dtos
{
    public class PaginatedScoresDto
    {
        public List<ScoreDto> Data { get; set; }
        public int TotalCount { get; set; }
    }
}
