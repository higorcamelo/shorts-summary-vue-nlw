import cors from 'cors'
import express from 'express'

import { download } from './download.ts'
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
    const audioConverted = await convert();
    const transcricao = await transcribe(audioConverted);
    res.json({ message: `Download started for ${videoID}`, result: 'success', title, transcricao: transcricao });
  } catch (error: any) {
    res.status(500).json({ message: 'Download failed', result: 'error', error: error.message });
  }
});

app.post('/summary/', async (req, res) => {
  try {
    const resultado = await summarize(req.body.text);
    res.json({ message: 'Summary created', result: 'success', summary: resultado });
  } catch (error: any) {
    res.status(500).json({ message: 'Summary creation failed', result: 'error', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
