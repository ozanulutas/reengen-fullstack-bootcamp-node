// bir akış oluyor ve bu akışı paketlerle sağlıyoruz
// o paketlere işlem uygulayabiliyoruz, bunun için de buffer kullanılıyor

const buf = new Buffer("patika", "utf-8")

// buf.write("str değer", offset, length, encoding)

const buff = new Buffer(26)

for (let i = 0; i < 26; i++) {
  buff[i] = i + 27
}

console.log(buff.toString("ascii")); // abcdef...26 tane