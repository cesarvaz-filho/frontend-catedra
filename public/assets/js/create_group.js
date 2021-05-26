
const btnCreateGroup = document.querySelector('.btn-create-group');
const inputGroupName = document.querySelector('.form-input-group');

btnCreateGroup.addEventListener('click', async (e) => {
  e.preventDefault();
  
  fetch(`https://api-catedra.herokuapp.com/groups`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ name: inputGroupName.value })
  }).then(response => response.json())
    .then(data => console.log(data));
})

async function fetchAPI(resource) {
  const res = await fetch(`https://api-catedra.herokuapp.com/${resource}`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: inputGroupName.value })
  });
  console.log(res.json());
  return await res.json();
  
}


