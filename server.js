import { createServer } from 'http';
import { URL } from 'url';
import { appendFile } from 'fs/promises';

createServer(async (req, res) => {
    try {
        const reqUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
        const numberParam = reqUrl.searchParams.get('number');

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });

        if (numberParam === null) {
            res.end('Please provide a number query parameter, e.g., ?number=153');
            return;
        }

        const number = parseInt(numberParam, 10);
        if (isNaN(number)) {
            res.end('Error: Please enter a valid integer.');
            return;
        }

        const isArmstrong = (n) => {
            if (n < 0) return false;
            const s = String(n);
            const p = s.length;
            const sum = [...s].reduce((acc, d) => acc + Math.pow(Number(d), p), 0);
            return sum === n;
        };

        const resultText = isArmstrong(number)
            ? `${number} is an Armstrong number`
            : `${number} is NOT an Armstrong number`;

        const logLine = `${new Date().toISOString()} - ${resultText}\n`;
        // append to results.txt in same folder
        await appendFile(new URL('./results.txt', import.meta.url), logLine, { encoding: 'utf8' });

        res.end(resultText);
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error: ' + err.message);
    }
}).listen(8080, () => {
    console.log('Server is listening on port 8080');
});