const fs = require("fs")

const c1 = data => {
  console.log("c1 out " + data);
}

const callBackFunc = (callback) => {
  callback("new data")
}

callBackFunc(c1)
callBackFunc(callBackFunc(c1))

const c2 = () => {
  console.log("set time out...");
}

setTimeout(c2, 3000)

const data = fs.readFileSync("./metin.json")

const readVal = fs.readFile("./dosya.txt", "utf-8", (res, err) => {

})

const asyncBlock = () => {
  return "asynBlock";
}

const asyncBlock2 = (val) => {
  return console.log(val);
}


const promiz = new Promise((resolve, reject) => {
  if(true) {
    resolve("işlem başarılı")
  } else {
    reject("hata var")
  }
})
const promiz2 = new Promise((resolve, reject) => {
  if(true) {
    resolve("işlem başarılı")
  } else {
    reject("hata var")
  }
})

promiz
  .then((result) => {
    console.log(result);
    return {
      sonuc,
      status: 1
    }
  })
  .then(sonuc2 => {
    console.log(sonuc2)
    if(sonuc2.status) {

    } else {

    }
  })
  .catch(err => console.log(err))

const waitPromise = () => {
  return promiz2
  .then((result) => {
    console.log(result);
    return {
      sonuc,
      status: 1
    }
  })
  .then(sonuc2 => {
    console.log(sonuc2)
    if(sonuc2.status) {

    } else {

    }
  })
  .catch(err => console.log(err))
}

const waitAwait = async () => {
  try {
    const result = await asyncBlock()
    const result2 = await asyncBlock2(result)
    return result2
  } catch (err) {
    console.log(err);
  }
}
