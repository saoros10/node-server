const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

function addTask() {
  rl.question('Descripción de la tarea: ', (description) => {
    const task = {
      id: tasks.length + 1,
      description,
      completed: false,
    };
    tasks.push(task);
    console.log(`Tarea añadida. ID: ${task.id}`);
    displayMenu();
  });
}

function listTasks() {
  if (tasks.length === 0) {
    console.log('La lista de tareas está vacía.');
  } else {
    console.log('Lista de tareas:');
    tasks.forEach((task) => {
      const status = task.completed ? 'Completada' : 'Pendiente';
      console.log(`ID: ${task.id} - Descripción: ${task.description} - Estado: ${status}`);
    });
  }
  displayMenu();
}

function markTaskAsCompleted() {
  rl.question('ID de la tarea a marcar como completada: ', (taskId) => {
    const task = tasks.find((t) => t.id === parseInt(taskId, 10));
    if (task) {
      task.completed = true;
      console.log(`Tarea ${taskId} marcada como completada.`);
    } else {
      console.log('ID de tarea no encontrado.');
    }
    displayMenu();
  });
}

function displayMenu() {
  console.log('\nMenú:');
  console.log('1. Agregar tarea');
  console.log('2. Lista de tareas');
  console.log('3. Marcar tarea completada');
  console.log('4. Salir');

  rl.question('Selecciona una opción: ', (choice) => {
    switch (choice) {
      case '1':
        addTask();
        break;
      case '2':
        listTasks();
        break;
      case '3':
        markTaskAsCompleted();
        break;
      case '4':
        console.log('Chauuu.');
        rl.close();
        break;
      default:
        console.log('Opción no válida.');
        displayMenu();
        break;
    }
  });
}

displayMenu();