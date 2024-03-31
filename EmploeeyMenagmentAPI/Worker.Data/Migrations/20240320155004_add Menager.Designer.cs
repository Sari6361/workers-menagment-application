﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Worker.Data;

#nullable disable

namespace Worker.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240320155004_add Menager")]
    partial class addMenager
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Worker.Core.Entities.Emploeey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Identity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("MenagerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<int>("kind")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MenagerId");

                    b.ToTable("Workers");
                });

            modelBuilder.Entity("Worker.Core.Entities.Menager", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Identity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("kind")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Menagers");
                });

            modelBuilder.Entity("Worker.Core.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("EmploeeyId")
                        .HasColumnType("int");

                    b.Property<bool>("Menagment")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("dateStart")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("EmploeeyId");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("Worker.Core.Entities.Emploeey", b =>
                {
                    b.HasOne("Worker.Core.Entities.Menager", null)
                        .WithMany("Workers")
                        .HasForeignKey("MenagerId");
                });

            modelBuilder.Entity("Worker.Core.Entities.Role", b =>
                {
                    b.HasOne("Worker.Core.Entities.Emploeey", null)
                        .WithMany("Roles")
                        .HasForeignKey("EmploeeyId");
                });

            modelBuilder.Entity("Worker.Core.Entities.Emploeey", b =>
                {
                    b.Navigation("Roles");
                });

            modelBuilder.Entity("Worker.Core.Entities.Menager", b =>
                {
                    b.Navigation("Workers");
                });
#pragma warning restore 612, 618
        }
    }
}
