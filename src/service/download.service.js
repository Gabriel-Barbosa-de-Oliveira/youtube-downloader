import fs from 'fs';
import * as ytdl from '@ytdl-core';

// Polyfill para File no Node.js (corrige erro do undici)
if (typeof File === 'undefined') {
    global.File = class File extends Blob {
        constructor(chunks, filename, options = {}) {
            super(chunks, options);
            this.name = filename;
            this.lastModified = options.lastModified || Date.now();
        }
    };
}

export default class DownloadService {

    constructor() { }

    async downloadFile() {
        // TypeScript: import ytdl from '@distube/ytdl-core'; with --esModuleInterop
        // TypeScript: import * as ytdl from '@distube/ytdl-core'; with --allowSyntheticDefaultImports
        // TypeScript: import ytdl = require('@distube/ytdl-core'); with neither of the above

        // Download a video
        ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
            .pipe(fs.createWriteStream('video.mp4'));
    }
}

