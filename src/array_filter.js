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
includes x 945,964,093 ops/sec ±0.41% (97 runs sampled)
for x 146,603,145 ops/sec ±0.42% (93 runs sampled)
Fastest is includes
 */
