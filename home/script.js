sessionStorage.setItem('token', localStorage.getItem('token'))

const modal = document.querySelector('#modal')

function openModal() {
  modal.classList.remove('hidden')
}

window.onclick = function (e) {
  if (e.target == modal) {
    modal.classList.add('hidden')
  }
}

window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modal.classList.add('hidden')
  }
})

const nextGames = document.querySelector('#nextGames')

let n = 5
function addMore5games() {
  nextGames.innerHTML = ``
  n += 5
  const gamesSliced = games.slice(0, n)
  gamesSliced.forEach((game) => cardGenerator(game))
}

let games = []

fetch('https://hltv-api.vercel.app/api/matches.json', {
  method: 'GET'
})
  .then((r) => r.json())
  .then((res) => {
    games = res
    const gamesSliced = games.slice(0, n)
    gamesSliced.forEach((game) => cardGenerator(game))
  })

function cardGenerator(game) {
  const time = new Date(game.time)
    .toLocaleDateString('pt-BR', {
      hour: 'numeric',
      minute: 'numeric'
    })
    .replace(/^\S+\s/, '')
  const date = new Date(game.time).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short'
  })
  nextGames.innerHTML += `
      <div
      class="grid gap-4 grid-cols-10 bg-zinc-900 border-b-[1px]  border-zinc-700 py-2"
    >
      <div class="text-center border-r-[1px] border-zinc-700 py-1">
        <div class="font-medium">${time}</div>
        <div class="text-xs text-zinc-400 py-2">${date}</div>
      </div>
      <div class="col-span-7 border-r-[1px] border-zinc-700 py-1">
        <div>${game.teams[0].name}</div>
        <div>${game.teams[1].name}</div>
      </div>
      <button class="m-auto col-span-2 font-medium text-md">HLTV</button>
    </div>
`
}

const results = document.querySelector('#results')

let gameResults = []

let v = 5

function addMore5results() {
  results.innerHTML = ``
  v += 5
  const resultsSliced = gameResults.slice(0, v)
  resultsSliced.forEach((result) => resultcardGenerator(result))
}

fetch('https://hltv-api.vercel.app/api/results.json', { method: 'GET' })
  .then((r) => r.json())
  .then((res) => {
    gameResults = res
    const resultsSliced = gameResults.slice(0, v)
    resultsSliced.forEach((result) => resultcardGenerator(result))
  })

function resultcardGenerator(result) {
  let corOne
  let corTwo
  if (result.teams[0].result > result.teams[1].result) {
    corOne = 'text-green-500'
    corTwo = 'text-red-500'
  }
  if (result.teams[0].result < result.teams[1].result) {
    corOne = 'text-red-500'
    corTwo = 'text-green-500'
  }
  results.innerHTML += `<div class="grid gap-4 grid-cols-10 bg-zinc-900 py-2">
  <div class="text-center border-r-2 border-zinc-700 py-1">
    <div class="${corOne}">${result.teams[0].result}</div>
    <div class="${corTwo}">${result.teams[1].result}</div>
  </div>
  <div class="col-span-7 border-r-2 border-zinc-700 py-1">
    <div>${result.teams[0].name}</div>
    <div>${result.teams[1].name}</div>
  </div>
  <button class="m-0-auto col-span-2 font-medium text-md">
    HLTV
  </button>
</div>`
}

const inputEmail = document.querySelector('#email')
const inputPassword = document.querySelector('#password')

function login() {
  let _data = {
    email: inputEmail.value,
    password: inputPassword.value
  }
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(_data)
  })
    .then((res) => res.json())
    .then((r) => {
      localStorage.setItem('token', r.accessToken)
      localStorage.setItem('user', JSON.stringify(r.user))
      window.location.href = 'http://127.0.0.1:5500/profile/profile.html'
    })
}
