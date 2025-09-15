const nav = `
<!-- Flyer -->
<div class="marquee w-full overflow-hidden bg-gradient-to-r from-orange-200 to-red-200 text-brown-1000 py-3 text-center font-bold shadow-md z-50">
    <div class="marquee-content animate-marquee hover:paused whitespace-nowrap flex">
        <div class="flex">
            <span class="inline-block mx-8">🎉 Exclusive Offer: Get 15% OFF on all handicrafts this week only! Shop now! 🎉</span>
            <span class="inline-block mx-8">🎉 Exclusive Offer: Get 15% OFF on all handicrafts this week only! Shop now! 🎉</span>
            <span class="inline-block mx-8">🎉 Exclusive Offer: Get 15% OFF on all handicrafts this week only! Shop now! 🎉</span>
            <span class="inline-block mx-8">🎉 Exclusive Offer: Get 15% OFF on all handicrafts this week only! Shop now! 🎉</span>
            <span class="inline-block mx-8">🎉 Exclusive Offer: Get 15% OFF on all handicrafts this week only! Shop now! 🎉</span>
            <span class="inline-block mx-8">🎉 Exclusive Offer: Get 15% OFF on all handicrafts this week only! Shop now! 🎉</span>
        </div>
    </div>
</div>
<!-- Navbar -->
<nav class="bg-white/90 backdrop-blur-sm w-full shadow-md sticky top-0 z-40">
    <div class="flex flex-wrap items-center justify-between px-4 py-3 lg:px-8">
        <a href="index.html" class="flex justify-center gap-2 flex-shrink-0">
            <img src="images/Asset 4.jpg" alt="GlobalShopify Logo" class="h-12 w-auto" />
        </a>
        <div class="flex items-center gap-3 lg:gap-6 ml-auto">
            <div class="hidden md:block w-full max-w-lg">
                <div class="relative">
                    <input type="text" id="search-input" placeholder="Search..." class="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <span class="absolute top-2.5 right-3 text-gray-500 cursor-pointer material-symbols-outlined">search</span>
                </div>
            </div>
            <div class="relative">
                <a href="#" id="notificationIcon" class="relative text-black hover:text-blue-500">
                    <span class="material-symbols-outlined text-2xl">notifications</span>
                    <span id="notification-count" class="absolute -top-5 -right-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full hidden">0</span>
                </a>
                <div id="notificationPopup" class="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl ring-1 ring-gray-200 max-h-96 overflow-y-auto z-50 hidden animate-fade-in">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined text-blue-500">notifications</span> Notifications
                        </h3>
                        <div id="notificationList" class="space-y-3"></div>
                        <div id="noNotifications" class="text-gray-500 text-center text-sm font-medium py-4 hidden">No new notifications</div>
                    </div>
                </div>
            </div>
            <a href="cart.html" class="relative text-black hover:text-blue-500">
                <span class="material-symbols-outlined text-2xl">shopping_cart</span>
                <span id="cart-count" class="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full hidden">0</span>
            </a>
            <a href="wishlist.html" class="relative text-black hover:text-blue-500">
                <span class="material-symbols-outlined text-2xl">favorite</span>
                <span id="wishlist-count" class="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full hidden">0</span>
            </a>
            <div class="relative">
                <button id="dropdownButton" class="flex items-center gap-1 hover:text-blue-500 focus:outline-none">
                    <span class="material-symbols-outlined text-4xl">person</span>
                    <span id="userName" class="hidden text-sm font-semibold"></span>
                </button>
                <div id="dropdownMenu" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-gray-200 z-50 hidden">
                    <nav class="py-1">
                        <a href="profile.html" class="flex items-center gap-1 px-4 py-2 hover:text-blue-500"><span class="material-symbols-outlined">person</span> Profile</a>
                        <a href="settings.html" class="flex items-center gap-1 px-4 py-2 hover:text-blue-500"><span class="material-symbols-outlined">settings</span> Settings</a>
                        <a href="userlogin.html" id="loginLink" class="flex items-center gap-1 px-4 py-2 hover:text-blue-500"><span class="material-symbols-outlined">login</span> Login</a>
                        <hr class="my-1 border-gray-200">
                        <a href="#" id="logoutLink" class="flex items-center gap-1 px-4 py-2 text-blue-500 hover:text-blue-500 hidden"><span class="material-symbols-outlined">logout</span> Logout</a>
                    </nav>
                </div>
            </div>
        </div>
        <div class="block w-full md:hidden mt-3">
            <div class="relative">
                <input type="text" id="search-input-mobile" placeholder="Search..." class="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:ring-2 focus:ring-orange-500 focus:outline-none">
                <span class="absolute top-2.5 right-3 text-gray-500 cursor-pointer material-symbols-outlined">search</span>
            </div>
        </div>
    </div>
    <!-- Category and More Section -->
    <div class="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 gap-y-4" id="category-section">
        <!-- Category Section -->
        <div class="w-full md:flex-1 overflow-x-auto custom-scroll" id="scroll-container">
            <div class="min-w-max flex justify-start md:justify-center items-center gap-6 md:gap-8 font-semibold whitespace-nowrap" id="category-links">
                <a href="jewellery.html" data-category="Jewellery" class="category-link">Jewellery</a>
                <a href="portrait.html" data-category="portrait" class="category-link">Portrait</a>
                <a href="bags.html" data-category="bags" class="category-link">Bags</a>
                <a href="wed.html" data-category="wed" class="category-link">Wedding</a>
                <a href="birth.html" data-category="birth" class="category-link">Birthday</a>
                <a href="plant.html" data-category="plant" class="category-link">Plants</a>
                <a href="shelve.html" data-category="shelve" class="category-link">Shelves</a>
                <a href="frame.html" data-category="frame" class="category-link">Frames</a>
                <a href="toy.html" data-category="toy" class="category-link">Toy Box</a>
                <a href="vase.html" data-category="vase" class="category-link">Vases</a>
                <a href="wal.html" data-category="wal" class="category-link">Walls</a>
                <a href="wine.html" data-category="wine" class="category-link">Wine Racks</a>
            </div>
        </div>
    </div>
</nav>

<style>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
    }
    .animate-marquee { display: flex; animation: marquee 30s linear infinite; }
    .hover\\:paused:hover { animation-play-state: paused; }
    @media (hover: none) { .animate-marquee:active { animation-play-state: paused; } }
    .text-brown-1000 { color: #4b1c00; }
    #notificationPopup { 
        scrollbar-width: thin; 
        scrollbar-color: #d1d5db transparent; 
    }
    #notificationPopup::-webkit-scrollbar { 
        width: 6px; 
    }
    #notificationPopup::-webkit-scrollbar-track { 
        background: transparent; 
    }
    #notificationPopup::-webkit-scrollbar-thumb { 
        background-color: #d1d5db; 
        border-radius: 3px; 
    }
    #notificationPopup .notification-item { 
        display: flex; 
        align-items: flex-start; 
        gap: 10px; 
        padding: 12px; 
        background: #f9fafb; 
        border-radius: 8px; 
        transition: all 0.3s ease; 
        cursor: pointer; 
        position: relative; 
    }
    #notificationPopup .notification-item:hover { 
        background: #fef3e8; 
        transform: translateY(-2px); 
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
    }
    #notificationPopup .notification-item.read { 
        background: #f3f4f6; 
        opacity: 0.7; 
    }
    #notificationPopup .notification-item.read:hover { 
        background: #e5e7eb; 
        opacity: 0.9; 
    }
    #notificationPopup .notification-item:not(.read) { 
        animation: pulse 2s infinite; 
        border: 1px solid #3b82f6; 
    }
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
        70% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
    }
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.3s ease-out; }
    .category-link.active {
        color: #3b82f6;
        text-decoration: underline;
        font-weight: bold;
    }
</style>
`;

