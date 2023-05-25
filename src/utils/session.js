//To embed you link the script on the login page: <script src='session.js'></script>
//The src should be set according to the script file location in your directory tree
// to implement the function, make a function call and pass all the parameters: setSession('user@email.com', 'username', 'googpt')



function setSession(email, username, app) {
    let message = "No Session Established";
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('app', app);
    if (app === sessionStorage.getItem('app')) {
        message = "JavaScript Session set";
    }
    return message;
}





