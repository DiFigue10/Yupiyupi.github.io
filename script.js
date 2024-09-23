// Variables
let cart = [];
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCartButton = document.getElementById('close-cart');
const checkoutButton = document.getElementById('checkout');

// Agregar productos al carrito con tallas, colores y cantidad
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productElement = button.parentElement;
    const product = button.getAttribute('data-product');
    const price = parseFloat(button.getAttribute('data-price'));
    const size = productElement.querySelector('.size').value;
    const color = productElement.querySelector('.color').value;
    let quantity = parseInt(productElement.querySelector('.quantity').textContent);
    let stock = parseInt(productElement.getAttribute('data-stock'));

    if (quantity <= stock) {
      cart.push({ product, price, size, color, quantity });
      updateCart();
    } else {
      productElement.querySelector('.stock-status').textContent = 'Sold out';
    }
  });
});

// Controlar cantidad con "+" y "-"
document.querySelectorAll('.plus').forEach(button => {
  button.addEventListener('click', () => {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let currentQuantity = parseInt(quantityElement.textContent);
    const productElement = button.closest('.product');
    let stock = parseInt(productElement.getAttribute('data-stock'));

    if (currentQuantity < stock) {
      quantityElement.textContent = currentQuantity + 1;
    }
  });
});

document.querySelectorAll('.minus').forEach(button => {
  button.addEventListener('click', () => {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
      quantityElement.textContent = currentQuantity - 1;
    }
  });
});

// Actualizar carrito
function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = '';
  
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.product} (Talla: ${item.size}, Color: ${item.color}) - $${item.price} x${item.quantity} <button class="remove-item">Eliminar</button>`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
    
    li.querySelector('.remove-item').addEventListener('click', () => {
      removeItemFromCart(item);
    });
  });
  
  cartTotal.textContent = total.toFixed(2);
}

// Eliminar productos del carrito
function removeItemFromCart(itemToRemove) {
  cart = cart.filter(item => item !== itemToRemove);
  updateCart();
}

// Abrir y cerrar modal de carrito
cartButton.addEventListener('click', () => {
  cartModal.classList.add('active');
});

closeCartButton.addEventListener('click', () => {
  cartModal.classList.remove('active');
});

// Acción de pago
checkoutButton.addEventListener('click', () => {
  if (cart.length > 0) {
    cartModal.classList.remove('active');
    paymentModal.classList.add('active');
  } else {
    alert('El carrito está vacío.');
  }
});

// Variables del modal de pago
const paymentModal = document.getElementById('payment-modal');
const paymentForm = document.getElementById('payment-form');
const cancelPaymentButton = document.getElementById('cancel-payment');

// Procesar pago simulado
paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const cardNumber = document.getElementById('card-number').value;
  const expiry = document.getElementById('expiry').value;
  const cvv = document.getElementById('cvv').value;

  if (name && cardNumber && expiry && cvv) {
    alert('Pago procesado exitosamente. ¡Gracias por tu compra!');
    cart = [];
    updateCart();
    paymentModal.classList.remove('active');
  } else {
    alert('Por favor, complete toda la información de pago.');
  }
});

// Cancelar pago
cancelPaymentButton.addEventListener('click', () => {
  paymentModal.classList.remove('active');
});
