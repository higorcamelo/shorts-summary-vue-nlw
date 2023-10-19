import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoID: string): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const videoURl = `https://www.youtube.com/shorts/${videoID}`;
    let toReturnTitle: string | undefined = undefined;
    ytdl(videoURl, { quality: 'highestaudio', filter: "audioonly" })
      .on("info", (info) => {
        const title = info.videoDetails.title;
        console.log(`Downloading "${title}"`);
        toReturnTitle = title;
      })
      .on("end", () => {
        resolve(toReturnTitle); // Resolva a promessa com o título do vídeo
      })
      .on("error", (err) => {
        console.error(`Download error: ${err.message}`);
        reject(err); // Rejeite a promessa com o erro
      })
      .pipe(fs.createWriteStream(`../tmp/shorts.mp4`));
  });
}
