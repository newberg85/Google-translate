const fromText = document.querySelector(".text_from"),
    totext = document.querySelector(".to_from"),
    selectTag = document.querySelectorAll("select"),
    change = document.querySelector(".change_position"),
    translateBtn = document.getElementById("btn-translate"),
    icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "pt-PT") {
            selected = "selected";
        }
        let option = `<option class="opt_style" value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

change.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = totext.value;
    selectTag[0].value = selectTag[1].value;
    totext.value = tempText;
    selectTag[1].value = tempLang;

});



fromText.addEventListener("keypress", () => {
    let text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            totext.value = data.responseData.translatedText;
        });
});

//mobile
fromText.addEventListener("input", () => {
    let text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            totext.value = data.responseData.translatedText;
        });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
                alert("texto copiado")
            } else {
                navigator.clipboard.writeText(totext.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(totext.value)
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});

// Menu

function openNav() {
    document.getElementById("mySideMenu").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySideMenu").style.width = "0";
}

// Evento de clique no documento (body)
document.addEventListener("click", function (event) {
    var menu = document.getElementById("mySideMenu");
    var menuButton = document.querySelector("span");

    // Verifica se o clique ocorreu fora do menu
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        closeNav(); // Fecha o menu
    }
});