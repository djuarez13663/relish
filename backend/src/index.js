const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express();
const PORT = process.env.port || 4000;

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});