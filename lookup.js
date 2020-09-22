

var userLang;
var userISO;
var dictionary = {};
const definitionEl = document.getElementById('definition'); 
const userLangPicker = `<select name="lingues" id="lingues" onchange="changeLang(this.value)">
                <option value="en">🇬🇧 en</option>
                <option value="de">🇩🇪 de</option>
                <option value="cn">中文 cn</option>
                <option value="es">🇪🇸 es</option>
                <option value="ru">🇷🇺 ru</option>
                <option value="eo">eo</option>
                <option value="kr">🇰🇷 kr</option>
            </select>`;


function changeLang(langISO) {
    var langs = document.getElementById('lingues')
    for (var l of langs.options) { if (l.value == langISO) {l.selected = true} }
    userISO = langISO;
}



function lookupInit(dictionaryURL) {
        userLang = navigator.language || navigator.userLanguage;
        userISO = userLang.slice(0,2);

        document.getElementById('langPicker').innerHTML = userLangPicker;

        changeLang(userISO);

        fetch(dictionaryURL)
            .then(response => response.json())
            .then(data => dictionary = data);

        document.onselectionchange = debounce(lookup, 1200);
}

function debounce(func, delay) {
    let inDebounce
    return function() {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

function lookup() {
    
    var s = document.getSelection().toString().trim().toLowerCase();
    var punctuationless = s.replace(/[.,\/#!$%\^&\*;:{}=_`~()"]/g,"");
    var cleaned = punctuationless.replace(/\s{2,}/g," ");
    var selection = cleaned.split(' ');

    if (selection[0] == '') {
        console.log('selected nothing!')
        return;
    }

    console.log(`You selected: ${selection}`);

    var definitions = [];

    for (var word of selection) {
        if (word in dictionary) {
            console.log(`Looking up: ${word}`);
            definitions.push({"word": word, "info": dictionary[word]});
        } else {
            console.log(`Not in dictionary: ${word}`);
            definitions.push({"word": word, "info": '' });
        }
    }

    if (definitions.length <= 1) {
        var payload = `<h4>${definitions[0].word}</h4>
        <p>${userISO} : ${definitions[0].info[userISO]}</p>
        <p><small>altri : ${definitions[0].info[userISO + "2"]}</small></p>
        <hr/>
        <p>parte de parlada : ${definitions[0].info['parte de parlada']}</p>
        <p>radica : ${definitions[0].info['radica']}</p>
        <p>categorie : ${definitions[0].info['categorie']}</p>
        <p>etimologie : ${definitions[0].info['etimologie']}</p>`;
            
        displayInfo(payload)
    } else {
        var payload = '<p>';
        for (var d of definitions) {
            if (d.info != '') {
                if (d.info[userISO] != '') {
                    payload += ` ${d.info[userISO]} `
                } else {
                    payload += ` [${d.word}] `
                }
            } else {
                payload += ` [${d.word}] `
            }
            
        }
        payload += '</p>';
        displayInfo(payload)
    }

  
}

function displayInfo(htmlString) {
    definitionEl.innerHTML = '';
    
    console.log('displaying it!');

    definitionEl.innerHTML = htmlString;
    
    definitionEl.style.display = 'block';

    definitionEl.onclick = () => { definitionEl.style.display = 'none'; };
}
