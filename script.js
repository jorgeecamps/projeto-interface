const filterElement = document.querySelector('header input');
const cardsContainer = document.querySelector('.cards');

filterElement.addEventListener('input', filterCards);

function filterCards() {
  const filterText = filterElement.value.toLowerCase();

  // Limpar os cards antes de fazer uma nova busca
  cardsContainer.innerHTML = '';

  // Buscar os dados da API
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filterText}`)
    .then(response => response.json())
    .then(data => {
      const cocktails = data.drinks; // Array de coquetéis

      if (cocktails) {
        cocktails.forEach(cocktail => {
          const cardHTML = `
            <li>
              <div class="header">
                <i class="ph-cocktail"></i>
                <h2>${cocktail.strDrink}</h2>
              </div>
              <p>${cocktail.strInstructions}</p>
              <a href="#">More</a>
            </li>
          `;
          cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os dados da API:', error);
    });
}
