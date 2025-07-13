const restaurantData = [
  {
    title: "The Velvet Fork",
    link: "../index/velvet.html",
    image: "../img/velvet/logo.png",
    rating: 3,
    ratingCount: 35534,
    deliveryTime: 45,
    paymentIcons: ["../icons/card-50.png", "../icons/cash-100.png"],
  },
  {
    title: "Eclipse Dining",
    image: "../img/eclipse/logo.jpg",
    link: "../index/eclipse.html",
    rating: 4,
    ratingCount: 23421,
    deliveryTime: 23,
    paymentIcons: ["../icons/card-50.png", "../icons/cash-100.png"],
  },
  {
    title: "Celestial Table",
    link: "../index/celestial.html",
    image: "../img/celestial/logo.jpg",
    rating: 5,
    ratingCount: 25456,
    deliveryTime: 50,
    paymentIcons: ["../icons/card-50.png", "../icons/cash-100.png"],
  },
];

function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars +=
      i < rating
        ? '<span class="fa fa-star checked"></span>'
        : '<span class="fa fa-star"></span>';
  }
  return stars;
}

function generatePaymentIcons(paymentIcons) {
  return paymentIcons
    .map((icon) => `<img src="${icon}" alt="Payment icon">`)
    .join("");
}

function generateRestaurantHTML({
  title,
  link,
  image,
  rating,
  ratingCount,
  deliveryTime,
  paymentIcons,
}) {
  return `<div class="restaurant_box">
      <div class="restaurant_header">
        <img class="restaurant_logos" src="${image}" alt="${title} logo">
        <div class="restaurant_info">
          <h3>${title}</h3>
          </div>
          </div>
          
          <div class="restaurant_details">
          <div class="rating">
            ${generateStars(rating)}
            <span class="rating-text">${ratingCount} Bewertungen</span>
          </div>
        <div class="delivery_info">
          <div class="delivery_time">
            <img src="../icons/time-span-32.png" alt="Delivery time icon">
            <span>${deliveryTime}-69 min</span>
          </div>
          <div class="payment_methods">
            ${generatePaymentIcons(paymentIcons)}
          </div>
        </div>
        
        <div class="restaurant_actions">
          <a href="${link}" class="order_button">
            <button>Bestellen</button>
          </a>
        </div>
      </div>
    </div>`;
}

function getRestaurantSection() {
  return `
    <div id="restaurants" class="restaurant_content">
      <h1>Bestellen Sie Ihr Fine Dine Erlebnis zu sich!</h1>
      <h2>Frisch zubereitet und schnell geliefert, direkt vor Ihre Haustür oder Büro.</h2>
      ${restaurantData.map(generateRestaurantHTML).join("")}
    </div>`;
}

function renderRestaurantSection() {
  document.getElementById("restaurant_content").innerHTML +=
    getRestaurantSection();
}
