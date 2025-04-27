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