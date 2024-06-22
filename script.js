// Sélection du formulaire
const form = document.getElementById('form-task');

// Sélection du bloc où on doit affichées les tâches
const tachesListes = document.getElementById('task-list');

// Charger les tâches depuis localStorage
window.addEventListener('DOMContentLoaded', loadTasks);

// Ajouter une tâche
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupération des données du formulaire
    const nom = document.getElementById('nom').value;
    const description = document.getElementById('description').value;
    const dateLimite = document.getElementById('date_limite').value;

    // Validation de la date limite
    if (new Date(dateLimite) < new Date()) {
        alert("La date limite ne peut pas être dans le passé.");
        return;
    }

    // Création d'une tâche
    const tache = {
        nom,
        description,
        dateLimite
    };

    // Ajout de la tâche à la liste et au stockage local
    addTask(tache);
    saveTask(tache);

    // Réinitialisation du formulaire après ajout
    form.reset();
});

// Supprimer une tâche
tachesListes.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
        const taskElement = e.target.closest('.tache-css');
        const nom = taskElement.querySelector('h3').textContent.slice(7); // Extract task name
        removeTask(nom);
        taskElement.remove();
    }
});

// Ajouter une tâche à l'affichage
function addTask(tache) {
    const tacheList = document.createElement('div');
    tacheList.classList.add('tache-css');

    // Structure de la tâche à ajouter
    tacheList.innerHTML = `
        <h3>Tâche: ${tache.nom}</h3>
        <p><strong>Description:</strong> ${tache.description}</p>
        <p><strong>Date limite:</strong> ${tache.dateLimite}</p>
        <button class="btn-delete">Supprimer</button>
    `;

    // Ajout de la tâche à la liste
    tachesListes.appendChild(tacheList);
}

// Sauvegarder une tâche dans localStorage
function saveTask(tache) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(tache);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Charger les tâches depuis localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
}

// Supprimer une tâche du stockage local
function removeTask(nom) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.nom !== nom);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
