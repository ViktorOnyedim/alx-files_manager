const express = require('express');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

app.use(routes);

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;
