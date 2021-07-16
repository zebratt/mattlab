import glob from "glob";
import path from "path";

export async function initControllers() {
  const controllers = glob.sync(path.join(__dirname, "./*.ts"));
  
  for (let item of controllers) {
    const filename = path.basename(item);
    await import(`./${filename}`).then(() => {
      console.log(`import router: ${filename} success`);
    });
  }
}
