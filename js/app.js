const cardHolder = {
  items: [],
  add: function (item) {

    this.items.push(item);

  },
  check: function (arr) {

    if (arr[this.items[0]] === arr[this.items[1]]) {
      return true;
    }else{
      return false;
    }
  },
  erase: function () {

    this.items.splice(0, this.items.length)

  }
};

const hits = {
  items: [],
  add: function (hit) {

    hit.forEach(function (v) {

      hits.items.push(v);

    });
  }
};

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

 const mixedCards = shuffle(cards);
 const cardsDeck = document.querySelector('.deck');

 function addCards () {

 //Create a "fragment" document for faster running.

   const fragment = document.createDocumentFragment();

   for (let i = 0; i < 16; i++) {

 //Create "li" items and add initial classes to them.

       const newElement = document.createElement('li');
       newElement.classList.add('card',/* 'open', 'show',*/ 'fa', mixedCards[i]);
       newElement.setAttribute('id', i);

 //Create "i" items and add classes to them.
/*
       const newElementI = document.createElement('i');
       newElementI.classList.add('fa', mixedCards[i]);
*/
 //New item add to fragment document.

       //newElement.appendChild(newElementI);
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

   if (event.target.nodeName === 'LI' && hits.items.includes(event.target.getAttribute('id')) === false) {  // ← verifies target is desired element

     event.target.classList.add('open', 'show');

     if (cardHolder.items.length < 2) {

       cardHolder.add(event.target.getAttribute('id'));
       console.log(event.target.getAttribute('id'));

     };

     if (cardHolder.items.length === 2) {
       result = cardHolder.check(mixedCards);
       if (result === true) {
         hits.add(cardHolder.items)
         document.getElementById(cardHolder.items[0]).classList.add('match');
         document.getElementById(cardHolder.items[1]).classList.add('match');
         cardHolder.erase();
         console.log('True');
       }else{
         setTimeout(function () {
           document.getElementById(cardHolder.items[0]).classList.remove('open', 'show');
           document.getElementById(cardHolder.items[1]).classList.remove('open', 'show');
           cardHolder.erase();
           console.log('False');
         }, 1000);

       };
     };
     //console.log(event.target.classList);
   }
 });

addCards();
