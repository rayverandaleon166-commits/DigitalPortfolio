/* =========================================
   COLOR THEME
========================================= */

const themeToggle =
    document.getElementById("themeToggle");

if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i");

    function updateThemeControl(theme) {
        const lightMode = theme === "light";
        const nextMode = lightMode ? "dark" : "light";

        themeToggle.setAttribute("aria-label", "Switch to " + nextMode + " mode");
        themeToggle.setAttribute("title", "Switch to " + nextMode + " mode");
        themeIcon.className = lightMode
            ? "fa-solid fa-moon"
            : "fa-solid fa-sun";
    }

    const initialTheme =
        document.documentElement.dataset.theme === "light" ? "light" : "dark";

    document.documentElement.dataset.theme = initialTheme;
    updateThemeControl(initialTheme);

    themeToggle.addEventListener("click", function () {
        const nextTheme =
            document.documentElement.dataset.theme === "light" ? "dark" : "light";

        document.documentElement.dataset.theme = nextTheme;
        updateThemeControl(nextTheme);

        try {
            localStorage.setItem("portfolio-theme", nextTheme);
        } catch (error) {}
    });
}


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document.querySelectorAll(".nav-link").forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================
   REVEAL ANIMATION
   ANIMATES EVERY TIME YOU SCROLL BACK
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    /*
                     * Add the active class
                     * when the element enters the screen.
                     */
                    entry.target.classList.add("active");

                } else {

                    /*
                     * Remove the active class
                     * when the element leaves the screen.
                     *
                     * This allows the animation
                     * to happen again next time.
                     */
                    entry.target.classList.remove("active");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-link");


const navObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    navLinks.forEach(function (link) {

                        link.classList.remove("active");

                    });


                    const activeLink =
                        document.querySelector(
                            '.nav-link[href="#' +
                            entry.target.id +
                            '"]'
                        );


                    if (activeLink) {

                        activeLink.classList.add("active");

                    }

                }

            });

        },

        {
            threshold: 0.35
        }

    );


sections.forEach(function (section) {

    navObserver.observe(section);

});


/* =========================================
   SCROLL PROGRESS
========================================= */

const scrollProgress =
    document.getElementById("scrollProgress");


window.addEventListener("scroll", function () {

    const scrollTop =
        window.scrollY;


    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;


    if (documentHeight > 0) {

        const percentage =
            (scrollTop / documentHeight) * 100;


        scrollProgress.style.width =
            percentage + "%";

    }

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")
                    .value
                    .trim();


            const email =
                document.getElementById("email")
                    .value
                    .trim();


            const message =
                document.getElementById("message")
                    .value
                    .trim();


            if (
                !name ||
                !email ||
                !message
            ) {

                alert(
                    "Please complete all fields."
                );

                return;

            }


            const subject =
                encodeURIComponent(
                    "Portfolio Contact from " +
                    name
                );


            const body =
                encodeURIComponent(

                    "Name: " +
                    name +

                    "\n\n" +

                    "Email: " +
                    email +

                    "\n\n" +

                    "Message:\n" +
                    message

                );


            window.location.href =
                "mailto:rayverandaleon166@gmail.com" +
                "?subject=" +
                subject +
                "&body=" +
                body;

        }
    );

}


/* =========================================
   PROFILE IMAGE FALLBACK
========================================= */

const profileImage =
    document.querySelector(
        ".profile-circle img"
    );


const placeholder =
    document.querySelector(
        ".photo-placeholder"
    );


if (
    profileImage &&
    placeholder
) {

    profileImage.addEventListener(
        "error",
        function () {

            profileImage.style.display =
                "none";

            placeholder.style.display =
                "flex";

        }
    );

}


/* =========================================
   INITIAL HERO ANIMATION
========================================= */

window.addEventListener(
    "load",
    function () {

        document
            .querySelectorAll("#home .reveal")
            .forEach(function (element) {

                element.classList.add(
                    "active"
                );

            });

    }
);