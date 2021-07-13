const express = require('express')
const cors = require('cors')
const { getCustomers, getCustomerById, getCustomerByQuery, createCustomer, deleteCustomer, updateCustomers } = require('./src/customers')

const app = express()
app.use(express.json())
app.use(cors())


app.get( '/customers/search', getCustomerByQuery)
app.get( '/customers/:customerId', getCustomerById )
app.get( '/customers', getCustomers )

app.post('/customers', createCustomer)

app.delete('/customers/:docId', deleteCustomer)

app.patch('/customers/:docId', updateCustomers)

app.listen(3000, () => {
    console.log('Listening to http://localhost:3000')
})