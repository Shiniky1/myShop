import { Component } from "./Component.js";

export class ProductItem extends Component {
  constructor(props, cart) {
    super(props, cart)
    this.handleAddToCart = this.handleAddToCart.bind(this)

    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }
  handleAddToCart(event) {
    event.preventDefault();
    this.props.cartContext.addProduct(this.props.product)
    console.log('adauga in cos', this.props.cartContext.cart)
  }


  // openModal(modal) {
  //   modal.showModal();
  // }


  // closeModal(modal) {
  //   modal.close()
  // }




  render() {
    const product = document.createElement('div')
    product.className = "col mb-3"
    // console.log(this.props.product.id);

    const modalId = `modal-${this.props.product.id}`
    product.innerHTML = `
        <div class="card h-100">
            <!-- Sale badge-->
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
            <!-- Product image-->
            <img class="card-img-top" src="${this.props.product.image}" alt="...">
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${this.props.product.id} ${this.props.product.title}</h5>
                    <!-- Product price-->
                    <i class="bi bi-currency-euro"></i> ${parseFloat(this.props.product.price).toFixed(2)}
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-between ">
                <a class="btn btn-outline-dark  open-modal" data-bs-toggle="modal" data-bs-target="#${modalId}" href="#">View <i class="bi bi-three-dots"></i></a>
                <a class="btn btn-outline-dark text-white add-cart-btn btn btn-success " href="#">Add to Cart <i class="bi bi-cart"></i></a>
                 
            </div>
        </div>
    
  

    <!-- Modal -->
    <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="${modalId}-label">${this.props.product.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="align-modal-content">
              <div class='div-img-modal'>
                <img src="${this.props.product.image}" width=200px>
              </div>
              <div class="info-modal">
                <h4>${this.props.product.description}</h4>
              </div>
            </div>
            <div class='price-modal'>
              <span><i class="bi bi-currency-euro"></i> ${parseFloat(this.props.product.price).toFixed(2)}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button class="add-cart-btn-modal btn btn-success">Add to Cart <i class="bi bi-cart"></i></button>
          </div>
        </div>
      </div>
    </div>
  `;
    // Adaugă eveniment pentru butonul "Add to Cart"
    product.querySelector(".add-cart-btn").addEventListener("click", this.handleAddToCart);
    // Adaugă eveniment pentru butonul "Add to Cart" din modal
    product.querySelector(".add-cart-btn-modal").addEventListener("click", this.handleAddToCart);
    // Adaugă eveniment pentru butonul "View"
    product.querySelector(".open-modal").addEventListener("click", this.handleViewDetails);

    return product;

  }


}
