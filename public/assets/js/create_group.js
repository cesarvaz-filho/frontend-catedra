
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
  const name = document.querySelector('.input-name').value;
  
  const data = {
    name
  }

  postRequest('https://api-catedra.herokuapp.com/groups', data)
  .then(data => console.log(data)) 
  .catch(error => console.error(error))

  alert(`O grupo ${name} foi registrado.`)
}
