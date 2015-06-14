// CLIENT

var net = require('net');
var com = require('../com.js')
var Colors = require('colors')

	var HOST = 'rabbit-s1.herokuapp.com'//'127.0.0.1';
	var PORT = process.env.PORT || 6969;

	var client = new com.TCPClient(PORT, HOST)



	client.bacon.onValue(function(data){
		
		console.log(data.type.blue + (data.value ? (' : ' + JSON.stringify(data.value, null, 4).yellow) : '') )
			
		switch (data.type){
			case "open":

			break;
			case "data":

			break;

			case "close":

			break;

		}

	})

