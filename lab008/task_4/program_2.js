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

// implementation using await/promises (TO BE ADDED BY THE STUDENT)
async function executeTasks(tasks) {
  const results = [];
  for (let task of tasks) {
    results.push(await new Promise((resolve, reject) => task(resolve, reject)));
  }
  return results;
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

async function callTaskExecution(tasks) {
  try {
    const results = await executeTasks(tasks);
    console.log("All tasks completed:");
    console.log(results);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}
/* Expected output
All tasks completed:
[ 'Task 1 completed', 'Task 2 completed', 'Task 3 completed' ]
*/


callTaskExecution([task1, task2, task3]);

// Test case 2
const task4 = (resolve, reject) => {
  setTimeout(() => {
    reject("Error occurred in Task 4");
  }, 1000);
};

callTaskExecution([task2, task3, task4]);
/*Expected output
Error occurred: Error occurred in Task 4
*/

