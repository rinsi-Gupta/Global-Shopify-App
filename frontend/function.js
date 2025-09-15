// =========================
// ✅ Initial Wishlist & Cart Load
// =========================
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =========================
// ✅ Update Wishlist Icon Style
// =========================
function updateWishlistIcon(icon, isInWishlist) {
    if (!icon) return;
    if (isInWishlist) {
        icon.style.fontVariationSettings = "'FILL' 1"; // filled
        icon.style.color = "red";
    } else {
        icon.style.fontVariationSettings = "'FILL' 0"; // outlined
        icon.style.color = "black";
    }
}

// =========================
// ✅ Update Cart Icon Style
// =========================
function updateCartIcon(icon, isInCart) {
    if (!icon) return;
    if (isInCart) {
        icon.style.fontVariationSettings = "'FILL' 1"; // filled
        icon.style.color = "red";
    } else {
        icon.style.fontVariationSettings = "'FILL' 0"; // outlined
        icon.style.color = "black";
    }
}

// =========================
// ✅ Add / Remove Wishlist (Toggle)
// =========================
function addToWishlist(event, name, image, description, price) {
    event.preventDefault();
    const icon = event.currentTarget.querySelector(".favorite-icon");
    const existingProductIndex = wishlist.findIndex(item => item.name === name);

    if (existingProductIndex !== -1) {
        // Remove if already exists
        wishlist.splice(existingProductIndex, 1);
        updateWishlistIcon(icon, false);
        Toastify({
            text: `${name} removed from wishlist!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
        }).showToast();
    } else {
        // Add new
        wishlist.push({ name, image, description, price });
        updateWishlistIcon(icon, true);
        Toastify({
            text: `${name} added to wishlist successfully!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#22c55e",
        }).showToast();
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
}

// =========================
// ✅ Add / Remove Cart (Toggle)
// =========================
function addToCart(eventOrIndex, name = null, image = null, price = null) {
    // Case 1: Click from product card
    if (typeof eventOrIndex === "object") {
        eventOrIndex.preventDefault();
        const icon = eventOrIndex.currentTarget.querySelector(".cart-icon");
        const existingProductIndex = cart.findIndex(item => item.name === name);

        if (existingProductIndex !== -1) {
            // Remove from cart
            cart.splice(existingProductIndex, 1);
            updateCartIcon(icon, false);
            Toastify({
                text: `${name} removed from cart!`,
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#f44336",
            }).showToast();
        } else {
            // Add to cart
            cart.push({ name, image, price });
            updateCartIcon(icon, true);
            Toastify({
                text: `${name} added to cart successfully!`,
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#22c55e",
            }).showToast();
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

    // Case 2: Adding from wishlist
    } else if (typeof eventOrIndex === "number") {
        const index = eventOrIndex;
        if (wishlist[index]) {
            const item = wishlist[index];
            const exists = cart.find(p => p.name === item.name);
            if (exists) {
                Toastify({
                    text: `${item.name} is already in your cart!`,
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#f97316",
                }).showToast();
            } else {
                cart.push(item);
                localStorage.setItem("cart", JSON.stringify(cart));
                Toastify({
                    text: `${item.name} added to cart!`,
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#4CAF50",
                }).showToast();
                removeFromWishlist(index);
                updateCartCount();
            }
        }
    }
}

// =========================
// ✅ Remove from Wishlist
// =========================
function removeFromWishlist(index) {
    if (wishlist[index]) {
        const removedItem = wishlist[index].name;
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        Toastify({
            text: `${removedItem} removed from wishlist`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
        }).showToast();

        loadWishlist();
        updateWishlistCount();
    }
}

// =========================
// ✅ Remove from Cart
// =========================
function removeFromCart(index) {
    if (cart[index]) {
        const removedItem = cart[index].name;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));

        Toastify({
            text: `${removedItem} removed from cart`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
        }).showToast();

        updateCartUI();
        updateOrderSummary();
        updateCartCount();
    }
}

// =========================
// ✅ Update Counts
// =========================
function updateCartCount() {
    let cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
        cartCountElement.classList.toggle("hidden", cart.length === 0);
    }
}

function updateWishlistCount() {
    let wishlistCountElement = document.getElementById("wishlist-count");
    if (wishlistCountElement) {
        wishlistCountElement.textContent = wishlist.length;
        wishlistCountElement.classList.toggle("hidden", wishlist.length === 0);
    }
}

// =========================
// ✅ On Page Load: Update Icons
// =========================
document.addEventListener("DOMContentLoaded", () => {
    // Wishlist icons
    document.querySelectorAll(".favorite-icon").forEach(icon => {
        const onclickAttr = icon.closest("a").getAttribute("onclick");
        const match = onclickAttr.match(/'([^']+)'/); // Extract product name
        if (match) {
            const productName = match[1];
            const isInWishlist = wishlist.some(item => item.name === productName);
            updateWishlistIcon(icon, isInWishlist);
        }
    });

    // Cart icons
    document.querySelectorAll(".cart-icon").forEach(icon => {
        const onclickAttr = icon.closest("a").getAttribute("onclick");
        const match = onclickAttr.match(/'([^']+)'/); // Extract product name
        if (match) {
            const productName = match[1];
            const isInCart = cart.some(item => item.name === productName);
            updateCartIcon(icon, isInCart);
        }
    });

    updateCartCount();
    updateWishlistCount();
});
