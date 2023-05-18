// const Router = require('express');
import path from "path";

export const routes = (application) => {
    application.get('/', async (req, res) => {
        try {
            res.sendFile(path.join(__dirname, '/src/public', 'index.html'));
        } catch (err) {
            if (err.syscall === 'lstat') {
                return res.status(404).send()
            }
            return res.status(500).send();
        }
    });
}