const https = require("https"),
fs = require("fs"),


const options = {
    key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
    cert: fs.readFileSync("/srv/www/keys/chain.pem")
};

const app = express();

app.use((req, res) => {
    res.writeHead(200);
    res.end("hello world\n");
});
https.createServer(options, app).listen(443);