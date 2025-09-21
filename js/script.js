const showFormButton = document.getElementById("add-new-item");
const addNewItemForm = document.getElementById("add-new-item-form");
const addNewItemContainer = document.getElementById("add-new-item-container");

var productName = document.getElementById("item-name");
var productPrice = document.getElementById("item-price");
var productImage = document.getElementById("item-image");
var productDescription = document.getElementById("item-description");
var productCategory = document.getElementById("item-category");
var itemSubmitButton = document.getElementById("item-submit-button");
var shopItemsArea = document.getElementById("shop-items-area");
var adminShopItemsArea = document.getElementById("admin-shop-items-area");

var globalIdx;
var productList;
var cartList = [];
if (localStorage.getItem("productList") == null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem("productList"));
}


// add new product
function addProduct(event) {
    if (itemSubmitButton.innerHTML === "Update") {
        productList[globalIdx].name = productName.value;
        productList[globalIdx].price = productPrice.value;
        productList[globalIdx].description = productDescription.value;
        productList[globalIdx].category = productCategory.value;

        if (productImage.files.length > 0) {
            productList[globalIdx].image = "img/products/" + productImage.files[0].name;
        }
        itemSubmitButton.innerHTML = "Add Item";
    } else {
        var newProduct = {
            name: productName.value,
            price: productPrice.value,
            image: productImage.files.length > 0 ? "img/products/" + productImage.files[0].name : "img/products/default.jpg",
            description: productDescription.value,
            category: productCategory.value,
        };
        productList.push(newProduct);
        console.log(newProduct);
    }
    saveToLocalStorage(productList);
    clearForm();
    fetchAdminProducts();
}

// clear form
function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productImage.value = "";
    productDescription.value = "";
    productCategory.value = "";
}

// delete product
function deleteProduct(idx) {
    productList.splice(idx, 1);
    saveToLocalStorage(productList);
    fetchAdminProducts();
    console.log("deleted");
}

// save to local storage
function saveToLocalStorage(plist) {
    localStorage.setItem("productList", JSON.stringify(plist));
}

// fetch admin products
function fetchAdminProducts() {
    const storedList = JSON.parse(localStorage.getItem("productList"));
    productList = Array.isArray(storedList) ? storedList : [];
    fetchAdminProductsFromList(productList);
}

function fetchAdminProductsFromList(plist) {
    var eachProduct = "";
    for (let i = 0; i < plist.length; i++) {
        eachProduct += `
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div class="card ">
                <img src="../${plist[i].image}" alt="${plist[i].name}" class="card-img-top product-img">
                <div class="card-body">
                    <h5 class="card-title">${plist[i].name}</h5>
                    <p class="card-text">${plist[i].description}</p>  
                    <p class="fw-bold price">${plist[i].price}$</p>
                    <p class="fs-sm">Category: ${plist[i].category}</p>
                    <div class="w-100 d-flex justify-content-between">
                        <a href="#" class="btn btn-warning edit-item w-50 m-2">Edit</a>
                        <a href="#" id="delete-item" class="btn btn-danger w-50 m-2" onclick="deleteProduct(${i})">Delete</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.getElementById("admin-shop-items-area").innerHTML = eachProduct;
    }
}

// fetch home products
function fetchProducts() {
    const storedList = JSON.parse(localStorage.getItem("productList"));
    productList = Array.isArray(storedList) ? storedList : [];
    fetchProductsFromList(productList);
}

function fetchProductsFromList(plist) {
    var eachProduct = "";
    for (let i = 0; i < plist.length; i++) {
        eachProduct += `
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div class="card ">
                <img src="${plist[i].image}" alt="${plist[i].name}" class="card-img-top product-img">
                <div class="card-body">
                    <h5 class="card-title">${plist[i].name}</h5>
                    <p class="card-text">${plist[i].description}</p>  
                    <p class="fw-bold price">${plist[i].price}$</p>
                    <p class="fs-sm">Category: ${plist[i].category}</p>
                    <div class="w-100 d-flex justify-content-between">
                        <a href="pages/item.html" class="btn btn-warning">Show Item</a>
                        <a href="pages/cart.html" class="btn btn-success">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        if (window.location.pathname !== "/admin.html") {
            document.getElementById("shop-items-area").innerHTML = eachProduct;
        }
    }
}

// fetch shop products
function fetchShopProducts() {
    const storedList = JSON.parse(localStorage.getItem("productList"));
    productList = Array.isArray(storedList) ? storedList : [];
    fetchShopProductsFromList(productList);
}

function fetchShopProductsFromList(plist) {
    var eachProduct = "";
    for (let i = 0; i < plist.length; i++) {
        eachProduct += `
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div class="card ">
                <img src="../${plist[i].image}" alt="${plist[i].name}" class="card-img-top product-img">
                <div class="card-body">
                    <h5 class="card-title">${plist[i].name}</h5>
                    <p class="card-text">${plist[i].description}</p>  
                    <p class="fw-bold price">${plist[i].price}$</p>
                    <p class="fs-sm">Category: ${plist[i].category}</p>
                    <div class="w-100 d-flex justify-content-between">
                        <a href="pages/item.html" class="btn btn-warning">Show Item</a>
                        <a href="pages/cart.html" class="btn btn-success">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        if (window.location.pathname !== "/admin.html") {
            document.getElementById("shop-items-area").innerHTML = eachProduct;
        }
    }
}

// update product
function updateProduct(idx) {
    var prod = productList[idx];
    globalIdx = idx;
    itemSubmitButton.innerText = "Update";
    productName.value = prod.name;
    productPrice.value = prod.price;
    productDescription.value = prod.description;
    productCategory.value = prod.category;
}

// search items
function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById("search").value.trim().toLowerCase();
    const storedList = JSON.parse(localStorage.getItem("productList")) || [];
    const filtered = storedList.filter(prod =>
        prod.name.toLowerCase().includes(query) ||
        prod.description.toLowerCase().includes(query) ||
        prod.category.toLowerCase().includes(query)
    );

    if (window.location.pathname.endsWith("admin.html")) {
        fetchAdminProductsFromList(filtered);
    } else if (window.location.pathname.endsWith("shop.html")) {
        fetchShopProductsFromList(filtered);
    } else if (window.location.pathname.endsWith("index.html")) {
        fetchProductsFromList(filtered);
    }
}
const searchForm = document.querySelector('form[role="search"]');
if (searchForm) {
    searchForm.addEventListener("submit", handleSearch);
}



if (window.location.pathname.endsWith("admin.html")) {
    const showFormButton = document.getElementById("add-new-item");
    const addNewItemContainer = document.getElementById("add-new-item-container");
    const adminShopItemsArea = document.getElementById("admin-shop-items-area");

    if (showFormButton && addNewItemContainer) {
        showFormButton.addEventListener("click", function (event) {
            event.preventDefault();
            addNewItemContainer.classList.remove("d-none");
            console.log("Add New Item clicked");
        });

        adminShopItemsArea.addEventListener("click", function (event) {
            if (event.target.classList.contains("edit-item")) {
                event.preventDefault();
                const index = Array.from(adminShopItemsArea.querySelectorAll(".edit-item")).indexOf(event.target);
                console.log("Edit button clicked for product:", index);

                addNewItemContainer.classList.remove("d-none");
                updateProduct(index);
            }
        });
    }
    fetchAdminProducts();
}
if (window.location.pathname.endsWith("shop.html")) {
    fetchShopProducts();
}
if (window.location.pathname.endsWith("index.html")) {
    fetchProducts();
}