console.clear();

console.log("Hemlo");
const formatter = Intl.NumberFormat("en", {
	notation: "compact",
	style: "currency",
	currency: "INR",
});

let cards = document.querySelector(".container");
// console.log(cards);

async function getData() {
	// let prods = await fetch("assets/products.json");
	let prods = await fetch(
		"https://dummyjson.com/products/category/womens-jewellery"
	);
	// let prods = await fetch("https://dummyjson.com/products/category/furniture");
	let data = await prods.json();
	return data;
}

async function main() {
	let prodData = await getData();
	// console.log(prodData);
	// console.log(prodData.products);

	for (const prod of prodData.products) {
		// console.log(prod)
		cards.innerHTML += `
        <div class="item">
				<div class="img-wrapper"><img src="${
					prod.thumbnail
				}" alt="Failed to load image" /></div>
				<div class="btn">
					<p>${prod.title.toUpperCase()}</p>
					<b>Price - ${formatter.format(prod.price)}/-</b>
				</div>
			</div>
        `;
	}
}

// main();

// <div class="featured-card">
//   <div class="featured-card-image-wrapper">
//     <div
//       class="featured-card-image"
//       style="
//         background-image: url('${prod.thumbnail}');
//       "
//     ></div>
//   </div>
//   <div class="featured-card-name">${prod.title}</div>
//   <div class="featured-card-price">${formatter.format(prod.price)}</div>
// </div>

const navbar = document.querySelector(".navbar");
const bgImage = document.querySelector(".bg-image");

const bgObserverOptions = {
	rootMargin: "-200px 0px 0px 0px",
};
const bgObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			navbar.style.setProperty(
				"--nav-bg-color",
				"var(--primary-text-color) , 0.9"
			);
		} else {
			navbar.style.setProperty("--nav-bg-color", "transparent");
		}
	});
}, bgObserverOptions);

bgObserver.observe(bgImage);

const modal = document.querySelector(".modal");
const modalImages = document.querySelectorAll(".modal-images > img");
const modalPrice = document.querySelector(".modal-price");
const items = document.querySelectorAll(".item");
const buyButton = document.querySelector(".modal-buy-button");
const closeModal = document.querySelector(".close-modal");

for (const item of items) {
	item.addEventListener("click", () => {
		let itemImageSrc = item.querySelector(".img-wrapper > img").src;
		let itemPrice = item.querySelector(".btn > b").textContent;
		for (const modalImage of modalImages) {
			modalImage.src = itemImageSrc;
			modalPrice.textContent = itemPrice;
		}
		modal.showModal();
	});
}

[closeModal, buyButton].forEach((element) =>
	element.addEventListener("click", () => {
		modal.close();
	})
);
