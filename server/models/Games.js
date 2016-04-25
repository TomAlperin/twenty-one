var mongoose = require('mongoose');

var GameSchema = new mongoos.Schema({
	Deck: [],
	DealerHand: [],
	PlayerHand: [],
	PlayerHandSplit: [],
	bet: {type: Number, default: 0},
	GameState: {type: String, default: 'bet'},
	HaveSplitDouble: {type: Boolean, default: false},
	insured: {type: Boolean, default: false},
	Bank: {type: Number, default: 1000},
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

UserSchema.methods.shuffleCards = function() {
    var cards = [];
    for (var y = 0; y < 2; y++) {                                                        //For "y" decks
        for(var i = 4; i <= 55; i++) {                                                   //Load 52 cards in deck
            cards.push(i);
        }
    }
    for( var j, x, z = cards.length; z; j = Math.floor(Math.random() * z),               //Shuffle cards in deck
        x = cards[--z], cards[z] = cards[j], cards[j] = x);
    this.Deck = cards;
}

UserSchema.methods.doBet = function(ammount) {                                           //bet
    if (this.Bank >= ammount) {
        this.Bank -= ammount;
        this.bet += ammount;
        return true;
    } else
      return false;
}

mongoose.model('Game', GameSchema);