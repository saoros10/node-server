const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

function addTask() {
  return new Promise((resolve, reject) => {
    rl.question('Descripción de la tarea: ', (description) => {
      const task = {
        id: tasks.length + 1,
        description,
        completed: false,
      };
      tasks.push(task);
      console.log(`Tarea añadida. ID: ${task.id}`);
      resolve();
    });
  });
}

function listTasks() {
  return new Promise((resolve, reject) => {
    if (tasks.length === 0) {
      console.log('La lista de tareas está vacía.');
    } else {
      console.log('Lista de tareas:');
      tasks.forEach((task) => {
        const status = task.completed ? 'Completada' : 'Pendiente';
        console.log(`ID: ${task.id} - Descripción: ${task.description} - Estado: ${status}`);
      });
    }
    resolve();
  });
}

function markTaskAsCompleted() {
  return new Promise((resolve, reject) => {
    rl.question('ID de la tarea a marcar como completada: ', (taskId) => {
      const task = tasks.find((t) => t.id === parseInt(taskId, 10));
      if (task) {
        task.completed = true;
        console.log(`Tarea ${taskId} marcada como completada.`);
      } else {
        console.log('ID de tarea no encontrado.');
      }
      resolve();
    });
  });
}

//AÑADO FUNCION ELIMINAR TAREAS QUE SE ME OLVIDO EN EL PASADO JEJEJE XD
function deleteTask() {
  return new Promise((resolve, reject) => {
    rl.question('ID de la tarea a eliminar: ', (taskId) => {
      const index = tasks.findIndex((task) => task.id === parseInt(taskId, 10));

      if (index !== -1) {
        tasks.splice(index, 1);
        console.log(`Tarea ${taskId} eliminada.`);
      } else {
        console.log('ID de tarea no encontrado.');
      }
      resolve();
    });
  });
}

async function displayMenu() {
  while (true) {
    console.log('\nMenú:');
    console.log('1. Agregar tarea');
    console.log('2. Lista de tareas');
    console.log('3. Marcar tarea completada');
    console.log('4. Eliminar tarea');
    console.log('5. Salir');

    const choice = await askQuestion('Selecciona una opción: ');

    switch (choice) {
      case '1':
        await addTask();
        break;
      case '2':
        await listTasks();
        break;
      case '3':
        await markTaskAsCompleted();
        break;
      case '4':
        await deleteTask();
        break;
      case '5':
        console.log('Chauuu.');
        rl.close();
        return;
      default:
        console.log('Opción no válida.');
    }
  }
}

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

(async () => {
  try {
    await displayMenu();
  } catch (error) {
    console.error(error);
  } finally {
    rl.close();
  }
})();