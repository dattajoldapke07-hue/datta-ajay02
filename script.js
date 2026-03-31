// --- Products ---
const products = [
  {id:1, name:"T-Shirt", price:500, image:"https://www.freeiconspng.com/uploads/blank-t-shirt-png-16.jpg"},
  {id:2, name:"Shoes", price:1500, image:"https://www.pngall.com/wp-content/uploads/5/Men-Shoes-PNG-Image-File.png"},
  {id:3, name:"Watch", price:2000, image:"https://i.postimg.cc/66k6BKX7/1805QM04-1.jpg"},
  {id:4, name:"Backpack", price:800, image:"https://images.unsplash.com/photo-1509762774605-f07235a08f1f"},
  {id:5, name:"Premium Cotton Brown Shirt", price:699, image:"https://i.postimg.cc/mD7ZKp5t/IMG-20260228-WA0050.jpg"},
  {id:6, name:"Round Sunglass", price:450, image:"https://i.postimg.cc/9FKSqXMf/IMG-20260228-WA0071.jpg"},
  {id:7, name:"White Shirt", price:299, image:"https://i.postimg.cc/L5bHPdY2/IMG-20260328-WA0044.jpg"},
  {id:8, name:"Silk Saree", price:1499, image:"https://i.postimg.cc/jqGQHDzF/IMG-20260325-WA0001.jpg"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = [];

// --- Load Products ---
function loadProducts(){
  const container = document.getElementById("products");
  container.innerHTML="";
  products.forEach(p=>{
    const div=document.createElement("div");
    div.classList.add("product");
    div.innerHTML=`
      <img src="${p.image}" width="150">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="addToWishlist(${p.id})">❤️ Wishlist</button>
    `;
    container.appendChild(div);
  });
}

// --- Cart ---
function addToCart(id){
  const product = products.find(p=>p.id===id);
  let existing = cart.find(i=>i.id===id);
  if(existing){ existing.qty = (existing.qty||1)+1; }
  else{ product.qty=1; cart.push(product); }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}

function updateCartCount(){
  document.getElementById("cart-count").innerText = cart.length;
}

function viewCart(){
  const modal = document.getElementById("cart-modal");
  const items = document.getElementById("cart-items");
  const total = document.getElementById("total");
  items.innerHTML=""; let sum=0;
  cart.forEach(item=>{
    const li=document.createElement("li");
    li.innerHTML=`${item.name} - ₹${item.price} x ${item.qty} <button onclick="removeItem(${item.id})">❌</button>`;
    items.appendChild(li);
    sum+=item.price*item.qty;
  });
  total.innerText=sum;
  modal.classList.remove("hidden");
}

function removeItem(id){
  cart = cart.filter(i=>i.id!==id);
  localStorage.setItem("cart", JSON.stringify(cart));
  viewCart();
  updateCartCount();
}

function closeCart(){ document.getElementById("cart-modal").classList.add("hidden"); }

// --- Wishlist ---
function addToWishlist(id){
  const product = products.find(p=>p.id===id);
  if(!wishlist.includes(product)) wishlist.push(product);
  alert("Added to Wishlist!");
}

function viewWishlist(){
  const modal = document.getElementById("wishlist-modal");
  const list = document.getElementById("wishlist-items");
  list.innerHTML="";
  wishlist.forEach(item=>{
    const li=document.createElement("li");
    li.innerHTML=`${item.name} - ₹${item.price} 
      <button onclick="addToCart(${item.id})">Add to Cart</button>
      <button onclick="removeFromWishlist(${item.id})">❌</button>`;
    list.appendChild(li);
  });
  modal.classList.remove("hidden");
}

function removeFromWishlist(id){
  wishlist = wishlist.filter(i=>i.id!==id);
  viewWishlist();
}

// --- Checkout ---
function checkout(){ alert("Redirecting to payment page..."); }
