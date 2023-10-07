import cors from 'cors'
import express from 'express'

import { download } from './download.js'
import { transcribe } from './utils/transcribe.ts'
import { summarize } from './utils/summarize.ts'
import { convert } from './utils/convert.ts'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/summary/:id', async (req, res) => {
  const videoID = req.params.id;

  try {
    const title = await download(videoID);
    
    const audioConverted = await convert()
    //console.log(audioConverted);

    const transcricao = await transcribe(audioConverted);
    return res.json({ message: `Download started for ${videoID}`, result: 'success', title, transcricao: transcricao });

  } catch (error:any) {
    return res.status(500).json({ message: 'Download failed', result: 'error', error: error.message });
  }
});

app.post('/summary/', async (req, res) => {
  const resultado = await summarize(req.body.text)
  return res.json({ message: 'Summary created', result: 'success', summary: resultado });

});

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})