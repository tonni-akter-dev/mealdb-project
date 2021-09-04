 document.getElementById('error-msg').style.display="none";
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
  searchField.value = '';
  // document.getElementById('error-msg').style.display="none";

  if (searchText=='') {
    document.getElementById('error-msg').style.display="block";

  } 
  else {
    const url =` https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    // console.log(url);
       fetch(url)
      .then(res => res.json())
      .then(data => displaySearch(data.meals))
      .catch(error => displayError(error));
    
  }

}
const displayError = error => {
  document.getElementById('error-msg').style.display="block";
}
function displaySearch(meals) {
    // console.log(meals);
    const searchresult = document.getElementById('search-result');
  // searchresult.innerHTML = '';   or....
  searchresult.textContent = '';
  if (meals.length==0) {
   
  } 
    meals.forEach(meal=> {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
        </div>
      </div>
        `;
        searchresult.appendChild(div);

    });
}
const loadMealDetail = mealId => {
    // console.log(mealId);
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data =>displayMealD(data.meals[0]));
}
const displayMealD = meal => {
    console.log(meal);
    const mealdetails = document.getElementById('meal-detail');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
    mealdetails.appendChild(div);
}