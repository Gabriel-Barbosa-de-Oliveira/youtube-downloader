
import youtubedl from 'youtube-dl-exec';
import ffmpegPath from 'ffmpeg-static';
import { exec } from 'child_process';
import fs from 'fs/promises';

export default class DownloadService {

    constructor({ytVideoUrl, fileName, filePath}) { 
        this.ytVideoUrl = ytVideoUrl;
        this.fileName = fileName;
        this.filePath = filePath;
    }

    async downloadAudioFile() {
        const videoFile = `${this.fileName}.webm`;
        const mp3File = `${this.fileName}.mp3`;

        try {
            // Baixa áudio
            await youtubedl(this.ytVideoUrl, {
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
}







