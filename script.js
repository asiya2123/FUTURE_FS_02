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
    image:
      "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/5be75d71-74f1-5c26-ba2e-511376b1d1c6/62ed12ac-27c5-504b-8fa4-95f41e163466.jpg",
  },
  {
    id: 2,
    name: "Sunflower",
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Tulip",
    price: 10.0,
    image:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Daisy",
    price: 7.25,
    image:
      "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Purple Orchid",
    price: 18.0,
    image:
      "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/fea43559-97d3-5e0a-b585-33372673a20c/d25c9c1b-753f-5541-9d5d-91be4b664bc4.jpg",
  },
  {
    id: 6,
    name: "Pink Peony",
    price: 15.5,
    image:
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    name: "Lavender",
    price: 9.0,
    image:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    name: "Red Dahlia",
    price: 11.0,
    image:
      "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/e9151948-f8af-5c7a-8c6a-31496c242aa3/b18ae227-4f64-5180-bae0-a231260f50d9.jpg",
  },
  {
    id: 9,
    name: "Blue Hydrangea",
    price: 14.0,
    image:
      "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/894ff7c9-3788-52b4-9f16-e2203b1bf1a1/210b14a6-ade7-5174-b1a2-a5c6c63f4860.jpg",
  },
  {
    id: 10,
    name: "Yellow Marigold",
    price: 6.5,
    image:
      "https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6e69067aca127c7e6c44907091ef9805e8da70180bfbb6f8afc61cf824557c8ee59ade8b7cb573cc9781ac12e295d0bd5f",
  },
  {
    id: 11,
    name: "White Lily",
    price: 16.0,
    image:
      "https://bloomsbythebox.sirv.com/img/product/xlarge/00823A__Lily_White_3_5_Blooms_Flower.jpg?q=100&scale.option=fill&w=400&h=0",
  },
  {
    id: 12,
    name: "Cherry Blossom",
    price: 19.0,
    image:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 13,
    name: "Orange Jasmine",
    price: 12.0,
    image:
      "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/9feb5ae0-308a-53d0-892f-da0a0e9ab89a/01a84265-e09c-5682-92ce-681c89a1afe2.jpg",
  },
  {
    id: 14,
    name: "Red Hibiscus",
    price: 13.5,
    image:
      "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/7ce8974c-dffa-507a-a7ed-133dc39f7eb7/123cf906-b42d-502b-af18-471bb8b92d99.jpg",
  },
  {
    id: 15,
    name: "Wildflower Mix",
    price: 22.0,
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=400&q=80",
  },
];


// --- 3. GALLERY IMAGE LIST (REAL FLOWERS) ---
const realFlowerGallery = [
  "https://images.unsplash.com/photo-1490750967868-58cb75069ed6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1599598425947-d3528b0d0f23?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1559593298-48651bb18e0c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1597055181300-e3633a917585?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1610397648930-477b8c7f0947?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1574603342590-697b131a4f66?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80",
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
