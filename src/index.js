import { createServer } from 'http'
import { statusCodes } from './utils/httpStatusCode.js'
import DownloadService from './service/download.service.js'



async function handler(request, response) {
    const downloadService = new DownloadService()

    // Example usage of the download service
    await downloadService.downloadAudioFile('https://www.youtube.com/watch?v=OU8PQiIKKXo&ab_channel=HolderDawn');

    response.writeHead(statusCodes.OK)
    response.end()
}

createServer(handler).listen(3000, () => console.log('running at 3000'))






