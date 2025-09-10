import {createServer} from 'http';
import {isEven} from './isEven.js';
import {URL} from 'url';

createServer((req,res) => {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const number = reqUrl.searchParams.get('number');

    res.writeHead(200, {'Content-Type': 'text/plain'});
    if (numberParam === null) {
        res.end('Please provide a number query parameter, e.g., ?number=4');
        return;
    } else {
        
        res.end(isEven(number) ? `${number} is even` : `${number} is odd`);
    }
}).listen(8080, () => {
    console.log('Server is listening on port 8080');
});


