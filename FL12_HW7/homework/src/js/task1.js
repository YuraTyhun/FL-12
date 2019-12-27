let email = prompt('Please, enter your e-mail address');
console.log(email);
let password, changePass, oldPass, newPass, repeatPass;
const MIN_EMAIL_LENGTH = 5;
const MIN_PASS_LENGTH = 6;

if (email === '' || email === null) {
    alert('Canceled');
} else if (email.length < MIN_EMAIL_LENGTH) {
    alert('I don\'t know any emails having name length less than 5 symbols');
} else if (email === 'user@gmail.com' || email === 'admin@gmail.com') {
    password = prompt('Please, enter your password');
    if (password === '' || password === null) {
        alert('Canceled');
    } else if (email === 'user@gmail.com' && password !== 'UserPass' || 
               email === 'admin@gmail.com' && password !== 'AdminPass') {
        alert('Wrong password');
    } else {
        changePass = confirm('Do you want to change your password?');
        console.log(changePass);
        if (changePass) {
            oldPass = prompt('Write the old password');
            console.log(oldPass);
            if (oldPass === '' || oldPass === null) {
                alert('Canceled');
            } else if (oldPass === password) {
                newPass = prompt('Please, write the new password');
                console.log(newPass);
                if (newPass === '' || newPass === null) {
                    alert('Canceled');
                } else if (newPass.length < MIN_PASS_LENGTH) {
                    alert('It\'s to short password. Sorry.');
                } else {
                    repeatPass = prompt('Please, write the password again');
                    console.log(repeatPass);
                    if (repeatPass !== newPass) {
                        alert('You wrote the wrong password.');
                    } else {
                        alert('You have successfully changed your password.');
                    }
                }
            } else {
                alert('Wrong password');
            }
        } else {
            alert('You have failed the change');
        }
    }
} else {
    alert('I don\'t know you');
}
