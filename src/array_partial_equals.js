const Benchmark = require("benchmark")

const arrA = [1, 2, 3]
const arrB = [4, 5, 6]

function arrayPartialEqualsA(arrA, arrB) {
  return arrA.some((itemA) => arrB.includes(itemA))
}

function arrayPartialEqualsB(arrA, arrB) {
  for (const itemA of arrA) {
    for (const itemB of arrB) {
      if (itemA === itemB) return true
    }
  }

  return false
}

function arrayPartialEqualsB2(arrA, arrB) {
  for (let i = 0; i < arrA.length; i++) {
    for (let j = 0; j < arrB.length; j++) {
      if (arrA[i] === arrB[j]) return true
    }
  }

  return false
}

function arrayPartialEqualsC(arrA, arrB) {
  for (const itemA of arrA) {
    if (arrB.includes(itemA)) return true
  }

  return false
}

function arrayPartialEqualsD(arrA, arrB) {
  return [...new Set(arrA.concat(arrB))].length === arrA.length + arrB.length
}

const suite = new Benchmark.Suite()
suite
  .add("arrayPartialEqualsA", function () {
    return arrayPartialEqualsA(arrA, arrB)
  })
  .add("arrayPartialEqualsB", function () {
    return arrayPartialEqualsB(arrA, arrB)
  })
  .add("arrayPartialEqualsB2", function () {
    return arrayPartialEqualsB2(arrA, arrB)
  })
  .add("arrayPartialEqualsC", function () {
    return arrayPartialEqualsC(arrA, arrB)
  })
  .add("arrayPartialEqualsD", function () {
    return arrayPartialEqualsD(arrA, arrB)
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

/**
arrayPartialEqualsA x 55,885,469 ops/sec ±0.32% (96 runs sampled)
arrayPartialEqualsB x 57,548,336 ops/sec ±0.70% (96 runs sampled)
arrayPartialEqualsB2 x 81,606,359 ops/sec ±0.59% (90 runs sampled)
arrayPartialEqualsC x 49,296,595 ops/sec ±0.52% (95 runs sampled)
arrayPartialEqualsD x 4,713,912 ops/sec ±0.48% (97 runs sampled)
Fastest is arrayPartialEqualsB2
 */
