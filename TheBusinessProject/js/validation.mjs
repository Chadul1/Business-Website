//References
    //[Select form validation] https://www.w3schools.com/js/js_validation.asp

//Validate the add product form
export function validateAddForm()
{
    //validate the product type select box
    var productTypeSelectOption = document.forms["addProductForm"]["productTypeSelectForm"].value;
    
        //if the user did not select an option
        if(productTypeSelectOption == "")
        {
            //do not validate the form 
            return false;
        }

    //validate the product condition select box
    var productConditionSelectOption = document.forms["addProductForm"]["productConditionSelectForm"].value;

        //if the user did not select an option
        if(productConditionSelectOption == "")
        {
            //do not validate the form
            return false;
        }

    //validate the product age category select box
    var productAgeCategorySelectOption = document.forms["addProductForm"]["productAgeCategorySelectForm"].value;

        //if the user did not select an option
        if(productAgeCategorySelectOption == "")
        {
            //do not validate the form
            return false;
        }

    //if none of the fields are invalid, tell the user the form is valid
    return true;
}


//Validate the edit product form
export function validateEditForm()
{
    //validate the product type select box
    var productTypeSelectOption = document.forms["editProductDataForm"]["productTypeEditForm"].value;
    
        //if the user did not select an option
        if(productTypeSelectOption == "")
        {
            //do not validate the form 
            return false;
        }

    //validate the product condition select box
    var productConditionSelectOption = document.forms["editProductDataForm"]["productConditionEditForm"].value;

        //if the user did not select an option
        if(productConditionSelectOption == "")
        {
            //do not validate the form
            return false;
        }

    //validate the product age category select box
    var productAgeCategorySelectOption = document.forms["editProductDataForm"]["productAgeCategoryEditForm"].value;

        //if the user did not select an option
        if(productAgeCategorySelectOption == "")
        {
            //do not validate the form
            return false;
        }

    //if none of the fields are invalid, tell the user the form is valid
    return true;
}
