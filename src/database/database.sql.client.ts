const { Sequelize } = require('sequelize');

class DataBaseSqlClient {
    static connection: any;
    static someTable: any;
    static async createSomeTable () {
        this.someTable = this.connection.define('sometable', {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
            },
        });

        console.log('TABLE CREATED: ', this.someTable);
    }

    static async initDataBase () {
        console.log('CHAMOU INIT');
        try {
            const test = new Sequelize({
                // database: 'sqlite_db',
                // dialect: 'sqlite',
                storage: `${__dirname}/database_test.sqlite`,
                // storage: `./database_test.sqlite`,
                // host: 'localhost',
                // logging: false,
                dialect: 'sqlite',
                // storage: './database.sqlite',
                logging: false
            });

            await this.createSomeTable();

            // return this.connection;
        } catch (e) {
            return { error: `Database connection error, ${e}`, statusCode: 500 }
        }
    }
}

module.exports = DataBaseSqlClient