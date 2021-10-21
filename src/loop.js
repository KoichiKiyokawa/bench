const Benchmark = require("benchmark")

const arr = [...Array(10).keys()]
const noop = () => {}

const suite = new Benchmark.Suite()
suite
  .add("for i each length", function () {
    for (let i = 0; i < arr.length; i++) {
      noop(arr[i])
    }
  })
  .add("for i before length", function () {
    const length = arr.length
    for (let i = 0; i < length; i++) {
      noop(arr[i])
    }
  })
  .add("for of", function () {
    for (const item of arr) {
      noop(item)
    }
  })
  .add("while", function () {
    let i = arr.length
    while (i-- > 0) {
      noop(arr[i])
    }
  })
  .add("forEach", function () {
    arr.forEach((item) => noop(item))
  })
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
