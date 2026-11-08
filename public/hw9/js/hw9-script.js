// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright

async function loadCredentials() {
    const response = await fetch('/hw9/credentials');
    const data = await response.json();

    const credential = document.getElementById('credentials');
    credential.innerHTML ='';

    Object.entries(data).forEach(([key, value])=> {
        const type = document.createElement('dt');
        type.textContent = key;

        const Id = document.createElement('dd');
        Id.textContent = value;
        credential.appendChild(type);
        credential.appendChild(Id);
    });
}

async function loadCases(){
    const response = await fetch('/hw9/cases');
    const data = await response.json();

    const caseList = document.getElementById('case-list');
    caseList.innerHTML = '';

    if (data.length === 0) {
        const holdCases = document.createElement('li');
        holdCases.className = 'empty-msg';
        holdCases.textContent = 'No cases filed yet.';
        caseList.appendChild(holdCases);
    } else {
        data.forEach((waitingRoom) =>{
        caseList.innerHTML+=`
            <li>
                <div class="case-id">${waitingRoom.id}</div>
                <div class="case-suspect">${waitingRoom.suspect}</div>
                <div class="case-location">${waitingRoom.location}</div>
                <div class="case-notes">${waitingRoom.notes}</div>
                <div class="case-ts">${waitingRoom.timestamp}</div>
            </li>`;
        });
  }
}

async function logCase() {
    const suspect = document.getElementById('suspect').value;
    const location = document.getElementById('location').value;
    const notes = document.getElementById('notes').value;

    const response = await fetch('/hw9/cases', {
        method:'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({ suspect, location, notes })
    });

    if (!response.ok) {
        const data = await response.json();
        document.getElementById('log-status').textContent = data.error;
    } else {
        document.getElementById('suspect').value ='';
        document.getElementById('location').value = '';
        document.getElementById('notes').value = '';
        document.getElementById('log-status').textContent = '';
        loadCases();
    }
}

document.getElementById('log-btn').addEventListener('click', logCase);

loadCredentials();
loadCases();