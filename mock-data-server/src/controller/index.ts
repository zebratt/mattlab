import glob from 'glob';
import path from 'path';

export async function initControllers() {
  const controllers = glob
    .sync(path.join(__dirname, './**/index.{js,ts}'))
    .filter((ele) => !ele.includes('/controller/index'));

  for (let item of controllers) {
    await import(item).then(() => {
      console.log(`import router: ${item} success`);
    });
  }
}
