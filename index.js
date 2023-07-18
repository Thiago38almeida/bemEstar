const express = require('express');
const app = express();
const router = require('./router');
const cors = require('cors');

app.use(cors()); // Registre o middleware CORS antes do roteador
app.use(express.json());

app.use('/bemEstar', router);

const PORT = process.env.PORT || 9091;

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
});
