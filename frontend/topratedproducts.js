// import Swiper from 'swiper';
// import 'swiper/css';

// const mostlyPurchasedProducts = [
//   { name: "Criss-cross Basket", image: "./images/bask-1.webp", price: "Rs 2,123", rating: 4.5, link: "buy-now.html" },
//   { name: "Wooden Cutlery Holder", image: "./images/stand-1.jpg", price: "Rs 3,813", rating: 5.0, link: "buy-now.html" },
//   { name: "Matki Candles", image: "./images/festive2.jpg", price: "Rs 2,450", rating: 4.0, link: "buy-now.html" },
//   { name: "Candelabrum", image: "./images/candle-5.jpg", price: "Rs 1,740", rating: 4.5, link: "buy-now.html" },
//   { name: "Trinket Trove", image: "./images/deco4.jpg", price: "Rs 2,457", rating: 4.0, link: "buy-now.html" },
//   { name: "Velvet Vault", image: "./images/deco5.webp", price: "Rs 8,457", rating: 4.0, link: "buy-now.html" },
//   { name: "Bird Pot", image: "./images/plant3.webp", price: "Rs 1,694", rating: 5.0, link: "buy-now.html" }
// ];


// function renderStars(rating) {
//   const full = Math.floor(rating);
//   const half = rating % 1 >= 0.5;
//   let stars = "";

//   for (let i = 0; i < full; i++) {
//     stars += '<i class="fas fa-star text-yellow-400 text-xs"></i>';
//   }
//   if (half) {
//     stars += '<i class="fas fa-star-half-alt text-yellow-400 text-xs"></i>';
//   }
//   while ((stars.match(/<i/g) || []).length < 5) {
//     stars += '<i class="far fa-star text-yellow-400 text-xs"></i>';
//   }

//   return stars;
// }


// const container = document.getElementById("mostly-purchased-container");

// mostlyPurchasedProducts.forEach(item => {
//   const card = document.createElement("div");
//   card.className = "swiper-slide flex-shrink-0 w-[45%] sm:w-[200px] md:w-[220px] p-2";

//   card.innerHTML = `
//     <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between p-3 h-full 
//                 min-h-[280px] sm:min-h-[320px] lg:min-h-[340px]">
//       <div class="w-full h-[120px] sm:h-[140px] md:h-[160px] overflow-hidden rounded-md mb-2">
//         <img 
//           src="${item.image}" 
//           alt="${item.name}" 
//           class="w-full h-full object-cover object-center rounded-md" 
//         />
//       </div>

//       <h2 class="text-xs sm:text-sm font-semibold text-center text-gray-800 line-clamp-2 leading-tight">
//         ${item.name}
//       </h2>

//       <p class="text-[10px] sm:text-xs text-center text-gray-500 mt-0.5 line-clamp-2 leading-snug">
//         Handcrafted woven cane lighting.
//       </p>

//       <div class="flex justify-center mt-1 gap-0.5 items-center">
//         ${renderStars(item.rating)}
//         <span class="text-[10px] sm:text-xs text-gray-500 ml-1">(${item.rating}/5)</span>
//       </div>

//       <p class="text-sm text-center font-semibold text-gray-800 mt-1">${item.price}</p>

//       <div class="flex justify-center gap-4 mt-1 text-lg text-gray-600">
//         <i class="fas fa-shopping-cart hover:text-black cursor-pointer"></i>
//         <i class="far fa-heart hover:text-red-500 cursor-pointer"></i>
//       </div>
//     </div>
//   `;

//   container.appendChild(card);
// });

// const swiper1 = new Swiper(".mySwiper1", {
//   loop: true,
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },
//   navigation: {
//     nextEl: "#next1",
//     prevEl: "#prev1",
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 2,
//       spaceBetween: 10,
//     },
//     480: {
//       slidesPerView: 2,
//       spaceBetween: 12,
//     },
//     640: {
//       slidesPerView: 3,
//       spaceBetween: 14,
//     },
//     768: {
//       slidesPerView: 4,
//       spaceBetween: 16,
//     },
//     1024: {
//       slidesPerView: 5,
//       spaceBetween: 20,
//     }
//   }
// });
