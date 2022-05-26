let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


Book.prototype.toggleReadStatus = function() {
    this.read = !this.read 
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const bookGrid = document.querySelector('#bookGrid');
    for (let i = 0; i < myLibrary.length; i++) {
        const container = document.createElement('div');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const readToggle = document.createElement('button');
        const remove = document.createElement('button');
        title.textContent = "" + myLibrary[i].title + "";
        author.textContent = myLibrary[i].author;
        pages.textContent = myLibrary[i].pages + " pages";
        read.classList.add('read-toggle');
        if (myLibrary[i].read) {
            readToggle.classList.add('read');
            readToggle.textContent = 'Read';
        }
        else {
            readToggle.textContent = 'Unread';
        }
        remove.textContent = 'Remove';
        remove.classList.add('remove-button');

        container.appendChild(title);
        container.appendChild(author);
        container.appendChild(pages);
        container.appendChild(readToggle);
        container.appendChild(remove);
        bookGrid.appendChild(container);
        container.dataset.index = i;
    }
}

const toggles = document.querySelectorAll('.read-toggle');
toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        toggle.toggle('read');
        if(toggle.textContent = 'Read') {
            toggle.textContent = 'Unread';
        }
        else toggle.textContent = 'Read';
        // update the read status of the book that this toggle belongs to in the myLibrary array
        myLibrary[parseInt(toggle.parentElement.dataset.index)].toggleReadStatus;
    })
});

const remove = document.querySelector('.remove-button');
remove.addEventListener('click', () => {
    myLibrary.splice(parseInt(remove.parentElement.dataset.index), 1);     
    const books = document.querySelectorAll('#bookGrid > div');
    for (let i = 0; i < books.length; i++) { 
        if (parseInt(books[i].dataset.index) > parseInt(remove.parentElement.dataset.index)) { 
            books[i].dataset.index = parseInt(books[i].dataset.index)-1;
        }
    }              
    remove.parentElement.remove();        // remove the book from the library display
})

const newBookButton = document.querySelector('#new-book-button');
newBookButton.addEventListener('click', () => {
    const form = document.querySelector('form');
    form.toggle('active');
})

// when user clicks submit, book should be added to library array
const form = document.querySelector('form');

form.addEventListener('submit', () => {
    const title = document.querySelector('form').elements[0];
    const author = document.querySelector('form').elements[1];
    const pages = document.querySelector('form').elements[2];
    const read = document.querySelector('form').elements[3];
    addBookToLibrary(new Book(title, author, pages, read));
    form.toggle('active');    //hide form
    displayBooks();
})