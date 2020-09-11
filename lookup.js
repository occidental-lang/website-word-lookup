

var userLang = navigator.language || navigator.userLanguage;
var userISO = userLang.slice(0,2);

const userLangPicker = `<select name="lingues" id="lingues" onchange="changeLang(this.value)">
        <option value="en">🇬🇧 Anglesi</option>
        <option value="es">🇪🇸 Hispan</option>
        <option value="it">🇮🇹 Italian</option>
        <option value="ru">🇷🇺 Russ</option>
        <option value="ko">🇰🇷 Korean</option>
    </select>`;

document.getElementById('langPicker').innerHTML = userLangPicker;


function changeLang(langISO) {
    var langs = document.getElementById('lingues')
    for (var l of langs.options) { if (l.value == langISO) {l.selected = true} }
    userISO = langISO;
}

changeLang(userISO);



var dictionary = {};
fetch('dict.json')
    .then(response => response.json())
    .then(data => dictionary = data);

const definitionEl = document.getElementById('definition');


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
    var punctuationless = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
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
        var payload = `<div><h3>${definitions[0].word}<h3>`;
        for (var prop in definitions[0].info) {
            if (definitions[0].info[prop] == undefined) {

            } else if (definitions[0].info[prop] == false) {

            } else {
                payload += `<p>${prop}: <b>${definitions[0].info[prop]}</b></p>`
            }
        }
        payload += '</div>';
            
        displayInfo(payload)
    } else {
        var payload = '';
        for (var d of definitions) {
            if (d.info != '') {
                payload += ` ${d.info[userISO]} `
            } else {
                payload += ` ??? `
            }
            
        }
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