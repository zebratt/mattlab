const ua = navigator.userAgent.toLocaleLowerCase();

document.documentElement.innerHTML = `<h1>${ua}</h1>`;
