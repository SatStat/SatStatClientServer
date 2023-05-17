const { Sequelize } = require('sequelize');
// const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   dialect: dbDriver
// })

class DataBaseSqlClient {
    static database;
    static exampleTable;

    static createExampleTable () {
        const exampleTable = this.database.define('example', {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
            },
        });
        console.log(exampleTable);
        this.exampleTable = exampleTable;
        console.log('TABLE CREATED: ', this.exampleTable);
    }

    static async insetExampleTable () {
        await this.database.sync();
        const createExample = await this.exampleTable.create({
            id: 1
        })
        console.log('EXEMPLE CREATED: ', createExample);
    }

    static async getExampleTable () {
        await this.database.sync();
        const getExample = await this.exampleTable.findAll();
        console.log('GET REGISTER EXAMPLE:', getExample)
    }

    static async initDataBase () {
        try {
            this.database = new Sequelize('dbName', 'dbUser', 'dbPassword', {
                dialect: 'sqlite',
                storage: `${__dirname}/sqlite.db`,
            });
            this.createExampleTable();
            return this.database;
        } catch (e) {
            console.log('ERRO', e)
            return { error: `Database connection error, ${e}`, statusCode: 500 }
        }
    }
}

module.exports = DataBaseSqlClient
export {};