//The navigation bar file
    //Reference: https://www.w3schools.com/bootstrap5/bootstrap_navbar.php
    //Reference: https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp

    //when the page loads, execute this function...
    document.addEventListener("DOMContentLoaded", function() {
        
        //Store the navbar HTML as a variable so we can inject it into the document automatically
        var navBarHTML = 
        `<!--The horizontal navigation bar -->
         <nav class="navbar navbar-expand-lg bg-light">

            <div class="container-fluid justify-content-between">
            
                <!-- The brand logo for the nav bar -->
                <a class="navbar-brand ms-2" href="#">
                    <img src="../media/LEGO Logo 1.png" alt="Brickz Brand Logo" style="width:80px;" class="rounded-pill"> 
                </a>

                <!--The button to toggles the vertical drop-down links on smaller screens-->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- The portion that collapses when it needs to -->
                <div class="collapse navbar-collapse  justify-content-end" id="collapsibleNavbar">
                    
                    <!-- Nav links -->
                    <ul class="navbar-nav mx-auto h4">

                        <li class="nav-item"> <a class="nav-link mx-5" href="../html/index.html">Home Page</a> </li>

                        <li class="nav-item"> 
                            <a class="nav-link mx-5" href="../html/aboutPage.html">About Our Company</a> 
                        </li>

                        <li class="nav-item"> 
                            <a class="nav-link mx-5" href="../html/productPage.html">Products</a> 
                        </li>

                        <li class="nav-item"> 
                            <a class="nav-link mx-5" href="../html/contactUsPage.html">Contact Us</a> 
                        </li>

                        <li class="nav-item"> 
                            <a class="nav-link mx-5" href="../html/logInAccount.html">Login</a> 
                        </li>

                        <li class="nav-item"> 
                            <a class="nav-link" href="../html/search.html">
                                <img src="../media/Icons/search.png" alt="Search" style="width:30px;">
                            </a>
                        </li>

                        <div class=" d-flex nav-item justify-content-start mx-5">
                            <a class="navlink" href="../html/shoppingCart.html" style="text-decoration: none;">
                                <p id="cartCount" style="color: white; background-color: crimson; padding-left: 5px; padding-right:5px; border-radius: 40px;">0<p>
                                <img src="../media/Icons/shoppingCart_Icon.jpg" alt="Shopping Cart" style="width:40px;" class="rounded-pill">
                            </a>
                        </div>
                    </ul>
                </div>
            </div>
         </nav>`

         //Insert the navbar at the top of the page
        document.body.insertAdjacentHTML("afterbegin", navBarHTML);

         var navBarFooterHTML = 
        `<!-- The footer nav bar -->
        <footer class="py-3 list-unstyled navbar-expand-sm">

            <!-- navigation links -->
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"> <a class="nav-link px-2 text-muted" href="../html/index.html">Home Page</a> </li>

                <li class="nav-item"> 
                    <a class="nav-link px-2 text-muted" href="../html/aboutPage.html">About Our Company</a> 
                </li>

                <li class="nav-item"> 
                    <a class="nav-link px-2 text-muted" href="../html/productPage.html">Products & Services</a> 
                </li>

                <li class="nav-item"> 
                    <a class="nav-link px-2 text-muted" href="../html/contactUsPage.html">Contact Us</a> 
                </li>

                <li class="nav-item"> 
                    <a class="nav-link px-2 text-muted" href="../html/careers.html">Careers</a> 
                </li>
            </li>
            </ul>
            
            <!--Company name-->
            <p class="text-center text-muted"> ©2024 Brickz, Inc</p>
        </footer>`
            
        //Insert the navbar at the top of the page
        document.body.insertAdjacentHTML("beforeend", navBarFooterHTML);
    });