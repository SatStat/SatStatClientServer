const expressApp = require(`${__dirname}/express.ts`);

const init = async () => {
    expressApp.listen(3000, () => {
        console.log('HTTP SERVER - OK!')
    });
}

init();