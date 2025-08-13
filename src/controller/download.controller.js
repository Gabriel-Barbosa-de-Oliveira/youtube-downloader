import DownloadService from "../service/download.service.js";
import { statusCodes } from "../utils/httpStatusCode.js";
import { objectPropertiesChecker } from "../utils/objectChecker.js";


export default class DownloadController {

    async handleDownloadRequest(body, response) {

        let data;

        try {
            data = JSON.parse(body);
            const { fileName, filePath, ytVideoUrl } = data;
            const objectChecker = objectPropertiesChecker(data);
            if (!objectChecker.isValid) {
                response.writeHead(statusCodes.BAD_REQUEST);
                response.end(`Missing required fields: ${objectChecker.missingFields.join(", ")}`);
                return;
            }

            const downloadService = new DownloadService(ytVideoUrl, fileName, filePath);

            // Example usage of the download service 
            await downloadService.downloadAudioFile();
            response.writeHead(statusCodes.OK);
            response.end(`File downloaded and converted successfully: ${fileName}.mp3`);

        } catch (error) {
            console.error("Error processing the download request:", error);
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
            response.end("Error processing the download request, please contact adminstrator.");
        }
    }
}