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


        const loader =
    document.getElementById("accessLoader");

if (loader) {
    loader.classList.add("show");
}

setTimeout(function() {

    window.location.href =
        "sensitivity.html";

}, 1400);


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
/* ==========================================
   SENSITIVITY CONTROLS
========================================== */

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


/* SAVE */

function saveSensitivity() {

    const settings = {

        general:
            document.getElementById("general").value,

        redDot:
            document.getElementById("redDot").value,

        scope2:
            document.getElementById("scope2").value,

        scope4:
            document.getElementById("scope4").value,

        sniper:
            document.getElementById("sniper").value

    };

    localStorage.setItem(
        "sPanelSensitivity",
        JSON.stringify(settings)
    );


    const message =
        document.getElementById("saveMessage");

    if (message) {

        message.textContent =
            "✓ SETTINGS SAVED";

        message.style.color =
            "#48ff9b";

    }

}


/* RESET */

function resetSensitivity() {

    const defaults = {

        general: 95,
        redDot: 90,
        scope2: 85,
        scope4: 80,
        sniper: 70

    };


    Object.keys(defaults).forEach(function(id) {

        const slider =
            document.getElementById(id);

        if (!slider) return;

        slider.value =
            defaults[id];

        updateValue(id);

    });


    localStorage.removeItem(
        "sPanelSensitivity"
    );


    const message =
        document.getElementById("saveMessage");

    if (message) {

        message.textContent =
            "↻ SETTINGS RESET";

        message.style.color =
            "#ff1738";

    }

}


/* LOAD SAVED SETTINGS */

function loadSensitivity() {

    const saved =
        localStorage.getItem(
            "sPanelSensitivity"
        );

    if (!saved) {

        [
            "general",
            "redDot",
            "scope2",
            "scope4",
            "sniper"
        ].forEach(updateValue);

        return;
    }


    try {

        const settings =
            JSON.parse(saved);


        Object.keys(settings).forEach(function(id) {

            const slider =
                document.getElementById(id);

            if (slider) {

                slider.value =
                    settings[id];

                updateValue(id);

            }

        });

    } catch (error) {

        localStorage.removeItem(
            "sPanelSensitivity"
        );

    }

}


/* PAGE LOAD */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (
            document.getElementById("general")
        ) {

            loadSensitivity();

        }

    }
);
/* ==========================================
   Sメ PANEL — FEATURE INTERACTION
========================================== */

function featureInfo(feature) {

    const card =
        event.currentTarget;

    if (card) {

        card.classList.toggle("active");

    }

    const messages = {

        "UMP RECOIL":
            "UMP RECOIL\n\nPractice controlled recoil management and comfortable sensitivity.",

        "HEADSHOT":
            "HEADSHOT\n\nUse your sensitivity as a starting point and practice in training mode.",

        "AIM FOV":
            "AIM FOV\n\nChoose a comfortable field of view for your display.",

        "DRAG HEADSHOT":
            "DRAG HEADSHOT\n\nPractice smooth upward drag movement and consistent timing.",

        "ONE TAP":
            "ONE TAP\n\nPractice short and controlled aim movements.",

        "RED NUMBER":
            "RED NUMBER\n\nTraining and display information for your setup.",

        "STABLE PIN":
            "STABLE PIN\n\nPractice stable positioning and controlled aim movement."

    };


    alert(
        "Sメ PANEL\n\n" +
        (messages[feature] ||
        "Feature information unavailable.")
    );

}

}
/* ==========================================
   Sメ PANEL — LOGOUT
========================================== */

function logoutPanel() {

    sessionStorage.removeItem("sPanelAccess");
    sessionStorage.removeItem("sPanelUser");

    window.location.href = "index.html";

}


/* SHOW USERNAME */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const user =
            sessionStorage.getItem("sPanelUser");

        const profile =
            document.getElementById(
                "profileUsername"
            );

        if (user && profile) {

            profile.textContent = user;

        }

    }
);
/* ==========================================
   Sメ PANEL — PAGE PROTECTION
========================================== */

function checkPanelAccess() {

    const access =
        sessionStorage.getItem("sPanelAccess");

    const currentPage =
        window.location.pathname.split("/").pop();

    const protectedPages = [
        "sensitivity.html",
        "features.html",
        "profile.html"
    ];

    if (
        protectedPages.includes(currentPage) &&
        access !== "granted"
    ) {

        window.location.replace(
            "index.html"
        );

        return false;
    }

    return true;
}


/* RUN PROTECTION */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        checkPanelAccess();

    }
);
