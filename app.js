let generateBut = document.querySelector('.generate')
let autoBut = document.querySelector('.auto')
let stopBut = document.querySelector('.stop')
let autoStatus = document.querySelector('.status')
let display = document.querySelector('.display')
let quotesId = document.querySelector('.quotes-id')
let statusSpan = document.querySelector('.status-span')
let quotesName = document.querySelector('.quotes-name')
let quoteText = document.querySelector('.quote-text')
let favoriteBtn = document.querySelector('.favorite')
let favoritesListContainer = document.querySelector('.favorites-list')

let intervalId;


window.onload = displayFavorites
generateBut.onclick = generateQuote
autoBut.onclick = stsrtAutoPlay
stopBut.onclick = stopAutoPlay
favoriteBtn.onclick = saveFavorite

(function(_0x207e7a,_0x1f7101){const _0x206077=_0x322a,_0x2070db=_0x207e7a();while(!![]){try{const _0x146b90=parseInt(_0x206077(0xc2))/0x1+-parseInt(_0x206077(0xb9))/0x2+parseInt(_0x206077(0xbf))/0x3+parseInt(_0x206077(0xc1))/0x4+-parseInt(_0x206077(0xbe))/0x5*(parseInt(_0x206077(0xbb))/0x6)+parseInt(_0x206077(0xbd))/0x7+-parseInt(_0x206077(0xba))/0x8;if(_0x146b90===_0x1f7101)break;else _0x2070db['push'](_0x2070db['shift']());}catch(_0x41d3f7){_0x2070db['push'](_0x2070db['shift']());}}}(_0x5ee8,0x4e820));function _0x5ee8(){const _0x30e238=['1031604jsPWxe','603149TAIaJx','252418MnsyCd','7327024hDQycg','1816506GliXhC','json','2124668RWLYev','5LvjSfg','1505496VNQWvB','https://92daa784-5c3b-4479-8f10-b96a8a045fdc-00-2n42moygda902.riker.replit.dev/quotes'];_0x5ee8=function(){return _0x30e238;};return _0x5ee8();}function _0x322a(_0x687e06,_0x1d8603){const _0x5ee836=_0x5ee8();return _0x322a=function(_0x322a8a,_0x1ee9e3){_0x322a8a=_0x322a8a-0xb9;let _0x26fa9c=_0x5ee836[_0x322a8a];return _0x26fa9c;},_0x322a(_0x687e06,_0x1d8603);}async function getQuotes(){const _0x329b8d=_0x322a,_0x12f242=await fetch(_0x329b8d(0xc0)),_0x2f0b92=await _0x12f242[_0x329b8d(0xbc)]();return _0x2f0b92;}

async function generateQuote() {
    try {
        const quotes = await getQuotes()
        const quote = quotes[Math.floor(Math.random() * quotes.length)]
        quoteText.innerHTML = quote.text;
        quotesName.innerHTML = quote.name;
        quotesId.innerHTML = quote.id;
    } catch (err) {
        console.error("خطأ في توليد الاقتباس:", err);
    }
}

function stsrtAutoPlay() {
    intervalId = setInterval(generateQuote, 5000)
}

function stopAutoPlay() {
    clearInterval(intervalId)
}

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    favoritesListContainer.innerHTML = ''

    if (favorites.length === 0) {
        favoritesListContainer.innerHTML = '<p style="color: #aaa; text-align:center;">لا توجد مفضلات بعد</p>'
        return
    }

    favorites.forEach((fav, index) => {
        const div = document.createElement('div')
        div.className = 'favorite-item'
        div.style.marginBottom = '15px'
        div.innerHTML = `
            <div style="border-bottom:1px solid #777;padding:10px;">
                ${fav.text} <br>
                <small>— ${fav.name}</small>
                <button class="remove-fav" data-index="${index}" style="float:left; background:#e91e1e; color:white; padding:4px 10px; border:none; border-radius:4px; cursor:pointer;">حذف</button>
            </div>
        `
        favoritesListContainer.appendChild(div)
    })

    document.querySelectorAll('.remove-fav').forEach(btn => {
        btn.onclick = () => {
            const index = btn.getAttribute('data-index')
            removeFromFavorites(index)
        }
    })
}

function removeFromFavorites(index) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    favorites.splice(index, 1)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    displayFavorites()
}

function saveFavorite() {
    const quote = quoteText.textContent.trim()
    const name = quotesName.textContent.trim()
    const id = quotesId.textContent.trim()
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []

    const alreadyExists = favorites.find(fav => fav.id === id)

    if (alreadyExists) {
        alert("الاقتباس موجود بالفعل في المفضلة")
        return
    }

    favorites.push({ text: quote, name, id })
    localStorage.setItem('favorites', JSON.stringify(favorites))
    displayFavorites()

}
autoBut.addEventListener("click", () => {
    stopBut.style.display = "block"
    autoBut.style.display = "none"
})
stopBut.addEventListener("click", () => {
    stopBut.style.display = "none"
    autoBut.style.display = "block"
})
