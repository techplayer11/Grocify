// DOM elements selection
let shoppingCart = document.querySelector('.shopping-cart');
let searchForm = document.querySelector('.search-form');
let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');


// event listeners for buttons
document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');

    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
};

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');

    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
};

document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');

    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
};

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');

    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
};


//Closing form when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-form') && !e.target.closest('#search-btn')) {
        searchForm.classList.remove('active');
    }
    if (!e.target.closest('.shopping-cart') && !e.target.closest('#cart-btn')) {
        shoppingCart.classList.remove('active');
    }
    if (!e.target.closest('.login-form') && !e.target.closest('#login-btn')) {
        loginForm.classList.remove('active');
    }
    if (!e.target.closest('.navbar') && !e.target.closest('#menu-btn')) {
      navbar.classList.remove('active');
  }
  });  

  
// Login form submission
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload
    // alert('Form submitted successfully!');
    const email = document.querySelector('.login-form input[type="email"]').value;
    localStorage.setItem('loggedInUser', email);
    showToast("Logged in successfully!");
    loginForm.classList.remove('active');
    updateUserDisplay();

});


// Back to top button
let topBtn = document.createElement('div');
topBtn.innerHTML = '↑';