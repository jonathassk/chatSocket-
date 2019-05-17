var app = require('config/server.js')

//parametrizar a porta de escuta 
var server = app.listen(80, function(){
	console.log('servidor online');
});

var io = require('socket.io').listen(server);
app.set('io', io);

io.on('connection', function(socket){
	console.log('usuario conectou');

	socket.on('disconnect', function(){
		console.log('usuario desconectou');
	});

	socket.on('msgParaServidor', function(data){
		//dialogo
		socket.emit('msgParaCliente', {apelido : data.apelido, mensagem: data.mensagem});
		socket.broadcast.emit('msgParaCliente', {apelido : data.apelido, mensagem: data.mensagem});
		//participantes
		socket.emit('participantes', {apelido : data.apelido});
		socket.broadcast.emit('participantes', {apelido : data.apelido});
	});

});
