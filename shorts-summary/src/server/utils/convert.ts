import fs from 'fs';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

const filePath = '../tmp/shorts.mp4';
const outputFilePath = filePath.replace('.mp4', '.wav');

export const convert = () => new Promise((resolve, reject) => {
  if (ffmpegStatic) {
    ffmpeg.setFfmpegPath(ffmpegStatic);
  }

  if (!fs.existsSync(filePath)) {
    reject(new Error('Arquivo de entrada não encontrado.'));
    return;
  }

  const command = ffmpeg()
    .input(filePath)
    .audioFrequency(16000)
    .audioChannels(1)
    .format('wav')
    .on('end', () => {
      try {
        const buffer = fs.readFileSync(outputFilePath);
        const result = wav.decode(buffer);
        const audioData = result.channelData[0];
        const float32Array = new Float32Array(audioData);
        resolve(float32Array);
        fs.unlinkSync(outputFilePath);
      } catch (err: any) {
        reject(err);
      }
    })
    .on('error', (err) => {
      reject(err);
    })
    .save(outputFilePath);

  command.on('stderr', (stderrLine) => {
    console.error(`FFmepg log: ${stderrLine}`);
  });
});
