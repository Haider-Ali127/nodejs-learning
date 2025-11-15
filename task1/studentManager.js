const fs = require("fs");
const filePath = "students.json";

function loadStudents() {
    if (!fs.existsSync(filePath)) return [];
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (err) {
        console.log("  Error reading data. Resetting file...");
        return [];
    }
}
function saveStudents(students) {
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
}

const args = process.argv.slice(2);
const command = args[0];

if (command === "add") {
    const [name, age, city] = args.slice(1);
    if (!name || !age || !city) {
        console.log("  Usage: node studentManager.js add <name> <age> <city>");
        process.exit(1);
    }

    const students = loadStudents();
    if (students.some(s => s.name.toLowerCase() === name.toLowerCase())) {
        console.log(`Student '${name}' already exists.`);
        process.exit(1);
    }

    students.push({ name, age: Number(age), city });
    saveStudents(students);
    console.log(`Student '${name}' added successfully.`);
}

else if (command === "list") {
    const students = loadStudents();
    if (students.length === 0) {
        console.log("No students found.");
    } else {
        console.table(students);
    }
}

else if (command === "search") {
    const name = args[1];
    if (!name) {
        console.log("Usage: node studentManager.js search <name>");
        process.exit(1);
    }
    const students = loadStudents();
    const found = students.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (found) {
        console.log(" Student found:");
        console.table([found]);
    } else {
        console.log(`No student found with name '${name}'.`);
    }
}

else if (command === "remove") {
    const name = args[1];
    if (!name) {
        console.log("Usage: node studentManager.js remove <name>");
        process.exit(1);
    }

    const students = loadStudents();
    const newStudents = students.filter(s => s.name.toLowerCase() !== name.toLowerCase());

    if (newStudents.length === students.length) {
        console.log(`No student found with name '${name}'.`);
    } else {
        saveStudents(newStudents);
        console.log(`Student '${name}' removed successfully.`);
    }
}

else {
    console.log(`
Usage:
  node studentManager.js add "Name" Age "City"
  node studentManager.js list
  node studentManager.js search "Name"
  node studentManager.js remove "Name"
`);
}
