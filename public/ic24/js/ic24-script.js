// IC24 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright

async function loadStudents() {
    const response = await fetch('/ic24/students');
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
    const res  = await fetch('/ic24/students', {
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
      result.textContent = data.error;
    }
  } catch (err) {
    result.className   = 'error';
    result.textContent = `Network error: ${err.message}`;
  }
});

loadStudents().catch(err => console.error(err));
