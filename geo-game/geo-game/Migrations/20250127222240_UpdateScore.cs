using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geo_game.Migrations
{
    /// <inheritdoc />
    public partial class UpdateScore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Time",
                table: "Score",
                newName: "GameTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GameTime",
                table: "Score",
                newName: "Time");
        }
    }
}
