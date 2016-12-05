/**
 * ImgurController
 *
 * @description :: Server-side logic for managing Imgur API
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');
var btoa = require('btoa');
var fs = require('fs');
//var FileReader = require('filereader')
//var FileAPI = require('file-api')
//var deferred = require('deferred');
//var XMLHttpRequest = require('xhr');
//var FormData = require('form-data');
var client_id = '6206717c1dd47fc';



function uint8ToString(buf) {
    var i, length, out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
        out += String.fromCharCode(buf[i]);
    }
    return out;
}



function uploadToImgur(base64) {
	return new Promise(function(resolve, reject) {
	sails.log("IN ImgurController (uploadToImgur)");

        var options = {
			url: "https://api.imgur.com/3/image.json",
			headers: {
				"Authorization": "Client-ID " + client_id
			},
			method: 'POST',
		    json: {
		        'image': base64,
		        'type' : 'base64'
		    }
		};
		 
		function callback(error, response, body) {
		  if(error) {
		  	sails.log.error("ERROR: "+error);
		  	reject(error)
		  }
		  //sails.log.info(body);
		  resolve(body.data.link)
		}
		request(options, callback);
	});
}

module.exports = {

	_config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

	getImages: function(req, res){
		sails.log("IN ImgurController (GETIMAGE)");
		var album_id = req.query.album_id;

        var options = {
		  url: "https://api.imgur.com/3/album/"+album_id+"/images/",
		  headers: {
            "Authorization": "Client-ID " + client_id
          }
		};
		 
		function callback(error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var info = JSON.parse(body);
		  	var images = [];
		  	for (i = 0; i < info.data.length; ++i) {
		  		images.push({ id: info.data[i].id, link: info.data[i].link});
			    sails.log(info.data[i].link);
			}

		    return res.send(images)
		    sails.log("RETURNED");
		  }
		  if(error) {
		  	sails.log(error);
		  }
		}
		 
		request(options, callback);


    },

    getImage: function(req, res){
		sails.log("IN ImgurController (GETIMAGE)");
		var id = req.query.id;

        var options = {
		  url: "https://api.imgur.com/3/image/"+id,
		  headers: {
            "Authorization": "Client-ID " + client_id
          }
		};
		 
		function callback(error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var info = JSON.parse(body);
		  	var image = info.data.link;

		    return res.send(image)
		    sails.log("RETURNED");
		  }
		  if(error) {
		  	sails.log(error);
		  }
		}
		 
		request(options, callback);


    },


    uploadImage: function(req, res){
		sails.log("IN ImgurController (UPLOAD IMAGE)");

		req.file('uploadImage').upload({
		  dirname: require('path').resolve(sails.config.appPath, 'assets/images')
		},function (err, uploadedFiles) {
		  if (err) return res.negotiate(err);

		 
		  fs.readFile(uploadedFiles[0].fd, (err, data) => {
			  if (err) throw err;
		
			  file = btoa(uint8ToString(data))

			  uploadToImgur(file).then(function(link) {
			  	sails.log("LINK RECEIVED")
			  	sails.log(link)
			  	return res.send(link)
			  });
		  });
		
		});

    },


	
};

