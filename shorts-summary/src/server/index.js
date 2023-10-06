import cors from 'cors'
import express from 'express'

import { download } from './download.js'

const app = express()
app.use(cors())

app.get('/summary/:id', (req, res) => {
  download(req.params.id)
  res.json({ message: `Download started for ${req.params.id}`, result: 'success' })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})