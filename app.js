const http = require("http");
const fs = require("fs");
const path = require('path');
 
const server = http.createServer(function(request, response){
   	//console.log('------request ' + request.url);

   	let filePath;
   	if (request.url === "/"){
		filePath = './public/UI/index.html';
   	}
   	else if (request.url.startsWith ('/Photos')){
   		filePath = "./public/UI" + request.url;
   	}
   	else{
   		filePath = "./public/UI/" + request.url;
   	}

    let extname = path.extname(filePath);
    let contentType;
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        default:
        	contentType = 'text/html';
        break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
        	console.log ("--------\nError = " + error);
        	console.log ("Filepath = " + filePath);
        	console.log ("Contenr type = " + contentType);
            if(error.code == 'ENOENT'){
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

});

server.listen (3000);

console.log('Server running');