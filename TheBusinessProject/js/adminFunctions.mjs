//References:
    //[Confirm prompt] https://www.w3schools.com/jsref/met_win_confirm.asp

//import boostrap
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";

//Utilize the Toy class
import Product, { ProductAgeCategory, ProductCondition, ProductType, productArray, productGraveyardArray} from "./product.mjs";

//Utilize the form validation functions
import {validateAddForm, validateEditForm} from "./validation.mjs";

//Make sure a bunch of elements are available

    //Store the form options and use the selected option to display a form
    document.getElementById("requestedActionForm");

        //add product form
        document.getElementById("addProductForm")

        //Edit product form
        document.getElementById("editProductDataForm");

        //Delete product form
        var deleteProductForm = document.getElementById("deleteProductDataForm");

        //When the form is selected, call SelectedForm
        $('#requestedActionForm').on('change', function(){

            SelectedForm($('#requestedActionForm option:selected'));
        });

    //Store the image container for product CRUD forms
        //the HTML container that holds the image of the product when editing
        var productImage_Edit = document.getElementById("productImage_Edit");

        //the HTML container that holds the image of the product when deleting
        var productImage_Delete = document.getElementById("productImage_Delete");

    //Store the modal pop-up window
    var deleteModal = $('#deleteModal');
    var deleteButton = $('#deleteModalButton_Delete');
    var closeButton = $('#deleteModalButton_Close');

    //form fields for the product
        //The age category select
        document.getElementById("ageCategorySelectForm");

            //Ages 2+ category option
            document.getElementById("ages2AndUpCategoryOption");

            //Ages 5+ category option
            document.getElementById("ages5AndUpCategoryOption");

            //Ages 10+ category option
            document.getElementById("ages10AndUpCategoryOption");

            //Ages 16+ category option
            document.getElementById("ages16AndUp[CategoryOption");

            //Determine the selected age category
            $('#ageCategorySelectForm').on("change", function() 
            {
                DetermineCategory($('#ageCategorySelectForm option:selected'));
            });

//Add the product to the database with the input values
function AddProductForm()
{
    //display the add toy form
    DisplayForm("addProduct");

    //create a new toy with the inputs and add it to the toy array when it is submitted
    $('#addProductForm').on("submit", 

    function AddNewProduct(event)
    {
        //only add the product if the form was validated
        if(validateAddForm() == true)
        {

            newProduct = null;

            //Store the product name input
            var productName = document.getElementById("productName_Input").value;

            //Store the product type
            var productType = DetermineProductType();

                //The function that is called when the product type select is changed.
                function DetermineProductType()
                {  
                    var typeReturn;

                    var selectedOption = $('#productTypeSelectForm option:selected');

                    //using that information, assign the right product type
                    switch(selectedOption[0].value)
                    {
                        case ProductType.bulk:
                            typeReturn = ProductType.bulk;
                            break;
                                    
                        case ProductType.set:
                            typeReturn = ProductType.set
                            break;

                        default:
                            typeReturn = "Unknown";
                            break;
                    }
                
                return typeReturn;
                }

            //Store the product's condition
            var productCondition = DetermineProductCondition();

                //The function that is called when the product condition select is changed.
                function DetermineProductCondition()
                {  
                    var conditionReturn;
        
                    var selectedOption = $('#productConditionSelectForm option:selected');
        
                    //using that information, assign the right product type
                    switch(selectedOption[0].value)
                    {
                        case ProductCondition.new:
                            conditionReturn = ProductCondition.new;
                            break;
                                    
                        case ProductCondition.used:
                            conditionReturn = ProductCondition.used;
                            break;
        
                        default:
                            conditionReturn = "Unknown";
                            break;
                    }
                    
                    return conditionReturn;
                }


            //Store the product's age category
            var productAgeCategory = DetermineProductAgeCategory();

                //The function that is called when the product condition select is changed.
                function DetermineProductAgeCategory()
                {  
                    var ageCategoryReturn;
        
                    var selectedOption = $('#productAgeCategorySelectForm option:selected');
        
                    //using that information, assign the right product type
                    switch(selectedOption[0].value)
                    {
                        case ProductAgeCategory.ages2AndUp:
                            ageCategoryReturn = ProductAgeCategory.ages2AndUp;
                            break;
                                    
                        case ProductAgeCategory.ages5AndUp:
                            ageCategoryReturn = ProductAgeCategory.ages5AndUp;
                            break;

                        case ProductAgeCategory.ages10AndUp:
                            ageCategoryReturn = ProductAgeCategory.ages10AndUp;
                            break;

                        case ProductAgeCategory.ages16AndUp:
                            ageCategoryReturn = ProductAgeCategory.ages16AndUp;
                            break;
        
                        default:
                            ageCategoryReturn = "Unknown";
                            break;
                    }
                    
                    return ageCategoryReturn;
                }


            //Store the product price input
            var productPrice= document.getElementById("productPrice_Input").value;

            //Store the description of the product
            var productDescription = document.getElementById("productDescription_Input").value;

            //Store the available quantity of the product
            var productQuantity = document.getElementById("productQuantity_Input").value;

                //Create a new product and add it to the database
                var newProduct = new Product(productName, productType, productCondition, productAgeCategory, productPrice, productDescription, productQuantity);

                //If the product was created as intended above
                if(newProduct != null)
                {
                    //Add the new product to the list of products
                    productArray.push(newProduct);

                    SuccessMessage("add", event);
                }
        }

        //if the form was not valid
        else
        {
            //tell the user that there was an issue
            SuccessMessage("invalid", event);

            return false;
        }
    });
}

