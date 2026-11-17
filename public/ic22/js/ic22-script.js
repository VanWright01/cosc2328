// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright

// What is the difference between db.all() and db.get()? When would you use each?
// db.all() gets all matching rows as an array. db.get() gets just one row. Use db.all() for a list and db.get() for one student by id.
// A classmate writes 'SELECT * FROM students WHERE id = ' + id in a route handler. What is wrong with this, and what would happen if someone sent the value 1; DROP TABLE students as the ID?
// It puts the user's input right into the SQL. Sending 1; DROP TABLE students could delete the whole students table. Using ? stops that.
// The db.get callback uses a parameter named row (singular) while db.all uses rows (plural). Why is this naming convention meaningful?
// row means one object and rows means an array, so the name tells you what you are getting.
// Visiting /ic22/students/2 and /ic22/students/7 both work from a single route definition — router.get('/students/:id', ...). How does Express handle that?
// :id is a path parameter. Express puts whatever is in that spot into req.params.id, so one route works for any id.

//step 5

async function loadStudents() {
    const response = await fetch('/ic22/students');
    const students = await response.json();

    const list = document.getElementById('student-list');
    list.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;        
        list.appendChild(li);
    });
}

//step 6
document.getElementById('lookup-btn').addEventListener('click', async () => {
    const id = document.getElementById('student-id').value;
    const result = document.getElementById('student-result');
    
    const response = await fetch(`/ic22/students/${id}`);
    const student = await response.json();

    if (student.message) {
        result.textContent = student.message;
    } else {
        result.textContent = `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;
    }
});

loadStudents();
