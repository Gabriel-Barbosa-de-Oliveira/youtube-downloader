import { createServer } from 'http'
import { statusCodes } from './utils/httpStatusCode.js'

async function handler(request, response) {
    let body = ''
    request.on('data', chunk => {
        body += chunk
    })
    
    request.on('end', () => {
        response.writeHead(statusCodes.OK, { 'Content-Type': 'text/plain' })
        response.end(body)
    })
}

createServer(handler).listen(3000, () => console.log('running at 3000'))
