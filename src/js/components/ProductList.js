import { Component } from "./Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {

  constructor(props) {
    super(props)
    this.state = { products: [] }
  }

  mount(container) {
    fetch(`https://fakestoreapi.com/products`)
      .then(response => response.json())
      .then(data => {
        this.state.products = data
        container.appendChild(this.render())
        // console.log(data)
      })
      .catch(err => console.error(err))
  }




  render() {
    const productList = document.createElement('div')
    productList.className = "row gx-3 gx-lg-3 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center  product-list"

    this.state.products.forEach(product => {
      const productItem = new ProductItem({
        product,
        cartContext: this.props.cartContext
      })
      // console.log(productItem.render());

      productList.appendChild(productItem.render())
    })



    return productList
  }
}