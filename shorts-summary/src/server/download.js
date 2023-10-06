import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoID) => {
    const videoURl = `https://www.youtube.com/shorts/${videoID}`;
    const videoInfo = ytdl.getInfo(videoURl); // Promise. Interessante estudar melhor
    ytdl(videoURl, {quality: "lowestaudio", filter: "audioonly"})
    .on("info", (info) => {
        console.log(info.videoDetails.title);
    })
    .on("progress", (downloaded, total) => {
        const percent = downloaded / total;
        console.log(percent);
    })
    .on("end", () => {
        console.log("Download completo!");
    })
    .on("error", (err) => {
        console.log(err);
    }).pipe(fs.createWriteStream(`../tmp/${videoID}.mp4`));
}