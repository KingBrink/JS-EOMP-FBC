// Current year
document.querySelector('[currentYear]').textContent = new Date().getUTCFullYear()
//gettting my products from the localStorage to display in my table
let cart = localStorage.getItem('checkout') ? JSON.parse(localStorage.getItem('checkout')) : [];

let checkoutTable = document.querySelector('[table-checkout]')

function createCartItem(cartProducts){
	return `<tr>
				<td>${cartProducts.productName}</td>
				<td>${cartProducts.cart}</td>
				<td>R ${cartProducts.amount}</td>
				<td>R ${Intl.NumberFormat().format(cartProducts.cart * cartProducts.amount)}</td>
			</tr>`;
}

function cartItems(){
    try{
        // let cartProducts = Object.groupBy(cart, item => { return item.id});
		console.log(cart)
		cart.forEach( product => {
			console.log(product)
			checkoutTable.innerHTML += createCartItem(product);
		} )
		
    }catch(e){
        checkoutTable.innerHTML = "Add items to your cart"
    }
}
cartItems()

//this function is to clear the products in my table and is linked to onclick
function clearProducts(){
    location.reload()
    localStorage.removeItem('checkout')
    alert('Press "OK" to remove items from your cart')
}
//this function is for product payment and clear products on my table
function productPayment(){
    location.reload()
    localStorage.removeItem('checkout')
    alert('Payment Successful')
}
