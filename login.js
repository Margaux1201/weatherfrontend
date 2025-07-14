// Retour à la page d'accueil (index.html)
document.querySelector("#homeButton").addEventListener("click", function () {
  window.location.assign("index.html");
});

// Ajout d'un utilisateur dans la base de données
document.querySelector("#register").addEventListener("click", function () {
  // définition de la variable user avec les valeurs des champs du formulaire d'inscription
  const user = {
    name: document.querySelector("#registerName").value,
    email: document.querySelector("#registerEmail").value,
    password: document.querySelector("#registerPassword").value,
  };

  // Envoi des données de user vers le backend pour l'inscription
  fetch("http://localhost:3000/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        // Réinitialisation des champs du formulaire d'inscription
        ["#registerName", "#registerEmail", "#registerPassword"].forEach(
          (selector) => {
            document.querySelector(selector).value = "";
          }
        );
        alert("Inscription réussie");
        window.location.assign("index.html");
      } else {
        ["#registerName", "#registerEmail", "#registerPassword"].forEach(
          (selector) => {
            document.querySelector(selector).value = "";
          }
        );
        alert(data.error);
      }
    });
});

// Connexion d'un utilisateur existant dans la base de données
document.querySelector("#connection").addEventListener("click", function () {
  // définition de la variable user avec les valeurs des champs du formulaire de connexion
  const user = {
    email: document.querySelector("#connectionEmail").value,
    password: document.querySelector("#connectionPassword").value,
  };

  // Envoi des données de user vers le backend pour la connexion
  fetch("http://localhost:3000/users/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        // Réinitialisation des champs du formulaire de connexion
        ["#registerEmail", "#registerPassword"].forEach((selector) => {
          document.querySelector(selector).value = "";
        });
        alert("Connexion réussie");
        window.location.assign("index.html");
      } else {
        ["#connectionEmail", "#connectionPassword"].forEach((selector) => {
          document.querySelector(selector).value = "";
        });
        alert(data.error);
      }
    });
});