//Delete the selected product
function DeleteProductForm()
{
    //display the delete product form
    DisplayForm("deleteProduct");

    //get the product
    DisplayProducts(deleteProductForm);

    //Set the displayed image to the image of the product
    productImage_Delete.src = `../media/fallinglegos.png`;

    //the selected product
    var selectedProduct = null;

    //the array counter variable
    var counter = -1;


    //delete the product
    $('#selectDeleteProductContainer').on('change', function selectProductData(){

        //store the selected product
        var selectedOption = $('#selectDeleteProductContainer option:selected');

        //allow every product in the array to be displayed for editing
        productArray.forEach(currentProduct =>
            {
                //increase the counter for each product it loops through
                counter++;

                //stores the current product
                var currentProduct;
        
                //if the selected option has the same name as the product
                if(selectedOption[0].value == currentProduct.productName)
                {
                    //thenwe have found the product we are looking for
                    selectedProduct = currentProduct;

                    //Set the displayed image to the image of the product
                    productImage_Delete.src = `../media/products/Product${selectedProduct.productID}.png`;
                }
            });
    });

    $('#deleteProductDataForm').on('submit', function DeleteProductData(event){

        //prevent the page from reloading 
        event.preventDefault();

        //have the modal show custom text prompts
        $('#deletePrompt').text(`Are you sure that you would like to delete the '${selectedProduct.productName}' product?`);

        //Show the delete prompt modal
         deleteModal.modal('show');
         
         //only delete the product if they confirm
         deleteButton.on("click", function deleteProduct()
         {
            //close the modal window
            deleteModal.modal('hide');

            //remove the product from the product Array
            var deletedProduct = productArray.splice(counter, 1);

            //store the deleted toys in the product graveyard... just in case we accidently deleted the wrong thing and want it back later
            productGraveyardArray.push(deletedProduct);

            //hide the form
            deleteProductFormContainer.classList.remove("active");
            deleteProductFormContainer.classList.add("hidden");

            //tell the user the product was deleted successfully
            SuccessMessage('delete', event);
         });

         //If they do not click delete, close the pop-up and wait
         closeButton.on("click", function closeModal()
        {
            //close the modal window
            deleteModal.modal('hide');
        })
    });
}

