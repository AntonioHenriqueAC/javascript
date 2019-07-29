// Book constructor

function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI(){}

//função para add na tabela
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');

    //create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class="delete">X<a></td>
    `;
    list.appendChild(row);
}

//show alert
UI.prototype.showAlert = function(message, className){
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //add text 
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    // insert alert
    container.insertBefore(div, form);

    //desaparecer dps 3 segundos
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

//função delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//função para limpar label depois que insere book na tabela
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


//Event listeners for add book

document.getElementById('book-form').addEventListener('submit' , 
    function(e){
        //get form values
        const title = document.getElementById('title').value,
              author = document.getElementById('author').value,
              isbn = document.getElementById('isbn').value

        //instantiate book
        const book = new Book(title, author, isbn);

        //instantiate UI
        const ui = new UI();

        console.log(ui);
        //validate
        if(title === '' || author === '' ||isbn === ''){
        //error alert
        ui.showAlert('Please fill in all fields !', 'error');
        }else{
         //Add book to list
        ui.addBookToList(book);

        ui.showAlert('Book Added !!', 'success');

        //clear fields
        ui.clearFields();
        }

    e.preventDefault();
})

//Event listeners for detele book
document.getElementById('book-list').addEventListener('click', 
    function(e){
        
        const ui = new UI();

        ui.deleteBook(e.target);

        if(e.target.className === 'delete'){
        // show alert
        ui.showAlert('Book removed!!', 'success');
        }
    e.preventDefault();
});