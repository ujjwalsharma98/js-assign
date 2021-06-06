  
var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
var interval;



for (var i = 0; i < navMenuAnchorTags.length; i++) {
    navMenuAnchorTags[i].addEventListener('click', function (event) {
        event.preventDefault();
        var targetSectionID = this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);
        interval = setInterval(scrollVertically, 20, targetSection);
        // interval = setInterval(function () {
        //     scrollVertically(targetSection);
        // }, 20);
    });
}

function scrollVertically(targetSection) {
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if (targetSectionCoordinates.top <= 0) {
        clearInterval(interval);
        return;
    }
    window.scrollBy(0, 50);
}




document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let userName = document.getElementById("userName").value
    let password = document.getElementById("password").value
    let resetPassword = document.getElementById("resetPassword").value

    // email validation
    let emailValidated = validateEmail(email)
    let emailSpan = document.getElementById("email-error")
    if (email == '') {
        emailSpan.innerHTML = 'Field is required'
    }
    if (email != '') {
        if (!emailValidated) {
            emailSpan.innerHTML = 'Please enter a valid email'
        }
        if (emailValidated) {
            emailSpan.innerHTML = ''
        }
    }

    // username validation
    let userNameValidated = validateUserName(userName)
    let usernameSpan = document.getElementById("username-error")
    if (userName == '') {
        usernameSpan.innerHTML = 'Field is required'
    }
    if (userName != '') {
        if (!userNameValidated) {
            usernameSpan.innerHTML = 'Username must not contain space or special characters'
        }
        if (userNameValidated) {
            usernameSpan.innerHTML = ''
        }
    }


    let passwordValidated = validatePassword(password, resetPassword)

    if (emailValidated && userNameValidated && passwordValidated) {
        alert('Data posted successfully!')
    }
});

function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true
    } else {
        return false
    }
}

function validateUserName(userName) {
    const res = /^[a-z0-9_\.]+$/.exec(userName);
    const valid = !!res;
    return valid;
}

function validatePassword(password, resetPassword) {
    let passwordSpan = document.getElementById("password-error")
    if (password == '') {
        passwordSpan.innerHTML = 'Field is required'
    } if (password != '') {
        if (password === resetPassword) {
            let res = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.exec(password)
            const valid = !!res;
            if (!valid) {
                passwordSpan.innerHTML = 'Password must contain...'
                // Your password must contain.....
            } else if (valid) {
                passwordSpan.innerHTML = ''
            }
            return valid
        } else {
            // password dont match
            passwordSpan.innerHTML = 'Passwords dont match'
            return false;
        }
    }
}

// modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const debounce = (func, delay) => {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
}

document.getElementById("search").addEventListener('input', debounce(searchPhotos, 2000))

// image section
function searchPhotos() {
    let clientId = "UkXMpOS-JRel2PfuCrwTUjggxy-ygD5EQf-y7-8ZnII"
    let query = document.getElementById("search").value
    let url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}`

    try {
        fetch(url).then(function (data) {
            return data.json()
        }).then(function (data) {
            let node = document.getElementById("imageResult")
            while (node.hasChildNodes()) {
                node.removeChild(node.lastChild);
            }
            data.results.forEach(photo => {
                let img = document.createElement("IMG");
                img.src = photo.urls.small;
                document.getElementById("imageResult").append(img);
            })
        })
    } catch (err) {
        alert(err); // Failed to fetch
    }
}