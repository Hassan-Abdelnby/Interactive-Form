const form = document.querySelector("form");
const inputs = document.querySelectorAll(".form-group input");
const successMsg = document.getElementById("success");

function validateInput(input) {
  const value = input.value.trim();
  const errorEl = input.parentElement.querySelector("small.error");

  // Empty
  if (!value) {
    errorEl.textContent = "This field is required";
    return false;
  }

  // Name
  if (input.id === "name" && value.length < 3) {
    errorEl.textContent = "Name must be at least 3 characters";
    return false;
  }

  // Email
  if (input.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorEl.textContent = "Please enter a valid email";
      return false;
    }
  }

  // Phone
  if (input.id === "phone") {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(value)) {
      errorEl.textContent = "Please enter a valid phone number";
      return false;
    }
  }

  // Password
  if (input.id === "password" && value.length < 6) {
    errorEl.textContent = "Password must be at least 6 characters";
    return false;
  }

  // Confirmation Password
  if (input.id === "confirm") {
    const pass = document.getElementById("password").value.trim();
    if (value !== pass) {
      errorEl.textContent = "Passwords do not match";
      return false;
    }
  }

  // if All Ok or Done
  errorEl.textContent = "";
  return true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let allValid = true;

  inputs.forEach((input) => {
    const valid = validateInput(input);
    if (!valid) allValid = false;
  });

  if (allValid) {
    successMsg.textContent = "🎉 Registration successful!";
    successMsg.style.color = "green";

    inputs.forEach((input) => (input.value = ""));
    inputs[0].focus();
  } else {
    successMsg.textContent = "";
  }
});

inputs.forEach((input) => {
  input.addEventListener("input", () => validateInput(input));
});
