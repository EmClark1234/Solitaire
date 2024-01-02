
const suits = ["\u2663", "\u2666", "\u2665", "\u2660"];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
let shufflePile = [];
let wastePile = [];
let tablePiles = [[],[],[],[],[],[],[]];
let tablePilesHTML = [[],[],[],[],[],[],[]];
let acePile = [];
let card;
let dragCard;
let dragContainer;

//html elements
let shuffleSlot = document.getElementById("stockpile-slot");
let wasteSlot = document.getElementById("wastepile-slot");
let slot1 = document.getElementById("slot-1");
let slot2 = document.getElementById("slot-2");
let slot3 = document.getElementById("slot-3");
let slot4 = document.getElementById("slot-4");
let slot5 = document.getElementById("slot-5");
let slot6 = document.getElementById("slot-6");
let slot7 = document.getElementById("slot-7");
let aceOfHeartsSlot = document.getElementById("aceOfHearts-slot")
let aceOfDiamondsSlot = document.getElementById("aceOfDiamonds-slot")
let aceOfClubsSlot = document.getElementById("aceOfClubs-slot")
let aceOfSpadesSlot = document.getElementById("aceOfSpades-slot")
let draggable;
let containers = document.querySelectorAll('.container');


class Deck{
        constructor(){
            this.deck = [];
        }
        createDeck(){
            for(let suit of suits){
                for(let value of values){
                    card = new Card(suit, value);
                    this.deck.push(card);
                }
            }
            return this.deck;
        }
        shuffle(){
            let counter = this.deck.length, temp, i;
            while(counter){
                i = Math.floor(Math.random() * counter--)
                temp = this.deck[counter];
                this.deck[counter] = this.deck[i];
                this.deck[i] = temp;
            }
            return this.deck;
        }
}

class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }

    getCardHTML(card){
        const cardDiv = document.createElement('div');
        cardDiv.classList.add("backOfCard");
        cardDiv.setAttribute('id', 'card');
        cardDiv.dataset.value = `${card.value} ${card.suit}`
        return cardDiv;
    }
}

class Game{
    constructor(state){
        this.state = state;
    }
    startGame(){
        this.state = true
    }
    endGame(){
        this.state = false
    }
}

let game = new Game(false);
let deck = new Deck(suits, values);


let shuffleBtn = document.getElementById('shuffle-btn');
shuffleBtn.addEventListener('click', shuffleDeck)
function shuffleDeck(){
    if(game.state == true){
        window.alert("Cannot shuffle cards while game is in play");
    }
    else if(game.state == false){
        deck.shuffle();
        console.log(deck);
        console.log('hoihdsohif');
    }
}


//adding functionality to buttons
let dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', dealCards)
function dealCards(){
    if(game.state == true){
        window.alert("To deal another hand, end game first");
    }
    else if(game.state == false){
        //start game
        //create deck
        //make Cards into HTML elements
        //split deck
        //append cards to screen
        deck.createDeck();
        deck.shuffle();
        createCardDivs();
        splitDeckToTable(deck);
        appendCardsToShuffleSlot();

        marginCards(slot1);
        marginCards(slot2);
        marginCards(slot3);
        marginCards(slot4);
        marginCards(slot5);
        marginCards(slot6);
        marginCards(slot7);

        flipLastCard(slot1)
        flipLastCard(slot2)
        flipLastCard(slot3)
        flipLastCard(slot4)
        flipLastCard(slot5)
        flipLastCard(slot6)
        flipLastCard(slot7)

        makeCardsClickable(shuffleSlot);
        makeCardsClickable(wasteSlot);
        makeCardsClickable(slot1);
        makeCardsClickable(slot2);
        makeCardsClickable(slot3);
        makeCardsClickable(slot4);
        makeCardsClickable(slot5);
        makeCardsClickable(slot6);
        makeCardsClickable(slot7);
        game.state = true;
    }
}

//restart btn
let restartBtn = document.getElementById('restart-btn')
restartBtn.addEventListener('click', function(){location.reload();});

//turn all cards in deck into cardDivs
function createCardDivs(){
    for(i = 0; i < deck.deck.length; i++){
        cardFromDeck = deck.deck.shift();
        let cardDiv = card.getCardHTML(cardFromDeck);
        deck.deck.push(cardDiv);
    }
}
createCardDivs();


