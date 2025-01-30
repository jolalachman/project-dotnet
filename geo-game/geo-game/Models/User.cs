namespace geo_game.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public List<Score> Scores { get; set; } = new List<Score>();
    }
}
