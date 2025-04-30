class Book {
    constructor(title, author, yearPublished) {
      this.title = title;
      this.author = author;
      this.yearPublished = yearPublished;
      this.isCheckedOut = false;
    }
  
    toggleCheckOutStatus() {
      this.isCheckedOut = !this.isCheckedOut;
    }
  
    getBookInfo() {
      return `${this.title} by ${this.author}, published in ${this.yearPublished}.`;
    }
  }
  
  class Library {
    constructor(name) {
      this.name = name;
      this.books = [];
    }
  
    addBook(book) {
      this.books.push(book);
      displayBooks();
    }
  
    listBooks() {
      return this.books;
    }
  
    findBook(title) {
      return this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
    }
  
    removeBook(title) {
      const index = this.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
      if (index !== -1) {
        this.books.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  
  const myLibrary = new Library("My Digital Library");
  
  function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = parseInt(document.getElementById("year").value);
    if (title && author && year) {
      const newBook = new Book(title, author, year);
      myLibrary.addBook(newBook);
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("year").value = "";
    } else {
      alert("Please fill in all fields.");
    }
  }
  
  function findBook() {
    const title = document.getElementById("searchTitle").value;
    const book = myLibrary.findBook(title);
    if (book) {
      alert(book.getBookInfo() + ` Checked Out: ${book.isCheckedOut}`);
    } else {
      alert("Book not found.");
    }
  }
  
  function removeBook() {
    const title = document.getElementById("searchTitle").value;
    const removed = myLibrary.removeBook(title);
    displayBooks();
    alert(removed ? "Book removed." : "Book not found.");
  }
  
  function toggleBookStatus(title) {
    const book = myLibrary.findBook(title);
    if (book) {
      book.toggleCheckOutStatus();
      displayBooks();
    }
  }
  
  function displayBooks() {
    const list = document.getElementById("bookList");
    list.innerHTML = "";
    myLibrary.listBooks().forEach(book => {
      const div = document.createElement("div");
      div.className = "book-item";
      div.innerHTML = `
        <strong>${book.title}</strong><br>
        <em>${book.author}</em> (${book.yearPublished})<br>
        Status: ${book.isCheckedOut ? "Checked Out" : "Available"}<br>
        <button onclick="toggleBookStatus('${book.title}')">Toggle Check Out</button>
      `;
      list.appendChild(div);
    });
  }
  