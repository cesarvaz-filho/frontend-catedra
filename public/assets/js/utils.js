const table = document.querySelector('.table_trainings');
const chart_pending = document.querySelector('.pending');
const chart_canceled = document.querySelector('.canceled');
const chart_concluded = document.querySelector('.concluded');
const chart_expired = document.querySelector('.expired');


function filterTable() {
        
    let input, filter, table, tr, td, td2, i, txtValue;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("projectsTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].cells[0];
      td2 = tr[i].cells[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 || (td2.innerHTML.toUpperCase().indexOf(filter) > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}

function formatDate(date) {
  const unformattedDate = new Date(date);
  const dateFormatted = new Intl.DateTimeFormat('pt-BR').format(unformattedDate);
  return dateFormatted;
}

async function fetchAPI(resource) {
  const response = await fetch(`https://api-catedra.herokuapp.com/${resource}`);
  const data = await response.json();
  
  return data;
}

async function loadTable() {
  const trainings = await fetchAPI('trainings')
  let output = '';

  trainings.forEach(training => {
    output += `
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3">
        <div class="flex items-center text-sm">
          <div
            class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
          >
            <img
              class="object-cover w-full h-full rounded-full"
              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              alt=""
              loading="lazy"
            />
            <div
              class="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <a 
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              href="forms.html"
            >
              <p class="font-semibold">${training.name}</p>
            </a>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Cabo N1
            </p>
          </div>
        </div>
      </td>
      <td class="px-4 py-3 text-sm">
      ${training.adherance}
      </td>
      <td class="px-4 py-3 text-xs">
        <span
          class="${training.status === 'concluído' 
            ? "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" 
            : training.status === 'cancelado' 
              ? "px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700"
              : "px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600"
          }"
        >
        ${training.status}
        </span>
      </td>
      <td class="px-4 py-3 text-sm">
      ${formatDate(training.start_date)}
      </td>
    </tr>
    `
    table.innerHTML = output
  }) 
}

async function loadQuantityStatusTraining(status_training) {
  const trainings = await fetchAPI('trainings');
  const statusTrainings = trainings.reduce((acc, training) => {
    const { status } = training;
    acc[status] ? acc[status]++ : acc[status] = 1;
    //status === status_training ? acc++ : acc
    return acc
  }, {});
  return statusTrainings
}

async function loadPanels() {
  const quantity = await loadQuantityStatusTraining();

  chart_pending.innerHTML = quantity.pendente;
  chart_canceled.innerHTML = quantity.cancelado;
  chart_concluded.innerHTML = quantity['concluído'];
}

(async () => {
  loadPanels()
  await loadTable()
})()
