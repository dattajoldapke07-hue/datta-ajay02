// Products
const products = [
  {id:1,name:"T-Shirt",price:500,image:"https://www.freeiconspng.com/uploads/blank-t-shirt-png-16.jpg"},
  {id:2,name:"Shoes",price:1500,image:"https://www.pngall.com/wp-content/uploads/5/Men-Shoes-PNG-Image-File.png"},
  {id:3,name:"Watch",price:2000,image:"https://i.postimg.cc/66k6BKX7/1805QM04-1.jpg"},
  {id:4,name:"Backpack",price:800,image:"https://images.unsplash.com/photo-1509762774605-f07235a08f1f"},
  {id:5,name:"Premium Cotton Brown Shirt",price:699,image:"https://i.postimg.cc/mD7ZKp5t/IMG-20260228-WA0050.jpg"},
  {id:6,name:"Round Sunglass",price:450,image:"https://i.postimg.cc/9FKSqXMf/IMG-20260228-WA0071.jpg"},
  {id:7,name:"White Shirt",price:299,image:"https://i.postimg.cc/L5bHPdY2/IMG-20260328-WA0044.jpg"},
  {id:8,name:"Silk Saree",price:1499,image:"https://i.postimg.cc/jqGQHDzF/IMG-20260325-WA0001.jpg"}
];

let cart = JSON.parse(localStorage.getItem("cart"))||[];
let wishlist = JSON.parse(localStorage.getItem("wishlist"))||[];

// --- LOGIN ---
function login(){
  const u=document.getElementById("username").value.trim();
  const p=document.getElementById("password").value.trim();
  const e=document.getElementById("login-error");
  if(u==="admin" && p==="1234"){
    localStorage.setItem("loggedInUser",u);
    document.getElementById("login-overlay").style.display="none";
    showMainContent();
  } else e.style.display="block";
}

document.addEventListener("DOMContentLoaded",function(){
  if(localStorage.getItem("loggedInUser")){
    document.getElementById("login-overlay")?.style.display="none";
    showMainContent();
  }
});

// Main page functions
function showMainContent(){
  document.getElementById("main-header")?.classList.remove("hidden");
  const container=document.getElementById("products");
  if(container){
    container.classList.remove("hidden");
    container.innerHTML="";
    products.forEach(p=>{
      const div=document.createElement("div");
      div.className="product";
      div.onclick=()=>{ localStorage.setItem("productDetail",JSON.stringify(p)); window.location.href="product.html"; };
      div.innerHTML=`<img src="${p.image}"><h3>${p.name}</h3><p>₹${p.price}</p>
      <button onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
      <button onclick="event.stopPropagation(); addToWishlist(${p.id})">❤️</button>`;
      container.appendChild(div);
    });
    updateCartCount();
  }
}

// Cart functions
function addToCart(id){
  const p=products.find(x=>x.id===id);
  let e=cart.find(x=>x.id===id);
  if(e)e.qty=(e.qty||1)+1;
  else{ p.qty=1; cart.push(p); }
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}
function updateCartCount(){
  const el=document.getElementById("cart-count");
  if(el) el.innerText=cart.length;
}
function checkout(){ window.location.href="cart.html"; }

// Wishlist
function addToWishlist(id){
  const p=products.find(x=>x.id===id);
  if(!wishlist.find(x=>x.id===id)) wishlist.push(p);
  localStorage.setItem("wishlist",JSON.stringify(wishlist));
  alert("Added to Wishlist!");
}

// Load Cart Page
function loadCartPage(){
  const section=document.getElementById("cart-items-section");
  if(!section) return;
  section.innerHTML="";
  let total=0;
  cart.forEach(item=>{
    const div=document.createElement("div");
    div.innerHTML=`<img src="${item.image}" width="50"> ${item.name} - ₹${item.price} x ${item.qty}`;
    section.appendChild(div);
    total+=item.price*item.qty;
  });
  document.getElementById("total").innerText=total;
}

// Load Wishlist Page
function loadWishlistPage(){
  const section=document.getElementById("wishlist-items-section");
  if(!section) return;
  section.innerHTML="";
  wishlist.forEach(item=>{
    const div=document.createElement("div");
    div.innerHTML=`<img src="${item.image}" width="50"> ${item.name} - ₹${item.price} 
    <button onclick="addToCart(${item.id})">Add to Cart</button>`;
    section.appendChild(div);
  });
}

// Product Detail Page
function loadSingleProduct(){
  const detail=document.getElementById("product-detail");
  const p=JSON.parse(localStorage.getItem("productDetail")||"{}");
  if(!p || !p.name) { detail.innerHTML="<p>Product not found</p>"; return; }
  detail.innerHTML=`<img src="${p.image}" width="300"><h2>${p.name}</h2><p>₹${p.price}</p>
  <button onclick="addToCart(${p.id})">Add to Cart</button>
  <button onclick="addToWishlist(${p.id})">❤️ Add to Wishlist</button>`;
}

// Dark Mode
function toggleDark(){ document.body.classList.toggle("dark"); }
