const inputName = document.querySelector('#name')
const inputUsername = document.querySelector('#username')
const inputEmail = document.querySelector('#email')
const inputPassword = document.querySelector('#password')

function submit() {
  let _data = {
    email: inputEmail.value,
    password: inputPassword.value
  }
  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(_data)
  })
    .then((res) => res.json())
    .then((r) => r)
}
