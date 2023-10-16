import fs from 'fs';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

const filePath = '../tmp/shorts.mp4';
const outputFilePath = filePath.replace('.mp4', '.wav'); // Caminho de saída diferente

export const convert = () => new Promise((resolve, reject) => {
  // Verifica se ffmpegStatic é uma string antes de usá-lo
  if (ffmpegStatic) {
    ffmpeg.setFfmpegPath(ffmpegStatic);
  }

  // Verifica se o arquivo de entrada existe
  if (!fs.existsSync(filePath)) {
    console.error('O arquivo de entrada não foi encontrado.');
    reject(new Error('Arquivo de entrada não encontrado.'));
    return;
  }

  // Inicia a conversão do arquivo de vídeo para áudio
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

        console.log('Áudio convertido com sucesso!');

        resolve(float32Array);
        fs.unlinkSync(outputFilePath);
      } catch (err: any) {
        console.error(`Erro ao ler ou decodificar o arquivo de áudio: ${err.message}`);
        reject(err);
      }
    })
    .on('error', (err) => {
      console.error(`Erro durante a conversão: ${err.message}`);
      reject(err);
    })
    .save(outputFilePath);

  // Adicione um tratamento de erro personalizado para o FFmpeg
  command.on('stderr', (stderrLine) => {
    console.error(`Erro do FFmpeg: ${stderrLine}`);
  });
});
