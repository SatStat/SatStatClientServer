// const Router = require('express');
const path = require('path');

module.exports = (application) => {
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