function splitDeckToTable(deck){
    for(let i = 0; i < 1; i++){
        tablePiles[0].push(deck.deck.shift());  
        appendCardsDivsToTable(tablePiles[0], slot1);
    }
    for(let i = 0; i < 2; i++){
        tablePiles[1].push(deck.deck.shift());
        appendCardsDivsToTable(tablePiles[1], slot2);
    }
    for(let i = 0; i < 3; i++){
        tablePiles[2].push(deck.deck.shift());
        appendCardsDivsToTable(tablePiles[2], slot3);
    }
    for(let i = 0; i < 4; i++){
        tablePiles[3].push(deck.deck.shift());
        appendCardsDivsToTable(tablePiles[3], slot4);
    }
    for(let i = 0; i < 5; i++){
        tablePiles[4].push(deck.deck.shift());
        appendCardsDivsToTable(tablePiles[4], slot5);
    }
    for(let i = 0; i < 6; i++){
        tablePiles[5].push(deck.deck.shift());
        appendCardsDivsToTable(tablePiles[5], slot6);
    }
    for(let i = 0; i < 7; i++){
        tablePiles[6].push(deck.deck.shift());
        appendCardsDivsToTable(tablePiles[6], slot7);
    }

    return deck;
}

//append all cardDivs to screen
function appendCardsDivsToTable(array, tableDiv){
    for(i=0; i< array.length; i++){
        tableDiv.appendChild(array[i]);
    }
}


function marginCards(parentNode){
    let parentNodeLength = parentNode.childElementCount;
    let childNodes = parentNode.childNodes;
    let index; 
    let marginTop = 0;
    for(let i = 0; i < parentNodeLength; i++){
     index = Array.prototype.indexOf.call(parentNode.children, childNodes[i]);
     if(index == 0 || parentNode.id == "stockpile-slot" || parentNode.id == "wastepile-slot"
     || parentNode.id == "aceOfHearts-slot" || parentNode.id == "aceOfClubs-slot" 
     || parentNode.id == "aceOfSpadess-slot" 
     || parentNode.id == "aceOfDiamonds-slot"){
         childNodes[i].style.marginTop = '0px';
     }
     else{
         marginTop = marginTop + 30;
         childNodes[i].style.marginTop = marginTop + "px";
    }
 }
}
function flipLastCard(parentDiv){
   flipCards(parentDiv.lastChild);
}

function appendCardsToShuffleSlot(array){
    for(i=0; i < 25; i++){
        shufflePile.push(deck.deck.shift());
        appendCardsDivsToTable(shufflePile, shuffleSlot);
    }
}

function makeCardsClickable(parent){
   for(i=0; i < parent.children.length; i++){
        parent.children[i].addEventListener('click', checkCardPosition);
   }
}


function checkCardPosition(e){
    let parent = e.target.parentNode;
    let parentID = parent.id;
    let cardToMove;
    let lastCardInSlot = parent.lastChild;

    if(e.target.classList != "backOfCard"){
        if(parentID == "wastepile-slot"){
            if(checkForAce(e.target) == true){
                flipLastCard(wasteSlot);
            }
            else if(checkForKing(e.target) == true){
                console.log('move king');
            }
            else{
                if(checkAceSlots(e.target) == false){
                    checkTableSlots(e.target)
                }
            }
        }
        else if(parentID == "slot-1" || parentID == "slot-2" || parentID == "slot-3" || parentID == "slot-4" ||
        parentID == "slot-5" || parentID == "slot-6" || parentID == "slot-7"){

            if(checkForAce(e.target) == false){
                if(checkForKing(e.target) != true){
                    if(e.target == lastCardInSlot){
                        if(checkAceSlots(e.target) == false){
                            checkTableSlots(e.target)
                        }
                    }
                    else if(e.target != lastCardInSlot){
                        checkTableSlots(e.target)
                    }
                }
            }
        }
        else if(parentID == "aceOfHearts-slot" || parentID == "aceOfDiamonds-slot" || parentID == "aceOfClubs-slot"
        || parentID == "aceOfSpades-slot"){
            checkTableSlots(e.target);
        }
    }
    checkWinningConditions();
}

shuffleSlot.addEventListener('click', shuffleToWaste)
function shuffleToWaste(e){
    if(shuffleSlot.childElementCount > 0 ){
        let cardToMove = shuffleSlot.removeChild(shuffleSlot.lastChild);
        flipCards(cardToMove);
        wasteSlot.appendChild(cardToMove);
    }
    else if(shuffleSlot.childElementCount == 0){
        shuffleSlot.addEventListener('click', reshuffle)
    }
}

