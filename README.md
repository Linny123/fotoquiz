# PhotoQuiz
You may know the game ”Geoguessr”, where you get to see a random image of Google Street View and you have to guess where you are. The closer your guess is to the real location, the more points you get. Our game has the same idea of guessing a location on a map. Only in our game everyone can upload a picture of a location and a hint. Other people can then guess where the picture is made. They can guess 3 times, every time they lose 20 points and when they ask for an hint they lose half the points.

### Installation

1. Install [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) 
2. Install [Node.js](https://nodejs.org/en/)
3. Install [Sails.js](http://sailsjs.com/get-started)  
	```
 	npm -g install sails
	```
4. Start MongoDB service (make sure you point to the database path in the project folder: /data/db)  
	```
	mongod --dbpath [Path-to-Project]/data/db
	```
5. Navigate to the project folder and start the Sails.js service   
	```
	cd testProject
	sails lift
	```
6. The project should be running, visit http://localhost:1337/ 


### Technologies

PhotoQuiz uses a number of open source projects to work properly:

* **AngularJS** - HTML enhanced for web apps!
* **node.js** - evented I/O for the backend
* **Express** - fast node.js network app framework [@tjholowaychuk**
* **Sails.js** - popular MVC framework for Node.js.
* **MongoDB** - document-oriented database program
* **jQuery** 

### External services
PhotoQuiz uses some external services
* **Google Maps**
* **Imgur** - for storing the images

