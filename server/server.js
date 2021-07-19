const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000;
const server = http.createServer(app);

try {
    server.listen(port, () => {
        console.log(`Server Running on Port ${port}`);
    })
} catch(err) {
    console.log(err)
}
