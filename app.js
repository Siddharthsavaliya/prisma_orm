const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = 8800;
app.use(express.json())

// routes
const productRoute = require('./routes/product');
app.use('/api', productRoute.routes)

app.get('/', (req, res) => {
    res.send("hello world")
})

// error
app.use((req, res) => {
    res.status(404).json({
        message: "Error serving the request !",
    });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))