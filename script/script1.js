const API_U = 'https://rickandmortyapi.com/api/character/?page=1';
const form = document.getElementById('form');
const getData = async(apiURL) => {
    await fetch(apiURL)
        .then(response => response.json())
        .then(json => {
            printData(json),
                printPagination(json.info);
        })

    .catch((error) => {
        console.error('Error:', error)

    })

}

const printData = (data) => {
    let html = '';
    data.results.map(c => {
        html += `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${c.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${c.name}</h5>
              <p class="card-text">Ultima ubicacion conocida: ${c.location.name}</p>
              <p class="card-text">Especie:${c.species}</p>
              <p class="card-text">Genero:${c.gender}</p>
            </div>
          </div>
        </div>
      </div>`

    });
    document.getElementById('inforCharecters').innerHTML = html
}
form.addEventListener('submit', e => {
    e.preventDefault()

    const searchTerm = search.value.toLocaleLowerCase()
    if (searchTerm && searchTerm !== '') {
        getMovies(API_U + searchTerm)
        search.value = ''
    } else {
        swal.fire({
            title: 'Error!',
            text: 'Debe escribir algo en la barra de busqueda',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
})

const printPagination = (info) => {
    let preDisable = info.prev == null ? 'disabled' : '';
    let nexDisable = info.prev == null ? 'disabled' : '';

    let html = `<li class="page-item "><a class="page-link" onclick="getData('${info.prev}')">Previous</a></li>`
    html += `<li class="page-item "><a class="page-link" onclick="getData('${info.next}')">Next</a></li >`
    document.getElementById('pagination').innerHTML = html;
}
getData(API_U);