function reshuffle(){
        while (wasteSlot.firstChild){
            let cardToMove = wasteSlot.removeChild(wasteSlot.lastChild);
            flipCards(cardToMove);
            shuffleSlot.appendChild(cardToMove); 
            wastePile.shift();
            shufflePile.push(cardToMove);
        }
        shuffleSlot.removeEventListener('click', reshuffle)
}


function checkForKing(card){
    let cardDataValue = card.getAttribute('data-value');
    let cardDataValueArray = cardDataValue.split(" ");
    let cardValue = cardDataValueArray[0];
    let parent = card.parentNode;
    let parentID = parent.id;
    let arrayOfTableSlots = [slot1, slot2, slot3, slot4, slot5, slot6, slot7];
  
    let indexOfCard = Array.prototype.indexOf.call(card.parentNode.children, card);
    let cardsToBeMoved = [];
            //place the cards to be moved into an array for temporary storage
            for(let i = indexOfCard; i < parent.childElementCount; i++){
                cardsToBeMoved.push(parent.children[i]);
            }

    let childern = parent.childNodes;
    let elementBefore;
    let elementBeforeClass;
        if(indexOfCard > 0 && indexOfCard < childern.length){
            elementBefore = childern[indexOfCard - 1];
            elementBeforeClass = elementBefore.className;
        } else {
            console.error('Invalid index');
        }

    let openSlot;

    if(cardValue == "K"){
        for(let i = 0; i < arrayOfTableSlots.length; i++){
            if(arrayOfTableSlots[i].childElementCount == 0){
                openSlot = arrayOfTableSlots[i];
                break;
            }
        }

        if(parentID == "wastepile-slot"){
            openSlot.appendChild(card);
            card.style.marginTop = "0px"
        }
        else if(parentID == "slot-1" || parentID == "slot-2" || parentID == "slot-3" || parentID == "slot-4" ||
        parentID == "slot-5" || parentID == "slot-6" || parentID == "slot-7"){
            if(cardsToBeMoved.length == 1){
                openSlot.appendChild(card);
                card.style.marginTop = "0px"
                flipLastCard(parent);
            }
            else if(cardsToBeMoved.length > 1){
                for(let i = 0; i < cardsToBeMoved.length; i++){
                        if(cardsToBeMoved.length == 1){
                            openSlot.appendChild(cardsToBeMoved[i]);
                            marginCards(openSlot);
                        }
                        else if(cardsToBeMoved.length > 1){
                            openSlot.appendChild(cardsToBeMoved[i]);
                            marginCards(openSlot);
                            //flipCards(cardsToBeMoved[cardsToBeMoved.length - 1]);
                        }
                    }
                    if(elementBeforeClass == "backOfCard"){
                        flipLastCard(parent);
                    }
            }
        }
        return true;

    }
    else{return false;}

}


function checkForAce(card){
    let cardDataValue = card.getAttribute('data-value');
    let cardDataValueArray = cardDataValue.split(" ");
    let cardValue = cardDataValueArray[0];
    let cardSuit = cardDataValueArray[1];
    let parent = card.parentNode;

    if(cardValue == "A"){
        if(cardSuit == '\u2666'){
            aceOfDiamondsSlot.appendChild(card);
            card.style.marginTop = "0px";
            flipCards(parent.lastChild);
        }
        else if(cardSuit == "\u2665"){
            aceOfHeartsSlot.appendChild(card);
            card.style.marginTop = "0px";
            flipCards(parent.lastChild);
        }
        else if(cardSuit == '\u2663'){
            aceOfClubsSlot.appendChild(card);
            card.style.marginTop = "0px";
            flipCards(parent.lastChild);
        }
        else if(cardSuit == "\u2660"){
            aceOfSpadesSlot.appendChild(card);
            card.style.marginTop = "0px";
            flipCards(parent.lastChild);
        }
        return true;
    }
    else {return false;}
}


