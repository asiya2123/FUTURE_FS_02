// --- 1. DATA & STATE ---
let flowers = [];
let cart = [];
let galleryIndex = 0; // Tracks gallery loading

const flowerContainer = document.getElementById("flower-container");
const galleryContainer = document.getElementById("gallery-container");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("searchInput");
const cartCountBadge = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const loadMoreBtn = document.getElementById("loadMoreGalleryBtn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");
// 2. Expanded Fallback Data (Used if API fails or just to show many images)
const fallbackFlowers = [
  {
    id: 1,
    name: "Red Rose",
    price: 12.99,
    image: "./images/rose1.png",
  },
  {
    id: 2,
    name: "Sunflower",
    price: 8.5,
    image: "./images/marigold.png",
  },
  {
    id: 3,
    name: "Tulip",
    price: 10.0,
    image: "./images/tulip2.png",
  },
  {
    id: 4,
    name: "Daisy",
    price: 7.25,
    image: "./images/daisy.png",
  },
  {
    id: 5,
    name: "Purple Orchid",
    price: 18.0,
    image: "./images/lotus1.png",
  },
  {
    id: 6,
    name: "Pink Peony",
    price: 15.5,
    image: "./images/peony.png",
  },
  {
    id: 7,
    name: "Lavender",
    price: 9.0,
    image: "./images/lavender1.png",
  },
  {
    id: 8,
    name: "Red Dahlia",
    price: 11.0,
    image: "./images/dahila.png",
  },
  {
    id: 9,
    name: "Blue Hydrangea",
    price: 14.0,
    image: "./images/waterlilly.png",
  },
  {
    id: 10,
    name: "Yellow Marigold",
    price: 6.5,
    image: "./images/marigold.png",
  },
  {
    id: 11,
    name: "White Lily",
    price: 16.0,
    image: "./images/stargazer lily.jpg",
  },
  {
    id: 12,
    name: "Cherry Blossom",
    price: 19.0,
    image: "./images/cheryyblossum4.png",
  },
  {
    id: 13,
    name: "Orange Jasmine",
    price: 12.0,
    image: "./images/nastruntium.png",
  },
  {
    id: 14,
    name: "Red Hibiscus",
    price: 13.5,
    image: "./images/plimeria.jpg",
  },
  {
    id: 15,
    name: "Wildflower Mix",
    price: 22.0,
    image: "./images/1.jpg",
  },
];


// --- 3. GALLERY IMAGE LIST (REAL FLOWERS) ---
const realFlowerGallery = [
  "./images/rose1.png",
  "./images/lavender1.png",
  "./images/waterlilly1.png",
  "./images/gift1.jpg",
  "./images/rose3.png",
  "./images/lotus2.png",
  "./images/waterlilly.png",
  "./images/cheryyblossum4.png",
  "./images/tulip2.png",
  "./images/1.jpg",
  "./images/2.jpg",
  "./images/lotus5.png",
  "./images/dec5.jpg",
  "./images/rose5.png",
  "./images/lavender5.png",
  "./images/rose2.png",
  "./images/gift3.jpg",
  "./images/lotus3.png",
  "./images/lotus1.png",
  "./images/lavender3.png",
  "./images/peony.png",
  "./images/stargazer lily.jpg",
  "./images/nastruntium.png",
  "./images/lts.png",
  "./images/dahila.png",
  "./images/marigold.png",
  "./images/dec1.jpg",
  "./images/plimeria.jpg",
  "./images/million bells.jpg",
  "./images/daisy.png",
];
/*
async function fetchFlowers() {
  let flowers = [];
  try {
    const response = await fetch("https://flowers-api-ten.vercel.app/flowers");
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();

    flowers = data.map((item) => ({
      id: item?.id ?? Date.now(),
      name: item?.name ?? "Beautiful Flower",
      price: item?.price ?? 15.0,
      image: item?.image ?? `https://picsum.photos/seed/${item?.id}/300/300`,
    }));
  } catch (error) {
    console.error("Using local fallback flowers:", error.message);
    flowers = fallbackFlowers;
  } finally {
    displayFlowers(flowers);
    if (loader) loader.style.display = "none";
  }
}*/
async function fetchFlowers() {
  let flowers = [];
  try {
    const response = await fetch("https://flowers-api-ten.vercel.app/flowers");
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    flowers = data.map((item, index) => {
      const validImage = item.image && item.image.trim().startsWith("http");
      return {
        id: item.id ?? index,
        name: item.name?.trim() || "Beautiful Flower",
        price: item.price ?? 15.0,
        image: validImage
          ? item.image
          : `https://picsum.photos/seed/${item.id ?? index}/300/300`,
      };
    });
   /* flowers = data.map((item) => ({
      id: item?.id ?? Date.now(),
      name: item?.name ?? "Beautiful Flower",
      price: item?.price ?? 15.0,
      image: item?.image ?? `https://picsum.photos/seed/${item?.id}/300/300`,
    }));*/
  } catch (error) {
    console.error("Using local fallback flowers:", error.message);
    flowers = fallbackFlowers;
  } finally {
    displayFlowers(flowers);
    if (loader) loader.style.display = "none";
  }
}

