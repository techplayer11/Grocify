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

topBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 20px;
  background: var(--green);
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 999;
  display: none;
`;
document.body.appendChild(topBtn);

topBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
});


// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Change button text/icon dynamically
  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    darkModeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

// Load theme from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light Mode";
  }
});


// Cart count update
let cartCount = 0;
function updateCartCount() {
  const badge = document.querySelector('#cart-btn .badge');
  badge.textContent = cartCount--;
}


//Toast notification
function showToast(message) {
  let toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: green;
    color: white;
    padding: 10px;
    border-radius: 5px;
    opacity: 0.9;
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}


// item added to cart
document.querySelector("#cart-btn").addEventListener("click", () => {
  showToast("Item added to cart!");
});


//Item removal from cart
document.querySelectorAll('.shopping-cart .fa-trash').forEach(btn => {
  btn.addEventListener('click', () => {
      if (confirm('Remove this item from the cart?')) {
          btn.parentElement.remove();
          cartCount = Math.max(0, cartCount - 1);
          updateCartCount();
          showToast('Item removed from cart!');
      }
  });
});