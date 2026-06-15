document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function(e){

        e.preventDefault();

        let name = document.querySelector('input[name="from_name"]').value;
        let email = document.querySelector('input[name="from_email"]').value;
        let phone = document.querySelector('input[name="phone"]').value;
        let subject = document.querySelector('input[name="subject"]').value;
        let message = document.querySelector('textarea[name="message"]').value;

        let text =
`Hello Pravin,

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}`;

        window.open(
            `https://wa.me/7558765703?text=${encodeURIComponent(text)}`,
            "_blank"
        );
    });

});