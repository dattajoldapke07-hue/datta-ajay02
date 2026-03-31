const products = [
  { id: 1, name: "T-Shirt", price: 500, image: "https://www.freeiconspng.com/uploads/blank-t-shirt-png-16.jpg" },
  { id: 2, name: "Shoes", price: 1500, image: "https://www.pngall.com/wp-content/uploads/5/Men-Shoes-PNG-Image-File.png" },
  { id: 3, name: "Watch", price: 2000, image: "https://i.postimg.cc/66k6BKX7/1805QM04-1.jpg" },
  { id: 4, name: "Backpack", price: 800, image: "https://images.unsplash.com/photo-1509762774605-f07235a08f1f" },
  { id: 5, name: "Premium Cotton Brown Shirt", price: 699, image:"https://i.postimg.cc/mD7ZKp5t/IMG-20260228-WA0050.jpg" },
  { id: 6, name: "Round Sunglass", price: 450, image:"https://i.postimg.cc/9FKSqXMf/IMG-20260228-WA0071.jpg"},
  { id: 7, name: "White Shirt", price: 299, image:"https://i.postimg.cc/L5bHPdY2/IMG-20260328-WA0044.jpg"},
  { id: 8, name: "Silk Saree", price: 1499, image: "https://i.postimg.cc/jqGQHDzF/IMG-20260325-WA0001.jpg"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* HOME PRODUCTS */
function loadProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <div onclick="openProduct(${p.id})">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
      </div>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="addToWishlist(${p.id})">❤️</button>
    `;

    container.appendChild(div);
  });
}

/* PRODUCT PAGE */
function openProduct(id){
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
}

function loadSingleProduct(){
  const box = document.getElementById("product-detail");
  if (!box) return;

  const id = localStorage.getItem("selectedProduct");
  const p = products.find(x => x.id == id);

  box.innerHTML = `
    <h2>${p.name}</h2>
    <img src="${p.image}" width="200">
    <p>₹${p.price}</p>
    <button onclick="addToCart(${p.id})">Add to Cart</button>
  `;
}

/* CART */
function addToCart(id) {
  const p = products.find(x => x.id === id);
  let item = cart.find(i => i.id === id);

  if (item) item.qty++;
  else cart.push({...p, qty:1});

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function viewCartPage(){
  const items = document.getElementById("cart-items");
  const totalBox = document.getElementById("total");

  items.innerHTML = "";
  let total = 0;

  cart.forEach(i => {
    total += i.price * i.qty;

    items.innerHTML += `
      <div class="product">
        <img src="${i.image}">
        <h3>${i.name}</h3>
        <p>₹${i.price} x ${i.qty}</p>

        <button onclick="removeItem(${i.id})">Remove</button>
      </div>
    `;
  });

  totalBox.innerText = total;
}

function updateCartCount(){
  let el = document.getElementById("cart-count");
  if(el) el.innerText = cart.length;
}

/* WISHLIST */
function addToWishlist(id){
  const p = products.find(x => x.id === id);
  if(!wishlist.find(i=>i.id===id)) wishlist.push(p);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function viewWishlistPage(){
  const list = document.getElementById("wishlist-items");
  list.innerHTML = "";

  wishlist.forEach(i => {
    list.innerHTML += `
      <div class="product">
        <img src="${i.image}">
        <h3>${i.name}</h3>
        <p>₹${i.price}</p>

        <button onclick="addFromWishlist(${i.id})">Add to Cart</button>
        <button onclick="removeFromWishlist(${i.id})">Remove</button>
      </div>
    `;
  });
}

/* SEARCH */
function searchProduct(){
  const val = document.getElementById("search").value.toLowerCase();
  const container = document.getElementById("products");

  container.innerHTML = "";

  products.filter(p=>p.name.toLowerCase().includes(val))
  .forEach(p=>{
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
      </div>
    `;
  });
}

/* DARK MODE */
function toggleDark(){
  document.body.classList.toggle("dark");
}

/* INIT */
loadProducts();
updateCartCount();
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});
function navigate(page){
  document.body.classList.remove("loaded");
  setTimeout(()=>{
    window.location.href = page;
  }, 300);
}
function addFromWishlist(id){
  const product = wishlist.find(i => i.id === id);

  let item = cart.find(i => i.id === id);

  if(item){
    item.qty++;
  } else {
    cart.push({...product, qty:1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to Cart");
}
function removeFromWishlist(id){
  wishlist = wishlist.filter(i => i.id !== id);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  viewWishlistPage();
}
function placeOrder(){
  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  window.location.href = "payment.html";
}
function loadOrders() {
  const ordersDiv = document.getElementById("orders");
  ordersDiv.innerHTML = ""; // clear pehle

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.forEach(order => {
    ordersDiv.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px; border-radius:10px;">
        <h4>Order ID: ${order.id}</h4>
        <p>Date & Time: ${order.date}</p>
        <p>Total: ₹${order.total}</p>
        ${order.items.map(item => `<p>${item.name} x ${item.qty} = ₹${item.price*item.qty}</p>`).join("")}
      </div>
    `;
  });
}
