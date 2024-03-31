using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Worker.Data.Migrations
{
    /// <inheritdoc />
    public partial class addMenager : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MenagerId",
                table: "Workers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Menagers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Identity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    kind = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menagers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Workers_MenagerId",
                table: "Workers",
                column: "MenagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workers_Menagers_MenagerId",
                table: "Workers",
                column: "MenagerId",
                principalTable: "Menagers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workers_Menagers_MenagerId",
                table: "Workers");

            migrationBuilder.DropTable(
                name: "Menagers");

            migrationBuilder.DropIndex(
                name: "IX_Workers_MenagerId",
                table: "Workers");

            migrationBuilder.DropColumn(
                name: "MenagerId",
                table: "Workers");
        }
    }
}
