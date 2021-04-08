// npx babel --config-file ./babel.config.json --out-dir dist ./src/a.js


const delay = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

async function main() {
  await delay().finally(()=>{
    console.log('finally')
  });
}

const unique = (arr) => [...new Set(arr)]

const map = new Map()

class Foo {
  name = 'foo';

  say(){
    console.log('this is foo')
  }
}