// --- 5. DISPLAY SHOP ---
function displayFlowers(list) {
  flowerContainer.innerHTML = "";
  if (list.length === 0) {
    flowerContainer.innerHTML =
      '<p class="text-center w-100">No flowers found.</p>';
    return;
  }
  list.forEach((flower) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-3";
    col.innerHTML = `
                    <div class="card flower-card h-100">
                        <img src="${flower.image}" class="card-img-top" alt="${
      flower.name
    }">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${flower.name}</h5>
                            <p class="card-text text-muted">Fresh from garden.</p>
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                                <span class="price-tag">$${parseFloat(
                                  flower.price
                                ).toFixed(2)}</span>
                                <button class="btn btn-custom" onclick="addToCart(${
                                  flower.id
                                })">
                                    <i class="bi bi-cart-plus"></i> Add
                                </button>
                            </div>
                        </div>
                    </div>`;
    flowerContainer.appendChild(col);
  });
}

// --- 6. SEARCH ---
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = flowers.filter((f) => f.name.toLowerCase().includes(term));
  displayFlowers(filtered);
});

// --- 7. GALLERY "LOAD MORE" FUNCTION ---
function loadMoreGalleryImages() {
  // 1. Show Loader Spinner on Button
  const originalText = loadMoreBtn.innerHTML;
  loadMoreBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm"></span> Loading...';
  loadMoreBtn.disabled = true;

  // 2. Simulate a tiny delay for "Loader" effect
  setTimeout(() => {
    // Add 8 images
    for (let i = 0; i < 8; i++) {
      // Cycle through the list using Modulo
      const imgUrl = realFlowerGallery[galleryIndex % realFlowerGallery.length];

      const item = document.createElement("div");
      item.className = "gallery-item";
      item.innerHTML = `
                        <img src="${imgUrl}" loading="lazy" alt="Flower">
                        <div class="gallery-overlay">
                            <h5>Beautiful Bloom</h5>
                            <p>Click to enlarge</p>
                        </div>`;

      // Add click event for Lightbox
      item.onclick = () => openLightbox(imgUrl);

      galleryContainer.appendChild(item);
      galleryIndex++;
    }

    // 3. Reset Button
    loadMoreBtn.innerHTML = originalText;
    loadMoreBtn.disabled = false;
  }, 500); // 0.5 second delay
}

// --- 8. LIGHTBOX ---
function openLightbox(src) {
  lightbox.style.display = "flex";
  lightboxImg.src = src;
}

closeLightbox.onclick = () => (lightbox.style.display = "none");
lightbox.onclick = (e) => {
  if (e.target !== lightboxImg) lightbox.style.display = "none";
};

// --- 9. CART LOGIC ---
function addToCart(id) {
  const flower = flowers.find((f) => f.id === id);
  const existing = cart.find((c) => c.id === id);

  if (existing) existing.quantity++;
  else cart.push({ ...flower, quantity: 1 });

  updateCartUI();

  // Button feedback
  const btn = event.target.closest("button");
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="bi bi-check"></i> Added';
  btn.classList.replace("btn-custom", "btn-success");
  setTimeout(() => {
    btn.innerHTML = original;
    btn.classList.replace("btn-success", "btn-custom");
  }, 1000);
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((a, b) => a + b.quantity, 0);
  cartCountBadge.innerText = totalCount;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (!cart.length) {
    cartItemsContainer.innerHTML =
      '<p class="text-center">Your cart is empty.</p>';
  } else {
    cart.forEach((item) => {
      total += item.price * item.quantity;
      const row = document.createElement("div");
      row.className =
        "d-flex justify-content-between align-items-center mb-2 border-bottom pb-2";
      row.innerHTML = `
                        <div class="d-flex align-items-center">
                            <img src="${
                              item.image
                            }" style="width:50px; height:50px; object-fit:cover; border-radius:5px; margin-right:10px;">
                            <div>
                                <h6 class="mb-0">${item.name}</h6>
                                <small class="text-muted">$${item.price.toFixed(
                                  2
                                )} x ${item.quantity}</small>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${
                          item.id
                        })"><i class="bi bi-trash"></i></button>
                    `;
      cartItemsContainer.appendChild(row);
    });
  }
  cartTotalSpan.innerText = total.toFixed(2);
}

// --- 10. INIT ---
document.addEventListener("DOMContentLoaded", () => {
  fetchFlowers(); // Load Shop (or fallback to your images)
  loadMoreGalleryImages(); // Load initial 8 gallery images
  loadMoreBtn.addEventListener("click", loadMoreGalleryImages); // Attach button logic
});
