/* ==========================================
   Sメ PANEL — STABLE CORE
========================================== */

const USERNAME = "SAHIL";
const PASSWORD = "123456";


/* PASSWORD */

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
        document.getElementById("username");

    const password =
        document.getElementById("password");

    const message =
        document.getElementById("loginMessage");

    if (!username || !password) return;


    const user =
        username.value.trim();

    const pass =
        password.value;


    if (!user || !pass) {

        if (message) {

            message.textContent =
                "⚠ ENTER USERNAME & PASSWORD";

            message.style.color =
                "#ffb84d";
        }

        return;
    }


    if (
        user === USERNAME &&
        pass === PASSWORD
    ) {

        if (message) {

            message.textContent =
                "✓ ACCESS GRANTED";

            message.style.color =
                "#48ff9b";
        }


        sessionStorage.setItem(
            "sPanelAccess",
            "granted"
        );

        sessionStorage.setItem(
            "sPanelUser",
            user
        );


        const loader =
            document.getElementById(
                "accessLoader"
            );


        if (loader) {

            loader.classList.add("show");

            setTimeout(function() {

                window.location.href =
                    "sensitivity.html";

            }, 1400);

        } else {

            window.location.href =
                "sensitivity.html";

        }

    } else {

        if (message) {

            message.textContent =
                "✕ ACCESS DENIED";

            message.style.color =
                "#ff1738";
        }

    }

}


/* SENSITIVITY */

function updateValue(id) {

    const slider =
        document.getElementById(id);

    const value =
        document.getElementById(
            id + "Value"
        );

    if (!slider || !value) return;

    value.textContent =
        slider.value;

    const percentage =
        slider.value + "%";

    slider.style.background =
        `linear-gradient(
            90deg,
            var(--red) 0%,
            var(--red) ${percentage},
            #242428 ${percentage},
            #242428 100%
        )`;
}


function saveSensitivity() {

    const ids = [
        "general",
        "redDot",
        "scope2",
        "scope4",
        "sniper"
    ];

    const settings = {};

    ids.forEach(function(id) {

        const slider =
            document.getElementById(id);

        if (slider) {
            settings[id] =
                slider.value;
        }

    });


    localStorage.setItem(
        "sPanelSensitivity",
        JSON.stringify(settings)
    );


    const message =
        document.getElementById(
            "saveMessage"
        );

    if (message) {

        message.textContent =
            "✓ SETTINGS SAVED";

        message.style.color =
            "#48ff9b";
    }

}


function resetSensitivity() {

    const defaults = {

        general: 95,
        redDot: 90,
        scope2: 85,
        scope4: 80,
        sniper: 70

    };


    Object.keys(defaults).forEach(
        function(id) {

            const slider =
                document.getElementById(id);

            if (slider) {

                slider.value =
                    defaults[id];

                updateValue(id);

            }

        }
    );


    localStorage.removeItem(
        "sPanelSensitivity"
    );


    const message =
        document.getElementById(
            "saveMessage"
        );

    if (message) {

        message.textContent =
            "↻ SETTINGS RESET";

        message.style.color =
            "#ff1738";
    }

}


/* FEATURE */

function featureInfo(feature, card) {

    if (card) {
        card.classList.toggle("active");
    }

    alert(
        "Sメ PANEL\n\n" +
        feature +
        "\n\nTraining / configuration module ready."
    );

}


/* LOGOUT */

function logoutPanel() {

    sessionStorage.removeItem(
        "sPanelAccess"
    );

    sessionStorage.removeItem(
        "sPanelUser"
    );

    window.location.href =
        "index.html";

}


/* PAGE PROTECTION */

function checkPanelAccess() {

    const page =
        window.location.pathname
        .split("/")
        .pop();

    const protectedPages = [
        "sensitivity.html",
        "features.html",
        "profile.html"
    ];

    const access =
        sessionStorage.getItem(
            "sPanelAccess"
        );


    if (
        protectedPages.includes(page) &&
        access !== "granted"
    ) {

        window.location.replace(
            "index.html"
        );

    }

}


/* PROFILE USER */

function loadProfileUser() {

    const user =
        sessionStorage.getItem(
            "sPanelUser"
        );

    const profile =
        document.getElementById(
            "profileUsername"
        );

    if (user && profile) {

        profile.textContent =
            user;

    }

}


/* PAGE START */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        checkPanelAccess();

        loadProfileUser();


        const sliders = [
            "general",
            "redDot",
            "scope2",
            "scope4",
            "sniper"
        ];

        sliders.forEach(function(id) {

            const slider =
                document.getElementById(id);

            if (slider) {
                updateValue(id);
            }

        });

    }
);
