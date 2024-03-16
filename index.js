const http = require('http');
const { exec } = require('child_process');
const xml2js = require('xml2js');

const port = process.env.PORT || 7777;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const command = 'nvidia-smi -x -q';
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Error executing nvidia-smi command' }));
            return;
        }
        
        xml2js.parseString(stdout, (err, result) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Error converting XML data to JSON' }));
                return;
            }
            
            const jsonData = JSON.stringify(result);
            res.setHeader('Content-Length', Buffer.byteLength(jsonData));
            res.end(jsonData);
        });
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});