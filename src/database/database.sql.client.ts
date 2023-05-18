const { Sequelize } = require('sequelize');
// const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   dialect: dbDriver
// })

class DataBaseSqlClient {
    static database;
    static consumptionHistoryTable;

    static createConsumptionHistoryTable () {
        const newTable = this.database.define('consumptionHistory', {
            id: {
              type: Sequelize.STRING,
              defaultValue: Sequelize.UUIDV4,
              allowNull: false,
              primaryKey: true,
            },
            pid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            download: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            upload: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });

        this.consumptionHistoryTable = newTable;
    }

    static async insertConsumptionData (data) {
        await this.database.sync();
        const insertedData = await this.consumptionHistoryTable.create({...data})
    }

    static async insertMultipleConsumptionData(data) {
        await this.database.sync();
        const insertMultipleData = await this.consumptionHistoryTable.bulkCreate(data);
    }

    static async getAllConsumptionData () {
        await this.database.sync();
        const getExample = await this.consumptionHistoryTable.findAll();
    }

    static async initDataBase () {
        try {
            this.database = new Sequelize('dbName', 'dbUser', 'dbPassword', {
                dialect: 'sqlite',
                storage: `${__dirname}/db.sqlite`,
            });
            this.createConsumptionHistoryTable();
            return this.database;
        } catch (e) {
            console.log('ERRO', e)
            return { error: `Database connection error, ${e}`, statusCode: 500 }
        }
    }
}

module.exports = DataBaseSqlClient