import { createServer } from 'http';
import { isEven } from './isEven.js';
import { URL } from 'url';

createServer((req, res) => {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const numberParam = reqUrl.searchParams.get('number');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
    });



    if (numberParam === null) {
        res.end('Please provide a number query parameter, e.g., ?number=4');
        return;
    }

    const number = parseInt(numberParam, 10);

    if (isNaN(number)) {
        res.end('Error: Please enter a valid integer.');
        return;
    }

    try {
        res.end(isEven(number) ? `${number} is even` : `${number} is odd`);
    } catch (err) {
        res.end('Error: ' + err.message);
    }
}).listen(8080, () => {
    console.log('Server is listening on port 8080');
});
