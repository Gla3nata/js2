const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

function showBasket() {

    fetch(`${API}/getBasket.json`)
        .then(result => result.json())
        .catch(error => {
            console.log(error);
        })
        .then(data => { //data - объект js
            console.log(data);
            var basket = new Basket(data.contents);
basket.render();
        })

}

class Basket {
    constructor(goodsLists) {
        this.container = '.basket';
        this.items = goodsLists;
        this._calculation();
    }
    _calculation() {
        for (let item of this.items) {
            item.totalPrice = item.price * item.quantity;
        }
    }
    render() {
        const blockItems = document.querySelector(this.container);
        blockItems.insertAdjacentHTML('beforeend','<h3>Корзина</h3>')
        for (let item of this.items) {
            const itemObj = new BasketItem(item);
            blockItems.insertAdjacentHTML('beforeend', itemObj.render());
        }
    }
}

class BasketItem {
    constructor(item, img = 'https://placehold.it/200x150') {
        this.product_name = item.product_name;
        this.id = item.id;
        this.quantity = item.quantity;
        this.price = item.price;
        this.img = img;
        this.totalPrice = item.totalPrice;
    }
    render() {
        return `<div class="basket-item" data-id="${this.id}">
                <img src="${this.img}" alt="some img">
                <h3>${this.product_name}</h3>
                <p>${this.quantity}</p>
                <p>${this.totalPrice}</p>
            </div>`
    }


}

let list = new ProductsList();
