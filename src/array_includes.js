const Benchmark = require("benchmark")

const arrA = [1, 2, 3]
const target = 3

const suite = new Benchmark.Suite()
suite
  .add("includes", function () {
    return arrA.includes(target)
  })
  .add("for", function () {
    for (const itemA of arrA) {
      if (itemA === target) return true
    }
    return false
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
includes x 945,964,093 ops/sec ±0.41% (97 runs sampled)
for x 146,603,145 ops/sec ±0.42% (93 runs sampled)
Fastest is includes
 */
