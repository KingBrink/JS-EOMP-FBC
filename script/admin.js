// Current year
document.querySelector('[currentYear]').textContent = new Date().getUTCFullYear()
// variables
let tableContent = document.querySelector('[table-products]')

let products = JSON.parse(localStorage.getItem('products')) || [];
let checkout = JSON.parse(localStorage.getItem('checkout')) || [];

document.querySelector('[admin-add-product]')

let sortedProducts = document.getElementById('adminSortProduct')

// displays my products in my admin table and has a modal for my edit function
function adminContent(args){
    try{
        tableContent.innerHTML = ""
        args?.forEach((product, i)=>{
            tableContent.innerHTML +=`
            <tr>
                <td>${product.productName}</td>
                <td>${product.description}</td>
                <td><img src="${product.img_url}" alt="${product.id}" class="img-thumbnail"></td>
                <td>R${product.amount}</td>
                <td> 
                <div>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateProduct${product.id}"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-secondary" onclick="deleteProduct(${JSON.stringify(i)})"><i class="bi bi-trash"></i></button>
                    <div class="modal fade" id="updateProduct${product.id}" tabindex="-1" aria-labelledby="updateProduct${product.id}" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="updateProduct${product.id}">Update Product</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <form>
                          <div class="container">
                          <input class="form-control m-2" type="text" placeholder="Enter a Product Name" value="${product.productName}" name ="admin-name" id="admin-name${product.id}" required>
                          <input class="form-control m-2" type="text" placeholder="Enter Image URL" value="${product.img_url}" name="admin-image" id="admin-image${product.id}" required>
                          <textarea class="form-control m-2" placeholder="Enter your Product details" required name="admin-details" id="admin-details${product.id}">${product.description}</textarea>
                          <input class="form-control m-2" type="number" placeholder="Enter the Product Amount" value="${product.amount}" name="admin-amount" id="admin-amount${product.id}" required>
                          </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-secondary" onclick='new UpdateProduct(this,${i}).update()'>Save changes</button>
                        </div>
                      </div>
                        </div> 
                    </div>
                </div>
                </td>
            </tr>
            `
        })
    }catch(e){
        tableContent.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <p>No Products Found</p>
            </div>
        </div>
        `
    }
}
adminContent(products)

// this is my edit function
function UpdateProduct(element, index){ // you can get ids from elements created with javascript
	console.log(element.parentElement.parentElement)
	
	this.id = index;
	this.productName = null;
	this.description = null;
	this.amount = null;
	this.img_url = null;
	
	this.getCurrent = () => {
		let model = element.parentElement.parentElement;
		let [name, image, description, price] = model.querySelector("[class=modal-body]").querySelector("[class=container]").children;

		this.productName = name.value;
		this.description = description.value;
		this.amount = price.value;
		this.img_url = image.value;
	}
	this.update = () => {
		this.getCurrent()
		let product = products[0];

		product.productName = this.productName;
		product.description = this.description;
		product.amount = this.amount;
		product.img_url = this.img_url;

		console.log(product)

		products[this.index] = product
        localStorage.setItem('products',JSON.stringify(products));
        adminContent(products);
        location.reload();
	}
    try {
       
    } catch(e) {
        alert('Unable to Edit the Products')
    }
}

// this deletes my products on the website
function deleteProduct(index){
    try{
		console.log(index)
		// console.log(products[index])
		let product = products[index];
		// console.log(checkout)
		checkout = checkout.filter( (item, index) => {
			return item.productName != product.productName
		} )
        products = products.filter( (item, index) => {
			return item.productName != product.productName
		} )
        localStorage.setItem('products', JSON.stringify(products))
        localStorage.setItem('checkout', JSON.stringify(checkout))
        adminContent(products);
        // location.reload()
    }catch(e){
        alert('Unable to Delete')
    }
}

// sorts products from new to old and old to new
let highest = false;
sortedProducts.addEventListener('click', () => {
    try{
        if(!highest) {
            products.sort((a, b) => b.id - a.id);
            highest = true;
        }else{
            products.sort((a, b) => a.id - b.id);

            highest = false;
        }
        adminContent(products)
    }catch(e){
        alert('This Function is under maintainance')
    }
});

// 0lets me add new product
let adminSavedProduct = document.getElementById('saveProduct')
adminSavedProduct.addEventListener('click', () => {
    try{
        products.push({
            name: document.querySelector('#addName').value,
            description: document.querySelector('#addDetail').value,
            amount: document.querySelector('#addAmount').value,
            img_url: document.querySelector('#addImage').value,
        });
        localStorage.setItem('products', JSON.stringify(products));
        adminContent(products);
    }catch(e){
        alert('Unable to Add new product')
    }
})