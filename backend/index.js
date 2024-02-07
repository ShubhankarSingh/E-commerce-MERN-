const connectToMongo = require('./db')
const express = require("express");
var cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


connectToMongo()
const port = 5000

// Use body-parser middleware to handle larger payloads


app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use('/api/products', require('./routes/ProductRoute'))
app.use('/api/user', require('./routes/UserRoute'))
app.use('/api/cart', require('./routes/CartRoute'))
app.use('/api/checkout', require('./routes/PaymentRoute'))
app.use('/api/order', require('./routes/OrderRoute'))

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
});