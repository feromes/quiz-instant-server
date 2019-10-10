var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
io.origins(['*']);

var votacao = {
  'terra_plana': {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0
  },
  'outra_votacao': {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0
  }
}

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('vota', function(a){
    console.log(a)
    votacao[a.votacao][a.voto]++
    // console.log(votacao.terra_plana[a.terra_plana]++);
    io.emit('resultado', votacao);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});