function checkTableSlots(card){
    let cardDataValue = card.getAttribute('data-value');
    let cardDataValueArray = cardDataValue.split(" ");
    let cardValue = cardDataValueArray[0];
    let cardSuit = cardDataValueArray[1];
    let parent = card.parentNode;
    let parentID = parent.id;
    let arrayOfTableSlots = [slot1, slot2, slot3, slot4, slot5, slot6, slot7];
    let lastCard
    let lastCardDataValueArray
    let lastCardValue
    let lastCardSuit


    for(i=0; i<arrayOfTableSlots.length; i++){
        console.log(arrayOfTableSlots);
        if(arrayOfTableSlots[i].childElementCount == 0){
            continue;
        }
        else if(arrayOfTableSlots[i].childElementCount > 0){
            //get last card in each table slot
            lastCard = arrayOfTableSlots[i].lastChild;
            lastCardDataValueArray = lastCard.getAttribute('data-value').split(" ");
            lastCardValue = lastCardDataValueArray[0];
            lastCardSuit = lastCardDataValueArray[1];
        }

        checkValues(lastCardValue, cardValue);
        checkSuits(lastCardSuit, cardSuit);

        
        if(checkSuits(lastCardSuit, cardSuit) == true &&
        checkValues(lastCardValue, cardValue) == true) {

            //get the index of the card in the table slot parent
            //used to know if we will be moving more than one card
            let indexOfCard = Array.prototype.indexOf.call(card.parentNode.children, card);
            let cardsToBeMoved = [];
            //place the cards to be moved into an array for temporary storage
            for(let i = indexOfCard; i < parent.childElementCount; i++){
                cardsToBeMoved.push(parent.children[i]);
            }

            //gets card before indexed card, this is used when the card is in the middle of the pile
            //so that we can know which card to flip when the cards move from it
            let childern = parent.childNodes;
            let elementBefore;
            let elementBeforeClass;
            if(indexOfCard > 0 && indexOfCard < childern.length){
                elementBefore = childern[indexOfCard - 1];
                elementBeforeClass = elementBefore.className;
              } else {
                console.error('Invalid index');
            }


            //move the card to the identified slot
            if(parentID == "slot-1" || parentID == "slot-2" || parentID == "slot-3" || parentID == "slot-4" ||
            parentID == "slot-5" || parentID == "slot-6" || parentID == "slot-7"){
                for(let i = 0; i< cardsToBeMoved.length; i++){
                    if(cardsToBeMoved.length == 1){
                        lastCard.parentNode.appendChild(cardsToBeMoved[i]);
                        marginCards(lastCard.parentNode);
                    }
                    else if(cardsToBeMoved.length > 1){
                        lastCard.parentNode.appendChild(cardsToBeMoved[i]);
                        marginCards(lastCard.parentNode);
                        //flipCards(cardsToBeMoved[cardsToBeMoved.length - 1])
                    }
                }
                if(elementBeforeClass == "backOfCard" ){
                    flipLastCard(parent);
                }

            }
            else if(parentID == "wastepile-slot"){
                lastCard.parentNode.appendChild(card);
                marginCards(lastCard.parentNode);
            }
            else if(parentID == "aceOfHearts-slot" || parentID == "aceOfDiamonds-slot" || parentID == "aceOfClubs-slot"
            || parentID == "aceOfSpades-slot"){
                if(elementBeforeClass == "card"){
                    lastCard.parentNode.appendChild(card);
                    marginCards(lastCard.parentNode);
                }
                else if(elementBeforeClass == "backOfCard"){
                    lastCard.parentNode.appendChild(card);
                    marginCards(lastCard.parentNode);
                    flipLastCard(parent);   
                }
            }
            break;
        }
    }
}


function checkValues(lastCardValue, cardValue){
    if(lastCardValue - cardValue == 1 ||
        lastCardValue == "K" && cardValue == "Q" ||
        lastCardValue == "Q" && cardValue == "J" ||
        lastCardValue == "J" && cardValue == 10
        )
    {
        return true;
    }
    else{return false;}
}

function checkSuits(lastCardSuit, cardSuit){
    if(lastCardSuit == "\u2666" && cardSuit == "\u2663" ||
        lastCardSuit == "\u2665" && cardSuit == "\u2660" ||
        lastCardSuit == "\u2663" && cardSuit == "\u2666" ||
        lastCardSuit == "\u2660" && cardSuit == "\u2665" || 
        lastCardSuit == "\u2665" && cardSuit == "\u2663" ||
        lastCardSuit == "\u2666" && cardSuit == "\u2660" ||  
        lastCardSuit == "\u2660" && cardSuit == "\u2666" ||
        lastCardSuit == "\u2663" && cardSuit == "\u2665" )
    {
        return true
    }
    else{return false;}
}



