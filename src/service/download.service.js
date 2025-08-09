
import youtubedl from 'youtube-dl-exec';
import ffmpegPath from 'ffmpeg-static';
import { exec } from 'child_process';
import fs from 'fs/promises';
import { encodeToUTF8 } from '../utils/encoder.js';

export default class DownloadService {

    constructor(ytVideoUrl, fileName, filePath) {
        this.ytVideoUrl = ytVideoUrl;
        // Ensure fileName and filePath are UTF-8 encoded strings
        this.fileName = encodeToUTF8(fileName);
        this.filePath = encodeToUTF8(filePath);
    }

    async downloadAudioFile() {
        const videoFile = this._getFormattedFileNameWithBasePath('webm');
        const mp3File = this._getFormattedFileNameWithBasePath('mp3');

        try {
            // Baixa áudio
            await youtubedl(this.ytVideoUrl, {
                output: this._getFormattedFileNameWithBasePath('webm'),
                format: 'bestaudio/best',
            });
            console.log('✅ File Download:', `${videoFile}`);

            // Converte para MP3 com bitrate 320 kbps e frequência 48kHz
            await new Promise((resolve, reject) => {
                exec(`${ffmpegPath} -i ${videoFile} -vn -ab 320k -ar 48000 -y ${mp3File}`, (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    console.log('✅ Mp3 conversion successfull:', `${mp3File}`);
                    resolve();
                });
            });

            // Remove arquivo temporário
            await fs.unlink(`${videoFile}`);
            console.log('🗑️ Temp File removed:', `${videoFile}`);

        } catch (err) {
            console.error('❌ Error:', err);
        }
    }

    _getFormattedFileNameWithBasePath(extension = 'mp3') {
        const basePath = this.filePath;
        const fileName = `${this.fileName}.${extension}`;
        return `${basePath}/${fileName}`;
    }
}







