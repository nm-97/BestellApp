function closeShoppingCart(params) {
  document.getElementById("shoppingCart").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", handleButtonClick);
});

function handleButtonClick(event) {
  const target = event.target;
  if (target.classList.contains("addToCartButton")) {
    addToCart(target.dataset.category, target.dataset.index);
  } else if (
    target.classList.contains("increase") ||
    target.classList.contains("decrease")
  ) {
    updateQuantity(target);
  } else if (target.id === "orderButton") {
    placeOrder();
  }
  renderShoppingCart();
}

const getDish = (category, index) =>
  eclipseData[0].menu[category]?.[index] || null;
function addToCart(category, index) {
  const dish = getDish(category, index);
  if (!dish) return;
  let existingItem = shoppingCart.items.find(
    (item) => item.category === category && item.index == index
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.items.push({
      category,
      index,
      name: dish.name,
      quantity: 1,
      pricePerUnit: dish.price,
    });
  }
}

function updateQuantity(target) {
  const cartItemElement = target.closest(".shopping-cart-item");
  const [category, index] = cartItemElement.dataset.item.split("-");
  const change = target.classList.contains("increase") ? 1 : -1;
  let cartItem = shoppingCart.items.find(
    (item) => item.category === category && item.index == index
  );
  if (!cartItem) return;
  cartItem.quantity += change;
  if (cartItem.quantity <= 0) {
    shoppingCart.items = shoppingCart.items.filter((item) => item !== cartItem);
  }
}
const shoppingCart = { items: [] };

function placeOrder() {
  shoppingCart.items = [];
  renderShoppingCart();
}

function toogleShoppingCart(params) {
  let shoppingCart = document.getElementById("shoppingCart");
  if (shoppingCart.style.display === "none") {
    shoppingCart.style.display = "block";
  } else {
    shoppingCart.style.display = "none";
  }
}
