const keys = require("../keys");

module.exports = (email) => {
    console.log('email', email);
    return {
        from: keys.FROM_MAIL,
        to: email,
        subject: "Account created",
        html: `
        <h1>Welcom in our stor</h1>
        <p>You succesfully created account with email - ${email}</p>
        <hr />
        <a href="${keys.BASE_URL}">Store of course</a>
        `
    }
}