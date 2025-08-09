import { createServer } from 'http'
import { Router } from './router/route.js'



async function handler(request, response) {

    const router = Router(request, response);

}

createServer(handler).listen(3000, () => console.log('running at 3000'))






