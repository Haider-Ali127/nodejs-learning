const fs = require("fs");

const args = process.argv.slice(2);
const fileName = args[0];
const content = args.slice(1).join(" ");

if (!fileName || !content) {
    console.log(`Usage: node fileCreator.js <fileName> <content>`);
    process.exit(1);
}

fs.writeFileSync(fileName, content);
console.log(`✅ File '${fileName}' created successfully!`);


const data = fs.readFileSync(fileName, "utf8");
console.log(`📄 File Content:\n${data}`);    