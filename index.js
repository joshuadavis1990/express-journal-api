import express from 'express'

const categories = ['Food', 'Gaming', 'Coding', 'Other']

const app = express()
const port = 4001

app.get('/', (request, response) => response.send({ info: 'Journal API' }))

app.get('/categories', (req, res) => res.send(categories))

app.listen(port)