console.log(__filename); // hangi dosyada çalışıyorsak onun adı
console.log(__dirname); // dizin adı


const interval = setInterval(() => {
  console.log("interval...");
}, 2000);

setTimeout(() => {
  clearInterval(interval)
  console.log("timeout...");
}, 5000);