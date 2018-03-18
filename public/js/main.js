
function showMenu() {
  const x = document.getElementById('dropdown-menu');

  if (x.style.display === "none" || x.style.display === '') {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

function showCommentForm() {
  const commForm = document.getElementById('comment-form');

  if (commForm.style.display === "none" || commForm.style.display === '') {
    commForm.style.display = "block";
  } else {
    commForm.style.display = "none";
  }
}

$(function() {
    if ((location.pathname.split("/")[1]) !== ""){
        $('nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
    }
    else {
    $('nav li.home-link a').addClass('active');
    }
});


function addInput() {
  $('#ingredientsAdd').append('<input class="form-control" id="ingredients" type="text" name="ingredients">');
}


// Get modal element
const recipeModal = document.getElementById('recipeModal');

// Get open modal button
const recipeModalBtn = document.getElementById('recipeModalBtn');

// Get close button
const closeBtnRecipe = document.getElementsByClassName('closeBtnRecipe')[0];


// Listen for open click
// recipeModalBtn.addEventListener('click', openModalRecipe);

// Listen for close click
// closeBtnRecipe.addEventListener('click', closeModalRecipe);
// Listen for outside click
window.addEventListener('click', recipeOutsideClick);


// Function to open modal
function openModalRecipe(){
  recipeModal.style.display = 'block';
}


// Function to close modal
function closeModalRecipe(){
  recipeModal.style.display = 'none';
}

// Function to close modal if outside click
function recipeOutsideClick(e){
  if(e.target == recipeModal){
    recipeModal.style.display = 'none';
  }
}

function closeAlert() {
  document.getElementsByClassName("alert")[0].style.display = "none";
};
