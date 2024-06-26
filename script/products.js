// Current year
document.querySelector("[currentYear]").textContent =
  new Date().getUTCFullYear();


// data
data = JSON.stringify([
  {
    id: 1,
    productName: "PEACHY KEEN DREAM",
    category: "smoothie",
    description:
      "Sliced peaches & banana, Greek/dairy-free yogurt, almond/any milk, honey/maple syrup (optional), ice cubes (optional) for a refreshing smoothie!",
    amount: 39.99,
	cart: 0,
    img_url: "https://kingbrink.github.io/all-images/images/health3.jpg",
  },
  {
    id: 2,
    productName: "RASPBERRY RUSH REFRESHER",
    category: "smoothie",
    description: "Blend raspberries & strawberries, plain/dairy-free yogurt, orange/apple juice, honey/maple syrup (optional), ice cubes (optional) for a fruity delight!",
    amount: 39.99,
	cart: 0,
    img_url: "https://kingbrink.github.io/all-images/images/health4.jpg",
  },
  {
    id: 3,
    productName: "BERRYLICIOUS BURST",
    category: "smoothie",
    description: "Mixed berries (strawberries, blueberries, blackberries), sliced banana, spinach/kale (optional), coconut water/juice.",
    amount: 39.99,
	cart: 0,
    img_url: "https://kingbrink.github.io/all-images/images/health5.jpg",
  },
  {
    id: 4,
    productName: "CITRUS CRUSH CREATION",
    category: "smoothie",
    description:
      "Peeled & segmented orange, pineapple & mango chunks, plain/dairy-free yogurt, coconut water/juice, ice cubes (optional). Blend for a tropical delight!",
    amount: 39.99,
	cart: 0,
    img_url: "https://kingbrink.github.io/all-images/images/health6.jpg",
  },
  {
    id: 5,
    productName: "DRAGON FIRE FUSION",
    category: "smoothie",
    description:
      "Pitaya (dragon fruit), diced, banana, mixed berries, coconut/any milk, honey/maple syrup (optional), ice cubes (optional). Blend for a vibrant, exotic smoothie!",
    amount: 39.99,
	cart: 0,
    img_url: "https://kingbrink.github.io/all-images/images/health7.jpg",
  },
  {
    id: 6,
    productName: "Harvest Harmony Bowl",
    category: "salad",
    description:
      "Lettuce (such as iceberg, romaine, or mixed greens), Tomatoes, Cucumbers, Carrots, Red onion, Bell peppers, Radishes, Optional toppings: croutons, sunflower seeds, shredded cheese",
    amount: 55.99,
	cart: 0,
    img_url: "https://kingbrink.github.io/all-images/images/health11.jpg",
  },
  {
    id: 7,
    productName: "Chicken Caesar Crunch",
    category: "salad",
    description:
      "Romaine lettuce, Caesar dressing (anchovies, garlic, egg yolk, Dijon mustard, lemon juice, olive oil, Parmesan), croutons, shaved/grated Parmesan. Optional: grilled chicken or shrimp.",
    amount: 78.99,
	cart: 0,
    img_url: "https://kingbrink.github.io/all-images/images/health15.jpg",
  },
  {
    id: 8,
    productName: "Fresh Field Fare",
    category: "salad",
    description:
      "Tomatoes, Cucumbers, Red onion, Kalamata olives, Feta cheese, Oregano, Olive oil, Optional: bell peppers, pepperoncini peppers, lettuce",
    amount: 89.99,
	cart: 0,
    img_url: "https://kingbrink.github.io/all-images/images/health13.jpg",
  },
  {
    id: 9,
    productName: "Greek Goddess Wrap",
    category: "wrap",
    description:
      "Grilled chicken or gyro meat (thinly sliced), Tzatziki sauce, Lettuce, Tomato slices, Red onion slices, Cucumber slices, Feta cheese crumbles, Kalamata olives, Warm pita or flatbread",
    amount: 119.99,
	cart: 0,
    img_url: "https://kingbrink.github.io/all-images/images/health17.jpg",
  },
  {
    id: 10,
    productName: "Southwest Fiesta Wrap",
    category: "wrap",
    description:
      "Grilled/shredded chicken, seasoned black beans, corn kernels, diced tomatoes, avocado/guacamole, shredded lettuce",
    amount: 99.99,
	cart: 0,
    img_url: "https://kingbrink.github.io/all-images/images/health18.jpg",
  },
])

