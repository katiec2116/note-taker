const { urlencoded } = require('express');
// require express
const express = require('express');

// initialize the app and create port
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(express.static("public"));


require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.listen(PORT, () => console.log('Listening on: http://localhost:' + PORT))