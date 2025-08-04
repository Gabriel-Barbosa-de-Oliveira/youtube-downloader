// import { createServer } from 'http'
// import { statusCodes } from './utils/httpStatusCode.js'
// import DownloadService from './service/download.service.js'




// async function handler(request, response) {
//     const downloadService = new DownloadService()

//     // Example usage of the download service
//     await downloadService.downloadFile();

//     response.writeHead(statusCodes.OK)
//     response.end()
// }

// createServer(handler).listen(3000, () => console.log('running at 3000'))


// import youtubedl from 'youtube-dl-exec';

// async function downloadVideo(url, output = 'video.mp4') {
//     try {
//         await youtubedl(url, {
//             output,
//             format: 'bestvideo+bestaudio/best',
//             mergeOutputFormat: 'mp4',
//             // verbose: true, // para mais logs
//             // noCheckCertificate: true,
//             // noWarnings: true,
//         });
//         console.log('Download finalizado:', output);
//     } catch (err) {
//         console.error('Erro no download:', err);
//     }
// }

// const url = 'https://www.youtube.com/watch?v=OU8PQiIKKXo&ab_channel=HolderDawn';
// downloadVideo(url);



import youtubedl from 'youtube-dl-exec';
import ffmpegPath from 'ffmpeg-static';
import { exec } from 'child_process';
import fs from 'fs/promises';

async function baixarEConverter(url) {
    const videoFile = 'audio.webm';
    const mp3File = 'audio.mp3';

    try {
        // Baixa áudio
        await youtubedl(url, {
            output: videoFile,
            format: 'bestaudio/best',
        });
        console.log('✅ Áudio baixado:', videoFile);

        // Converte para MP3 com bitrate 320 kbps e frequência 48kHz
        await new Promise((resolve, reject) => {
            exec(`${ffmpegPath} -i ${videoFile} -vn -ab 320k -ar 48000 -y ${mp3File}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                console.log('✅ Conversão para mp3 (qualidade máxima) concluída:', mp3File);
                resolve();
            });
        });

        // Remove arquivo temporário
        await fs.unlink(videoFile);
        console.log('🗑️ Arquivo temporário removido:', videoFile);

    } catch (err) {
        console.error('❌ Erro:', err);
    }
}



const url = 'https://www.youtube.com/watch?v=OU8PQiIKKXo&ab_channel=HolderDawn';
baixarEConverter(url);



