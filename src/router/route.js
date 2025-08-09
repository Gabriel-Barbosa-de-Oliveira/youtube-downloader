import DownloadController from '../controller/download.controller.js';
import { statusCodes } from '../utils/httpStatusCode.js';

export async function Router(request, response) {

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

    if (request.url === '/download' && request.method !== 'POST') {
        response.writeHead(statusCodes.METHOD_NOT_ALLOWED);
        response.end("Method not allowed");
        return;
    }

    if (request.url === '/download' && request.method === 'POST') {
        try {
            await new DownloadController().handleDownloadRequest(body, response);
            return;
        } catch (error) {
            console.error("Error processing the download request:", error);
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
            response.end("Error processing the download request, please contact adminstrator.");
        }
    }

    if (request.url !== '/download') {
        response.writeHead(statusCodes.NOT_FOUND);
        response.end("Route not found");
        return;
    }
}