function checkAceSlots(card){
    let cardDataValue = card.getAttribute('data-value');
    let cardDataValueArray = cardDataValue.split(" ");
    let cardValue = cardDataValueArray[0];
    let cardSuit = cardDataValueArray[1];
    let parent = card.parentNode;
    let parentID = parent.id;
    let arrayOfAceSlots = [aceOfHeartsSlot, aceOfDiamondsSlot, aceOfClubsSlot, aceOfSpadesSlot];
    let aceSlotCard
    let aceSlotCardDataValueArray
    let aceSlotCardValue
    let aceSlotCardSuit

    let childNodes = parent.childNodes;
    let secondLastChild = childNodes.length - 2;
    let cardFace;
    if(secondLastChild >= 0){
        let secondToLast = childNodes[secondLastChild];
        cardFace = secondToLast.className
    }

    for(i=0; i<arrayOfAceSlots.length; i++){
       if(arrayOfAceSlots[i].lastChild == null){
        continue;
       }
       aceSlotCard = arrayOfAceSlots[i].lastChild;
       aceSlotCardDataValueArray = aceSlotCard.getAttribute('data-value').split(" ");
       aceSlotCardValue = aceSlotCardDataValueArray[0];
       aceSlotCardSuit = aceSlotCardDataValueArray[1];

       if(checkAceValues(aceSlotCardValue, cardValue) == true &&
       checkAceSuits(aceSlotCardSuit, cardSuit) == true){
            aceSlotCard.parentNode.appendChild(card);
            card.style.marginTop = "0px"
            if(parentID == "slot-1" || parentID == "slot-2" || parentID == "slot-3" || parentID == "slot-4" ||
            parentID == "slot-5" || parentID == "slot-6" || parentID == "slot-7"){
                //flipLastCard(parent);
                if(cardFace == "card"){
                    aceSlotCard.parentNode.appendChild(card);
                }
                else if(cardFace == "backOfCard"){
                    aceSlotCard.parentNode.appendChild(card);
                    flipLastCard(parent);
                }
            }
            return true;
        }
    }
    return false;
}




function checkAceValues(aceCardValue, cardValue){
    if(cardValue - aceCardValue == 1 ||
        aceCardValue == "K" && cardValue == "Q" ||
        aceCardValue == "Q" && cardValue == "J" ||
        aceCardValue == "J" && cardValue == 10 ||
        aceCardValue == "A" && cardValue == 2 )
    {
        return true;
    }
    else{return false;}
}

function checkAceSuits(aceCardSuit, cardSuit){
    if(aceCardSuit == cardSuit)
    {
        return true;
    }
    else{return false;}
}

//flips cards 
function flipCards(cardDiv){
    let cardDataValue;
    let cardDataValueArray;
    let cardValue;
    let cardSuit;

    if(cardDiv.classList.contains("backOfCard")){
        cardDataValue = cardDiv.getAttribute('data-value');
        cardDataValueArray = cardDataValue.split(" ");
        cardValue = cardDataValueArray[0];
        cardSuit = cardDataValueArray[1];

        //values
        cardDiv.innerText = cardSuit;
        cardDiv.text = cardDataValue;
        cardDiv.dataset.value = cardDataValue;

        cardDiv.setAttribute('id', 'card');
        cardDiv.classList.add("card");
        cardDiv.classList.remove("backOfCard");
        //style
        getCardDivColor(cardDiv);
        cardDiv.style.backgroundColor = "white";

    }
    else if(!cardDiv.classList.contains("backOfCard")){
        cardDiv.innerText = "";
        cardDiv.text = "";
        cardDiv.style.color = "red";
        cardDiv.style.backgroundColor = "red";
        cardDiv.classList.add("backOfCard");
    }
}

function getCardDivColor(card){
    let cardSuit = card.innerText;
    if(cardSuit == '\u2666' || cardSuit == "\u2665"){
        card.style.color = "red";
    }
    else if(cardSuit == '\u2663' || cardSuit == "\u2660"){
        card.style.color = "black"
    }
}


function checkWinningConditions(){
    if(aceOfHeartsSlot.childElementCount == 12 && aceOfDiamondsSlot.childElementCount == 12
        && aceOfSpadesSlot.childElementCount == 12 && aceOfClubsSlot.childElementCount ==12 ){
            window.confirm("You won!");
            if(confirm("Press to start a new game")){
                location.reload();
            }
        }
    }
