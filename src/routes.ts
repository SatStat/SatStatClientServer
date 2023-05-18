// const Router = require('express');
const path = require('path');

const routes = (app: any) => {
    app.get('/', async (req: any, res: any) => {
        try {
            res.sendFile(path.join('./src/public', 'index.html'));
        } catch (err: any) {
            if (err.syscall === 'lstat') {
                return res.status(404).send()
            }
            return res.status(500).send();
        }
    });
}

export default routes;