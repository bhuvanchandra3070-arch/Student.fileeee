const API_URL = "/api/students";

const form = document.getElementById("studentForm");
const studentId = document.getElementById("studentId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const studentTableBody = document.getElementById("studentTableBody");
const message = document.getElementById("message");

document.addEventListener("DOMContentLoaded", loadStudents);


// GET ALL STUDENTS
async function loadStudents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        const students = await response.json();

        displayStudents(students);

    } catch (error) {
        console.error(error);

        showMessage(
            "Could not load students. Make sure the Java backend is running.",
            true
        );
    }
}


// DISPLAY STUDENTS
function displayStudents(students) {

    studentTableBody.innerHTML = "";

    if (students.length === 0) {

        studentTableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>

            <td>
                ${escapeHtml(student.name)}
            </td>

            <td>
                ${escapeHtml(student.email)}
            </td>

            <td>

                <button
                    class="secondary"
                    onclick="editStudent(
                        ${student.id},
                        '${escapeJs(student.name)}',
                        '${escapeJs(student.email)}'
                    )">
                    Edit
                </button>

                <button
                    class="secondary"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>

            </td>
        `;

        studentTableBody.appendChild(row);
    });
}


// ADD / UPDATE STUDENT
form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const student = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
    };


    if (!student.name || !student.email) {

        showMessage(
            "Please enter both name and email.",
            true
        );

        return;
    }


    try {

        let response;


        // UPDATE
        if (studentId.value) {

            response = await fetch(
                `${API_URL}/${studentId.value}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(student)
                }
            );

        }

        // ADD
        else {

            response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(student)
                }
            );

        }


        const result = await response.text();


        if (!response.ok) {

            throw new Error(
                result || "Request failed"
            );

        }


        showMessage(
            result || "Student saved successfully."
        );


        resetForm();

        loadStudents();


    } catch (error) {

        console.error(error);

        showMessage(
            error.message,
            true
        );

    }

});


// EDIT STUDENT
function editStudent(id, name, email) {

    studentId.value = id;

    nameInput.value = name;

    emailInput.value = email;


    submitButton.textContent =
        "Update Student";


    cancelButton.style.display =
        "inline-block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// DELETE STUDENT
async function deleteStudent(id) {

    if (
        !confirm(
            "Are you sure you want to delete this student?"
        )
    ) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        const result =
            await response.text();


        if (!response.ok) {

            throw new Error(
                result || "Delete failed"
            );

        }


        showMessage(
            result ||
            "Student deleted successfully."
        );


        loadStudents();


    } catch (error) {

        console.error(error);

        showMessage(
            error.message,
            true
        );

    }

}


// CANCEL UPDATE
cancelButton.addEventListener(
    "click",
    resetForm
);


// RESET FORM
function resetForm() {

    form.reset();

    studentId.value = "";

    submitButton.textContent =
        "Add Student";

    cancelButton.style.display =
        "none";

}


// MESSAGE
function showMessage(
    text,
    isError = false
) {

    message.textContent = text;


    message.className =
        isError
            ? "message error"
            : "message success";


    setTimeout(() => {

        message.textContent = "";

        message.className =
            "message";

    }, 3000);

}


// ESCAPE HTML
function escapeHtml(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


// ESCAPE JAVASCRIPT
function escapeJs(value) {

    return String(value)

        .replaceAll(
            "\\",
            "\\\\"
        )

        .replaceAll(
            "'",
            "\\'"
        )

        .replaceAll(
            "\n",
            "\\n"
        )

        .replaceAll(
            "\r",
            "\\r"
        );

}
