const express = require('express');
const app = express();

const todoRoute = require('./Routers/todo');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


app.use('/api/v1/todo', todoRoute);

app.get('*', (req, res) => {
    res.status(404).send("Page not found");
});

const port = 3001;
app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});