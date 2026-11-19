// IC23 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright

// fetch() GET uses zero options — the defaults work. What three options does fetch() POST require and why does each one matter?
// POST because the default is GET, headers with Content-Type application/json so Express parses req.body, and body JSON.stringify() fetch can't send objects
// Why does the db.run callback use function (err) instead of (err) =>? What would this.lastID be if you used an arrow function?
// A regular function gets its own this, so this.lastID has new ID with an arrow function it would be undefined
// What is the re-fetch pattern and why does it keep the UI in sync with the server instead of just appending a new <li> directly?
// After succesful POST we call loadStudents() again so the list comes from the database, which is source of truth
// Open the Network tab and look at the GET and POST requests side by side. What is different about the POST in the Headers and Payload tabs that the GET doesn't have?
// POST has Content-Type application/json request header and Payload tab with JSON body, GET has niether

async function loadStudents() {
    const response = await fetch('/ic23/students');
    const students = await response.json();

    const list = document.getElementById('student-list');
    list.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;
        list.appendChild(li);
    });
}

document.getElementById('add-btn').addEventListener('click', async () => {
  const first_name     = document.getElementById('first-name').value;
  const last_name      = document.getElementById('last-name').value;
  const classification = document.getElementById('classification').value;
  const major          = document.getElementById('major').value;
  const result         = document.getElementById('add-result');

  if (!first_name || !last_name) {
    result.className   = 'error';
    result.textContent = 'First name and last name are required.';
    return;
  }

  try {
    const res  = await fetch('/ic23/students', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ first_name, last_name, classification, major })
    });
    const data = await res.json();

    if (res.ok) {
      result.className   = '';
      result.textContent = `Added: ${data.first_name} ${data.last_name} (ID ${data.id})`;
      document.getElementById('first-name').value     = '';
      document.getElementById('last-name').value      = '';
      document.getElementById('classification').value = '';
      document.getElementById('major').value          = '';
      await loadStudents();
    } else {
      result.className   = 'error';
      result.textContent = data.error || "Something went wrong.";
    }
  } catch (err) {
    result.className   = 'error';
    result.textContent = `Network error:  ${err.message}`;
  }
});

loadStudents().catch(err => console.error(err));
