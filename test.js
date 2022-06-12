import http from 'http';
const port = 8000;

const onClientConnect = (request, response) => {
  const userAgent = request.headers['user-agent'];
  console.log(`request ${request}, response ${response}`);
  response.end(`Hello, ${userAgent}!`);
};

const httpServer = http.createServer(onClientConnect);

httpServer.listen(port, () => {
  console.info(`Подключение на ${port} порту`);
});

httpServer.on('error', ({message}) => {
  console.log(`Ошибка: ${message}`);
});

console.log('HTTP: ', http);
console.log(port);
