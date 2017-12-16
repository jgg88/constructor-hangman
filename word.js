var letter = require('./letter.js');
var Word = function(current) {
	this.word = current;
	this.letterArray = [];
	this.found = false;
	this.getLetter = function(word) {
		for (var i = 0; i < this.word.length; i++) {
			this.letterArray.push(new letter.Letter(this.word[i]));
		}
	};

	this.roundComplete = function() {
		var count = 0;
		for (var i = 0; i < this.letterArray.length; i++) {
			if (this.letterArray[i].show) {
				count++;
			}
		}
		if (count === this.letterArray.length) {
			this.found = true;
		}
		return this.found;
	};

	this.checkGuess = function(guessLetter) {
		var increment = 0;
		for (var i = 0; i < this.letterArray.length; i++) {
			if (this.letterArray[i].character === guessLetter) {
				this.letterArray[i].show = true;
				increment++;
			}
		}
		return increment;
	};

	this.wordRender = function() {
		var string = "";

		for (var i = 0; i < this.letterArray.length; i++) {
			string += this.letterArray[i].letterRender();
		}
		return string;
	};
};

exports.Word = Word;