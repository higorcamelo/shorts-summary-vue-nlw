import { pipeline } from "@xenova/transformers"

export async function transcribe( audioConverted: any) {
    try{
        const transcribe = await pipeline("automatic-speech-recognition", "Xenova/whisper-small")
        const transcription = await transcribe(audioConverted,{
            chunk_length_s: 30,
            stride_length_s: 5,
            language: "portuguese",
            task: "transcribe"
        })
        console.log(transcription)
    } catch (error:any) {
        throw new Error(error.message)
    }
}