function DisplayForm(action)
{
    switch(action)
    {
        case("addProduct"):
            //if we want to see the addProduct form, make it active - if it wasn't already
            if(!addProductFormContainer.classList.contains("active"))
            {
                //add active to the addProductForm class
                addProductFormContainer.classList.add("active");

                //if the edit product was active, make it no longer active
                if(editProductFormContainer.classList.contains("active"))
                {
                    //remove the active class from the editProductForm class list
                    editProductFormContainer.classList.remove("active");
                    editProductFormContainer.classList.add("hidden");
                }

                //if the delete product was active, make it no longer active
                if(deleteProductFormContainer.classList.contains("active"))
                {
                    //remove the active class from the deleteProductForm class list
                    deleteProductFormContainer.classList.remove("active");
                    deleteProductFormContainer.classList.add("hidden");
                }

                break;
            }

        case("editProduct"):
            //if we want to see the editProduct form, make it active - if it wasn't already
            if(!editProductFormContainer.classList.contains("active"))
            {
                //add active to the editProductForm class
                editProductFormContainer.classList.add("active");

                //if the add product was active, make it no longer active
                if(addProductFormContainer.classList.contains("active"))
                {
                    //remove the active class from the addProductFormContainer class list
                    addProductFormContainer.classList.remove("active");
                    addProductFormContainer.classList.add("hidden");
                }

                //if the delete product was active, make it no longer active
                if(deleteProductFormContainer.classList.contains("active"))
                {
                    //remove the active class from the deleteProductForm class list
                    deleteProductFormContainer.classList.remove("active");
                    deleteProductFormContainer.classList.add("hidden");
                }

                break;
            }

        case("deleteProduct"):
            //if we want to see the deleteProduct form, make it active - if it wasn't already
            if(!deleteProductFormContainer.classList.contains("active"))
            {
                //add active to the deleteToyForm class
                deleteProductFormContainer.classList.add("active");

                //if the edit product was active, make it no longer active
                if(editProductFormContainer.classList.contains("active"))
                {
                    //remove the active class from the editProductForm class list
                    editProductFormContainer.classList.remove("active");
                    editProductFormContainer.classList.add("hidden");
                }

                //if the add product container was active, make it no longer active
                if(addProductFormContainer.classList.contains("active"))
                {
                    //remove the active class from the addProductFormContainer class list
                    addProductFormContainer.classList.remove("active");
                    addProductFormContainer.classList.add("hidden");
                }

                break;
            }

            case("none"):

                //hide the delete form
                if(!deleteProductFormContainer.classList.contains("active"))
                {
                    deleteProductFormContainer.classList.remove("active");
                }

                deleteProductFormContainer.classList.add("hidden");

                //hide the edit form
                if(editProductFormContainer.classList.contains("active"))
                {
                    editProductFormContainer.classList.remove("active");
                }

                editProductFormContainer.classList.add("hidden");

                //hide the add form
                if(addProductFormContainer.classList.contains("active"))
                {
                    addProductFormContainer.classList.remove("active");
                }

                addProductFormContainer.classList.add("hidden");
                
                break;
    }
}

//Get the products for the user to choose from [Reference: W3 Schools]
function DisplayProducts(selectForm)
{
    //allow every product in the array to be displayed for editing
    productArray.forEach(currentProduct =>
    {
        //stores the current product
        var currentProduct;

        //create a new option for the document
        selectForm[0].appendChild(new Option(`${currentProduct.productName}`));
    });
}


//Display the current product values and allow them to be edited [Reference: https://stackoverflow.com/questions/4590311/set-option-selected-attribute-from-dynamic-created-option]
function DisplayProductValues(selectedProduct)
{
    //Set the product name form value
    document.getElementById("productName_Edit").value = selectedProduct.productName;

    //Set the product price input form value
    document.getElementById("productPrice_Edit").value = selectedProduct.productPrice;

    //Store the product type
    var productType = selectedProduct.productType;

        //store the select box for the product type
        var productTypeEditForm = document.getElementById("productTypeEditForm");

        //have the option that corresponds with the product's type be displayed
        switch(productType)
        {
            case "Brick Set":
                productTypeEditForm.options[1].selected = true;
                break;

            case "Bulk Bricks":
                productTypeEditForm.options[2].selected = true;
                break;

            default:
                productTypeEditForm.options[0].selected = true;
                break;
        }

    //Store the product condition
    var productCondition = selectedProduct.productCondition;

        //store the select box for the product type
        var productConditionEditForm = document.getElementById("productConditionEditForm");

        //have the option that corresponds with the product's type be displayed
        switch(productCondition)
        {
            case "New":
                productConditionEditForm.options[1].selected = true;
                break;

            case "Used":
                productConditionEditForm.options[2].selected = true;
                break;

            default:
                productConditionEditForm.options[0].selected = true;
                break;
        }

    //Store the age category of the product
    var productAgeCategory = selectedProduct.productAgeCategory;

        //store the select box for the age category
        var productAgeCategoryEditForm = document.getElementById("productAgeCategoryEditForm");

        //have the option that corresponds with the product's age category be displayed
        switch(productAgeCategory)
        {
            case "Ages 2+":
                productAgeCategoryEditForm.options[1].selected = true;
                break;
            
            case "Ages 5+":
                productAgeCategoryEditForm.options[2].selected = true;
                break;

            case "Ages 10+":
                productAgeCategoryEditForm.options[3].selected = true;
                break;

            case "Ages 16+":
                productAgeCategoryEditForm.options[4].selected = true;
                break;

            default:
                productAgeCategoryEditForm.options[0].selected = true;
                break;
        }

    //Store the description of the product
    document.getElementById("productDescription_Edit").value = selectedProduct.productDescription;

    //Store the available quantity of the product
    document.getElementById("productQuantity_Edit").value = selectedProduct.productQuantity;

    //Set the displayed image to the image of the product
     productImage_Edit.src = `../media/products/Product${selectedProduct.productID}.png`;
}

