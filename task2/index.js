const fs = require("fs");

const booksFile = "books.json";
const usersFile = "users.json";

function load(file) {
    return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : [];
}
function save(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function addBook(title, author) {
    const books = load(booksFile);
    books.push({ id: books.length + 1, title, author, available: true });
    save(booksFile, books);
    console.log(`Book "${title}" added!`);
}

function listBooks() {
    const books = load(booksFile);
    if (!books.length) return console.log("No books found!");
    console.table(books.map(b => ({
        ID: b.id,
        Title: b.title,
        Author: b.author,
        Status: b.available ? "Available" : "Borrowed"
    })));
}

function addUser(name) {
    const users = load(usersFile);
    users.push({ id: users.length + 1, name, borrowed: [] });
    save(usersFile, users);
    console.log(`User "${name}" added!`);
}

function borrow(userName, title) {
    const users = load(usersFile);
    const books = load(booksFile);
    const user = users.find(u => u.name === userName);
    const book = books.find(b => b.title === title);
    if (!user || !book) return console.log("User or book not found!");
    if (!book.available) return console.log("Book already borrowed!");
    book.available = false;
    user.borrowed.push(title);
    save(usersFile, users);
    save(booksFile, books);
    console.log(`${userName} borrowed "${title}"`);
}

const [, , cmd, ...args] = process.argv;

if (cmd === "addBook") addBook(args[0], args[1]);
else if (cmd === "listBooks") listBooks();
else if (cmd === "addUser") addUser(args[0]);
else if (cmd === "borrow") borrow(args[0], args[1]);
else
    console.log(`
Commands:
  node index.js addBook "Title" "Author"
  node index.js listBooks
  node index.js addUser "Name"
  node index.js borrow "Name" "BookTitle"
`);
