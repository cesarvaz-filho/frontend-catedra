const table = document.querySelector('.table_trainings');
const tableStudents = document.querySelector('.table_students');
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

async function loadTableTrainings() {
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

async function loadTableStudents() {
  const students = await fetchAPI('students')
  let output = '';

  students.forEach(training => {
    output += `
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3">
        <div class="flex items-center text-sm">
          <!-- Avatar with inset shadow -->
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
            <p class="font-semibold">${students.name}</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              10x Developer
            </p>
          </div>
        </div>
      </td>
      <td class="px-4 py-3 text-sm">
      ${students.login}
      </td>
      <td class="px-4 py-3 text-xs">
        <span
          class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
        >
        ${students.status}
        </span>
      </td>
      <td class="px-4 py-3 text-sm">
      ${students.entry_hour}
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center space-x-4 text-sm">
          <button
            @click="openModal"
            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            aria-label="Edit"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              ></path>
            </svg>
          </button>
          <!--Modal-->
          <div
            x-show="isModalOpen"
            x-transition:enter="transition ease-out duration-150"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition ease-in duration-150"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
          >
            <!-- Modal -->
            <div
              x-show="isModalOpen"
              x-transition:enter="transition ease-out duration-150"
              x-transition:enter-start="opacity-0 transform translate-y-1/2"
              x-transition:enter-end="opacity-100"
              x-transition:leave="transition ease-in duration-150"
              x-transition:leave-start="opacity-100"
              x-transition:leave-end="opacity-0  transform translate-y-1/2"
              @click.away="closeModal"
              @keydown.escape="closeModal"
              class="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
              role="dialog"
              id="modal"
            >
              <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. -->
              <header class="flex justify-end">
                <button
                  class="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
                  aria-label="close"
                  @click="closeModal"
                >
                  <svg
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </header>         
              <!-- Modal body -->
              <div class="mt-4 mb-6">
                <!-- Modal title -->
                <p
                  class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
                >
                  Hans Burger
                </p>
                <!-- Modal form -->
                <form action="">
                  <label class="block mt-4 text-sm">
                    <span class="text-gray-700 dark:text-gray-400">
                      Treinamento
                    </span>
                    <select
                      class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    >
                      <option>Treinamento 1</option>
                      <option>Treinamento 2</option>
                      <option>Treinamento 3</option>
                    </select>
                  </label>
                  <label class="block mt-4 text-sm">
                    <span class="text-gray-700 dark:text-gray-400">
                      Status
                    </span>
                    <select
                      class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    >
                      <option>Presente</option>
                      <option>Migrado</option>
                      <option>Afastado</option>
                      <option>Desligado</option>
                      <option>Desligado</option>
                      <option>Ferias</option>
                    </select>
                  </label>
                  <div class="mt-4 text-sm">
                    <span class="text-gray-700 dark:text-gray-400">
                      Data de Conclusão
                    </span>
                    <div class="mt-2">
                      <label
                        class="inline-flex items-center text-gray-600 dark:text-gray-400"
                      >
                        <input
                          type="date"
                          class="text-purple-600 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                          name="initialDate"
                        />
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <footer
                class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
              >
                <button
                  @click="closeModal"
                  class="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                >
                  Cancelar
                </button>
                <button
                  class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                >
                  Salvar
                </button>
              </footer>
            </div>
          </div>
        </div>
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
  await loadTableTrainings()
})()
