let counter = 0;

function timer () {

//Remove starter.
  document.querySelector('.container').removeEventListener('click', timer);

// Set the date we're counting down to.
  const startDate = new Date().getTime();

// Update the count down every 1 second.
  counter = setInterval (function() {

// Get todays date and time.
    const now = new Date().getTime();

// Find the elapsedTime between now an the count down date.
    const elapsedTime = now - startDate;

// Time calculations for days, hours, minutes and seconds.
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)) > 9 ? Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)) : '0' + Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000) > 9 ? Math.floor((elapsedTime % (1000 * 60)) / 1000) : '0' + Math.floor((elapsedTime % (1000 * 60)) / 1000);

// Display the result in the element with id="timer".
    document.getElementById("timer").innerHTML = minutes  + ':' + seconds;

  }, 1000);
}

//Timer pause.
function stopTimer () {

  clearInterval(counter);

}

//Start with click.
document.querySelector('.container').addEventListener('click', timer);
