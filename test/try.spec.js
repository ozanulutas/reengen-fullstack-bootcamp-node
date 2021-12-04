const { deneme, deneme2, deneme3 } = require('../functions/try');
const sum = require('../functions/sum');


// her testten önce çalışır
// tek tek testin içine de yazılabilir
beforeAll(() => {
  console.log("before all");
})

// teslerden sonra çalışır
afterAll(() => {
  console.log("after all");
})

// her seferinde koşulların sıfırlanması için each
beforeEach(() => {
  console.log("before each");
})

afterEach(() => {
  console.log("after each");
})


describe("try", () => {

  // içeride yazılmış hali
  beforeAll(() => {
    console.log("before all inner");
  })
  // teslerden sonra çalışır
  afterAll(() => {
    console.log("after all inner");
  })
  // her seferinde koşulların sıfırlanması için each
  beforeEach(() => {
    console.log("before each inner");
  })
  afterEach(() => {
    console.log("after each inner");
  })

  test('deneme function', () => {
    // expect(deneme()).toBeNull();
    // expect(deneme()).toEqual({ name: "foo" });
    // expect(deneme()).toBeTruthy(); // doğru syntax ile yazıldı mı veya düzgün olarak tanımlandı mı
    // expect(deneme()).toBeDefined(); // undefined dönmemesini kontrol eder

    console.log("test öncesi");
    expect(deneme()).not.toBe(null);
    expect(deneme2()).toMatch(/zan/);
    expect(deneme2()).not.toMatch(/xa/);
    expect(deneme3()).toContain("ozanus");
    expect(deneme3()).not.toContain("ozan");
    console.log("test sonrası");
  });
})


test("sum", () => {
  expect(sum(2, 3)).toBeGreaterThan(4)
  expect(sum(2, 3)).toBeGreaterThanOrEqual(5)
  expect(sum(2, 3)).toBeLessThan(6)
  expect(sum(2, 3)).toBeLessThanOrEqual(5)
})

/*
// calback fonksiyondan geriye dönen değeri kontrol eder
test("callback test", () => {
  return deneme()
    .then(data => {
      expect(data).toBe("asd")
    })
})

// async await testi
test("async test", async () => {
  const data = await deneme()
  expect(data).toBe("asd")

  // promisin kaç kere çağırıldığı (kaç then bloğu var)
  expect.assertions(2)

  // dönen hatanın testi
  try {
    await deneme()
  } catch(err) {
    expect(err).toMatch(/error/)
  }
})

// promise testi
test("async test", async () => {
  await expect(deneme()).resolves().toBe("token...şu olmalı...")
  await expect(deneme()).rejects().toBe("error")
})
*/
