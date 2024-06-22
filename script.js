/* 
    Nom: FOYET FRANCK GIRESSE
    TEST ORANGE SUMMER 
    VOICI MON CODE JAVASCRIPT
    Projet Gestionnaire de taches
*/

/* 
    Nom: FOYET FRANCK GIRESSE
    TEST ORANGE SUMMER 
    VOICI MON CODE JAVASCRIPT
    Projet Gestionnaire de taches
*/

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
    const tacheList = document.createElement('div');
    tacheList.classList.add('tache-css');
    
    // Structure de la tâche à ajouter
    tacheList.innerHTML = `
        <h3>Taches: ${nom}</h3>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Date limite:</strong> ${dateLimite}</p>
        <button class="btn-delete">Supprimer</button>
    `;

    // Ajout de la tâche à la liste
    tachesListes.appendChild(tacheList);

    // Réinitialisation du formulaire après ajout
    form.reset();
});

// supprimer une taches 

// Écoute des clics sur les boutons "Supprimer"
tachesListes.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
        e.target.closest('.tache-css').remove(); // Supprime l'élément parent de la tâche
    }
});


// Fonction pour récupérer les tâches depuis l'API JSONPlaceholder
function fetchTasks() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            data.forEach(tache => {
                // Création d'un élément de tâche pour chaque entrée
                const taskList = document.createElement('div');
                taskList.classList.add('tache-css');
                taskList.innerHTML = `
                    <h3>Tâche: ${tache.title}</h3>
                    <p><strong>Statut:</strong> ${tache.completed ? 'Terminée' : 'En cours'}</p>
                    <button class="btn-delete" data-id="${tache.id}">Supprimer</button>
                `;
                tachesListes.appendChild(taskList);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des tâches:', error));
}

// Appel de la fonction pour récupérer et afficher les tâches au chargement de la page
fetchTasks();

// Gestionnaire de soumission du formulaire
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupération des données du formulaire
    const nom = document.getElementById('nom').value;

    // Création de l'objet de tâche à envoyer
    const newTache = {
        title: nom,
        completed: false // Par défaut, la tâche n'est pas terminée
    };

    // Envoi de la nouvelle tâche à l'API via POST
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTache)
    })
    .then(response => response.json())
    .then(data => {
        // Ajout de la tâche à la liste affichée
        const taskList = document.createElement('div');
        taskList.classList.add('task-item');
        taskList.innerHTML = `
            <h3>Tâche: ${data.title}</h3>
            <p><strong>Statut:</strong> En cours</p>
            <p><strong>Description:</strong> ${data.description}</p>
            <button class="btn-delete" data-id="${data.id}">Supprimer</button>
        `;
        tachesListes.appendChild(taskList);

        // Réinitialisation du formulaire après ajout
        form.reset();
    })
    .catch(error => console.error('Erreur lors de l\'ajout de la tâche:', error));
});

// Écoute des clics sur les boutons "Supprimer"
tachesListes.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
        const taskId = e.target.getAttribute('data-id');

        // Envoi de la requête DELETE à l'API
        fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Suppression visuelle de la tâche
                e.target.closest('.task-item').remove();
            } else {
                console.error('Erreur lors de la suppression de la tâche');
            }
        })
        .catch(error => console.error('Erreur lors de la suppression de la tâche:', error));
    }
});
