import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitTables1777233207431 implements MigrationInterface {
    name = 'InitTables1777233207431'

    public async up(queryRunner: QueryRunner): Promise<void> {

        const hasCategories = await queryRunner.hasTable("categories");
        if (!hasCategories) {
            await queryRunner.createTable(
                new Table({
                    name: "categories",
                    columns: [
                        {
                            name: "id",
                            type: "serial",
                            isPrimary: true,
                        },
                        {
                            name: "name",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "description",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "createdAt",
                            type: "timestamp",
                            default: "now()",
                        },
                    ],
                    uniques: [
                        {
                            name: "UQ_categories_name",
                            columnNames: ["name"],
                        },
                    ],
                })
            );
        }

        const hasProducts = await queryRunner.hasTable("products");
        if (!hasProducts) {
            await queryRunner.createTable(
                new Table({
                    name: "products",
                    columns: [
                        {
                            name: "id",
                            type: "serial",
                            isPrimary: true,
                        },
                        {
                            name: "name",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "description",
                            type: "text",
                            isNullable: true,
                        },
                        {
                            name: "price",
                            type: "numeric",
                            isNullable: false,
                        },
                        {
                            name: "stock",
                            type: "int",
                            default: 0,
                        },
                        {
                            name: "createdAt",
                            type: "timestamp",
                            default: "now()",
                        },
                        {
                            name: "updatedAt",
                            type: "timestamp",
                            default: "now()",
                        },
                        {
                            name: "category_id",
                            type: "int",
                            isNullable: true,
                        },
                    ],
                })
            );
        }

        const hasFK = await queryRunner.hasColumn("products", "category_id");

        if (hasFK) {
            await queryRunner.createForeignKey(
                "products",
                new TableForeignKey({
                    columnNames: ["category_id"],
                    referencedTableName: "categories",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL",
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable("products");
        const fk = table?.foreignKeys.find(fk => fk.columnNames.includes("category_id"));
        if (fk) {
            await queryRunner.dropForeignKey("products", fk);
        }

        await queryRunner.dropTable("products", true);
        await queryRunner.dropTable("categories", true);
    }
}