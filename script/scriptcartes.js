
const playground = document.querySelector('.playground');
const recto_activeCard = document.getElementById('recto_activeCard');
const verso_activeCard = document.querySelector('.verso_activeCard');



const playground_card = document.querySelector('.card');


console.log('click');

recto_activeCard.onClick = () => {
        console.log('click');
        recto_activeCard.className ="card recto_activeCard hide";
        verso_activeCard.className ="card verso_activeCard show";
 };

verso_activeCard.onClick = () => {
        recto_activeCard.className ="card recto_activeCard show";
        verso_activeCard.className ="card verso_activeCard hide";

 };



// Get the button, and when the user clicks on it, execute myFunction
document.getElementById("myBtn").onclick = function() {myFunction()};

/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
};
