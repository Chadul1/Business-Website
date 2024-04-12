/// This file takes the product objects from the local storage and displays them in the cart.
const cartItems = []

/// Count's the amount of items in the cart.
function CartItemCount() {
  let count = 0

  // For each item in the shopping cart array, add the quantity count to the count variable.
  cartItems.forEach(product => {
    count += product.productQuantity
  });

  console.log(`The total amount of items in the cart is ${count}`)
  let cartCount = document.getElementById('cartCount');
  cartCount.textContent = count.toString();
}

// Parse the JSON string from local storage
const cartData = JSON.parse(localStorage.getItem('cart'));

document.addEventListener("DOMContentLoaded", function CreateContent() {
  // Check if localStorage has a key for the cart
  if (localStorage.getItem('cart')) {
    try {
      // Loop through each item in the parsed data
      for (const item of cartData) {
        if(item.productQuantity > 0){
          cartItems.push(item);
        }
        // Remove items that have a quantity less than 1.
        else{
          RemoveSelectedItem(item)
        }
      }
    } catch (error) {
      console.error('Error parsing cart data from localStorage:', error);
    }
  }

  // Create the elements for the items.
  CreateSelectedProductPage();

  // Refresh the count of items in the cart.
  CartItemCount();
});

// Auto generate a card containing the product's info. Do this for each item in the cart. The function gets the cart products from the cartItems array.
function CreateSelectedProductPage() {
  console.log('Placing Product Data');

  var cartContainer = document.getElementById("cartItemsContainer");

  const checkoutButton = cartContainer.querySelector("button");

  cartItems.forEach(product => {

    // Create the card element for each product
    const productCard = document.createElement("div");
    productCard.classList.add("card", "mb-3");
    productCard.style.maxWidth = "540px";

    // Build the card content
    const cardRow = document.createElement("div");
    cardRow.classList.add("row", "no-gutters");

    const imageCol = document.createElement("div");
    imageCol.classList.add("col-md-4");
    const productImg = document.createElement("img");
    productImg.classList.add("card-img");
    productImg.alt = "Product Image";
    productImg.id = "productImg";
    productImg.href = ""
    productImg.src = `../media/products/Product${product.productID}.png`;
    

    const detailsCol = document.createElement("div");
    detailsCol.classList.add("col-md-8");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const productName = document.createElement("h5");
    productName.classList.add("card-title");
    productName.id = "productName";
    productName.textContent = product.productName;

    const productPrice = document.createElement("p");
    productPrice.classList.add("card-text");
    productPrice.id = "productPrice";
    productPrice.style.marginBottom = "-10px";
    productPrice.textContent = `Price: $${product.productPrice * product.productQuantity}`;

    const quantityText = document.createElement("p");
    quantityText.classList.add("card-text");
    quantityText.style.marginTop = "15px";
    quantityText.style.marginBottom = "7px";
    quantityText.id = "productQuantity"
    quantityText.textContent = `Quantity: ${product.productQuantity}`; //

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.id = "increaseQty";
    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.id = "decreaseQty"

    cartContainer.insertBefore(productCard, checkoutButton)
    productCard.appendChild(cardRow);
    cardRow.appendChild(imageCol);
    imageCol.appendChild(productImg);
    cardRow.appendChild(detailsCol);
    detailsCol.appendChild(cardBody);
    cardBody.appendChild(productName);
    cardBody.appendChild(productPrice);
    cardBody.appendChild(quantityText);
    cardBody.appendChild(increaseButton);
    cardBody.appendChild(decreaseButton);
  });
}

/// On the press of the decrease button, remove one qty item at a time. If there is only one item left, delete the card.
$(document).on("click", "#decreaseQty", function() {
  // Get the closest parent card element
  const card = $(this).closest(".card");
  // Access the product name within that card
  const productName = card.find(".card-title").text();

  for (const item of cartItems){
    if(item.productName == productName){
      // Decrease quantity by 1 and reload the page to show changes.
        item.productQuantity--;
        // Update local storage with the new string
        localStorage.setItem('cart', JSON.stringify(cartData));

        // Reload the page to show the changes
        location.reload(true);
      }
  }
});

/// On the press of the decrease button, remove one qty item at a time. If there is only one item left, delete the card.
$(document).on("click", "#increaseQty", function() {
  // Get the closest parent card element
  const card = $(this).closest(".card");
  // Access the product name within that card
  const productName = card.find(".card-title").text();

  for (const item of cartItems){
    if(item.productName == productName){
      // Increase quantity by 1 and reload the page to show changes.
        item.productQuantity++;
        // Update local storage with the new string
        localStorage.setItem('cart', JSON.stringify(cartData));

        // Reload the page to show the changes
        location.reload(true);
      }
  }
});

// Use the passed in object name to iterate through each item in the array, and remove one of the matched objects from the array and the local storage.
function RemoveSelectedItem(objectToRemove) {
  // Initializing a counter to reflect the index of each element in the array.
  let i = 0;

  // Iterate though all items in the array.
  for (let i = 0; i < cartItems.length; i++) { 
    if (cartItems[i].productName == objectToRemove) { 
      // Clear the product from the array in local storage.
      cartData.splice(objectToRemove, 1);
  
      // Clear product from the cartItems array.
      cartItems.splice(objectToRemove, 1);

      // Update local storage with the new string
      localStorage.setItem('cart', JSON.stringify(cartData));

      // Reload the page to show the changes
      location.reload(true);

      // Break out of the loop after removing the product.
      break;
    }
  }
}

