import fs from 'fs';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

const filePath = '../tmp/shorts.mp4';
const outputFilePath = '../tmp/shorts.wav';

export const convert = () => new Promise((resolve, reject) => {
  // Verifica se ffmpegStatic é uma string antes de usá-lo
  if (typeof ffmpegStatic === 'string') {
    ffmpeg.setFfmpegPath(ffmpegStatic); // Define o caminho do FFmpeg com base na variável ffmpegStatic

    // Inicia a conversão do arquivo de vídeo para áudio
    ffmpeg()
      .input(filePath)
      .audioFrequency(16000)
      .audioChannels(1)
      .format('wav')
      .on("end", () => {
        const buffer = fs.readFileSync(outputFilePath); // Lê o arquivo de áudio convertido em formato WAV
        const result = wav.decode(buffer); // Decodifica o arquivo WAV para obter os dados de áudio
        const audioData = result.channelData[0]; // Obtém os dados de áudio do canal 0
        const float32Array = new Float32Array(audioData); // Cria um Float32Array a partir dos dados de áudio
    
        resolve(float32Array); // Resolve a promessa com os dados de áudio

        fs.unlinkSync(outputFilePath); // Remove o arquivo WAV temporário

      })
      .on("error", (err: any) => {
        // Em caso de erro durante a conversão, rejeita a promessa com o erro
        reject(err);
      })
      .save(outputFilePath);
  } else {
      // Se ffmpegStatic não for uma string, rejeita a promessa com um erro
      reject(new Error('ffmpegStatic is not a string'));
  }
});
