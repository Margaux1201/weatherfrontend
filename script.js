// Fonction pour afficher les données météo de toutes les villes enregistrées dans la base de données
function loadCities() {
  fetch("http://localhost:3000/weather")
    .then((response) => response.json())
    .then((data) => {
      const cityList = document.querySelector("#cityList");
      cityList.innerHTML = "";
      if (data.weather && data.weather.length > 0) {
        for (let i = 0; i < data.weather.length; i++) {
          document.querySelector("#cityList").innerHTML += `
				<div class="cityContainer">
				<p class="name">${data.weather[i].cityName}</p>
				<p class="description">${data.weather[i].description}</p>
				<img class="weatherIcon" src="images/${data.weather[i].main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.weather[i].tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.weather[i].tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather[i].cityName}">Supprimer</button>
			</div>
			`;
        }
        updateDeleteCityEventListener();
      } else {
        document.querySelector("#cityList").innerHTML = `
        <p id="nocitymessage" >Aucune ville enregistrée. Ajoutez une ville pour afficher la météo.</p>
			`;
      }
    });
}

// Chargement de la page
loadCities();

// Fonction pour supprimer une ville de la base de données
function updateDeleteCityEventListener() {
  for (let i = 0; i < document.querySelectorAll(".deleteCity").length; i++) {
    document
      .querySelectorAll(".deleteCity")
      [i].addEventListener("click", function () {
        fetch(`http://localhost:3000/weather/${this.id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              loadCities();
            } else {
              alert(data.error);
            }
          });
      });
  }
}

// Ajout d'une nouvelle ville à la base de données
document.querySelector("#addCity").addEventListener("click", function () {
  const cityName = document.querySelector("#cityNameInput").value;

  fetch("http://localhost:3000/weather", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        loadCities();
        document.querySelector("#cityNameInput").value = "";
      } else {
        alert(data.error);
      }
    });
});

// Redirection vers la page de connexion
document.querySelector("#userButton").addEventListener("click", function () {
  window.location.assign("login.html");
});
