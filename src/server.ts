const expressApp = require(`${__dirname}/express.ts`);
const DB = require(`${__dirname}/database/database.sql.client.ts`)
const init = async () => {
    expressApp.listen(3000, () => {
        console.log('HTTP SERVER - OK!');
        DB.initDataBase();
        DB.createExampleTable();
        DB.insetExampleTable();
        DB.getExampleTable();
    });
}

init();