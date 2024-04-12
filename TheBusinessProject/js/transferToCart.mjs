//Utilize the Toy class
import Product, { ProductAgeCategory, ProductCondition, ProductPriceRange, ProductType, productArray } from "./product.mjs";

// Define an array anticipating addition of object later. Export it as well to save the data in other html pages.
let cart = [];

function CountTransferCartItems(){
  let count = 0

  // For each item in the shopping cart array, add the quantity count to the count variable.
  cart.forEach(product => {
    count += product.productQuantity
  });

  console.log(`The total amount of items in the cart is ${count}`)
  let cartCount = document.getElementById('cartCount');
  cartCount.textContent = count.toString();
}

// Parse the JSON string from local storage
const cartData = JSON.parse(localStorage.getItem('cart'));

// On the load of the page, add the existing cart items in the local storage to the cart array.
document.addEventListener("DOMContentLoaded", function CreateContent() {
  // Check if localStorage has a key for the cart
  if (localStorage.getItem('cart')) {
    try {
      // Loop through each item in the parsed data. Add each item to the local cart array.
      for (const item of cartData) {
        cart.push(item);
      }
    } catch (error) {
      console.error('Error parsing cart data from localStorage:', error);
    }
  }

  // Count the amount of items in the cart.
  CountTransferCartItems();
});

// Jquery event listener for when the button is clicked on the toy container, the toy is added to the checkoutArray.
$("button").click(function AddToCart(){

  // Get the card container
  let cardContainer = $(this).closest(".card");

  // Extract the product name from the targeted card
  let extractedName = cardContainer.find("#productName").text();


  // If the button is clicked on the selected toy, run the other logic to get the name from the selected toy page.
  if (extractedName == "")
  {
    // Get the card container
   cardContainer = $(this).closest(".product");

  // Extract the product name from the targeted card
   extractedName = cardContainer.find("#productName").text();
  }
    
    // If the clicked product name is equal to the product in the array, add the matching product object to the checkout array.
    productArray.forEach(product => {
      if (product.productName == extractedName) {

        // If there is an item already existing in the cart, get the index of the existing item.
        const existingItemIndex = cart.findIndex(
          (existingItem) => existingItem.productName === product.productName
        );
        
        // If the item doesn't exist in the cart already, add it.
        if (existingItemIndex === -1) {
          cart.push(product);
          product.productQuantity ++ ; // Set the quantity to 1 on the now existing item. (All products in the productData Json file initially have a quantity of 0.)
        } else {
          // If the item already exists, increment the existing item quantity by 1.
          cart[existingItemIndex].productQuantity++;
        }
        
        console.log(cart); // Display the new total array to the console.
        
        // Add the cart array to the local storate.
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`The cart array was updated to the Web Page local storage.`);
      }
    });

    // Count the amount of items in the cart.
    CountTransferCartItems();
  });