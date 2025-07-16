const restaurantMapping = {
  velvet: "velvetMenuContainer",
  celestial: "celestialMenuContainer",
  eclipse: "eclipseMenuContainer",
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
    categoryDishes += `
    <div class="menuItem" style="background-image: url('${dish.img}')">
      <div class="menuItemOverlay"></div>
      <div class="menuItemContent">
        <div class="menuItemText">
          <div class="menuItemName">${dish.name}</div>
          <div class="menuItemDesc">${dish.desc || ''}</div>
          <div class="menuItemPrice">${dish.price.toFixed(2).replace('.', ',')} €</div>
        </div>
        <button class="addToCartButton menuItemButton" data-category="${categoryName}" data-index="${index}">Hinzufügen</button>
      </div>
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
      (item) => `<div class="shoppingCartItem" data-item="${item.category}-${
        item.index
      }">
          <div class="itemName">${item.name}</div>
          <button class="decrease"><</button>
          <div class="itemQuantity">${item.quantity}</div>
          <button class="increase">></button>
          <div class="itemPrice">${(item.pricePerUnit * item.quantity).toFixed(
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
  const cartItemElement = event.target.closest(".shoppingCartItem");
  if (cartItemElement) {
    const itemData = cartItemElement.getAttribute("data-item");
    const [category, index] = itemData.split("-");
    shoppingCart.items = shoppingCart.items.filter(
      (item) => item.category !== category || item.index.toString() !== index
    );
    renderShoppingCart();
  }
}
