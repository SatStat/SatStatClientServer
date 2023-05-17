const server= require(`${__dirname}/express.ts`);
const database = require(`${__dirname}/database/database.sql.client.ts`)
const init = async () => {
    server.listen(3000, () => {
        console.log('HTTP SERVER - OK!');
        database.initDataBase();
        database.createExampleTable();
        database.insetExampleTable();
        database.getExampleTable();
    });
}

init();