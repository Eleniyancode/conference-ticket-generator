const myForm = document.getElementById("my-form");
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const githubUserName = document.getElementById("username");
const wrapper = document.getElementById("wrapper");
const successMessage = document.getElementById("successMessage");
const applicantName = document.getElementById("applicant-name");
const applicantGithubName = document.getElementById("applicant-githubname");
const applicantEmail = document.getElementById("applicant-email");
const applicantFullName = document.getElementById("applicant-fullName");
let errorImageUpload = document.getElementById("errorImageUpload");
const ticketImage = document.getElementById("ticketImage");

let formHasError = false;

//reloading the page when the form trow an error
function reloadPage(formHasError) {
  if (!formHasError) {
    location.reload();
  }
}

//handling the drag, drop and click section upload image
const dropArea = document.getElementById("dropArea");
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const dragAndDropIn = document.getElementById("drag-drop-instruction");

dropArea.addEventListener("click", () => imageInput.click());

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("dragover");

  const file = event.dataTransfer.files[0];
  handleFile(file);
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  handleFile(file);
});

function handleFile(file) {
  const maxSize = 500 * 1024;

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    errorImageUpload.textContent = "Please upload a valid image file";
    errorImageUpload.style.color = "red";
    preview.src = "./assets/images/icon-upload.svg";
    // reloadPage(formHasError);
  } else if (file.size > maxSize) {
    preview.src = "./assets/images/icon-upload.svg";
    errorImageUpload.textContent =
      "File too large, please upload a photo under 500KB";
  } else {
    errorImageUpload.textContent = "";
    dragAndDropIn.textContent = "";
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.width = "50px";
      preview.style.height = "50px";
      ticketImage.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

//email validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // console.log(regex.test(email));
  return regex.test(email);
}

// console.log(validateEmail("abdulrahamanr657@gmail.com"));

myForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailErrorMessage = document.getElementById("email-error-message");
  const fullNameErrorMessage = document.getElementById(
    "full-name-error-message"
  );
  const githubErrorMessage = document.getElementById("username-error-message");

  // check for proper image upload or if image is upload at all
  const imageInput = document.getElementById("imageInput");
  const errorImageUpload = document.getElementById("errorImageUpload");
  const dropArea = document.getElementById("dropArea");
  console.log(imageInput.files.length);
  // if (imageInput.files.length === 0) {
  //   errorImageUpload.textContent = "";
  // } else {
  //   errorImageUpload.textContent = "Please upload an image";
  //   errorImageUpload.style.color = "red";
  //   dropArea.style.borderBlockColor = "red";
  //   dropArea.style.borderInlineColor = "red";
  //   return;
  // }

  //validation the form fields
  if (fullNameInput.value === "") {
    fullNameErrorMessage.textContent = "All fields are required";
    fullNameErrorMessage.style.color = "red";
  } else if (imageInput.files.length === 0) {
    errorImageUpload.textContent = "Please upload an image";
    errorImageUpload.style.color = "red";
    dropArea.style.borderBlockColor = "red";
    dropArea.style.borderInlineColor = "red";
  } else if (emailInput.value === "") {
    emailErrorMessage.textContent = "All fields are required";
    emailErrorMessage.style.color = "red";
  } else if (githubUserName.value === "") {
    githubErrorMessage.textContent = "All fields are required";
    githubErrorMessage.style.color = "red";
  } else if (!validateEmail(emailInput.value)) {
    emailInput.style.borderBlockColor = "red";
    emailErrorMessage.textContent = "Please enter a valid email address";
    emailErrorMessage.style.color = "red";
  } else {
    emailErrorMessage.textContent = " ";
    //hide the form on submit
    wrapper.style.display = "none";

    //show the success message
    successMessage.style.display = "block";
    //display the fullname input value on the succeeses message
    applicantFullName.innerHTML = fullNameInput.value;
    applicantEmail.innerHTML = emailInput.value;
    applicantGithubName.innerHTML = githubUserName.value;
    applicantName.innerHTML = fullNameInput.value;
  }

  // const applicantInfo = {
  //   fullName: fullNameInput.value,
  //   email: emailInput.value,
  //   github: githubUserName.value,
  // };

  // console.log(applicantInfo);

  // console.log(fullNameInput.value);
  // console.log(emailInput.value);
  // console.log(githubUserName.value);
});
