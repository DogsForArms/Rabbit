// SERVER

var net = require('net');
var com = require('../com.js')
var Colors = require('colors')


	

	var HOST = 'rabbit-s1.herokuapp.com'//'localhost'//'127.0.0.1';
	var PORT = process.env.PORT || 6969;

	var server = new com.TCPServer(PORT, HOST)


	server.bacon.onValue(
		function(data){

			var value = data.value
			console.log(data.type.blue  + ' : ' + JSON.stringify(value, null, 4).yellow)
			
			switch (data.type){
				case "open":

				break;

				case "close":

				break;

				case "data":

				break;
			}

	})

