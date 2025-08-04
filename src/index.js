import { createServer } from 'http'
import { statusCodes } from './utils/httpStatusCode.js'
import DownloadService from './service/download.service.js'



async function handler(request, response) {

    let body = '';
    request.on('data', chunk => {
        body += chunk;
    });

    await new Promise(resolve => request.on('end', resolve));

    if (!body) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end("No data provided");
        return;
    }

    if (request.method !== 'POST') {
        response.writeHead(statusCodes.METHOD_NOT_ALLOWED);
        response.end("Method not allowed");
        return;
    }

    let data;

    try {
        data = JSON.parse(body);
        const { fileName, filePath, ytVideoUrl } = data;
        if (!fileName || !filePath || !ytVideoUrl) {
            response.writeHead(statusCodes.BAD_REQUEST);
            response.end("Missing required fields: fileName, filePath, ytVideoUrl");
            return;
        }

        const downloadService = new DownloadService(data);

        // "fileName": "audio", "filePath": "./", "ytVideoUrl": "https://www.youtube.com/watch?v=OU8PQiIKKXo&ab_channel=HolderDawn"


        // Example usage of the download service 
        await downloadService.downloadAudioFile();
        response.writeHead(statusCodes.OK)
        response.end(`File downloaded and converted successfully: ${fileName}.mp3`);

    } catch (error) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end("Invalid JSON");
        return;
    }

}

createServer(handler).listen(3000, () => console.log('running at 3000'))






