const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const Client = require('node-rest-client').Client;
const restClient = new Client();

const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/ship.html'));
});

const apiUrl = "http://localhost:7101/soa-infra/resources/default/PackAndShipService!1.0/packingService/shipping";

app.post('/ship', (req, res) => {
    let args = {
        data: req.body,
        headers: { "Content-Type": "application/json", "Accept": "application/json" }
    };

    restClient.post(apiUrl, args, (data, response) => {
        console.log(data);
        console.log(response);

        res.send(data);
    });
});

app.listen(8080, () => {
    console.log('Server started!');
});