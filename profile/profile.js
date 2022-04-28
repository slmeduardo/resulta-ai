const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const stringUser = JSON.parse(user)

if (token === null) {
  window.location.href = `/home/index.html`
}

const helloMessage = document.querySelector('#hello')

fetch(`http://localhost:3000/users/${stringUser.id}`, {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + token
  }
})
  .then((r) => {
    if (!r.ok) {
      if (r.status === 401) {
        helloMessage.innerHTML = ` vaza fi`
      }
      throw new Error('HTTP status ' + r.status)
    }
    return r.json()
  })
  .then((res) => {
    helloMessage.innerHTML += ` ${res.email}`
  })
