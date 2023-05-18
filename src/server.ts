import server from "./express";
const database = require(`${__dirname}/database/database.sql.client.ts`);
const NetworkData = require(`${__dirname}/trafficBuffer/TrafficHandler.ts`);

const init = async () => {
    server.listen(3001, () => {
        const requiredData = NetworkData.getInstance();
        requiredData.startNetworkCapture();
        console.log('HTTP SERVER - OK!');
        database.initDataBase();
        database.getAllConsumptionData();
        setInterval(() => {
            const data = requiredData.seeNetworkTrafficBuffer();
            console.log('dados: ', data);
            database.insertMultipleConsumptionData(data);
        }, 5000);
    });
}

init();