using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geo_game.Migrations
{
    /// <inheritdoc />
    public partial class UpdateScore1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Score_Users_UserId",
                table: "Score");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Score",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Score_Users_UserId",
                table: "Score",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Score_Users_UserId",
                table: "Score");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Score",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Score_Users_UserId",
                table: "Score",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
