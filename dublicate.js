// 1. State Management
let flowers = [];
let cart = [];
let galleryPage = 1;

// DOM Elements
const flowerContainer = document.getElementById("flower-container");
const galleryContainer = document.getElementById("gallery-container");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("searchInput");
const cartCountBadge = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const loadMoreGalleryBtn = document.getElementById("loadMoreGalleryBtn");

// Lightbox Elements
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

// 3. Fetch Data
const API_URL = "https://flowers-api-ten.vercel.app/flowers";
// --- 3. GALLERY IMAGE LIST (REAL FLOWERS) ---
const realFlowerGallery = [
  "https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6e56e519c03f8eabbe610ee8310a7deceac663965243120a13b47cd392df615688a826c5e65f937991f222ce3b36b3d3d215e7495d8eef9c196d8a4c206816992c",
  "https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6ec39b4009f7b869e27f251ee3c5b327f79c501e55bda0afd0574c1e0aa9d8c0c095668beed2b7e90b75d646ac925c5ad9e44206185378ab6be40c754820b7adf8",
  "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/b8e94ad8-1b17-5a29-a780-fe95564c36ef/50dab7e3-e52e-59c3-bc9d-c578a87fd7f7.jpg",
  "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/9894c846-7249-56e3-be13-9ac741715256/949b23ec-f599-5fdc-a86a-e7b7681036c8.jpg",
  "https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6e71fb79ae9072781046b1402ff0871b63383aab9e3a819388b32435e12c694ba15a00e594d4bbc09a66c2d7b2010a9018f1731f58d2e25e5f1f4c4341af376f33",
  "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/618e1c9f-878c-5d25-b3ed-15d2ace5ca5e/6e381758-f145-5c61-9618-1eaf3c9772bc.jpg",
  "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/132d7da6-33dd-5628-8ba5-28aca4e3e966/50dab7e3-e52e-59c3-bc9d-c578a87fd7f7.jpg",
  "https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6edd84130e46c429405aa5bb3e8f1ab91c22279da77dbf1c0f1b4c5bd18218d46f4c26b74fbc125113c4776251d5c3b393088aeff9e31c871ca04283e4e0e8dd68",
  "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/52c4a1be-a71d-58c6-8130-0efa9c88a028/8f037b8a-487e-5bc4-8aef-95264a468c03.jpg",
  "https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6e32278d5ca2c0d13cb443703d01f0df90eae3e9c807b8cdee050366425388e49de430744fe79d3e4a8b68d832b6afbcee",
  "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/b8e94ad8-1b17-5a29-a780-fe95564c36ef/50dab7e3-e52e-59c3-bc9d-c578a87fd7f7.jpg",
  "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/80c735e4-8642-55da-8dd3-d7b09e89d32e/c541117c-b1a0-53b0-86bb-47d10c6f9352.jpg",
  "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/abeee474-ecc4-55bb-948c-0b94cdee2914/bd499468-fa2f-52fa-9ab8-d3ed02e8a798.jpg",
];
//4.fetch shop data

async function fetchFlowers() {
  try {
    const response = await fetch("https://flowers-api-ten.vercel.app/flowers");
    if (!response.ok) throw new Error("API Error");

    const data = await response.json();

    // Map API data
    flowers = data.map((item) => ({
      id: item.id,
      name: item.name || "Beautiful Flower",
      price: item.price || 15.0,
      image: item.image || `https://picsum.photos/seed/${item.id}/300/300`,
    }));

    displayFlowers(flowers);
  } catch (error) {
    console.log("Using fallback data:", error);
    // If API fails, use the large list of fallback flowers
    flowers = fallbackFlowers;
    displayFlowers(flowers);
  } finally {
    loader.style.display = "none";
  }
}

// 5. Display Shop Flowers
function displayFlowers(flowerList) {
  flowerContainer.innerHTML = "";

  if (flowerList.length === 0) {
    flowerContainer.innerHTML =
      '<p class="text-center w-100">No flowers found.</p>';
    return;
  }

  flowerList.forEach((flower) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-3";
    col.innerHTML = `
                    <div class="card flower-card h-100">
                        <img src="${flower.image}" class="card-img-top" alt="${
      flower.name
    }">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${flower.name}</h5>
                            <p class="card-text text-muted">Fresh from the garden.</p>
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
                    </div>
                `;
    flowerContainer.appendChild(col);
  });
}

// 5. Search Functionality
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredFlowers = flowers.filter((flower) =>
    flower.name.toLowerCase().includes(searchTerm)
  );
  displayFlowers(filteredFlowers);
});
// 6. Generate Gallery Images (Fixed Version)
function generateGallery() {
  galleryContainer.innerHTML = ""; // Clear current gallery

  // Loop through the REAL list defined above
  realFlowerGallery.forEach((imgSrc) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";

    galleryItem.innerHTML = `
                    <img src="${imgSrc}" alt="Flower Art" loading="lazy">
                    <div class="gallery-overlay">
                        <h5>Beautiful Bloom</h5>
                        <p>Click to enlarge</p>
                    </div>
                `;

    // Add click event for Lightbox
    galleryItem.onclick = function () {
      openLightbox(imgSrc);
    };

    galleryContainer.appendChild(galleryItem);
  });
}
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
//end
// 7. Lightbox Logic
function openLightbox(src) {
  lightbox.style.display = "flex";
  lightboxImg.src = src;
}

closeLightbox.onclick = function () {
  lightbox.style.display = "none";
};

// Close lightbox when clicking outside the image
lightbox.onclick =
  function (e) {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  } / // Load More Gallery Button (Updated to work with the list)
  loadMoreGalleryBtn.addEventListener("click", () => {
    // Since we are using a fixed list, this just reloads the list.
    // You can remove the "Load More" button in HTML if you don't want this behavior.
    generateGallery();
  });

// 8. Cart Logic
function addToCart(id) {
  const flower = flowers.find((f) => f.id === id);
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...flower, quantity: 1 });
  }

  updateCartUI();

  // Visual Feedback
  const btn = event.target.closest("button");
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="bi bi-check"></i> Added';
  btn.classList.replace("btn-custom", "btn-success");
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.classList.replace("btn-success", "btn-custom");
  }, 1000);
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.innerText = totalCount;

  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="text-center">Your cart is empty.</p>';
  } else {
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      const itemRow = document.createElement("div");
      itemRow.className =
        "d-flex justify-content-between align-items-center mb-2 border-bottom pb-2";
      itemRow.innerHTML = `
                        <div class="d-flex align-items-center">
                            <img src="${
                              item.image
                            }" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px; margin-right: 10px;">
                            <div>
                                <h6 class="mb-0">${item.name}</h6>
                                <small class="text-muted">$${item.price.toFixed(
                                  2
                                )} x ${item.quantity}</small>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${
                          item.id
                        })">
                            <i class="bi bi-trash"></i>
                        </button>
                    `;
      cartItemsContainer.appendChild(itemRow);
    });
  }

  cartTotalSpan.innerText = totalPrice.toFixed(2);
}

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  fetchFlowers(); // Loads shop items
  generateGallery(8); // Loads initial gallery images
});
