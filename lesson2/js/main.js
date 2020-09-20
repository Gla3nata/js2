class ProductsList {
    constructor(val = '.products') {
        this.container = val;
        this.goods = [];
        //        this.allProducts = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            {
                id: 1,
                title: 'Notebook',
                price: 2000
            },
            {
                id: 2,
                title: 'Mouse',
                price: 20
            },
            {
                id: 3,
                title: 'Keyboard',
                price: 200
            },
            {
                id: 4,
                title: 'Gamepad',
                price: 50
            },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            //            block.innerHTML += productObj.render();
            block.insertAdjacentHTML('beforeend', productObj.render());

        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}
// Нажимая на кнопку купить, складываем продукты и их кол-во в массив goodsLists, после нажатия на кнопку корзина создается класс корзина, в которой передается этот массив.
//    При вызове конструкотора, происходит подчет totalPrice
//   
class Basket {
    constructor(goodsLists) {
        this.container = '.basket';
        this.items = goodsLists;
        this._calculation();
    }
    _calculation() {
        for (let item of this.items) {
            item.totalPrice = item.price * item.count;
        }
    }
    render() {
        const blockItems = document.querySelector(this.container);
        for (let item of this.items) {
            const itemObj = new BasketItem(item);
            blockItems.insertAdjacentHTML('beforeend', itemObj.render());
        }
    }
}

class BasketItem {
    constructor(item) {
        this.title = item.title;
        this.id = item.id;
        this.price = item.price;
        this.img = item.img;
        this.totalPrice = item.totalPrice;
    }
    render() {
        return `<div class="basket-item" data-id="${this.id}">
                <img src="${this.img}" alt="some img">
                <h3>${this.title}</h3>
                <p>${this.count}</p>
                <p>${this.totalPrice}</p>
            </div>`
    }
}



let list = new ProductsList();
list.render();




//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
////Функция для формирования верстки каждого товара
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => {
//    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//};
//
//renderPage(products);
