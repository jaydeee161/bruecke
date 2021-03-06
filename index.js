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
            sonstiges: ["Sonstiges", 1.2]
        },
        drinks: {
            fanta: ["Fanta", 1.3],
            cola: ["Coca-Cola", 1.3],
            sprite: ["Sprite", 1.3],
            apfel: ["Apfelsaftschorle", 1.3],
            wasser: ["Wasser", 0.8],
            kaffee: ["Kaffee", 0.3],
            topfit: ["Top-Fit", 1.3],
            mezzomix: ["Mezzo-Mix", 1.3],
            sonstiges: ["Sonstiges", 1.3]
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
            sonstiges30: ["Sonstiges", 0.3],
            sonstiges50: ["Sonstiges", 0.5],
            sonstiges70: ["Sonstiges", 0.7]
        }
    }

    
    const body = document.querySelector('body');

    const wrapper = document.getElementById('wrapper');

    const welcomeArea = wrapper.querySelector('.wrapper__welcomeArea');
    const welcomeButton = welcomeArea.querySelector('.wrapper__welcomeArea__button');
    const wrapperHeaderKassen = welcomeArea.querySelector('.wrapper__h1__kassen');
    const wrapperHeaderSystem = welcomeArea.querySelector('.wrapper__h1__system');
    const wrapperHeaderSmall = welcomeArea.querySelector('.wrapper__header__small')

    const categoriesContainer = wrapper.querySelector('.wrapper__categories');
    const productsContainer = wrapper.querySelector('.wrapper__products');
    const cartContainer = wrapper.querySelector('.wrapper__cart');
    
    const checkoutContainer = wrapper.querySelector('.wrapper__checkout');    
    const checkoutPriceContainer = checkoutContainer.querySelector('.wrapper__checkout__price');
    const checkoutRecievedContainer = checkoutContainer.querySelector('.wrapper__checkout__recievedMoney');
    const checkoutRecievedInput = checkoutRecievedContainer.querySelector('.wrapper__checkout__recievedMoney__input');
    const checkoutChangeContainer = checkoutContainer.querySelector('.wrapper__checkout__change');

    const navigationContainer = document.querySelector('#navigation');
    const navigationRestart = navigationContainer.querySelector('.navigation__restart');
    const navigationGoToCheckout = navigationContainer.querySelector('.navigation__goToCheckout');


    

    welcomeButton.addEventListener('click', function () {
        changeDisplay(welcomeButton);
        changeDisplay(wrapperHeaderKassen);
        changeDisplay(wrapperHeaderSystem);
        changeDisplay(wrapperHeaderSmall, 'block');
        loadCategories();
        showCategories();
        loadProducts();
    });

    checkoutRecievedInput.addEventListener('input', processRecieved);
    navigationRestart.addEventListener('click', restartSession);
    navigationGoToCheckout.addEventListener('click', goToCheckout);

    function loadCategories() {
        for (let key in categories) {
            let categorieDiv = document.createElement('div');
            let categorieText = document.createTextNode(categories[key]);

            categorieDiv.appendChild(categorieText);
            categorieDiv.addEventListener('click', toggleProducts);
            categorieDiv.setAttribute('data-value', key);
            categorieDiv.setAttribute('data-selected', "false");            
            categorieDiv.classList.add('hide', 'wrapper__categories__categorie');            
            categoriesContainer.appendChild(categorieDiv);
            addClass(categoriesContainer, 'wrapper__categories__spaceEvenly');
        }
    }

    function loadProducts() {
        for (let key in products) {
            let productBundle = products[key];
            let newDiv = document.createElement('div');

            newDiv.classList.add('hide', 'wrapper__products__' + key, 'wrapper__products__productCategories'); 
            productsContainer.appendChild(newDiv);
            for (let key2 in productBundle) {
                let newDiv2 = document.createElement('div');
                //let newText2 = document.createTextNode(productBundle[key2][0]);                

                newDiv2.style.backgroundImage = ('url(/images/' + key2 + '.png)');
                newDiv2.classList.add('wrapper__products--backgroundStyle');                
                newDiv2.classList.add('wrapper__products__' + key + '__' + key2);
                newDiv2.setAttribute('data-name', productBundle[key2][0]);
                newDiv2.setAttribute('data-value', key2);
                newDiv2.setAttribute('data-price', productBundle[key2][1]);
                newDiv2.addEventListener('click', addToCart);
                //newDiv2.appendChild(newText2);
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
                changeDisplay(target, 'toggleFlex');
                categorieValue = key;
            } else {
                changeDisplay(target);
            }
        }
        let targetSelected = event.target.getAttribute('data-selected');
        let categories = categoriesContainer.querySelectorAll('.wrapper__categories__categorie'); 
        if (targetSelected === "true") {
            event.target.setAttribute('data-selected', "false");                                   
        } else {
            event.target.setAttribute('data-selected', "true");
            removeClass(event.target.parentElement, 'wrapper__categories__spaceEvenly');
            addClass(event.target.parentElement, 'categorieSelected');
            addClass(event.target, 'clicked');
            event.target.addEventListener('click', displayAllCategoriesAgain);                   
            categories.forEach(function (categorie) {
                if (categorie.getAttribute('data-selected') === "false") {
                    changeDisplay(categorie);                                    
                }            
            });
        }        
    }

    function displayAllCategoriesAgain(event) {
        addClass(event.target.parentElement, 'wrapper__categories__spaceEvenly');
        removeClass(event.target, 'clicked');
        removeClass(event.target.parentElement, 'categorieSelected');
        let categories = categoriesContainer.querySelectorAll('.wrapper__categories__categorie');
        categories.forEach(function (categorie) {
            if (!isVisible(categorie)) {
                changeDisplay(categorie, 'block');
            }
        });
        event.target.removeEventListener('click', displayAllCategoriesAgain);
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
        removeClass(navigationGoToCheckout, 'disabled');
    }    

    let observerPrice = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            observerPrice.disconnect();
            updatePrice();
        });
    });
    let observerPriceConfig = { attributes: true, childList: true, characterData: true };
    observerPrice.observe(cartContainer, observerPriceConfig);    

    let priceTotal;
    function updatePrice() {
        let cartItems = cartContainer.querySelectorAll('.cartItem');
        priceTotal = 0;
        cartItems.forEach(function (cartItem) {
            let cartItemPrice = cartItem.getAttribute('cartItem-price');
            priceTotal += parseFloat(cartItemPrice);        
        });

        checkoutPriceContainer.textContent = priceTotal.toFixed(2);
        observerPrice.observe(cartContainer, observerPriceConfig);
    };

    function removeCartItem(event) {
        let target = event.target.parentElement;
        cartContainer.removeChild(target);
        if (cartContainer.children.length === 0) {
            changeDisplay(cartContainer);
            changeDisplay(checkoutContainer);
            addClass(navigationGoToCheckout, 'disabled');
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
        if (changePrice < 0) {
            checkoutChangeContainer.textContent = '';
        } else {            
            changePrice = changePrice.toFixed(2);
            checkoutChangeContainer.textContent = changePrice;
        }
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

    function isVisible(element) {
        if (element.classList.contains('hide')) {
            return false;
        } else {
            return true;
        }
    }

    function addClass(element, className) {
        element.classList.add(className);
    }

    function removeClass(element, className) {
        element.classList.remove(className);
    }

    function restartSession() {
        if (isVisible(welcomeButton)) {
            return;
        } else {
            let modalBackground = document.createElement('div');
            let modalContainer = document.createElement('div');
            let modalHeader = document.createElement('div');
            let modalContent = document.createElement('div');
            let modalButton = document.createElement('button');
            let modalContentText = document.createTextNode('Are you sure you want to restart the session?');
            let modalButtonText = document.createTextNode('Yes');

            modalBackground.classList.add('modalBackground', 'block');
            modalContainer.classList.add('modal');            
            modalHeader.classList.add('modal__header');
            modalContent.classList.add('modal__content');
            modalButton.classList.add('modal__content__button');

            modalBackground.addEventListener('click', closeModal);
            //modalHeader.addEventListener('click', closeModal);
            modalButton.addEventListener('click', reloadPage);

            modalContent.appendChild(modalContentText);
            modalButton.appendChild(modalButtonText);            
            modalContainer.appendChild(modalHeader);          
            modalContainer.appendChild(modalContent);                       
            modalContainer.appendChild(modalButton); 
            modalBackground.appendChild(modalContainer);

            body.appendChild(modalBackground);
        }
    }

    function reloadPage() {
        location.reload();
    }

    function closeModal(event) {
        let modalBackground = document.querySelector('.modalBackground');
        let modalContainer = modalBackground.querySelector('.modal');
        let modalHeader = modalBackground.querySelector('.modal__header');
        let modalContent = modalBackground.querySelector('.modal__content');
        let modalButton = modalBackground.querySelector('.modal__content__button');
        if (isVisible(modalBackground)) {
            if (event.target != modalContainer && event.target != modalHeader && event.target != modalButton && event.target != modalContent) {                
                body.removeChild(modalBackground);
            }            
        } else {
            console.log('%cError while closing modal! Please contact developer', 'background: orange; color: black');
        }
    }

    function goToCheckout() {
        changeDisplay(categoriesContainer);        
        changeDisplay(productsContainer);
        changeDisplay(cartContainer);
        changeDisplay(checkoutContainer, 'flex');  
        navigationGoToCheckout.removeEventListener('click', goToCheckout);
        navigationGoToCheckout.addEventListener('click', continueShopping);
    }

    function continueShopping() {
        changeDisplay(categoriesContainer, 'flex');        
        changeDisplay(productsContainer, 'block');
        changeDisplay(cartContainer, 'flex');
        changeDisplay(checkoutContainer);
        navigationGoToCheckout.removeEventListener('click', continueShopping);
        navigationGoToCheckout.addEventListener('click', goToCheckout);
    }
}


/* todo:
select products -> checkout invisible
checkout button becomes visible -> onclick -> new site with checkout (containing price and other stuff) 
After Checkout -> Button to Categories
"Custom Keyboard ( Only Numbers)"



welcomearea -> restart & back need to be invisible

back -> functionality needs to be implemented (s1ck l0g1c n33d3d, y4 y3333333333333333333333333333333T)

Einnahme Gesamt session --> abzüglich pfand ( gesamt - anzahl verkaufter getränke x 0.30 )





3x Pizza MargescurrRta (-)
32x Pizza Selemi (-)
4 x Cela-kok5a (-)


*/
