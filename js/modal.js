// Get the modal
const modal = document.querySelector('.modal');

//Get performance message <div>.
const message = document.querySelector('.message');

// Get the <span> element that closes the modal.
const closeSpan = document.querySelector('.close');

// When the user clicks on <span> (x), close the modal.
closeSpan.onclick = function() {
    modal.classList.remove('modal-on');
}

// When the user clicks anywhere outside of the modal, close it.
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('modal-on');
    }
}
