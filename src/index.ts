const express = require('express');
const bodyParser = require('body-parser');

import codeRouter from './route/submit-code';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Mount the submit-code route at '/submit-code'
app.use('/submit-code', codeRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
