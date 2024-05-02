using System;
using Microsoft.EntityFrameworkCore.Migrations;
#pragma warning disable CS8981 // The type name only contains lower-cased ascii characters. Such names may become reserved for the language.

#nullable disable

namespace MMC.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TodoItems");

            migrationBuilder.DropTable(
                name: "TodoLists");

            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "Facilities",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Facilities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ResourceAssetTypes",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceAssetTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Levels",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FacilityId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Levels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Levels_Facilities_FacilityId",
                        column: x => x.FacilityId,
                        principalSchema: "dbo",
                        principalTable: "Facilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PeriodicReports",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    FacilityId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeriodicReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PeriodicReports_Facilities_FacilityId",
                        column: x => x.FacilityId,
                        principalSchema: "dbo",
                        principalTable: "Facilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Areas",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LevelId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Areas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Areas_Levels_LevelId",
                        column: x => x.LevelId,
                        principalSchema: "dbo",
                        principalTable: "Levels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PeriodicReportTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    PeriodicReportId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeriodicReportTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PeriodicReportTasks_PeriodicReports_PeriodicReportId",
                        column: x => x.PeriodicReportId,
                        principalSchema: "dbo",
                        principalTable: "PeriodicReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResourceAssets",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AreaId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceAssets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResourceAssets_Areas_AreaId",
                        column: x => x.AreaId,
                        principalSchema: "dbo",
                        principalTable: "Areas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PeriodicReportTaskItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    PeriodicReportTaskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeriodicReportTaskItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PeriodicReportTaskItems_PeriodicReportTasks_PeriodicReportTaskId",
                        column: x => x.PeriodicReportTaskId,
                        principalTable: "PeriodicReportTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RepairRequests",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FaultDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContractorId = table.Column<int>(type: "int", nullable: false),
                    ContractorNote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManagerId = table.Column<int>(type: "int", nullable: true),
                    MangerNote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SupervisorId = table.Column<int>(type: "int", nullable: true),
                    SupervisorNote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TechnicianId = table.Column<int>(type: "int", nullable: true),
                    TechnicianNote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: true),
                    ResourceAssetId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepairRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RepairRequests_ResourceAssets_ResourceAssetId",
                        column: x => x.ResourceAssetId,
                        principalSchema: "dbo",
                        principalTable: "ResourceAssets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResourceAssetResourceAssetType",
                schema: "dbo",
                columns: table => new
                {
                    ResourceAssetsId = table.Column<int>(type: "int", nullable: false),
                    TagsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceAssetResourceAssetType", x => new { x.ResourceAssetsId, x.TagsId });
                    table.ForeignKey(
                        name: "FK_ResourceAssetResourceAssetType_ResourceAssetTypes_TagsId",
                        column: x => x.TagsId,
                        principalSchema: "dbo",
                        principalTable: "ResourceAssetTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ResourceAssetResourceAssetType_ResourceAssets_ResourceAssetsId",
                        column: x => x.ResourceAssetsId,
                        principalSchema: "dbo",
                        principalTable: "ResourceAssets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TechnicalReports",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TechnicianName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResourceAssetId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TechnicalReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TechnicalReports_ResourceAssets_ResourceAssetId",
                        column: x => x.ResourceAssetId,
                        principalSchema: "dbo",
                        principalTable: "ResourceAssets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UploadedFiles",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OriginalFileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tags = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TechnicalReportId = table.Column<int>(type: "int", nullable: true),
                    RepairRequestId = table.Column<int>(type: "int", nullable: true),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UploadedFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UploadedFiles_RepairRequests_RepairRequestId",
                        column: x => x.RepairRequestId,
                        principalSchema: "dbo",
                        principalTable: "RepairRequests",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UploadedFiles_TechnicalReports_TechnicalReportId",
                        column: x => x.TechnicalReportId,
                        principalSchema: "dbo",
                        principalTable: "TechnicalReports",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PeriodicReportTaskItemAttachments",
                schema: "dbo",
                columns: table => new
                {
                    PeriodicReportTaskItemId = table.Column<int>(type: "int", nullable: false),
                    UploadedFileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeriodicReportTaskItemAttachments", x => new { x.UploadedFileId, x.PeriodicReportTaskItemId });
                    table.ForeignKey(
                        name: "FK_PeriodicReportTaskItemAttachments_PeriodicReportTaskItems_PeriodicReportTaskItemId",
                        column: x => x.PeriodicReportTaskItemId,
                        principalTable: "PeriodicReportTaskItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PeriodicReportTaskItemAttachments_UploadedFiles_UploadedFileId",
                        column: x => x.UploadedFileId,
                        principalSchema: "dbo",
                        principalTable: "UploadedFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResourceAssetAttachments",
                schema: "dbo",
                columns: table => new
                {
                    ResourceAssetId = table.Column<int>(type: "int", nullable: false),
                    UploadedFileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceAssetAttachments", x => new { x.UploadedFileId, x.ResourceAssetId });
                    table.ForeignKey(
                        name: "FK_ResourceAssetAttachments_ResourceAssets_ResourceAssetId",
                        column: x => x.ResourceAssetId,
                        principalSchema: "dbo",
                        principalTable: "ResourceAssets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ResourceAssetAttachments_UploadedFiles_UploadedFileId",
                        column: x => x.UploadedFileId,
                        principalSchema: "dbo",
                        principalTable: "UploadedFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TechnicalReportsAttachments",
                schema: "dbo",
                columns: table => new
                {
                    TechnicalReportId = table.Column<int>(type: "int", nullable: false),
                    UploadedFileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TechnicalReportsAttachments", x => new { x.TechnicalReportId, x.UploadedFileId });
                    table.ForeignKey(
                        name: "FK_TechnicalReportsAttachments_TechnicalReports_TechnicalReportId",
                        column: x => x.TechnicalReportId,
                        principalSchema: "dbo",
                        principalTable: "TechnicalReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TechnicalReportsAttachments_UploadedFiles_UploadedFileId",
                        column: x => x.UploadedFileId,
                        principalSchema: "dbo",
                        principalTable: "UploadedFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Areas_LevelId",
                schema: "dbo",
                table: "Areas",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Levels_FacilityId",
                schema: "dbo",
                table: "Levels",
                column: "FacilityId");

            migrationBuilder.CreateIndex(
                name: "IX_PeriodicReports_FacilityId",
                schema: "dbo",
                table: "PeriodicReports",
                column: "FacilityId");

            migrationBuilder.CreateIndex(
                name: "IX_PeriodicReportTaskItemAttachments_PeriodicReportTaskItemId",
                schema: "dbo",
                table: "PeriodicReportTaskItemAttachments",
                column: "PeriodicReportTaskItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PeriodicReportTaskItems_PeriodicReportTaskId",
                table: "PeriodicReportTaskItems",
                column: "PeriodicReportTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_PeriodicReportTasks_PeriodicReportId",
                table: "PeriodicReportTasks",
                column: "PeriodicReportId");

            migrationBuilder.CreateIndex(
                name: "IX_RepairRequests_ResourceAssetId",
                schema: "dbo",
                table: "RepairRequests",
                column: "ResourceAssetId");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceAssetAttachments_ResourceAssetId",
                schema: "dbo",
                table: "ResourceAssetAttachments",
                column: "ResourceAssetId");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceAssetResourceAssetType_TagsId",
                schema: "dbo",
                table: "ResourceAssetResourceAssetType",
                column: "TagsId");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceAssets_AreaId",
                schema: "dbo",
                table: "ResourceAssets",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_TechnicalReports_ResourceAssetId",
                schema: "dbo",
                table: "TechnicalReports",
                column: "ResourceAssetId");

            migrationBuilder.CreateIndex(
                name: "IX_TechnicalReportsAttachments_UploadedFileId",
                schema: "dbo",
                table: "TechnicalReportsAttachments",
                column: "UploadedFileId");

            migrationBuilder.CreateIndex(
                name: "IX_UploadedFiles_RepairRequestId",
                schema: "dbo",
                table: "UploadedFiles",
                column: "RepairRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_UploadedFiles_TechnicalReportId",
                schema: "dbo",
                table: "UploadedFiles",
                column: "TechnicalReportId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PeriodicReportTaskItemAttachments",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ResourceAssetAttachments",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ResourceAssetResourceAssetType",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "TechnicalReportsAttachments",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "PeriodicReportTaskItems");

            migrationBuilder.DropTable(
                name: "ResourceAssetTypes",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UploadedFiles",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "PeriodicReportTasks");

            migrationBuilder.DropTable(
                name: "RepairRequests",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "TechnicalReports",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "PeriodicReports",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ResourceAssets",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Areas",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Levels",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Facilities",
                schema: "dbo");

            migrationBuilder.CreateTable(
                name: "TodoLists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Colour_Code = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoLists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TodoItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Done = table.Column<bool>(type: "bit", nullable: false),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    Reminder = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TodoItems_TodoLists_ListId",
                        column: x => x.ListId,
                        principalTable: "TodoLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TodoItems_ListId",
                table: "TodoItems",
                column: "ListId");
        }
    }
}
