class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
    get isFaceCard() {
        if (this.value === 1 || this.value > 10) { 
            return true;
        } else {
            return false;
        }
    }

    toString() {
        return `${this.rank} of ${this.suit}`;
    }
    static Compare(cardOne, cardTwo) {
        return (cardOne.value > cardTwo.value) ? 1 : (cardOne.value === cardTwo.value) ? 0 : -1;   
    }
}

class Deck {
    constructor() {
        this.cards = [];

        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const ranks = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        
        for(let i = 0; i < suits.length; i++) {
            for(let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(suits[i], ranks[j], values[j]));
            }
        }
  
    }

    get count() {
        return this.cards.length;
    }

    shuffle() {
        const deck = this.cards;
        let i = deck.length;
        let j;

        while(i) {
            j = Math.floor(Math.random() * i--);
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return this;
    }
    draw(n) {
        return this.cards.splice(-n, n);
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.deck = new Deck();
        this.wins = 0;
    }
    
    static init(player) {
        player.deck = new Deck();
        player.wins = 0;
    }

    static Play(playerOne, playerTwo) {
        let p1 = playerOne.deck.cards.length;
        let p2 = playerTwo.deck.cards.length;
        let p1Cards = playerOne.deck.cards;
        let p2Cards = playerTwo.deck.cards;
        playerOne.deck.shuffle();
        playerTwo.deck.shuffle();
        while(p1 > 0 && p2 > 0) {
            if (Card.Compare(p1Cards[p1 - 1], p2Cards[p2 - 1]) === 1) {
                console.log(`${playerOne.name} with ${p1Cards[p1 - 1]} WINS ${playerTwo.name} with ${p2Cards[p2 - 1]}`);
                playerOne.wins++;
            } else if (Card.Compare(p1Cards[p1 - 1], p2Cards[p2 - 1]) === -1) {
                console.log(`${playerTwo.name} with ${p2Cards[p2 - 1]} WINS ${playerOne.name} with ${p1Cards[p1 - 1]}`);
                playerTwo.wins++;
            } else if (Card.Compare(p1Cards[p1 - 1], p2Cards[p2 - 1]) === 0) {
                console.log(`${playerOne.name} with ${p1Cards[p1 - 1]} DRAW ${playerTwo.name} with ${p2Cards[p2 - 1]}`);
            }
            p1--;
            p2--;
            playerOne.deck.draw(1);
            playerTwo.deck.draw(1);
        }

        if (playerOne.wins > playerTwo.wins) {
            console.log(`${playerOne.name} wins ${playerTwo.name} ${playerOne.wins} to ${playerTwo.wins}`);
        } else if (playerOne.wins < playerTwo.wins) {
            console.log(`${playerTwo.name} wins ${playerOne.name} ${playerTwo.wins} to ${playerOne.wins}`);
        } else {
            console.log(`Draw!!! GAME OVER!!! ${playerOne.wins} to ${playerTwo.wins}`);
        }
        Player.init(playerOne)
        Player.init(playerTwo);
    }
}

const pl1 = new Player('Flash');
const pl2 = new Player('Zoom');
Player.Play(pl1, pl2);

