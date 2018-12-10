window.onload = function() {
    const kategorien = {
        getraenke:      "Getränke",
        essen:          "Essen",
        suessigkeiten:  "Süßigkeiten"
    };    
    const getraenke = {
        fanta:          ["Fanta", 1.3],
        cola:           ["Coca-Cola", 1.3],
        sprite:         ["Sprite",1.3],
        apfel:          ["Apfelsaftschorle",1.3],
        wasser:         ["Wasser",0.8],
        kaffee:         ["Kaffee",1.3],
        topfit:         ["Top-Fit",1.3],
        mezzomix:       ["Mezzo-Mix",1.3],
        sonstiges:      ["Sonstiges"]
    };    
    const essen = {
        salami:         ["Pizza Salami", 1.2],
        margherita:     ["Pizza Margherita", 1.2],
        sonstiges:      ["Sonstiges"]        
    };
    const suessigkeiten = {
        oreo:           ["Oreo", 1],
        lolli:          ["Lolli", 0.2],
        centershock:    ["Center-Shock",0.1],
        snickers:       ["Snickers",0.7],
        twix:           ["Twix",0.7],
        nicnacs:        ["Nic-Nacs",1],
        kitkat:         ["Kit-Kat",0.7],
        knoppers:       ["Knoppers",0.3],
        eis:            ["Eis",0.3],
        mundms:         ["M&M´s",0.7],
        country:        ["Kinder Country",0.7],
        kitkatchunky:   ["Kit-Kat Chunky",0.7],
        sonstiges:      ["Sonstiges"]          
    };
    const warenkorb = {

    };

    const sessionButton = document.getElementById('wrapper__button');
    const sectionKategorien = document.getElementById('kategorien');
    const sectionProdukte = document.getElementById('produkte');
    const containerGetraenke = sectionProdukte.querySelector('.getraenke');
    const containerEssen = sectionProdukte.querySelector('.essen');
    const containerSuessigkeiten = sectionProdukte.querySelector('.suessigkeiten');

    for(let key in kategorien) {
        let kategorieDiv = document.createElement('div');
        let kategorieText = document.createTextNode(kategorien[key]);

        kategorieDiv.appendChild(kategorieText);
        kategorieDiv.addEventListener('click', function(event) {
            chooseKategorie(event);
        });
        sectionKategorien.appendChild(kategorieDiv); 
    }
    
    for(let key in getraenke) {
        let getraenkeDiv = document.createElement('div');
        let getraenkeText = document.createTextNode(getraenke[key][0]);

        getraenkeDiv.appendChild(getraenkeText);
        getraenkeDiv.addEventListener('click', function(event) {
            addProduct(event);
        });
        containerGetraenke.appendChild(getraenkeDiv);

    }

    for(let key in essen) {
        let essenDiv = document.createElement('div');
        let essenText = document.createTextNode(essen[key][0]);

        essenDiv.appendChild(essenText);
        essenDiv.addEventListener('click', function(event) {
            addProduct(event);
        });
        containerEssen.appendChild(essenDiv);
    }

    for(let key in suessigkeiten) {
        let suessigkeitenDiv = document.createElement('div');
        let suessigkeitenText = document.createTextNode(suessigkeiten[key][0]);

        suessigkeitenDiv.appendChild(suessigkeitenText);
        suessigkeitenDiv.addEventListener('click', function(event) {
            addProduct(event);
        });
        containerSuessigkeiten.appendChild(suessigkeitenDiv);
    }

    sessionButton.addEventListener('click', function() {
        sessionButton.classList.add('hide');
        sectionKategorien.classList.remove('hide');
        sectionKategorien.classList.add('show');
    });

    function chooseKategorie(event) {
        console.log(event.target);

    }

    function addProduct(event) {
        console.log(event.target);
    }
}