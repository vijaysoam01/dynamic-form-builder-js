const form = document.getElementById("form");
const output = document.getElementById("output");

// field config (professional approach)
const fields = [
  { name: "name", placeholder: "Enter Name", type: "text" },
  { name: "email", placeholder: "Enter Email", type: "email" },
  { name: "address", placeholder: "Enter Address", type: "text" },
  { name: "age", placeholder: "Enter Age", type: "number" }
];

// create inputs dynamically
fields.forEach(field => {
  const input = document.createElement("input");
  input.type = field.type;
  input.placeholder = field.placeholder;
  input.id = field.name;

  const error = document.createElement("div");
  error.className = "error";
  error.id = field.name + "Error";

  form.appendChild(input);
  form.appendChild(error);
});

// submit button
const button = document.createElement("button");
button.textContent = "Submit";
form.appendChild(button);

// validation function
function validate() {
  let isValid = true;

  fields.forEach(field => {
    const input = document.getElementById(field.name);
    const error = document.getElementById(field.name + "Error");

    if (input.value.trim() === "") {
      error.textContent = `${field.name} is required`;
      isValid = false;
    } else {
      error.textContent = "";
    }

    // email validation
    if (field.name === "email" && input.value !== "") {
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!pattern.test(input.value)) {
        error.textContent = "Invalid email format";
        isValid = false;
      }
    }
  });

  return isValid;
}

// handle submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validate()) return;

  output.innerHTML = `
    <h3>Submitted Data</h3>
    ${fields.map(f => `<p><b>${f.name}:</b> ${document.getElementById(f.name).value}</p>`).join("")}
  `;
});