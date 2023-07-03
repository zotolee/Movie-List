class Movie {
    constructor(title, producer, year) {
        this.title = title;
        this.producer = producer;
        this.year = year;
    }
}

class UI {
    addMovieToList(movie) {
        const list = document.getElementById('movie-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.producer}</td>
            <td>${movie.year}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#movie-form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 1500);
    }

    deleteMovie(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('producer').value = '';
        document.getElementById('year').value = '';
    }
}

//Event listener for add movie
document.getElementById('movie-form').addEventListener('submit',
    function(e) {
        e.preventDefault();
        //Get form values
        const title = document.getElementById('title').value,
              producer = document.getElementById('producer').value,
              year = document.getElementById('year').value

        //Instantiate movie
        const movie = new Movie(title, producer, year);
        
        //Instantiate UI
        const ui = new UI();  
        
         // Validate
        if(title === '' || producer === '' || year === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
        } else {
        // Add book to list
        ui.addMovieToList(movie);

        // Show success
        ui.showAlert('Movie Added!', 'success');
  
        // Clear fields
        ui.clearFields();
    }   
});

    // Event Listener for delete
    document.getElementById('movie-list').addEventListener('click', function(e){
        e.preventDefault();

    // Instantiate UI
    const ui = new UI();
  
    // Delete book
    ui.deleteMovie(e.target);

    // Show message
    ui.showAlert('Movie Removed!', 'success');

});