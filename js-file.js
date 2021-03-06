let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleReadStatus() {
        this.read = !this.read;
    }
    addBookToLibrary() {
        myLibrary.push(this);
    }
}

function displayBooks() {
    const bookGrid = document.querySelector('.book-grid');
    while (bookGrid.firstChild) {
        bookGrid.removeChild(bookGrid.firstChild);
    }
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
        readToggle.classList.add('read-toggle');
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
    const toggleButtons = document.querySelectorAll('.read-toggle');
    toggleButtons.forEach((toggleButton) => {
        toggleButton.addEventListener('click', () => {
            toggleButton.classList.toggle('read');
            if(toggleButton.textContent == 'Read') {
                toggleButton.textContent = 'Unread';
            }
            else toggleButton.textContent = 'Read';
            // update the read status of the book that this toggle belongs to in the myLibrary array
            myLibrary[parseInt(toggleButton.parentElement.dataset.index)].toggleReadStatus;
        });
    });
    
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((removeButton) => {
        removeButton.addEventListener('click', () => {
            myLibrary.splice(parseInt(removeButton.parentElement.dataset.index), 1);     
            const books = document.querySelectorAll('.book-grid > div');
            for (let i = 0; i < books.length; i++) { 
                if (parseInt(books[i].dataset.index) > parseInt(removeButton.parentElement.dataset.index)) { 
                    books[i].dataset.index = parseInt(books[i].dataset.index)-1;
                }
            }              
            removeButton.parentElement.remove();        // remove the book from the library display
        });
    });
}

const newBookButton = document.querySelector('#new-book-button');
newBookButton.addEventListener('click', on);

// when user clicks submit, book should be added to library array
const form = document.querySelector('form');
form.addEventListener('submit', () => {
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.checked;
    const book = new Book(title, author, pages, read);
    book.addBookToLibrary();
    form.classList.toggle('active');    //hide form
    displayBooks();
    off();
});

form.addEventListener('click', (event) => {
    event.stopPropagation();
});

function on() {
    const form = document.querySelector('form');
    form.reset();
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

const overlay = document.querySelector('#overlay');
overlay.addEventListener('click', off);

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
    titleInput.setCustomValidity('');
    titleInput.checkValidity();
});

titleInput.addEventListener('invalid', () => {
    titleInput.setCustomValidity('Enter the title of the book!');
});

const authorInput = document.querySelector('#author');

authorInput.addEventListener('input', () => {
    authorInput.setCustomValidity('');
    authorInput.checkValidity();
});

authorInput.addEventListener('invalid', () => {
    authorInput.setCustomValidity('Enter the author of the book!');
});

const pagesInput = document.querySelector('#pages');

pagesInput.addEventListener('input', () => {
    pagesInput.setCustomValidity('');
    pagesInput.checkValidity();
});

pagesInput.addEventListener('invalid', () => {
    pagesInput.setCustomValidity('Enter the number of pages in the book!');
});

