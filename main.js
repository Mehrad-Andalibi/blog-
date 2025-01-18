const navItems = document.querySelector('.nav__items');
const openNavBtn = document.querySelector('#open__nav-btn');
const closeNavBtn = document.querySelector('#close__nav-btn');

// opens nav dropdown
const openNav = () => {
    navItems.style.display = 'flex';
    openNavBtn.style.display = 'none';
    closeNavBtn.style.display = 'inline-block';
}

// close nav dropdown
const closeNav = () => {
    navItems.style.display = 'none';
    openNavBtn.style.display = 'inline-block';
    closeNavBtn.style.display = 'none';
}

openNavBtn.addEventListener('click', openNav);
closeNavBtn.addEventListener('click', closeNav);




const sidebar = document.querySelector('aside');
const showSidebarBtn = document.querySelector('#show__sidebar-btn');
const hideSidebarBtn = document.querySelector('#hide__sidebar-btn');

// shows sidebar on small devices
const showSidebar = () => {
    sidebar.style.left = '0';
    showSidebarBtn.style.display = 'none';
    hideSidebarBtn.style.display = 'inline-block';
}
// hides sidebar on small devices
const hideSidebar = () => {
    sidebar.style.left = '-100%';
    showSidebarBtn.style.display = 'inline-block';
    hideSidebarBtn.style.display = 'none';
}

showSidebarBtn.addEventListener('click', showSidebar);
hideSidebarBtn.addEventListener('click', hideSidebar);



//-----------------------------------Form Validation-------------------------------------



// Main validation function that runs on form submission
function validate(event) {
    if (event) event.preventDefault();
    
    // Hide any existing success message
    const alertMessage = document.querySelector('.alert__message');
    alertMessage.style.display = 'none';
    
    // Clear all existing error messages before revalidating
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    
    // Get all input fields
    const firstName = document.querySelector('input[placeholder="First Name"]');
    const lastName = document.querySelector('input[placeholder="Last Name"]');
    const userName = document.querySelector('input[placeholder="User Name"]');
    const email = document.querySelector('input[type="email"]');
    const password = document.querySelector('input[placeholder="Create Password"]');
    const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]');
    const terms = document.getElementById('terms');
    
    // Validate all fields
    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isUserNameValid = validateUserName(userName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPassword2Valid = validatePasswordConfirmation(password, confirmPassword);
    const isTermsValid = validateTerms(terms);
    
    // Check if all validations pass
    const isFormValid = isFirstNameValid && 
                       isLastNameValid && 
                       isUserNameValid && 
                       isEmailValid && 
                       isPasswordValid && 
                       isPassword2Valid && 
                       isTermsValid;

    if (isFormValid) {
        showSuccessMessage("Registration successful!");
        return true;
    }
    
    // If any validation failed, scroll to the first error
    const firstError = document.querySelector('.error-message');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    return false;
}

// Function to show an error message
function showError(input, message) {
    clearError(input);
    
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "0.8rem";
    errorMessage.style.marginTop = "0.2rem";
    errorMessage.innerText = "✖ " + message;
    
    // Special handling for terms checkbox
    if (input.id === 'terms') {
        errorMessage.style.display = 'inline-block';
        errorMessage.style.marginLeft = '1rem';
        input.parentNode.appendChild(errorMessage);
    } else {
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
    
    input.style.borderColor = "red";
}

// Function to show success message
function showSuccessMessage(message) {
    const alertMessage = document.querySelector('.alert__message');
    alertMessage.classList.remove('error');
    alertMessage.classList.add('success');
    alertMessage.style.display = 'block';
    alertMessage.querySelector('p').textContent = message;
}

// Function to remove error
function clearError(input) {
    const errorMessage = input.parentNode.querySelector(".error-message");
    if (errorMessage) {
        errorMessage.remove();
    }
    input.style.borderColor = "";
}

// Reset all validations
function resetValidation() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    document.querySelectorAll("input").forEach(input => {
        input.style.borderColor = "";
    });
    document.querySelector('.alert__message').style.display = 'none';
}

// Validation functions for each field
function validateFirstName(input) {
    if (!input.value.trim()) {
        showError(input, "First name is required");
        return false;
    } else if (!/^[A-Za-z]{2,30}$/.test(input.value.trim())) {
        showError(input, "First name should be 2-30 letters only");
        return false;
    }
    clearError(input);
    return true;
}

function validateLastName(input) {
    if (!input.value.trim()) {
        showError(input, "Last name is required");
        return false;
    } else if (!/^[A-Za-z]{2,30}$/.test(input.value.trim())) {
        showError(input, "Last name should be 2-30 letters only");
        return false;
    }
    clearError(input);
    return true;
}

function validateUserName(input) {
    if (!input.value.trim()) {
        showError(input, "Username is required");
        return false;
    } else if (!/^[A-Za-z0-9_]{3,20}$/.test(input.value.trim())) {
        showError(input, "Username should be 3-20 characters (letters, numbers, underscore)");
        return false;
    }
    clearError(input);
    return true;
}

function validateEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!input.value.trim()) {
        showError(input, "Email is required");
        return false;
    } else if (!emailPattern.test(input.value)) {
        showError(input, "Please enter a valid email address");
        return false;
    }
    clearError(input);
    return true;
}

function validatePassword(input) {
    if (!input.value) {
        showError(input, "Password is required");
        return false;
    } else if (input.value.length < 8) {
        showError(input, "Password must be at least 8 characters long");
        return false;
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(input.value)) {
        showError(input, "Password must contain uppercase, lowercase, and numbers");
        return false;
    }
    clearError(input);
    return true;
}

function validatePasswordConfirmation(password, confirmPassword) {
    if (!confirmPassword.value) {
        showError(confirmPassword, "Please confirm your password");
        return false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        return false;
    }
    clearError(confirmPassword);
    return true;
}

function validateTerms(input) {
    if (!input.checked) {
        showError(input, "Please accept the terms and conditions");
        return false;
    }
    clearError(input);
    return true;
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide alert message initially
    const alertMessage = document.querySelector('.alert__message');
    if (alertMessage) {
        alertMessage.style.display = 'none';
    }
    
    // Get all input fields
    const firstName = document.querySelector('input[placeholder="First Name"]');
    const lastName = document.querySelector('input[placeholder="Last Name"]');
    const userName = document.querySelector('input[placeholder="User Name"]');
    const email = document.querySelector('input[type="email"]');
    const password = document.querySelector('input[placeholder="Create Password"]');
    const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]');
    const terms = document.getElementById('terms');
    
    // Add real-time validation listeners
    firstName.addEventListener("input", () => validateFirstName(firstName));
    lastName.addEventListener("input", () => validateLastName(lastName));
    userName.addEventListener("input", () => validateUserName(userName));
    email.addEventListener("input", () => validateEmail(email));
    password.addEventListener("input", () => validatePassword(password));
    confirmPassword.addEventListener("input", () => validatePasswordConfirmation(password, confirmPassword));
    terms.addEventListener("change", () => validateTerms(terms));
    
    // Add form submit event listener
    const form = document.querySelector('form');
    form.addEventListener('submit', validate);
    
    // Add click event listener to Sign Up button
    const signUpButton = document.querySelector('button[type="submit"]');
    signUpButton.addEventListener('click', validate);
});