//When the edit product is selected, the form is generated
function EditProductForm()
{
    //Set the displayed image to the placeholder image
    productImage_Edit.src = `../media/fallinglegos.png`;

    //display the edit product form
    DisplayForm("editProduct");

    //display the products to select from
    DisplayProducts(editProductForm);

    //find the selected product when a product is selected
    $('#editProductSelectForm').on('change', function FindProductData(){

        //the selected product from the form
        var selectedOption = $('#editProductSelectForm option:selected');

        //the selected product
        var selectedProduct;

        //allow every product in the array to be displayed for editing
        productArray.forEach(currentProduct =>
            {
                //stores the current product
                var currentProduct;
        
                //if the selected option has the same name as the product
                if(selectedOption[0].value == currentProduct.productName)
                {
                    //Then we have the product we were looking for
                    selectedProduct = currentProduct;
                }
            });

        //Edit the selected product
        DisplayProductValues(selectedProduct);
    });

    //when the form for editting products is submitterd
    $('#editProductDataForm').on('submit', function(event) {

        //if the edit form was validated
        if(validateEditForm() == true)
        {
            //tell the user the product was edited
            SuccessMessage('edit', event);
        }

        //tell the user what was not validated
        else
        {
            SuccessMessage('invalid', event);

            return false;
        }
    });
}

//The function that is called when the request action select is changed.
function SelectedForm(form)
{  
    //using that information, display the correct form
    switch(form[0].value)
    {
        case "addProduct":
            AddProductForm();
            break;

        case "editProduct":
            EditProductForm();
            break;
        
        case "deleteProduct":
            DeleteProductForm();
            break;
        
        default:
            DisplayForm("none");
            break;
    }  
}

//Display an alert banner for edit, add, and invalid form submissions
function SuccessMessage(command, event)
{
    //the success alert banner for product edit form
    var productEditSuccessAlert =  document.getElementById('productEditSuccessAlert');

    //the success alert banner for product add form
    var productAddSuccessAlert =  document.getElementById('productAddSuccessAlert');

    //the success alert banner for product delete form
    var productDeleteSuccessAlert = document.getElementById('productDeleteSuccessAlert');

    //the invalid alert banner for add and edit forms
    var productInvalidAlert =  document.getElementById('invalidAlert');

    switch(command)
    {
        case 'add':

            //prevent the window from refreshing 
            event.preventDefault();

            //make the product success alert active
            productAddSuccessAlert.classList.remove('hidden');
            productAddSuccessAlert.classList.add('active');

            //if the invalid alert is active, make it hidden
            if(productInvalidAlert.classList.contains('active'))
            {
                productInvalidAlert.classList.remove('active');
                productInvalidAlert.classList.add('hidden');
            }

            //have the window fade out the banner after 2 seconds
            setTimeout(function()
            {
                //fade out the banner by making it no longer active
                if(productAddSuccessAlert.classList.contains('active'))
                {
                    productAddSuccessAlert.classList.remove('active');
                    productAddSuccessAlert.classList.add('hidden');
                }
            }, "2000");

            break;

        case 'edit':

            //prevent the window from refreshing
            event.preventDefault();

            //make the product success alert active
            productEditSuccessAlert.classList.remove('hidden');
            productEditSuccessAlert.classList.add('active');

            //if the invalid alert is active, make it hidden
            if(productInvalidAlert.classList.contains('active'))
            {
                productInvalidAlert.classList.remove('active');
                productInvalidAlert.classList.add('hidden');
            }

            //have the success banner fade out after 2 seconds
            setTimeout(function()
            {
                //the banner is no longer active and fades out
                if(productEditSuccessAlert.classList.contains('active'))
                {
                    productEditSuccessAlert.classList.remove('active');

                    productEditSuccessAlert.classList.add('hidden');
                }
            }, "2000");
            
            break;

        case 'delete':

            //prevent the window from refreshing
            event.preventDefault();

            //make the product success alert active
            productDeleteSuccessAlert.classList.remove('hidden');
            productDeleteSuccessAlert.classList.add('active');

            deleteModal.modal('show');

            //have the success banner fade out after 2 seconds
            setTimeout(function()
            {
                //the banner is no longer active and fades out
                if(productDeleteSuccessAlert.classList.contains('active'))
                {
                    productDeleteSuccessAlert.classList.remove('active');

                    productDeleteSuccessAlert.classList.add('hidden');
                }
            }, "2000");
            
            break;

        case "invalid":

            //make the invalid alert active
            productInvalidAlert.classList.remove('hidden');
            productInvalidAlert.classList.add('active');

            break;
    }
};