document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbar-container");
    if (!navbarContainer) {
        console.error("navbar-container element not found");
        return;
    }
    navbarContainer.innerHTML = nav;

    // DOM Elements
    const elements = {
        userName: document.getElementById("userName"),
        loginLink: document.getElementById("loginLink"),
        logoutLink: document.getElementById("logoutLink"),
        dropdownButton: document.getElementById("dropdownButton"),
        dropdownMenu: document.getElementById("dropdownMenu"),
        notificationIcon: document.getElementById("notificationIcon"),
        notificationPopup: document.getElementById("notificationPopup"),
        notificationList: document.getElementById("notificationList"),
        notificationCount: document.getElementById("notification-count"),
        noNotifications: document.getElementById("noNotifications"),
        searchInput: document.getElementById("search-input"),
        searchInputMobile: document.getElementById("search-input-mobile"),
        cartCount: document.getElementById("cart-count"),
        wishlistCount: document.getElementById("wishlist-count")
    };

    if (Object.values(elements).some(el => !el)) {
        console.error("One or more navbar elements not found:", elements);
        return;
    }

    // Initialize notifications from localStorage or use defaults
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [
        { id: 1, message: "Your order #1234 has been shipped!", read: false, timestamp: "2025-08-16T10:00:00Z" },
        { id: 2, message: "New handicraft collection added!", read: false, timestamp: "2025-08-15T15:30:00Z" },
        { id: 3, message: "15% OFF coupon expires soon!", read: true, timestamp: "2025-08-14T09:00:00Z" },
        { id: 4, message: "Your wishlist item is back in stock!", read: false, timestamp: "2025-08-13T12:00:00Z" },
        { id: 5, message: "Exclusive pottery sale starts tomorrow!", read: false, timestamp: "2025-08-12T08:45:00Z" }
    ];

    async function updateUI() {
        // Skip updateUI on userlogin.html to prevent auto-login
        if (window.location.pathname.endsWith("userlogin.html")) {
            console.log("On userlogin.html, skipping updateUI to prevent auto-login");
            resetUI();
            return;
        }

        const token = localStorage.getItem("authToken");
        console.log("Checking authToken:", token); // Debug
        console.log("Current localStorage:", { authToken: localStorage.getItem("authToken"), loginUser: localStorage.getItem("loginUser") }); // Debug

        // Validate token format before making request
        if (!token || token === "undefined" || !token.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)) {
            console.log("Invalid or no token found, clearing localStorage and resetting UI");
            localStorage.removeItem("authToken");
            localStorage.removeItem("loginUser");
            localStorage.removeItem("rememberMe");
            resetUI();
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/users/profile/getprofile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log("Profile response:", data); // Debug
            console.log("User data:", data?.data?.user); // Debug user object

            if (response.ok && data?.data?.user) {
                // Handle different possible field names for firstName
                const firstName = data.data.user.firstName ||
                    data.data.user.Firstname ||
                    data.data.user.FirstName ||
                    data.data.user.name ||
                    JSON.parse(localStorage.getItem("loginUser"))?.firstName ||
                    "User";
                if (firstName) {
                    console.log("Setting userName to:", `Welcome, ${firstName}`); // Debug
                    elements.userName.textContent = `Welcome, ${firstName}`;
                    elements.userName.classList.remove("hidden");
                    elements.loginLink.classList.add("hidden");
                    elements.logoutLink.classList.remove("hidden");
                } else {
                    console.log("No valid firstName found, using fallback from loginUser");
                    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
                    if (loginUser?.firstName) {
                        console.log("Using fallback firstName:", loginUser.firstName); // Debug
                        elements.userName.textContent = `Welcome, ${loginUser.firstName}`;
                        elements.userName.classList.remove("hidden");
                        elements.loginLink.classList.add("hidden");
                        elements.logoutLink.classList.remove("hidden");
                    } else {
                        console.log("No valid firstName in loginUser, resetting UI");
                        resetUI();
                        Toastify({
                            text: "Invalid user data. Please log in again.",
                            duration: 3000,
                            gravity: "top",
                            position: "right",
                            backgroundColor: "#EF4444",
                        }).showToast();
                    }
                }
            } else {
                console.log("Invalid profile data or response, resetting UI");
                resetUI();
                Toastify({
                    text: "Session expired or invalid user data. Please log in again.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#EF4444",
                }).showToast();
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message);
            console.log("Using loginUser as fallback due to error");
            const loginUser = JSON.parse(localStorage.getItem("loginUser"));
            if (loginUser?.firstName) {
                console.log("Using fallback firstName:", loginUser.firstName); // Debug
                elements.userName.textContent = `Welcome, ${loginUser.firstName}`;
                elements.userName.classList.remove("hidden");
                elements.loginLink.classList.add("hidden");
                elements.logoutLink.classList.remove("hidden");
            } else {
                console.log("No valid firstName in loginUser, clearing localStorage and resetting UI");
                localStorage.removeItem("authToken");
                localStorage.removeItem("loginUser");
                localStorage.removeItem("rememberMe");
                resetUI();
                Toastify({
                    text: "Failed to fetch profile. Please log in again.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#EF4444",
                }).showToast();
            }
        }
        updateNotificationUI();
        updateCartAndWishlistCounts();
    }

    function resetUI() {
        console.log("Resetting UI"); // Debug
        elements.userName.textContent = "Welcome, Guest";
        elements.userName.classList.remove("hidden");
        elements.loginLink.classList.remove("hidden");
        elements.logoutLink.classList.add("hidden");
        elements.dropdownMenu.classList.add("hidden");
    }

    function updateNotificationUI() {
        const unreadCount = notifications.filter(n => !n.read).length;
        elements.notificationCount.textContent = unreadCount;
        elements.notificationCount.classList.toggle("hidden", unreadCount === 0);

        elements.notificationList.innerHTML = "";
        if (notifications.length === 0) {
            elements.noNotifications.classList.remove("hidden");
        } else {
            elements.noNotifications.classList.add("hidden");
            notifications.forEach(notification => {
                const notificationItem = document.createElement("div");
                notificationItem.className = `notification-item ${notification.read ? "read" : ""}`;
                notificationItem.innerHTML = `
                    <span class="material-symbols-outlined notification-icon">circle_notifications</span>
                    <div>
                        <p class="text-sm font-medium text-gray-800">${notification.message}</p>
                        <p class="text-xs text-gray-500">${new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                `;
                notificationItem.addEventListener("click", () => {
                    markAsRead(notification.id);
                    elements.notificationPopup.classList.add("hidden");
                });
                elements.notificationList.appendChild(notificationItem);
            });
        }
        localStorage.setItem("notifications", JSON.stringify(notifications));
    }

    function markAsRead(notificationId) {
        const notification = notifications.find(n => n.id === notificationId);
        if (notification && !notification.read) {
            notification.read = true;
            updateNotificationUI();
        }
    }

    function updateCartAndWishlistCounts() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        elements.cartCount.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        elements.cartCount.classList.toggle("hidden", cart.length === 0);
        elements.wishlistCount.textContent = wishlist.length;
        elements.wishlistCount.classList.toggle("hidden", wishlist.length === 0);
    }

    // Event Listeners
    const eventListeners = [
        {
            element: elements.logoutLink,
            event: "click",
            handler: async (event) => {
                event.preventDefault();
                console.log("Logout clicked, token before logout:", localStorage.getItem("authToken")); // Debug
                console.log("localStorage before logout:", { authToken: localStorage.getItem("authToken"), loginUser: localStorage.getItem("loginUser"), rememberMe: localStorage.getItem("rememberMe") }); // Debug
                try {
                    const token = localStorage.getItem("authToken");
                    if (!token || token === "undefined") {
                        console.log("No valid token found, proceeding with logout");
                    } else {
                        const res = await fetch("http://localhost:5000/api/users/logout", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                ...(token && token !== "undefined" && { "Authorization": `Bearer ${token}` }),
                            },
                        });
                        const data = await res.json();
                        console.log("Logout response:", { status: res.status, data }); // Debug
                        if (!res.ok) {
                            throw new Error(data.message || "Logout failed");
                        }
                    }

                    // Clear all relevant localStorage keys
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("loginUser");
                    localStorage.removeItem("rememberMe");
                    console.log("localStorage after logout:", { authToken: localStorage.getItem("authToken"), loginUser: localStorage.getItem("loginUser"), rememberMe: localStorage.getItem("rememberMe") }); // Debug

                    Toastify({
                        text: "Logged out successfully!",
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#34d399",
                    }).showToast();

                    resetUI();
                    setTimeout(() => {
                        console.log("Redirecting to userlogin.html"); // Debug
                        window.location.href = "userlogin.html?t=" + Date.now(); // Cache-busting
                    }, 1000);
                } catch (err) {
                    console.error("Error during logout:", err.message);
                    // Clear localStorage even on error
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("loginUser");
                    localStorage.removeItem("rememberMe");
                    console.log("localStorage after error:", { authToken: localStorage.getItem("authToken"), loginUser: localStorage.getItem("loginUser"), rememberMe: localStorage.getItem("rememberMe") }); // Debug
                    Toastify({
                        text: err.message || "Error during logout. Please try again.",
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#EF4444",
                    }).showToast();
                    resetUI();
                    setTimeout(() => {
                        console.log("Redirecting to userlogin.html after error"); // Debug
                        window.location.href = "userlogin.html?t=" + Date.now(); // Cache-busting
                    }, 1000);
                }
            }
        },
        {
            element: elements.dropdownButton,
            event: "click",
            handler: (event) => {
                console.log("Dropdown clicked"); // Debug
                elements.dropdownMenu.classList.toggle("hidden");
                elements.notificationPopup.classList.add("hidden");
                event.stopPropagation();
            }
        },
        {
            element: elements.notificationIcon,
            event: "click",
            handler: (event) => {
                event.preventDefault();
                console.log("Notification icon clicked"); // Debug
                elements.notificationPopup.classList.toggle("hidden");
                elements.dropdownMenu.classList.add("hidden");
                event.stopPropagation();
            }
        },
        {
            element: document,
            event: "click",
            handler: (event) => {
                if (!elements.dropdownButton.contains(event.target) && !elements.dropdownMenu.contains(event.target)) {
                    elements.dropdownMenu.classList.add("hidden");
                }
                if (!elements.notificationIcon.contains(event.target) && !elements.notificationPopup.contains(event.target)) {
                    elements.notificationPopup.classList.add("hidden");
                }
            }
        },
        {
            element: elements.searchInput,
            event: "input",
            handler: filterProducts
        },
        {
            element: elements.searchInputMobile,
            event: "input",
            handler: filterProducts
        }
    ];

    eventListeners.forEach(({ element, event, handler }) => {
        if (element) element.addEventListener(event, handler);
    });

    // Category Highlighting
    const links = document.querySelectorAll('.category-link');
    const ACTIVE_CLASS = ['active'];

    // Highlight the category based on the current page or saved category
    function highlightCategory() {
        const currentPath = window.location.pathname;
        const savedCategory = localStorage.getItem('selectedCategory');

        // Clear previous highlights
        links.forEach(link => link.classList.remove(...ACTIVE_CLASS));

        // Check if the current page matches any category link
        const currentLink = [...links].find(link => link.getAttribute('href') === currentPath);
        if (currentLink) {
            currentLink.classList.add(...ACTIVE_CLASS);
            localStorage.setItem('selectedCategory', currentLink.textContent.trim().toUpperCase());
            currentLink.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else if (savedCategory) {
            // Fallback to saved category if no direct match
            const savedLink = [...links].find(link => link.textContent.trim().toUpperCase() === savedCategory);
            if (savedLink) {
                savedLink.classList.add(...ACTIVE_CLASS);
                savedLink.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    }

    // Add click event listeners to category links
    links.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class from all links
            links.forEach(l => l.classList.remove(...ACTIVE_CLASS));
            // Add active class to clicked link
            link.classList.add(...ACTIVE_CLASS);
            link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            localStorage.setItem('selectedCategory', link.textContent.trim().toUpperCase());
        });
    });

    // Search Functionality
    function filterProducts() {
        const searchValue = (elements.searchInput.value || elements.searchInputMobile.value).toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));
        renderProducts(filteredProducts);
    }

    // Mock products and render function
    const products = [
        { name: "Candle Holder", category: "candle" },
        { name: "Decorative Lamp", category: "lamps" },
        { name: "Handmade Box", category: "handmade" },
        { name: "Decorative Stand", category: "decorative" },
        { name: "Jewellery Box", category: "Jewellery" }
    ];

    function renderProducts(filteredProducts) {
        console.log("Rendering products:", filteredProducts);
        const productContainer = document.getElementById("product-container");
        if (productContainer) {
            productContainer.innerHTML = filteredProducts.map(product => `
                <div class="product-item">
                    <h3>${product.name}</h3>
                    <p>Category: ${product.category}</p>
                </div>
            `).join('');
        }
    }

    window.showCategory = function (category) {
        console.log("Showing category:", category);
        const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
        renderProducts(filteredProducts);
    };

    // Initial UI update with slight delay to ensure localStorage is set
    setTimeout(() => {
        updateUI();
        highlightCategory();
    }, 100);

    // Cleanup on page unload
    window.addEventListener('unload', () => {
        eventListeners.forEach(({ element, event, handler }) => {
            if (element) element.removeEventListener(event, handler);
        });
    });
});