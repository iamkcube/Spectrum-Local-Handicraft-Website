console.clear()

console.log('Hemlo');
const formatter = Intl.NumberFormat('en',
{
    notation: 'standard',
    style: 'currency',
    currency: 'INR',
})

let cards = document.querySelector(".featured__cards");
console.log(cards);

async function getData() {
    // let prods = await fetch("assets/products.json");
    let prods = await fetch("https://dummyjson.com/products/category/womens-jewellery");
    // let prods = await fetch("https://dummyjson.com/products/category/furniture");
    let data = await prods.json();
    return data;
}

async function main() {
    let prodData = await getData();
    console.log(prodData);

    // console.log(prodData.products);

    for (const prod of prodData.products) {
        console.log(prod)
        cards.innerHTML += `
        <div class="featured-card">
          <div class="featured-card-image-wrapper">
            <div
              class="featured-card-image"
              style="
                background-image: url('${prod.thumbnail}');
              "
            ></div>
          </div>
          <div class="featured-card-name">${prod.title}</div>
          <div class="featured-card-price">${formatter.format(prod.price)}</div>
        </div>
        `
    }
}

main()