export class CartContext {
    constructor() {
      this.cart = [];
      this.listeners = []
  
    }
  
    getCart() {
      return this.cart
    }
  
  
    //for product list
    addProduct(item) {
      const found = this.cart.find(product => product.id === item.id)
      if (found) {
        this.cart = this.cart.map(product => {
          if (product.id === item.id) {
            return {
              ...product,
              quantity: product.quantity + 1
            }
          } else {
            return product
          }
        })
      } else {
        this.cart.push({
          ...item,
          quantity: 1
        })
      }
      console.log('cart', this.cart)
      console.log('nr. produse', this.countItem())
      this.notifyListeners()
    }
  
    rmvProduct(item) {
      const found = this.cart.find(product => product.id === item.id)
      if (found) {
        this.cart = this.cart.map(product => {
          if (product.id === item.id) {
            return {
              ...product,
              quantity: Math.max(0, product.quantity - 1)
            }
          } else {
            return product
          }
        })
      } else {
        this.cart.push({
          ...item,
          quantity: 1
        })
      }
      this.notifyListeners()
    }
  
  
    deleteItem(item) {
      this.cart = this.cart.filter(product => product.id !== item.id)
      this.notifyListeners()
    }
  
    priceSum() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  
    countItem() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
  
  
    // Subscribe (abonare) se referă la procesul prin care un 
    // obiect se înregistrează pentru a primi notificări despre anumite evenimente.
    subscribe(listener) {
      console.log("Component subscribed");
  
      this.listeners.push(listener)
      console.log(this.listeners)
    }
  
    // Un listener (ascultător) este o funcție care așteaptă și reacționează la un anumit eveniment.
    notifyListeners() {
      console.log('notify')
      this.listeners.forEach(listener => listener(this.cart))
    }
  }