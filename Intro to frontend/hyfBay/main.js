console.log('Script loaded')

const products = getAvailableProducts()

console.log('Number of products:', products.length)

function renderProducts(products) {
  const productList = document.querySelector('#product-list')

  productList.innerHTML = ''

  for (const product of products) {
    const li = document.createElement('li')

    li.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Rating: ${product.rating}/10</p>
    `

    productList.appendChild(li)
  }
}

function searchProducts(searchTerm) {
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  renderProducts(filteredProducts)
}

renderProducts(products)

const searchInput = document.querySelector('#search-input')

searchInput.addEventListener('input', () => {
  searchProducts(searchInput.value)
})
