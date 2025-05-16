// original code (GIVEN)
function executeTasksOld(tasks, callback) {
  let completedTasks = 0;
  let results = [];

  for (let task of tasks) {
    task((result) => {
      results.push(result);
      completedTasks++;

      if (completedTasks === tasks.length) {
        callback(results);
      }
    });
  }
}

//TODO
// implementation using promises (TO BE ADDED BY THE STUDENT)
function executeTasks(tasks) {
  const promises = tasks.map(
    (task) => new Promise((resolve, reject) => task(resolve, reject))
  );
  return Promise.all(promises);
}

// Test case 1
const task1 = (resolve, reject) => {
  setTimeout(() => {
    resolve("Task 1 completed");
  }, 2000);
};

const task2 = (resolve, reject) => {
  setTimeout(() => {
    resolve("Task 2 completed");
  }, 1500);
};

const task3 = (resolve, reject) => {
  setTimeout(() => {
    resolve("Task 3 completed");
  }, 1000);
};

executeTasks([task1, task2, task3])
  .then((results) => {
    console.log("All tasks completed:");
    console.log(results);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });

/* Expected output
All tasks completed:
[ 'Task 1 completed', 'Task 2 completed', 'Task 3 completed' ]
*/



// Test case 2
const task4 = (resolve, reject) => {
  setTimeout(() => {
    reject("Error occurred in Task 4");
  }, 1000);
};

executeTasks([task2, task3, task4])
  .then((results) => {
    console.log("All tasks completed:");
    console.log(results);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });

/*Expected output
Error occurred: Error occurred in Task 4
*/
