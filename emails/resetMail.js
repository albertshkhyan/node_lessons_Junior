const keys = require("../keys");

module.exports = (email, token) => {
    return {
        from: keys.FROM_MAIL,
        to: email,
        subject: "Access recovery",
        html: `
        <h1>You are forget password ?</h1>
        <p>if not then ignore this message</p>
        <p>Otherwise click on this link</p>
        <a href="${keys.BASE_URL}/auth/password/${token}">Recover access</a>
        <hr />
        <a href="${keys.BASE_URL}">Store of course</a>
        `
    }
}