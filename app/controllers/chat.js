module.exports.iniciaChat = function(app,req,res){
	validacao = "";
	data = "";
	var dadosForm = req.body;
	
	req.assert('apelido','apelido é obrigatorio').notEmpty();	
	req.assert('apelido', 'O apelido deve ter entre 3 e 20 caracteres').len(3,20);

	var erros = req.validationErrors();
	
	if(erros){
		res.render('index', {validacao : erros});
		return;
	}

	app.get('io').emit('msgParaCliente', {apelido : dadosForm.apelido, mensagem: ' acabou de entrar'});
	console.log(dadosForm.apelido);
	res.render('chat', {dadosForm: dadosForm});

}