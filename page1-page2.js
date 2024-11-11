

let selectedTopic = document.querySelectorAll('.topic-btn')
let usernameInput = document.querySelector("input");
let nextbtn = document.getElementById("username-input")



usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (usernameInput.value.trim() === '') {
            nextbtn.disabled =true;
            // nextbtn.disabled = !usernameInput
            // alert("I first time know a man with no name!")
            alert("Hi! We'd love to personalize your experience. Please enter your name?")
        }
        else {
            nextbtn.disabled = false;
            window.location.href = "Topic.html";
            localStorage.setItem("username", usernameInput.value)
        }
    }
})


