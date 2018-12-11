window.onload = function () {
    const categories = {
        food: "Essen",
        drinks: "Getränke",
        snacks: "Süßigkeiten"
    }

    const products = {
        food: {
            salami: ["Pizza Salami", 1.2],
            margherita: ["Pizza Margherita", 1.2],
            sonstiges: ["Sonstiges"]
        },
        drinks: {
            fanta: ["Fanta", 1.3],
            cola: ["Coca-Cola", 1.3],
            sprite: ["Sprite", 1.3],
            apfel: ["Apfelsaftschorle", 1.3],
            wasser: ["Wasser", 0.8],
            kaffee: ["Kaffee", 1.3],
            topfit: ["Top-Fit", 1.3],
            mezzomix: ["Mezzo-Mix", 1.3],
            sonstiges: ["Sonstiges"]
        },
        snacks: {
            oreo: ["Oreo", 1],
            lolli: ["Lolli", 0.2],
            centershock: ["Center-Shock", 0.1],
            snickers: ["Snickers", 0.7],
            twix: ["Twix", 0.7],
            nicnacs: ["Nic-Nacs", 1],
            kitkat: ["Kit-Kat", 0.7],
            knoppers: ["Knoppers", 0.3],
            eis: ["Eis", 0.3],
            mundms: ["M&M´s", 0.7],
            country: ["Kinder Country", 0.7],
            kitkatchunky: ["Kit-Kat Chunky", 0.7],
            sonstiges: ["Sonstiges"]
        }
    }

    const wrapper = document.getElementById('wrapper');
    const welcomeArea = wrapper.querySelector('.wrapper__welcomeArea');
    const categoriesContainer = wrapper.querySelector('.wrapper__categories');
    const productsContainer = wrapper.querySelector('.wrapper__products');
    const cartContainer = wrapper.querySelector('.wrapper__cart');
    const checkoutContainer = wrapper.querySelector('.wrapper__checkout');
    const checkoutPriceContainer = checkoutContainer.querySelector('.wrapper__checkout__price');
    const checkoutRecievedContainer = checkoutContainer.querySelector('.wrapper__checkout__recievedMoney');
    const checkoutRecievedInput = checkoutRecievedContainer.querySelector('.wrapper__checkout__recievedMoney__input');
    const checkoutChangeContainer = checkoutContainer.querySelector('.wrapper__checkout__change');

    let welcomeButton = welcomeArea.querySelector('.wrapper__welcomeArea__button');
    let wrapperHeader = welcomeArea.querySelector('h1');

    welcomeButton.addEventListener('click', function () {
        changeDisplay(welcomeButton);
        loadCategories();
        showCategories();
        loadProducts();
    });

    checkoutRecievedInput.addEventListener('input', processRecieved);

    function loadCategories() {
        for (let key in categories) {
            let categorieDiv = document.createElement('div');
            let categorieText = document.createTextNode(categories[key]);

            categorieDiv.appendChild(categorieText);
            categorieDiv.addEventListener('click', toggleProducts);
            categorieDiv.setAttribute('data-value', key);
            categorieDiv.classList.add('hide', 'wrapper__categories__categorie');            
            categoriesContainer.appendChild(categorieDiv);
        }
    }

    function loadProducts() {
        for (let key in products) {
            let productBundle = products[key];
            console.log(productBundle);
            let newDiv = document.createElement('div');

            newDiv.classList.add('hide', 'wrapper__products__' + key);
            productsContainer.appendChild(newDiv);
            for (let key2 in productBundle) {
                let newDiv2 = document.createElement('div');
                let newText2 = document.createTextNode(productBundle[key2][0]);

                newDiv2.classList.add('wrapper__products__' + key + '__' + key2);
                newDiv2.setAttribute('data-name', productBundle[key2][0]);
                newDiv2.setAttribute('data-value', key2);
                newDiv2.setAttribute('data-price', productBundle[key2][1]);
                newDiv2.addEventListener('click', addToCart);
                newDiv2.appendChild(newText2);
                newDiv.appendChild(newDiv2);
            }
        }
    }

    function showCategories() {
        let targetDivs = categoriesContainer.querySelectorAll('.wrapper__categories__categorie');
        targetDivs.forEach(function (targetDiv) {
            changeDisplay(targetDiv, 'block');            
        });
    }

    function toggleProducts(event) {
        let selectedCategorie = event.target.getAttribute('data-value');
        let target;
        for (let key in products) {
            target = productsContainer.querySelector('.wrapper__products__' + key);
            if (key === selectedCategorie) {                
                changeDisplay(target, 'toggleBlock');
            } else {
                changeDisplay(target);
            }
        }
    }

    function addToCart(event) {
        let name = event.target.getAttribute('data-name');
        let value = event.target.getAttribute('data-value');
        let price = event.target.getAttribute('data-price');

        let containerDiv = document.createElement('div');
        let newDiv = document.createElement('div');
        let newText = document.createTextNode(name);
        let newDiv2 = document.createElement('div');
        let newText2 = document.createTextNode(price);
        let newDiv3 = document.createElement('div');
        let newText3 = document.createTextNode('Remove');

        newDiv.appendChild(newText);
        newDiv2.appendChild(newText2);
        newDiv3.appendChild(newText3);
        newDiv3.addEventListener('click', removeCartItem);
        containerDiv.setAttribute('cartItem-value', value);
        containerDiv.setAttribute('cartItem-name', name);
        containerDiv.setAttribute('cartItem-price', price);
        containerDiv.classList.add('cartItem');
        containerDiv.appendChild(newDiv);
        containerDiv.appendChild(newDiv2);
        containerDiv.appendChild(newDiv3);
        cartContainer.appendChild(containerDiv);
        changeDisplay(cartContainer, 'flex', true);
        changeDisplay(checkoutContainer, 'flex', true);
    }

    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            observer.disconnect();
            updatePrice();
        });
    });
    let config = { attributes: true, childList: true, characterData: true };
    observer.observe(cartContainer, config);

    let priceTotal;
    function updatePrice() {
        let cartItems = cartContainer.querySelectorAll('.cartItem');
        priceTotal = 0;
        cartItems.forEach(function (cartItem) {
            let cartItemPrice = cartItem.getAttribute('cartItem-price');
            priceTotal += parseFloat(cartItemPrice);
        });

        checkoutPriceContainer.textContent = priceTotal.toString();
        observer.observe(cartContainer, config);
    };

    function removeCartItem(event) {
        let target = event.target.parentElement;
        cartContainer.removeChild(target);
        if (cartContainer.children.length === 0) {
            changeDisplay(cartContainer);
            changeDisplay(checkoutContainer);
        }
        
    };

    let receivedEuro;
    let receivedCent;
    function processRecieved(event) {
        let inputString = event.target.value;
        receivedEuro = 0;
        receivedCent = 0;
        resultString = inputString.replace(/\D/g, '');
        resultStringLength = resultString.length;
        if (resultStringLength >= 3) {
            receivedCent = resultString.substr(resultStringLength - 2);
            let resultStringCents = '.' + receivedCent;
            resultString = resultString.slice(0, resultStringLength - 2);
            receivedEuro = resultString;
            resultString += resultStringCents;
        } else {
            receivedEuro = resultString;
        }
        event.target.value = resultString;
        processChange();
    }

    function processChange() {
        let receivedMoneyString = '';
        let euro = parseInt(receivedEuro);
        let cent = parseInt(receivedCent);
        if (receivedCent === 0 && receivedEuro != 0) {
            receivedMoneyString = euro;
        } else if (receivedCent != 0 && receivedEuro === 0) {
            receivedMoneyString = cent;
        } else {
            receivedMoneyString = receivedEuro + '.' + receivedCent;
        }
        let receivedMoney = parseFloat(receivedMoneyString);
        let changePrice =  receivedMoney - priceTotal;
        changePrice = changePrice.toFixed(2);
        checkoutChangeContainer.textContent = changePrice;
    }

    //new Display Toggle Function
    //element = target DOM element
    //displayType = 'flex' or 'block' or 'toggleFlex' or 'toggleBlock'
    //onlyShow = boolean
    function changeDisplay (element, displayType, onlyShow) {
        if (onlyShow) {
            removeHide(element);
            addDisplay(element, displayType);
        } else if (displayType === 'flex') {
            removeHide(element)
            addDisplay(element, displayType);
        } else if (displayType === 'block') {
            removeHide(element);
            addDisplay(element, displayType);
        } else if (displayType === 'toggleFlex' || displayType === 'toggleBlock') {
            toggleDisplay(element, displayType);
        } else {
            removeDisplay(element, displayType);
            addHide(element);
        }        
    }

    function removeHide(element) {
        element.classList.remove('hide');
    }

    function addHide(element) {
        element.classList.add('hide');
    }

    function addDisplay(element, displayType) {
        element.classList.add(displayType);
    }

    function removeDisplay(element, displayType) {
        element.classList.remove(displayType);
    }

    function toggleDisplay(element, displayType) {
        let display = '';
        if (displayType === 'toggleFlex') {
            display = 'flex';
        } else {
            display = 'block';
        }
        if (element.classList.contains('hide')) {
            removeHide(element);
            addDisplay(element, display);
        } else {
            removeDisplay(element, display);
            addHide(element);
        }
    }
}