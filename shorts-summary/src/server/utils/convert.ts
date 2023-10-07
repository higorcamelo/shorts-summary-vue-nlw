import fs from 'fs';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

const filePath = '../tmp/shorts.mp4';
const outputFilePath = '../tmp/shorts.wav';

console.log(`Caminho do vídeo: ${filePath}`);

export const convert = () => new Promise((resolve, reject) => {
  // Verifica se ffmpegStatic é uma string antes de usá-lo
  if (ffmpegStatic) {
    ffmpeg.setFfmpegPath(ffmpegStatic);
  }

  // Inicia a conversão do arquivo de vídeo para áudio
  ffmpeg()
    .input(filePath)
    .audioFrequency(16000)
    .audioChannels(1)
    .format('wav')
    .on("end", () => {
      try {
        const buffer = fs.readFileSync(outputFilePath); // Lê o arquivo de áudio convertido em formato WAV
        const result = wav.decode(buffer); // Decodifica o arquivo WAV para obter os dados de áudio
        const audioData = result.channelData[0]; // Obtém os dados de áudio do canal 0
        const float32Array = new Float32Array(audioData); // Cria um Float32Array a partir dos dados de áudio

        resolve(float32Array); // Resolve a promessa com os dados de áudio

        fs.unlinkSync(outputFilePath); // Remove o arquivo WAV temporário
      } catch (err: any) {
        console.error(`Error reading or decoding audio file: ${err.message}`);
        reject(err);
      }
    })
    .on("error", (err) => {
      // Em caso de erro durante a conversão, rejeita a promessa com o erro
      console.error(`Conversion error: ${err.message}`);
      reject(err);
    })
    .save(outputFilePath);
});
