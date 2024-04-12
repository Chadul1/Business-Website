//import the productDataArray from the JSON file
import productDataArray from "../json/productData.json" assert { type: 'json' };

// The product class
    //Product Age Category const
    export const ProductAgeCategory = {
        ages2AndUp: "Ages 2+",
        ages5AndUp: "Ages 5+",
        ages10AndUp: "Ages 10+",
        ages16AndUp: "Ages 16+"
        }    

    //Product Condition const
    export const ProductCondition = {
        new: "New",
        used: "Used"
    }

    //Product price range const
    export const ProductPriceRange = {
        underTwentyFiveDollars: "Under $25",
        betweenTwentyFiveAndFiftyDollars:"$25-$50",
        betweenFiftyAndSeventyFiveDollars: "$50-$75",
        betweenSeventyFiveAndOneHundredDollars:"$75-$100",
        betweenOneHundredAndTwoHundredFiftyDollars:"$100-$250",
        overTwoHundredAndFiftyDollars: "$250+",
        anyPrice: "Any Price"
    }

    //Product type const
    export const ProductType = {
        set: "Brick Set",
        brick: "Individual Brick",
        bulk: "Bulk Bricks"
    }

    //Product array for the website
    export var productArray = [];

    //product array for deleted product - aka the product graveyard
    export var productGraveyardArray = [];

    //The number of products 
    export var productCounter = 0;

    // The product class
    export default class Product
    {
        //The product's price range field as an empty string
        productPriceRange = '';

        //Initializes a new instance of the product class
        constructor(productName, productType, productCondition, productAgeCategory, productPrice, productDescription, productQuantity)
        {
            //Initializes the product's ID
            productCounter++;
            this.productID = productCounter;

            //Initializes the product's name
            this.productName = productName;

            //Initializes the product's type
            this.productType = productType;

            //Initializes the product's condition
            this.productCondition = productCondition;

            //Initializes the product's age category
            this.productAgeCategory = productAgeCategory;

            //Initializes the product's price
            this.productPrice = productPrice;

            this.productStock = 10;

            //Initializes the product's price range
            if (this.productPrice < 25) 
            {
                this.productPriceRange = ProductPriceRange.underTwentyFiveDollars;
            }

            else if (this.productPrice < 50)
            {
                this.productPriceRange = ProductPriceRange.betweenTwentyFiveAndFiftyDollars;
            }
            
            else if (this.productPrice < 75)
            {
                this.productPriceRange = ProductPriceRange.betweenFiftyAndSeventyFiveDollars;
            }

            else if (this.productPrice < 100)
            {
                this.productPriceRange = ProductPriceRange.betweenSeventyFiveAndOneHundredDollars;
            }

            else if (this.productPrice < 250)
            {
                this.productPriceRange = ProductPriceRange.betweenOneHundredAndTwoHundredFiftyDollars;
            }

            else if (this.productPrice > 250)
            {
                this.productPriceRange = ProductPriceRange.overTwoHundredAndFiftyDollars
            }

            else
            {
                this.productPriceRange = ProductPriceRange.anyPrice;
            }

            //Initializes the product's description
            this.productDescription = productDescription;

            //Initializes the quantity of product available at its initialization
            this.productQuantity = productQuantity;

            //Add the product to the array of products
            productArray.push(this);
        }
    }

    //The method to transform JSON Data and SQL data into Products
    function transformDataToProducts()
    {
        //for every product in the json file, create the product and add it to the list
        productDataArray.productDataArray.forEach(product =>
            {
                new Product(product.productName, product.productType, product.productCondition, product.productAgeCategory, product.productPrice, product.productDescription, product.productQuantity);
            });
    }

    //Instantiate the products from the JSON data
    transformDataToProducts();

    //Show the list of products
    console.log(productArray);



    // Function to display filtered products
    function displayFilteredProducts(productArray) {
        // Select the parent element
        var parentElement = document.querySelector('#toyProducts');
        parentElement.innerHTML = ''; // This line clears all child elements
    
        // Select the template
        const template = document.querySelector('#productCardTemplate');
    
        // Iterate over each product in the productArray
        productArray.forEach(product => {

            if(product.productType === ProductType.set){
                parentElement = document.querySelector('#toyProducts');
            }
            else if (product.productType === ProductType.brick){
                parentElement = document.querySelector('#toyProducts2');
            }
            else if(product.productType === ProductType.bulk)
            {
                parentElement = document.querySelector('#toyProducts3');
            }
            
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

    

    function CreateSelectedProductPage() {

        console.log('Placing Product Data');

        // Define urlParams
        const urlParams = new URLSearchParams(window.location.search);
    
        // Retrieve pageID from URL parameters
        var pageID = parseInt(urlParams.get('productID'));
    
        console.log(pageID);
    
        productArray.forEach(product => {
                if (product.productID == pageID) {
                    // Update HTML elements with product details
                    document.getElementById('productName').textContent = product.productName;
                    document.getElementById('productPrice').textContent = 'Price: $' + product.productPrice;
                    document.getElementById('productCondition').textContent = 'Condition: ' + product.productCondition;
                    document.getElementById('productAge').textContent = 'Age Category: ' + product.productAgeCategory;
                    document.getElementById('productImg').src = `../media/products/Product${product.productID}.jpg`;
                    document.getElementById('productAvailability').textContent = GetStockString(product.productStock); 
                }});
    }

    function GetStockString(stock){
        var stockString = ""
        if(stock >= 5){
            stockString = "In Stock";
        }
        else if (stock < 5 && stock > 0){
            stockString = "Only a Few Left";
        }
        else if (stock === 0){
            stockString = "Out Of Stock";
        }

        return stockString;
    }

    try{
        displayFilteredProducts(productArray);       
    }
    catch{
        console.log("Cannot Display Filtered Toys at this time (are you on the right page?)")
    }
 
    CreateSelectedProductPage();
    
    
    