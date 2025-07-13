const restaurantMapping = {
  velvet: "velvet_menu_container",
  celestial: "celestial_menu_container",
  eclipse: "eclipse_menu_container",
};

function renderMenu(data, restaurantName) {
  const restaurant = data[0];
  const containerId = restaurantMapping[restaurantName];
  const menuContainer = document.getElementById(containerId);

  if (menuContainer) {
    menuContainer.innerHTML += renderMenuCategories(restaurant);
  } else {
    console.error(`Container für ${restaurantName} nicht gefunden.`);
  }
}

function renderMenuCategories(restaurant) {
  let menuTemplate = "";

  Object.keys(restaurant.menu).forEach((category) => {
    menuTemplate += getMenuCategorys(category, restaurant.menu[category]);
  });

  return menuTemplate;
}

function renderMenu(menu) {
  let html = "";
  html += renderCategory(menu.Vorspeisen, "Vorspeisen");
  html += renderCategory(menu.Hauptspeisen, "Hauptspeisen");
  html += renderCategory(menu.Nachspeisen, "Nachspeisen");
  return html;
}

function renderCategory(dishes, categoryName) {
  let categoryDishes = `<div class="${categoryName}">
                          <h2>${categoryName}</h2>
                          <div class="menu">`;
  dishes.forEach((dish, index) => getDishHTML(dish, categoryName, index));

  function getDishHTML(dish, categoryName, index) {
    categoryDishes += `<div class="menu-item">
    <img class="menu-item-img" src="${dish.img}" alt="${dish.alt}">
    <h3 class="menu-item-name">${dish.name}</h3>
    <p class="menu-item-price">Preis: ${dish.price
      .toFixed(2)
      .replace(".", ",")} €</p>
    <button class="addToCartButton menu-item-button" data-category="${categoryName}" data-index="${index}">In den Warenkorb</button>
      </div>`;
  }
  categoryDishes += `</div>
                        </div>`;
  return categoryDishes;
}

function toogleShoppingCart(params) {
  let shoppingCart = document.getElementById("shoppingCart");
  if (shoppingCart.style.display === "none") {
    shoppingCart.style.display = "block";
  } else {
    shoppingCart.style.display = "none";
  }
}

function generateShoppingCartHTML(items) {
  return items
    .map(
      (item) => `<div class="shopping-cart-item" data-item="${item.category}-${
        item.index
      }">
          <div class="item-name">${item.name}</div>
          <button class="decrease"><</button>
          <div class="item-quantity">${item.quantity}</div>
          <button class="increase">></button>
          <div class="item-price">${(item.pricePerUnit * item.quantity).toFixed(
            2
          )} €</div>
          <button onclick="removeFromCart(event)" class="remove">X</button>
        </div>`
    )
    .join("");
}

function renderShoppingCart() {
  const cartItemsElement = document.getElementById("cartItems");
  cartItemsElement.innerHTML = generateShoppingCartHTML(shoppingCart.items);
  const totalSum = shoppingCart.items.reduce(
    (sum, item) => sum + item.pricePerUnit * item.quantity,
    0
  );
  document.getElementById("totalPrice").innerText = totalSum.toFixed(2);
}

function removeFromCart(event) {
  const cartItemElement = event.target.closest(".shopping-cart-item");
  if (cartItemElement) {
    const itemData = cartItemElement.getAttribute("data-item");
    const [category, index] = itemData.split("-");
    shoppingCart.items = shoppingCart.items.filter(
      (item) => item.category !== category || item.index.toString() !== index
    );
    renderShoppingCart();
  }
}
