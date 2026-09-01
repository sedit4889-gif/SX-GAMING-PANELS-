/* ==========================================
   Sメ PANEL — LOGIN SYSTEM
========================================== */

const USERNAME = "SAHIL";
const PASSWORD = "123456";


/* PASSWORD TOGGLE */

function togglePassword() {

    const password =
        document.getElementById("password");

    const button =
        document.querySelector(".eye-button");

    if (!password) return;

    if (password.type === "password") {

        password.type = "text";

        if (button) {
            button.textContent = "🙈";
        }

    } else {

        password.type = "password";

        if (button) {
            button.textContent = "👁";
        }

    }
}


/* LOGIN */

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("loginMessage");


    if (!username || !password) {

        message.textContent =
            "⚠ ENTER USERNAME & PASSWORD";

        message.style.color =
            "#ffb84d";

        return;
    }


    if (
        username === USERNAME &&
        password === PASSWORD
    ) {

        message.textContent =
            "✓ ACCESS GRANTED";

        message.style.color =
            "#48ff9b";


        sessionStorage.setItem(
            "sPanelAccess",
            "granted"
        );

        sessionStorage.setItem(
            "sPanelUser",
            username
        );


        setTimeout(function() {

            window.location.href =
                "sensitivity.html";

        }, 600);


    } else {

        message.textContent =
            "✕ ACCESS DENIED";

        message.style.color =
            "#ff1738";


        const card =
            document.querySelector(".login-card");

        if (card) {

            card.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-8px)" },
                    { transform: "translateX(8px)" },
                    { transform: "translateX(-5px)" },
                    { transform: "translateX(5px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 350
                }
            );

        }

    }

}


/* ENTER KEY */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            document.getElementById("username")
        ) {

            login();

        }

    }
);
