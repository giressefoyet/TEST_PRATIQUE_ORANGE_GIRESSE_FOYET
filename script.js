// Sélection du formulaire
const form = document.getElementById('form-task');

// Sélection du bloc où on doit affichées les tâches
const tachesListes = document.getElementById('task-list');

// on met l'événement de soumission du formulaire
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupération des donnees du formulaire
    const nom = document.getElementById('nom').value;
    const description = document.getElementById('description').value;
    const dateLimite = document.getElementById('date_limite').value;

    // Création d'un élément de tâche
    const taskEffectuer = document.createElement('div');
    taskEffectuer.classList.add('tache-css');
    
    // Structure de la tâche à ajouter
    taskEffectuer.innerHTML = `
        <h3>${nom}</h3>
        <p>${description}</p>
        <p><strong>Date limite:</strong> ${dateLimite}</p>
        <button class="btn-delete">Supprimer</button>
    `;

    // Ajout de la tâche à la liste
    tachesListes.appendChild(taskElement);

    // Réinitialisation du formulaire après ajout
    form.reset();
});

