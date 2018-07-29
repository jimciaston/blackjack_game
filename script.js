//create Deck
    let deck = [],
    hit = document.querySelector('#hit'),
    htmlScore = document.querySelector("#player_score"),
    dealer_htmlScore = document.querySelector("#dealer_score");
    stay = document.querySelector('#stay'),
    dealerContainer = document.querySelector('.dealer_container'),
    playerContainer = document.querySelector('.player_container');
    dealer_ = document.querySelector('.dealer_card'),
    gameOver = false,
    bust = false,
    playerStands = 0,
    des = document.querySelector("#description"),
    dealerScore = null,
    playerScore = null;

    function createDeck (){
        deck = [];
        var suites = ["Spades", "Hearts", "Diamonds", "Clubs"];
        var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

        for (let i = 0; i < values.length; i++){
            for (let x = 0; x < suites.length; x++){
                //sets values to each card
                let weight = parseInt(values[i]);

                    if(values[i] == "J" || values[i] == "Q" || values[i] == "K"){
                        weight = 10;
                    };
                    if(values[i] == "A"){
                        weight = 11;
                    };
                    //creates card
                let card = {
                    suite :suites[x] ,
                    value :values[i] ,
                    weight:weight
                };
                //pushes card to deck
                deck.push(card);

                }
            }
            //shuffles deck, sets it up to deal

            (function shuffle(){
                for (let i = 0; i < 1000; i++){
                    let location1 = Math.floor(Math.random()* deck.length);
                    let location2 = Math.floor(Math.random()* deck.length);

                    let tmp = deck[location1];

                    deck[location1] = deck[location2];
                    deck[location2] = tmp;
                }
            }());
        };
    //DEALS CARD TO BOTH DEALER AND PLAYER
    function deal(){

        hit.style.display = "block";
        stay.style.display = "block";
        reset.style.display = "none";
        des.innerHTML = playerScore;
        deal_player_cards();
        deal_dealer_cards();
    }


    function resetGame(){

        hit.style.display = "none";
        stay.style.display = "none";
        reset.style.display = "block";

        reset.addEventListener("click", function(){
            while (dealerContainer.hasChildNodes()) {
            dealerContainer.removeChild(dealerContainer.lastChild);

        }
            while(playerContainer.hasChildNodes()){
                playerContainer.removeChild(playerContainer.lastChild);
            }

            blackJack_SOUND.stop();

            des.innerHTML = '';
            des.style.color = "black";
            playerHand = [];
            dealerHand = [];
    //deal cards
            deal();

        });

    }



    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);

        this.play = function(){
            this.sound.play();
        }

        this.stop = function(){
            this.sound.pause();
        }
    }

    let blackJack_SOUND = new sound("./audio/blackjack.mp3");
    let card_SOUND = new sound("./audio/cardNoise.mp3");



//gameLogic

function new_DEALER_card(card){

        let dealerCard = document.createElement('div');
        dealerCard.className = "dealer_card";
        dealerContainer.appendChild(dealerCard);

        let rank = document.createElement('div');
        rank.className = "rank";
        dealerCard.append(rank);
        rank.innerHTML = card.value;

        let symbol = document.createElement('div');
        dealerCard.append(symbol);
        symbol.className = 'symbol';

        let cardSymbol = document.createElement('span');
        symbol.append(cardSymbol);
        cardSymbol.setAttribute('id', 'card_symbol');

        let i = document.createElement('i');
        cardSymbol.append(i);
        let fa = "fas ";

        function cardStyle(rankColor, i_class, i_color){
            rank.style.color = rankColor;
            i.className = fa + i_class;
            i.style.color = i_color;
        }
        //display card with corresponding symbol (didn't have spade or clubs)
        if(card.suite == "Hearts"){
            cardStyle('red', "fa-heart", 'red');
        }
        if(card.suite == "Clubs"){
            cardStyle('red', "fa-chess-knight", 'red')
        }
        if(card.suite == "Spades"){
            cardStyle('black', "fa-chess-bishop", 'black')
        }
        if(card.suite == "Diamonds"){
            cardStyle('black', "fa-gem", 'black')
        }
        dealerScore = dealerHand.reduce(( sum, card ) => sum + card.weight, 0 );
}

function new_PLAYER_card (card){
    let playerContainer = document.querySelector('.player_container');
    let playerCard = document.createElement('div');
    playerCard.className = "player_card";
    playerContainer.append(playerCard);

    let rank = document.createElement('div');
    rank.className = "rank";
    playerCard.append(rank);
    rank.innerHTML = card.value;


    let symbol = document.createElement('div');
    playerCard.append(symbol);
    symbol.className = 'symbol';
    let cardSymbol = document.createElement('span');
    symbol.append(cardSymbol);
    cardSymbol.setAttribute('id', 'card_symbol');

    let i = document.createElement('i');
    cardSymbol.append(i);
    let fa = "fas ";
//sets color
    function cardStyle(rankColor, i_class, i_color){
        rank.style.color = rankColor;
        i.className = fa + i_class;
        i.style.color = i_color;
    }

    if(card.suite == "Hearts"){
        cardStyle('red', "fa-heart", 'red');
    }
    if(card.suite == "Clubs"){
        cardStyle('red', "fa-chess-knight", 'red')
    }
    if(card.suite == "Spades"){
        cardStyle('black', "fa-chess-bishop", 'black')
    }
    if(card.suite == "Diamonds"){
        cardStyle('black', "fa-gem", 'black')
    }
}

    let dealerHand = [];
    let playerHand = [];
