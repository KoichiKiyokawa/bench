const Benchmark = require("benchmark")

const arr = [1, 2, 3]

const suite = new Benchmark.Suite()
suite
  .add("filter", () => arr.filter((x) => x % 2 === 0))
  .add("for", () => {
    const ret = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 === 0) ret.push(arr[i])
    }
    return ret
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
filter x 60,926,246 ops/sec ±0.41% (94 runs sampled)
for x 64,895,225 ops/sec ±0.65% (95 runs sampled)
Fastest is for
 */
