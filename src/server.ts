import { TrafficHandler } from "./trafficBuffer/TrafficHandler";
import server from "./express";
import { DataBaseSqlClient } from "./database/database.sql.client";

const init = async () => {
    server.listen(3000, () => {
        TrafficHandler.startNetworkCapture();
        console.log('HTTP SERVER - OK!');
        DataBaseSqlClient.initDataBase();
        DataBaseSqlClient.getAllConsumptionData();
        setInterval(() => {
            console.log('HERE!')
        }, 5000);
    });
}

init();