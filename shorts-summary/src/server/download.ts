import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoID: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const videoURl = `https://www.youtube.com/shorts/${videoID}`;
        ytdl(videoURl, {quality: 'highestaudio', filter: "audioonly"})
        .on("info", (info) => {
            const title = info.videoDetails.title;
            console.log(`Downloading "${title}"`);
            resolve(title); // Resolva a promessa com o título do vídeo
        })
        .on("end", () => {
            console.log("Download completed!");
            resolve(videoID); // Resolva a promessa com o ID do vídeo
        })
        .on("error", (err) => {
            console.error(`Download error: ${err.message}`);
            reject(err); // Rejeite a promessa com o erro        
        }).pipe(fs.createWriteStream(`../tmp/shorts.mp4`));
    });
}