//createsDeck



//deal two cards to player

function deal_player_cards(){

    let fa = "fas ";

        for (let i = 0; i < 2; i++){
            let card = deck.pop();
            playerHand.push(card);

            let playerCard = document.createElement('div');
            playerCard.className = "player_card";
            playerContainer.append(playerCard);

            let rank = document.createElement('div');
            rank.className = "rank";
            playerCard.append(rank);
            rank.innerHTML = card.value;


            let symbol = document.createElement('div');
            playerCard.append(symbol);
            symbol.className = 'symbol';
            let cardSymbol = document.createElement('span');
            symbol.append(cardSymbol);
            cardSymbol.setAttribute('id', 'card_symbol');

            let i = document.createElement('i');
            cardSymbol.append(i);
            let fa = "fas ";
//sets color
            function cardStyle(rankColor, i_class, i_color){
                rank.style.color = rankColor;
                i.className = fa + i_class;
                i.style.color = i_color;
            }

            if(card.suite == "Hearts"){
                cardStyle('red', "fa-heart", 'red');
            }
            if(card.suite == "Clubs"){
                cardStyle('red', "fa-chess-knight", 'red')
            }
            if(card.suite == "Spades"){
                cardStyle('black', "fa-chess-bishop", 'black')
            }
            if(card.suite == "Diamonds"){
                cardStyle('black', "fa-gem", 'black')
            }
            //end of for loop


}

        playerScore = playerHand.reduce(( sum, card ) => sum + card.weight, 0 );
        des.innerHTML = "Player : "  + playerScore;
        if(playerScore == 21){
            des.innerHTML = 'BlackJack';
            des.style.color = "#ff0000";
            resetGame();
        }

}
//deals single card to dealer
function deal_dealer_cards(){

        let card = deck.pop();
        dealerHand.push(card);

        let dealerCard = document.createElement('div');
        dealerCard.className = "dealer_card";
        dealerContainer.appendChild(dealerCard);

        let rank = document.createElement('div');
        rank.className = "rank";
        dealerCard.append(rank);
        rank.innerHTML = card.value;

        let symbol = document.createElement('div');
        dealerCard.append(symbol);
        symbol.className = 'symbol';

        let cardSymbol = document.createElement('span');
        symbol.append(cardSymbol);
        cardSymbol.setAttribute('id', 'card_symbol');

        let i = document.createElement('i');
        cardSymbol.append(i);
        let fa = "fas ";

        function cardStyle(rankColor, i_class, i_color){
            rank.style.color = rankColor;
            i.className = fa + i_class;
            i.style.color = i_color;
        }
        //display card with corresponding symbol (didn't have spade or clubs)
        if(card.suite == "Hearts"){
            cardStyle('red', "fa-heart", 'red');
        }
        if(card.suite == "Clubs"){
            cardStyle('red', "fa-chess-knight", 'red')
        }
        if(card.suite == "Spades"){
            cardStyle('black', "fa-chess-bishop", 'black')
        }
        if(card.suite == "Diamonds"){
            cardStyle('black', "fa-gem", 'black')
        }

        dealerScore = card.weight;



//sets dealer score to card weight
    dealer_htmlScore.innerHTML = dealerScore;
}
function gameLogic(){


        hit.addEventListener("click", function(){
            card_SOUND.play();
            card = deck.pop();
            playerHand.push(card);
            new_PLAYER_card(card);

            playerScore = playerHand.reduce(( sum, card ) => sum + card.weight, 0 );

            des.innerHTML = "Player: " + playerScore;

            //player gets blackjack



            if(playerScore > 21){

                des.innerHTML = playerScore + " BUST"
                resetGame();
            }
        });
        stay.addEventListener("click", function(){
            hit.style.display = "none";
            playerStands = 1;


        });

            setInterval(function(){
                if(playerStands > 0){
                card = deck.pop();
                card_SOUND.play();
                dealerHand.push(card);
                //pushes new card to dealer if they are under 21 in card weight
                if(dealerScore <= 17){
                    new_DEALER_card(card);

                dealerScore = dealerHand.reduce(( sum, card ) => sum + card.weight, 0 );
                dealer_htmlScore.innerHTML = dealerScore;


                if (dealerScore == 21){
                    console.log("dealer got blackJack");
                    resetGame();
                    if(dealerScore == 21 && playerScore == 21){
                        console.log("Draw")
                    }
                }

                if(dealerScore >= 17){

                    //dealer busts
                    if(dealerScore > 21){
                        des.innerHTML = playerScore + " Dealer BUST";
                        console.log('dealer bust');
                        resetGame();
                        playerStands = 0;
                    }
                    //tie ball game
                    if(dealerScore == playerScore){
                        des.innerHTML = playerScore + " Draw";
                        console.log('tie');
                        playerStands = 0;
                        resetGame();
                    }
                    //if player wins
                    if(playerScore > dealerScore && playerScore <= 21){
                        //checks to make sure dealer received all cards
                        if(dealerScore >= 17){
                            des.innerHTML = playerScore + " Player Wins"
                            console.log('player wins');
                            resetGame();
                            playerStands = 0;

                        }
                    }
                    if(dealerScore > playerScore && dealerScore <= 21){
                        des.innerHTML = playerScore + " Dealer Wins";
                        resetGame();
                        playerStands = 0;
                    }
                }

            }}
        }, 1200);
deal();


};

function game(){
    if(deck.length < 30){
        console.log(deck.length + ' is low');
        createDeck();
    }
    gameLogic();
}
game();
