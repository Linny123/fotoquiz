/**
 * ImgurController
 *
 * @description :: Server-side logic for managing Imgur API
 * @author      :: Thibaut Deweert
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var request = require('request');
 var btoa = require('btoa');
 var fs = require('fs');
 var ExifImage = require('exif');

 var client_id = '6206717c1dd47fc';


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

 function uint8ToString(buf) {
 	var i, length, out = '';
 	for (i = 0, length = buf.length; i < length; i += 1) {
 		out += String.fromCharCode(buf[i]);
 	}
 	return out;
 }

 function coordinatesToDecimal(degrees, minutes, seconds) {
 	return degrees + minutes/60 + seconds/3600;
 }

 function uploadToImgur(base64) {
 	return new Promise(function(resolve, reject) {

 		var imageInfo = {};

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

		  imageInfo.link = body.data.link
		  imageInfo.deletehash = body.data.deletehash
		  imageInfo.id = body.data.id
		  resolve(imageInfo)
		}

		request(options, callback);
	});
 }

 function removeImage(imageDeleteHash) {
 	return new Promise(function(resolve, reject) {
 		sails.log("-> Removed image with deletehash: "+imageDeleteHash);

 		var imageInfo = {};

 		var options = {
 			url: "https://api.imgur.com/3/image/"+imageDeleteHash,
 			method: 'DELETE',
 			headers: {
 				"Authorization": "Client-ID " + client_id
 			}
 		};

 		function callback(error, response, body) {
 			if(error) {
 				sails.log.error("ERROR: "+error);
 				reject(error)
 			}
			resolve(body.status) // returns statuscode
		}
		request(options, callback);
	});
 }


 // function getLocation(lat, lng) {
 // 	return new Promise(function(resolve, reject) {
 // 		sails.log("-> getLocation in ImgurController: "+lat+lng);

 // 		var imageInfo = {};

 // 		var options = {
 // 			url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyBrriX06otU67RMzucGE-vRA_W4Rvvva5Y",
 // 			//method: 'DELETE',
 			
 // 		};

 // 		function callback(error, response, body) {
 // 			if(error) {
 // 				sails.log.error("ERROR: "+error);
 // 				reject(error)
 // 			}
	// 		resolve(body) // returns statuscode
	// 		sails.log(body)
	// 	}
	// 	request(options, callback);
	// });
 // }


 module.exports = {

 	getImageLinkByID: function(req, res){
 		// id should be in params field: 'id'

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
 			}
 			if(error) {
 				sails.log(error);
 			}
 		}

 		request(options, callback);


 	},


    uploadImage: function(req, res){
    	// file should be in formdata field: 'file'
    	sails.log("-> uploadImage in ImgurController")
    	// Make promise of uploader
    	return new Promise(function(resolve, reject) {

    		var image = {};

			// Upload file locally
			req.file('file').upload({/*custom dirpath*/},function (err, uploadedFiles) {
				if (err) return res.negotiate(err);

				// Get Exif data from local file
				ExifImage({ image : uploadedFiles[0].fd }, function (error, exifData) { 
					var gps = {}

					if (error) { console.log('Error: '+error.message); }
					else {
						if(!isEmpty(exifData.gps) && ('GPSLatitude' in exifData.gps)) { // If image contains GPS exif data
							gps.lat = coordinatesToDecimal(exifData.gps.GPSLatitude[0], exifData.gps.GPSLatitude[1], exifData.gps.GPSLatitude[2]) 
							gps.lng = coordinatesToDecimal(exifData.gps.GPSLongitude[0], exifData.gps.GPSLongitude[1], exifData.gps.GPSLongitude[2])
						}
					}

					image.gps = gps; // Add exif data to image variable
				});

				// Get Buffer of local file
				fs.readFile(uploadedFiles[0].fd, (err, data) => { 
				 	if (err) throw err;

					file = btoa(uint8ToString(data)) // Convert buffer of local file to base64

					uploadToImgur(file).then(function(imageInfo) { // Upload local file to IMGUR
						image.url = imageInfo.link;
					  	image.id = imageInfo.id;
					  	image.deletehash = imageInfo.deletehash
					  	
					  	resolve(image) // Return all collected data and url of remote image
					});
				});

			});
		}); // end promise
    },

    removeImage: function(req, res){
    	// deletehash should be in params field: 'imageDeletehash'
    	return removeImage(req.query.imageDeletehash);
    },



};

