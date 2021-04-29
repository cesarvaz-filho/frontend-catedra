

const selectGroup = document.querySelector('.select_groups');

async function fetchAPI(resource) {
  const response = await fetch(`http://localhost:3333/${resource}`);
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

(async () => {
  await loadGroups()
})()

