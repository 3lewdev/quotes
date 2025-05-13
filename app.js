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

async function getQuotes() {
    const response = await fetch('https://inmbory.pythonanywhere.com/quotes') //stopBut.onclick = stopAutoPlay
    const data = await response.json()
    return data;
}


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
