const form = document.getElementById("form");
const output = document.getElementById("output");

// Fields (with contact/phone added)
const fields = [
  { name: "name", placeholder: "Enter Name", type: "text", required: true },
  { name: "email", placeholder: "Enter Email", type: "email", required: true },
  { name: "phone", placeholder: "Enter Phone Number", type: "text", required: true },
  { name: "age", placeholder: "Enter Age", type: "number", required: true }
];

// Create inputs dynamically
fields.forEach(field => {
  const input = document.createElement("input");
  input.type = field.type;
  input.placeholder = field.placeholder;
  input.id = field.name;

  if (field.required) {
    input.required = true;
  }

  const error = document.createElement("div");
  error.className = "error";
  error.id = field.name + "Error";

  form.appendChild(input);
  form.appendChild(error);
});

// Submit button
const button = document.createElement("button");
button.textContent = "Submit";
form.appendChild(button);

// Validation function
function validate() {
  let isValid = true;

  fields.forEach(field => {
    const input = document.getElementById(field.name);
    const error = document.getElementById(field.name + "Error");

    if (input.value.trim() === "") {
      error.textContent = `${field.name} is required`;
      isValid = false;
      return;
    } else {
      error.textContent = "";
    }

    // Email validation
    if (field.name === "email") {
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!pattern.test(input.value)) {
        error.textContent = "Invalid email format";
        isValid = false;
      }
    }

    // Phone validation (10 digits)
    if (field.name === "phone") {
      const pattern = /^[0-9]{10}$/;
      if (!pattern.test(input.value)) {
        error.textContent = "Enter valid 10-digit phone number";
        isValid = false;
      }
    }
  });

  return isValid;
}

// Handle submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validate()) return;

  output.innerHTML = `
    <div class="success">Form Submitted Successfully ✅</div>
    <h3>Submitted Data</h3>
    ${fields.map(f => `<p><b>${f.name}:</b> ${document.getElementById(f.name).value}</p>`).join("")}
  `;

  // Reset form
  form.reset();
});