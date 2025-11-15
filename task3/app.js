const {
    argv
} = require("process");
console.log(`new version ${process.version}`)
console.log(`new version ${process.cwd()}`)

console.log(`${process.cwd}`)
console.log(__dirname, __filename)
const name = argv[2]
console.log(`Hello ${name}`);