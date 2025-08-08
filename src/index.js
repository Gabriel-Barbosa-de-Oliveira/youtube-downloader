import { createServer } from 'http'
import { statusCodes } from './utils/httpStatusCode.js'
import DownloadService from './service/download.service.js'
import { Router } from './route.js'



async function handler(request, response) {

    const router = Router(request, response);

}

createServer(handler).listen(3000, () => console.log('running at 3000'))






