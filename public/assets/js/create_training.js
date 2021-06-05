

const selectGroup = document.querySelector('.select_groups');
const btnCreateTrainings = document.querySelector('.btn-create-trn');

async function fetchAPI(resource) {
  const response = await fetch(`https://api-catedra.herokuapp.com/${resource}`);
  const data = await response.json();
  
  return data;
}

async function loadGroups() {
  const groups = await fetchAPI('groups');
  let output = '';

  groups.forEach(group => {
    output += `
      <option>${group.name}</option>
    `;

    selectGroup.innerHTML = output;
  })
}

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

btnCreateTrainings.addEventListener('click', () => {
  const name = document.querySelector('.input-name').value;
  const status = document.querySelector('.input-status').value;
  const workload = document.querySelector('.input-workload').value;
  const start_date = document.querySelector('.input-start_date').value;
  const end_date = document.querySelector('.input-end_date').value;
  
  const data = {
    name, 
    status, 
    workload, 
    start_date, 
    end_date
  }

  postRequest('https://api-catedra.herokuapp.com/trainings', data)
  .then(data => console.log(data)) 
  .catch(error => console.error(error))
})

(async () => {
  await loadGroups()
})()

