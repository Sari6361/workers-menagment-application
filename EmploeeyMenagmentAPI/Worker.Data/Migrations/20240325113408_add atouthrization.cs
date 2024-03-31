using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Worker.Data.Migrations
{
    /// <inheritdoc />
    public partial class addatouthrization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Role_Workers_EmploeeyId",
                table: "Role");

            migrationBuilder.RenameColumn(
                name: "EmploeeyId",
                table: "Role",
                newName: "EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Role_EmploeeyId",
                table: "Role",
                newName: "IX_Role_EmployeeId");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Workers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Workers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Menagers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Menagers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Menagers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Role_Workers_EmployeeId",
                table: "Role",
                column: "EmployeeId",
                principalTable: "Workers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Role_Workers_EmployeeId",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Workers");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Workers");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Menagers");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Menagers");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Menagers");

            migrationBuilder.RenameColumn(
                name: "EmployeeId",
                table: "Role",
                newName: "EmploeeyId");

            migrationBuilder.RenameIndex(
                name: "IX_Role_EmployeeId",
                table: "Role",
                newName: "IX_Role_EmploeeyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Role_Workers_EmploeeyId",
                table: "Role",
                column: "EmploeeyId",
                principalTable: "Workers",
                principalColumn: "Id");
        }
    }
}
