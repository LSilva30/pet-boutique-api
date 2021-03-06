const { request } = require('express')
const admin = require('firebase-admin')
const credentials = require('../credentials.json')

function connectDb() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(credentials)
    })
  }
  return admin.firestore()
}

exports.getCustomers = (request, response) => {
  const db = connectDb()
  db.collection('customers').get()
    .then(customerCollection => {
      const allCustomers = customerCollection.docs.map(doc => {
        let cust = doc.data()
        cust.id = doc.id
        return cust
      })
      response.send(allCustomers)
    })
    .catch(err => {
      console.error(err)
      response.status(500).send(err)
    })
}

exports.getCustomerById = (request, response) => {
  if (!request.params.customerId) {
    response.status(400).send('No Customer Specified!')
    return
  }
  const db = connectDb()
  db.collection('customers')
    .doc(request.params.customerId)
    .get()
    .then(customerDoc => {
      const customer = customerDoc.data()
      customer.id = customerDoc.id
      response.send(customer)
    })
    .catch(err => {
      console.error(err)
      response.status(500).send(err)
    })
}

exports.getCustomerByQuery = (req, res) => {
  // get query from req.query
  const { fname } = req.query
  //connect to firestore
  const db = connectDb()
  // search customers collection based on query
  db.collection('customers')
    .where('firstName', '==', fname)
    .get()
    //respond with results
    .then(customerCollection => {
      const matches = customerCollection.docs.map(doc => {
        let customer = doc.data()
        customer.id = doc.id
        return customer
      })
      res.send(matches)
    })
    .catch(err => res.status(500).send(err))
}

exports.createCustomer = (req, res) => {
  const db = connectDb()


  db.collection('customers')
    .add(req.body)
    .then(docRef => res.send(docRef))
    .catch(err => res.status(500).send('Customer could not be created'))
}

exports.deleteCustomer = ( req, res ) => {
  const db = connectDb()
  const { docId } = req.params
  db.collection('customers').doc(docId).delete()
  .then(() => res.status(203).send('Document succesfully deleted.'))
  .catch(err => res.status(500).send(err))
}

exports.updateCustomers = ( req, res ) => {
  const db = connectDb()
  const { docId } = req.params
  let customerUpdates = req.body
  customerUpdates.timestamp = admin.firestore.FieldValue.serverTimestamp()


  db.collection('customers').doc(docId).update(customerUpdates)
  .then(res.status(202).send('Document was succesfully updated.'))
  .catch(err => res.status(500).send(err))
}