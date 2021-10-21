const Benchmark = require("benchmark")

const arr = [...Array(10).keys()]

const suite = new Benchmark.Suite()
suite
  .add("for", function () {
    const ret = []
    for (const item of arr) ret.push(item * 2)
    return ret
  })
  .add("map", function () {
    return arr.map((x) => x * 2)
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
for x 36,730,540 ops/sec ±0.42% (91 runs sampled)
map x 54,779,900 ops/sec ±0.77% (97 runs sampled)
Fastest is map
 */
