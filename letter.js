var Letter = function(char) {
	this.character = char.toLowerCase();
	this.show = false;
	this.letterRender = function() {
		if (this.show) {
			return this.character;
		} else if (this.character === " ") {
				this.show = true;
				return this.character;
		} else {
				return "_ ";
		}
	};
};

exports.Letter = Letter;