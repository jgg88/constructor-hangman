var wordList = ["carolina chickadee", "eastern bluebird", "american goldfinch", "song sparrow", "european starling", "belted kingfisher", "red headed woodpecker", "barn swallow", "house wren", "cedar wax wing", "purple finch", "chipping sparrow", "summer tanager", "indigo bunting", "bobolink", "common yellowthroat", "loggerhead shrike"];
var prompt = require('prompt');
var Word = require('./word.js');

prompt.start();

game = {
	wordList : wordList,
	guessesRemaining : 15,
	guessedLetters: [],
	currentWord : null,

	startGame : function(current) {
		this.guessesRemaining();
		this.currentWord = new Word.Word(this.wordList[Math.floor(Math.random()* this.wordList.length)]);
		this.currentWord.getLetter();
		console.log("Hangman:\nBirds of North Carolina");
		console.log(this.currentWord.wordRender() + '\n');
		this.checkLetters();
	},

	guessesRemaining : function(){
		this.guessesRemaining = 15;
	},

	checkLetters : function(){
		var self = this;
		prompt.get(['chosenLetter'], function(err, result) {
		    console.log('The letter you guessed is: ' + result.chosenLetter);

		    var checkGuess = self.currentWord.checkGuess(result.chosenLetter);

		    if (checkGuess === 0) {
				if (self.guessedLetters.indexOf(result.chosenLetter) < 0) {
	            	self.guessedLetters.push(result.chosenLetter);
	            	self.guessesRemaining--;
	            	console.log("===============================================");
	            	console.log("You guessed a wrong letter!");
			    } else {
		          		console.log("===============================================");
		            	console.log("You've already guessed this letter!");
		        }
			} else {
		    	if (self.guessedLetters.indexOf(result.chosenLetter) < 0) {
    				self.guessedLetters.push(result.chosenLetter);
    				console.log("===============================================");
			    	console.log('You guessed right!');
			    } else {
			    	console.log("===============================================");
			    	console.log("You've already guessed this letter!");
			    }
	    		if (self.currentWord.roundComplete()) {
					console.log("===============================================");
			    	console.log('* YOU WON! * The answer was ' + self.currentWord.word);
					console.log("===============================================");
			    	return;
			    }
		    }
		    console.log('Guesses remaining: ', self.guessesRemaining);
		    console.log("===============================================");
		    console.log(self.currentWord.wordRender());
		    console.log("===============================================");
		    console.log('Letters already guessed: ' + self.guessedLetters);


		    if ((self.guessesRemaining > 0) && (self.currentWord.found === false)){
		    	self.checkLetters();
		    } else if(self.guessesRemaining === 0){
		    	console.log("===============================================");
			    console.log("You lost! Answer: ", self.currentWord.word);
			    console.log("===============================================");
			} else{
			    	console.log(self.currentWord.wordRender());
			}
		});
	}
};

game.startGame();