// console.log(data)

//productWrapper
let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : localStorage.setItem("products", data);

//this puts products/objects in html
let productWrapper = document.querySelector("[data-products]"); // this is the product/s holder.

function createProduct(product){
	return `<div class="col-md-4 my-3"><div class="card prodCard"><img src="${product.img_url}" class="card-img-top h-50 w-50 img-fluid align-self-center mt-4" alt="${product.id}"><div class="card-body"><h5 class="card-title">${product.productName}</h5><p class="card-text">${product.description}</p><p class="card-text">${product.amount}</p><a class="btn btn-secondary" id="cart" onclick='addToCart(${JSON.stringify(product)})'>Add To Cart</a></div></div></div>`;
}

function displayProducts(args) {
  productWrapper.innerHTML = "";
  try {
    if (args && args.length != 0) {
      args?.forEach((product) => {
        productWrapper.innerHTML += createProduct(product);

      });
    } else {
      productWrapper.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                </div>
                <p>No Products Found</p>
            </div>
            `;
    }
  } catch (e) {
    alert("Error Loading Products");
  }
}

displayProducts(products);

//searches products by name
let productSearch = document.querySelector("[data-search-product]");
productSearch.addEventListener("input", () => {
  try {
    let searchItem = products.filter((item) => {
      return item.productName
        .toLowerCase()
        .includes(productSearch.value.toLowerCase());
    });
    displayProducts(searchItem);
  } catch (e) {
    alert("Website is under maintenance");
  }
});

//filter by catergory
let productCategory = document.querySelector("[category]");
productCategory.addEventListener("change", () => {
    try {
      let searchItem = products.filter((item) => {
        return item.category
          .toLowerCase()
          .includes(productCategory.value.toLowerCase());
      });
      displayProducts(searchItem);
    } catch (e) {
      alert("Website is under maintenance");
    }
  });
  


//sorts by the price
let highSort = document.querySelector('[highSort]')
let lowSort = document.querySelector('[lowSort]')
let isToggle = false;

highSort.addEventListener('click', () => {
    try {
        if (!products) throw new Error('Please try again later');
        products.sort((a, b) => b.amount - a.amount);
        displayProducts(products);
        isToggle = true;
    } catch (e) {
        container.textContent = e.message || 'We are working on this issue';
    }
});

lowSort.addEventListener('click', () => {
    try {
        if (!products) throw new Error('Please try again later');
        products.sort((a, b) => a.amount - b.amount);
        displayProducts(products);
        isToggle = false;
    } catch (e) {
        container.textContent = e.message || 'We are working on this issue';
    }
});

//puts objects in new localStorage for other page
let cart = JSON.parse(localStorage.getItem("checkout")) || [];

function addToCart(product) {
  try {
	// check if item exists
	let filteredProducts = cart.filter( item => {
		return product.productName == item.productName
	} )
	if( !filteredProducts.length ) // if this is not(!) 0 it will be true,
	// this means it will add a product if it is 0
	{
		product.cart += 1
		cart.push(product);
		localStorage.setItem("checkout", JSON.stringify(cart));
	} else {
		let [product] = filteredProducts;
		console.log(product)
		product.cart += 1; // 0 because there will only be one product
		localStorage.setItem("checkout", JSON.stringify(cart));
	}
  } catch (e) {
    alert("The Cart is under maintainance");
  }
}
