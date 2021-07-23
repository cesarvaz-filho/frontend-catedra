async function postRequest(url, data) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  });
  return await response.json();
}

function post() {
  const data = document.querySelector('.input_csv').files[0];

  postRequest('https://api-catedra.herokuapp.com/register', data)
    .then(data => console.log(data))
    .catch(error => console.error(error))

  alert(`O arquivo foi registrado.`)
}