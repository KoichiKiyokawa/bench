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
    if (isObject(obj[key])) {
      ret[key] = cloneDeep(obj[key])
    } else if (Array.isArray(obj[key])) {
      ret[key] = [...obj[key]]
    } else {
      ret[key] = obj[key]
    }
  }
  return ret
}

/** @returns {boolean} */
function isObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

const Benchmark = require("benchmark")

const suite = new Benchmark.Suite()
suite
  .add("JSON.stringify", function () {
    const object = { a: { b: { c: new Date(0) } } }
    const cloned = JSONClone(object)
    cloned.a.b.c = new Date(1)
    console.assert(object.a.b.c.getTime() !== cloned.a.b.c.getTime())
  })
  .add("recursive", function () {
    const object = { a: { b: { c: new Date(0) } } }
    const cloned = cloneDeep(object)
    cloned.a.b.c = new Date(1)
    console.assert(object.a.b.c.getTime() !== cloned.a.b.c.getTime())
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
