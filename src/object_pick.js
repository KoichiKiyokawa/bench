const assert = require("assert")
const Benchmark = require("benchmark")

const obj = { a: 1, b: 2, c: 3 }

const pickA = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)))

const pickB = (obj, keys) => {
  const res = {}
  for (const key in obj) {
    if (keys.includes(key)) res[key] = obj[key]
  }
  return res
}

const pickC = (obj, keys) =>
  Object.keys(obj).reduce(
    (res, key) => (keys.includes(key) ? { ...res, [key]: obj[key] } : res),
    {}
  )

assert.deepEqual(pickA(obj, ["a", "b"]), { a: 1, b: 2 })
assert.deepEqual(pickB(obj, ["a", "b"]), { a: 1, b: 2 })
assert.deepEqual(pickC(obj, ["a", "b"]), { a: 1, b: 2 })

const suite = new Benchmark.Suite()
suite
  .add("pickA", () => pickA(obj, ["a", "b"]))
  .add("pickB", () => pickB(obj, ["a", "b"]))
  .add("pickC", () => pickC(obj, ["a", "b"]))
  // add listeners
  .on("cycle", function (event) {
    console.log(String(event.target))
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  // run async
  .run({ async: true })

/*
for i each length x 148,257,472 ops/sec ±0.39% (95 runs sampled)
for i before length x 147,326,156 ops/sec ±1.37% (94 runs sampled)
for of x 105,023,662 ops/sec ±0.48% (96 runs sampled)
while x 118,422,614 ops/sec ±0.50% (94 runs sampled)
forEach x 106,101,632 ops/sec ±0.38% (97 runs sampled)
Fastest is for i each length,for i before length
 */
