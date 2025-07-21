const tasks = [100, 1500, 750, 5000];

function delay(t) {
  return new Promise((resolve) => setTimeout(() => {
    console.log(`task ${t} done`);
    resolve(t);
  }, t));
}


async function doTasksSequential() {
  for (const task of tasks) {
    await delay(task);
  }
  console.log("all done");
}



async function doTasksConcurrent() {
  await Promise.all(tasks.map((task) => delay(task)));
  console.log("all done");
}

async function main() {
  // doTasksSequential();
  // await doTasksSequential();
  // doTasksConcurrent();
  await doTasksConcurrent();
  console.log("after tasks");
}

main();