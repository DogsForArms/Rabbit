var net = require('net');
var Bacon = require('baconjs')


var com = function(){

	this.TCPServer = function(PORT, HOST){
		var self = this
		var socks = []
		var num_socks = 0



		self.bacon = Bacon.fromBinder(function(sink) {

			net.createServer(function(sock) {
	    
	    		var sockMeta = {
	    			'remoteAddress': sock.remoteAddress, 
	    			'remotePort':sock.remotePort, 
	    			'id':num_socks
	    		}
				// console.log('CONNECTED: ' + JSON.stringify(sockMeta, null, 4));
			    //SINK - join
			    sink({'type':'open', 'value' : sockMeta })
				socks.push(sock)
				num_socks++

			    sock.on('data', function(data) {
			        
			        //SINK - data
			    	sink({'type':'data', 'value':(data+'')})
			        sock.write('You said "' + data + '"');
			        
			    });

			    sock.on('close', function(data) {
			    	//SINK -leave
			    	// console.log('leave')
			    	// console.log(data)

			    	sink({'type':'close', 'value' : sockMeta})
			        // console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
			    });

			}).listen(PORT, HOST);

			return function(){
				console.log('TODO server cleanup')
			}
		})



		console.log('Server listening on ' + HOST +':'+ PORT);

	}

	this.TCPClient = function(PORT, HOST){
		var self = this
		var client = new net.Socket();

		


		self.bacon = Bacon.fromBinder(function(sink) {

			client.connect(PORT, HOST, function() {

				sink({'type':'open'})			   
			    client.write('I am Chuck Norris!');

			});

		    //on data from server
 			client.on('data', function(data) {
		    
		    	sink({'type':'data', 'value':(data + '')})
			    client.destroy();
		    
			});
			//on connection close
			client.on('close', function() {
				sink({'type':'close'})
			});
		    
		    return function() {
		        //no cleanup necessary
		        console.log('TODO client cleanup')
		    }
		})

		
	}
}

module.exports = new com()
