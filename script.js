// DOM elements selection
let shoppingCart = document.querySelector('.shopping-cart');
let searchForm = document.querySelector('.search-form');
let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');
let cartCount = 0;

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


function updateCartCount() {
  const badge = document.querySelector('#cart-btn .badge');
  if (badge) {
    badge.textContent = cartCount;
  }
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
    z-index: 1000;
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function addItemToCart(itemName, price, imgSrc) {
  // Create a new cart item
  const box = document.createElement('div');
  box.className = 'box';
  
  box.innerHTML = `
    <i class="fa fa-trash"></i>
    <img src="${imgSrc}" height="100" width="100">
    <div class="content">
      <h3>${itemName}</h3>
      <span class="Price">${price}</span>
      <span class="Quan">1</span>
    </div>
  `;
  
  // Add event listener to the trash icon
  box.querySelector('.fa-trash').addEventListener('click', function() {
    if (confirm('Remove this item from the cart?')) {
      box.remove();
      cartCount--;
      updateCartCount();
      updateCartTotal();
      showToast('Item removed from cart!');
    }
  });
  
  // Add the item to the cart
  const cartContainer = document.querySelector('.shopping-cart');
  // Insert before the total and checkout button
  const totalDiv = document.querySelector('.shopping-cart .total');
  cartContainer.insertBefore(box, totalDiv);
  
  cartCount++;
  updateCartCount();
  updateCartTotal();
  showToast(`${itemName} added to cart!`);
}

function updateCartTotal() {
  // Calculate total price from all items in cart
  let total = 0;
  document.querySelectorAll('.shopping-cart .box .Price').forEach(priceElement => {
    const priceText = priceElement.textContent;
    const price = parseFloat(priceText.replace('RS.', '').replace('Rs.', '').replace('/-', ''));
    if (!isNaN(price)) {
      total += price;
    }
  });
  
  const totalDiv = document.querySelector('.shopping-cart .total');
  if (totalDiv) {
    totalDiv.textContent = `Total: RS.${total}/-`;
  }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add badge to cart button if not exists
  const cartBtn = document.querySelector('#cart-btn');
  if (cartBtn && !cartBtn.querySelector('.badge')) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = '0';
    cartBtn.appendChild(badge);
    
    // Add necessary CSS for badge
    const style = document.createElement('style');
    style.textContent = `
      .badge {
        position: absolute;
        top: -10px;
        right: -10px;
        background: red;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-family: Arial, sans-serif;
      }
      
      #cart-btn {
        position: relative;
      }
    `;
    document.head.appendChild(style);
  }

  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('Add to Cart')) {
      btn.addEventListener('click', function(e) {
        // Prevent default action (scrolling to top)
        e.preventDefault();
        e.stopPropagation(); // Added to stop event bubbling
        
        const productBox = this.closest('.box');
        if (productBox) {
          const itemName = productBox.querySelector('h1').textContent;
          const price = productBox.querySelector('.price').textContent;
          const imgSrc = productBox.querySelector('img').src;
          addItemToCart(itemName, price, imgSrc);
        }
        return false; // Added to ensure the link action is canceled
      });
    }
  });

  // Prevent default behavior for all shopping action links
  document.querySelectorAll('a.btn').forEach(link => {
    if (link.textContent.includes('Add to Cart') || 
        link.textContent.includes('Shop now') || 
        link.textContent.includes('Checkout')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Added to stop event bubbling
        return false; // Added to ensure the link action is canceled
      });
    }
  });

  // Event listeners for existing cart item removal
  document.querySelectorAll('.shopping-cart .fa-trash').forEach(btn => {
    btn.addEventListener('click', function() {
      if (confirm('Remove this item from the cart?')) {
        this.closest('.box').remove();
        cartCount = Math.max(0, cartCount - 1);
        updateCartCount();
        updateCartTotal();
        showToast('Item removed from cart!');
      }
    });
  });

  // Initialize cart count based on existing items
  cartCount = document.querySelectorAll('.shopping-cart .box').length;
  updateCartCount();
  updateCartTotal();
  
  // Initialize user display
  updateUserDisplay();
});

// Additional event listener to make sure "Add to Cart" works even after page is fully loaded
window.addEventListener('load', function() {
  document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('Add to Cart')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const productBox = this.closest('.box');
        if (productBox) {
          const itemName = productBox.querySelector('h1').textContent;
          const price = productBox.querySelector('.price').textContent;
          const imgSrc = productBox.querySelector('img').src;
          addItemToCart(itemName, price, imgSrc);
        }
        return false;
      });
    }
  });
});