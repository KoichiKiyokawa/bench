function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * @template T
 * @param {T} obj
 * @returns {T}
 */
function cloneDeep(obj) {
  const ret = {}
  for (const key in obj) {
    if (isObject(obj[key])) ret[key] = cloneDeep(obj[key])
    else if (Array.isArray(obj[key])) ret[key] = [...obj[key]]
    else ret[key] = obj[key]
  }
  return ret
}

/** @returns {boolean} */
function isObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

/**
 *
 * @param {*} value
 * @param  {...string} keys
 * @example deepAssignObject(1, 'a', 'b', 'c') // { a: { b: { c: 1 } } }
 */
function deepAssignObject(value, ...keys) {
  let ret = value
  for (let i = keys.length - 1; i >= 0; i--) {
    ret = { [keys[i]]: ret }
  }
  return ret
}

const range = (num) => Array.from(Array(num).keys())

const Benchmark = require("benchmark")

const DEPTH = 50

const suite = new Benchmark.Suite()
suite
  .add("JSON.stringify", function () {
    const object = deepAssignObject(new Date(0), ...range(DEPTH))
    const cloned = JSONClone(object)
    let current = cloned
    for (const key of range(DEPTH - 1)) {
      current = current[key]
    }
    current[DEPTH] = new Date(1)
    console.assert(JSON.stringify(object) !== JSON.stringify(cloned))
  })
  .add("recursive", function () {
    const object = deepAssignObject(new Date(0), ...range(DEPTH))
    const cloned = cloneDeep(object)
    let current = cloned
    for (const key of range(DEPTH - 1)) {
      current = current[key]
    }
    current[DEPTH] = new Date(1)
    console.assert(JSON.stringify(object) !== JSON.stringify(cloned))
  })
  // add listeners
  .on("cycle", function (event) {
    console.log(String(event.target))
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .on("error", function (err) {
    console.error(err)
  })
  // run async
  .run({ async: true })
