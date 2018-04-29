const cardHolder = {

//Storing cards.
  items: [],
  add: function (item) {

    this.items.push(item);

  },

//Check matching...
  check: function (arr) {

    if (arr[this.items[0]] === arr[this.items[1]]) {
      return true;
    }else{
      return false;
    }
  },

//Clearing...
  erase: function () {

    this.items.splice(0, this.items.length)

  },

//If the cards do match...
  match: function () {

    this.items.forEach(function (v) {

      document.getElementById(v).classList.add('match');

    });
  },

//If the cards do not match...
  notMatch: function () {

    this.items.forEach(function (v) {

//Keep time before cards turn back. Decrease for harder and increase for easier gameplay.
      setTimeout(function () {
        document.getElementById(v).classList.add('close');
        document.getElementById(v).classList.remove('open', 'show');

//Time to turn the card back.
        setTimeout(function() {
          document.getElementById(v).classList.remove('close');
        }, 300);
      }, 1000);

    });
  }
}

//Store matchings...
const hits = {
  clicks: 0,
  click: function () {

    hits.clicks += 1;
    document.querySelector('.moves').textContent = hits.clicks;

  },
  items: [],
  add: function (hit) {

    hit.forEach(function (v) {

      hits.items.push(v);

    });
  }
}

/*
 * Create a list that holds all of your cards
 */

 const cards = ['fa-anchor', 'fa-anchor',
               'fa-bicycle', 'fa-bicycle',
               'fa-bolt', 'fa-bolt',
               'fa-bomb', 'fa-bomb',
               'fa-cube', 'fa-cube',
               'fa-diamond', 'fa-diamond',
               'fa-leaf', 'fa-leaf',
               'fa-paper-plane-o', 'fa-paper-plane-o'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Shuffle the list of cards using the provided "shuffle" method below...
 const mixedCards = shuffle(cards);
 const cardsDeck = document.querySelector('.deck');

//Loop through and add each...
 function addCards () {

//Create a "fragment" document for faster running.
   const fragment = document.createDocumentFragment();

   for (let i = 0; i < 16; i++) {

//Create "li" items and add initial classes to them.
       const newElement = document.createElement('li');
       newElement.classList.add('card',/* 'open', 'show',*/ 'fa', mixedCards[i]);
       newElement.setAttribute('id', i);

//Add to fragment...
       fragment.appendChild(newElement);

     }

//Fragment document go to live.
     cardsDeck.appendChild(fragment);

 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Performance with Stars.
function stars(num) {

  const is = document.querySelectorAll('.fa-star');

  if (num > 20) {
    is[2].classList.remove('star-on');
  }

  if (num > 30) {
    is[1].classList.remove('star-on');
  }

  if (num > 40) {
    is[0].classList.remove('star-on');
  }
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 cardsDeck.addEventListener('click', function (event) {

   let result;

//Verifies target is desired element...
   if (event.target.nodeName === 'LI' && hits.items.includes(event.target.getAttribute('id')) === false && cardHolder.items.includes(event.target.getAttribute('id')) === false) {

//Count clicking.
  hits.click();
  stars(hits.clicks);



//If clicked max 2 cards.
     if (cardHolder.items.length < 2) {

//Store selected card's number.
       cardHolder.add(event.target.getAttribute('id'));

//Display.
       event.target.classList.add('open', 'show');

     }

//If has 2 clicked cards...
     if (cardHolder.items.length === 2) {

//Check matching...
       result = cardHolder.check(mixedCards);

//If matched...
       if (result === true) {

//Store matched cards.
         hits.add(cardHolder.items);

//Card's animations.
         cardHolder.match();

//Clear clicked cards.
         cardHolder.erase();

//All card matched.
         if (hits.items.length === 16) {

//Winner popup message and open...
           message.textContent = 'Your time is ' + document.querySelector('#timer').textContent + ' with ' + hits.clicks + ' Moves and ' + document.querySelectorAll('.star-on').length + (document.querySelectorAll('.star-on').length > 1 ? ' Stars.' : ' Star.');
           modal.classList.add('modal-on');

//Stop timer.
           stopTimer();
         }

//If not matched...
       }else{

//Card's animations.
         cardHolder.notMatch();

//Clear clicked cards.
         cardHolder.erase();

       }
     }
   }
 });

//Reset page.
document.querySelector('.fa-repeat').addEventListener('click', function () {

  location.reload();

});

//Winner modal Start New Game.
document.querySelector('.new-game').addEventListener('click', function () {

  location.reload();

});

//Add cards to Deck.
addCards();
