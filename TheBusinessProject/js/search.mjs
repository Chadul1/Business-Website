import Product, { ProductAgeCategory, ProductCondition, ProductPriceRange, ProductType, productArray } from "./product.mjs";


// Function to display filtered products
function displayFilteredProducts(productArray) {
    // Select the parent element
    var parentElement = document.querySelector('#toyProducts');
    parentElement.innerHTML = ''; // This line clears all child elements

    // Select the template
    const template = document.querySelector('#productCardTemplate');

    // Iterate over each product in the productArray
    productArray.forEach(product => {
        
        // Clone the template
        const clone = document.importNode(template.content, true);

        const productImageURL = `../media/products/Product${product.productID}.png`;

        // Update card content with product information
        clone.querySelector('.card-img-top').src = productImageURL;
        clone.querySelector('.card-title').textContent = product.productName;
        clone.querySelector('.card-text').textContent = `$${product.productPrice}`;

        // Add click event listener to the product image
    const productLink = clone.querySelector('.product-link');
    productLink.href = `../html/selectedLegoPage.html?productID=${product.productID}`; // Dynamic product page URL
    productLink.addEventListener('click', event => {
        event.preventDefault(); // Prevent default action of link click
        window.location.href = productLink.href; // Redirect to the product page
    });

        // Append the cloned card to the parent element
        parentElement.appendChild(clone);
    });
}

let filteredToys = [];
let searchedToys = [];

// Get references to select elements
var priceRangeSelect = document.getElementById('priceRange');
var typeSelect = document.getElementById('productType');
var ageCategorySelect = document.getElementById('ageCategory');
var conditionSelect = document.getElementById('condition');
var searchBar = document.getElementById('searchInput');

// Add event listeners to detect changes in the selected options
$('#priceRange').on('change', applyFilters);
$('#productType').on('change', applyFilters);
$('#ageCategory').on('change', applyFilters);
$('#condition').on('change', applyFilters);

window.onload = function(){
  applyFilters();
}

// Function to add toy to filtered toys array
function addToFilteredToys(toy) {
  // Check if toy is not already in list by comparing IDs
  if (!filteredToys.some(filteredToy => filteredToy.productID === toy.productID)) {
    filteredToys.push(toy);
  }
}

// Function to log filtered toys
function logFilteredToys() {
  console.log("Filtered Legos:" + filteredToys.length);
}

// Function to apply filters
function applyFilters() {
  console.log('Applying filters');

  filteredToys = [];

  productArray.forEach(function(toy) {
    var passesFilters = true; // Flag to check if toy passes all filters

    // Check price range filter
    if (priceRangeSelect.value !== 'all' && priceRangeSelect.value !== toy.productPriceRange) {
      passesFilters = false;
    }

    // Check type filter
    if (typeSelect.value !== 'all' && typeSelect.value !== toy.productType) {
      passesFilters = false;
    }

    // Check age range filter
    if (ageCategorySelect.value !== 'all' && ageCategorySelect.value !== toy.productAgeCategory) {
      passesFilters = false;
    }
    

    // Check condition filter
    if (conditionSelect.value !== 'all' && conditionSelect.value !== toy.productCondition) {
      passesFilters = false;
    }

    if (passesFilters) {
      addToFilteredToys(toy);
    }
  });

  logFilteredToys();
  displayFilteredProducts(filteredToys);
}

// Event listener for search button
document.getElementById('searchButton');

$('#searchButton').on('click', function search()
{
  {
    let searchTerm = searchBar.value.toLowerCase();
  
    // Function to apply filters
    searchedToys = [];

    filteredToys.forEach(function(toy) {
      if (toy.productName.toLowerCase().includes(searchTerm)) {
        searchedToys.push(toy);
      }
    });
  
    displayFilteredProducts(searchedToys);
  }
});

//start call to funtions