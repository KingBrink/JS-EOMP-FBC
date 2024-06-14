// Current year
document.querySelector('[currentYear]').textContent = new Date().getUTCFullYear()
//gettting my products from the localStorage to display in my table
let cart = localStorage.getItem('checkout') ? JSON.parse(localStorage.getItem('checkout')) : [];

let checkoutTable = document.querySelector('[table-checkout]')
// ${Intl.NumberFormat().format(cartProducts.cart * cartProducts.amount)}
function createCartItem(cartProducts){
	return `<tr>
				<td>${cartProducts.productName}</td>
				<td> <input type="number" class="quantity" quantity style="width: 5rem;" value="1"> </td>
                <td>${cartProducts.category}</td>
				<td price>R ${cartProducts.amount}</td>
				<td subtotal >R ${cartProducts.amount}</td>
			</tr>`;
}



function cartItems(){
    try{
        // let cartProducts = Object.groupBy(cart, item => { return item.id});
		console.log(cart)
		cart.forEach( product => {
			// console.log(product)
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

document.querySelectorAll("[quantity]").forEach((input, index) =>{
    
    input.addEventListener("change", () => {
        document.querySelectorAll("[price]").forEach((price, position ) => {
            if (index == position) {
                let sub = (+price.textContent.slice(2,)) * (+input.value) 
                document.querySelectorAll("[subtotal]").forEach((subtotal, spot) => {
                    if (spot == position) {
                        subtotal.textContent = `R ${sub}`
                    }
                })
            }
        })
    })
})

