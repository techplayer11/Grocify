document.addEventListener('DOMContentLoaded', function() {
  let shoppingCart = document.querySelector('.shopping-cart');
  let searchForm = document.querySelector('.search-form');
  let loginForm = document.querySelector('.login-form');
  let navbar = document.querySelector('.navbar');
  let cartCount = document.querySelectorAll('.shopping-cart .box').length;
  
  // Initialize the cart count badge
  updateCartCount();
  updateCartTotal();
  
  // Button click handlers
  document.querySelector('#cart-btn').onclick = (e) => {
    e.preventDefault();
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
  };
  
  document.querySelector('#search-btn').onclick = (e) => {
    e.preventDefault();
    searchForm.classList.toggle('active');
    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
  };
  
  document.querySelector('#login-btn').onclick = (e) => {
    e.preventDefault();
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
  };
  
  document.querySelector('#menu-btn').onclick = (e) => {
    e.preventDefault();
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
  };
  
  // Close dropdown menus when clicking outside
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
  
  // Handle login form submission
  document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload
    const email = document.querySelector('.login-form input[type="email"]').value;
    localStorage.setItem('loggedInUser', email);
    showToast("Logged in successfully!");
    loginForm.classList.remove('active');
    updateUserDisplay();
  });
  
  // Add "back to top" button
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
  if (darkModeToggle) {
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
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      darkModeToggle.textContent = "☀️ Light Mode";
    }
  }
  
  // Function to update cart count badge
  function updateCartCount() {
    const badge = document.querySelector('#cart-btn .badge');
    if (badge) {
      badge.textContent = cartCount;
    }
  }
  
  // Toast notification function
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
  
  // Function to add item to cart
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
    
    // Find the total element to insert before
    const cartContainer = document.querySelector('.shopping-cart');
    const totalDiv = document.querySelector('.shopping-cart .total');
    
    if (totalDiv) {
      cartContainer.insertBefore(box, totalDiv);
    } else {
      // If total div doesn't exist, just append to the cart
      cartContainer.appendChild(box);
    }
    
    cartCount++;
    updateCartCount();
    updateCartTotal();
    showToast(`${itemName} added to cart!`);
  }
  
  // Function to update cart total
  function updateCartTotal() {
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
    } else {
      // Create total div if it doesn't exist
      const newTotalDiv = document.createElement('div');
      newTotalDiv.className = 'total';
      newTotalDiv.textContent = `Total: RS.${total}/-`;
      
      const cartContainer = document.querySelector('.shopping-cart');
      const checkoutBtn = document.querySelector('.shopping-cart .btn');
      
      if (checkoutBtn) {
        cartContainer.insertBefore(newTotalDiv, checkoutBtn);
      } else {
        cartContainer.appendChild(newTotalDiv);
        
        // Add checkout button if it doesn't exist
        const checkoutBtn = document.createElement('a');
        checkoutBtn.href = '#';
        checkoutBtn.className = 'btn';
        checkoutBtn.textContent = 'Checkout';
        cartContainer.appendChild(checkoutBtn);
      }
    }
  }
  
  // Update user display function
  function updateUserDisplay() {
    const email = localStorage.getItem('loggedInUser');
    if (email) {
      const loginBtn = document.querySelector('#login-btn');
      if (loginBtn) {
        loginBtn.innerHTML = '<i class="fa fa-user"></i>';
        loginBtn.title = `Logged in as: ${email}`;
      }
    }
  }
  
  // Fix for the Add to Cart buttons
  // This needs to be outside the DOMContentLoaded event to make sure it runs after all elements are loaded
  
  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('Add to Cart')) {
      btn.addEventListener('click', function(e) {
        // Prevent default action (scrolling to top)
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
  
  // Prevent default behavior for all shopping action links
  document.querySelectorAll('a.btn').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.textContent.includes('Add to Cart') || 
          this.textContent.includes('Shop now') || 
          this.textContent.includes('Checkout')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  });
  
  // Set up event listeners for trash icons in existing cart items
  document.querySelectorAll('.shopping-cart .fa-trash').forEach(trashIcon => {
    trashIcon.addEventListener('click', function() {
      if (confirm('Remove this item from the cart?')) {
        this.closest('.box').remove();
        cartCount = Math.max(0, cartCount - 1);
        updateCartCount();
        updateCartTotal();
        showToast('Item removed from cart!');
      }
    });
  });
  
  // Initialize user display
  updateUserDisplay();
});