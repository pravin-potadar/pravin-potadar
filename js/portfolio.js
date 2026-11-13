"use strict";

document.documentElement.classList.add("js-enabled");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

function closeNavigation() {
    if (!menuToggle || !primaryNavigation) {
        return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    primaryNavigation.classList.remove("is-open");
}

if (menuToggle && primaryNavigation) {
    menuToggle.addEventListener("click", function () {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
        primaryNavigation.classList.toggle("is-open", !isExpanded);
    });

    primaryNavigation.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
            closeNavigation();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeNavigation();
            menuToggle.focus();
        }
    });

    document.addEventListener("click", function (event) {
        if (
            menuToggle.getAttribute("aria-expanded") === "true" &&
            !primaryNavigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeNavigation();
        }
    });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const senderName = String(formData.get("name")).trim();
        const senderEmail = String(formData.get("email")).trim();
        const subject = String(formData.get("subject")).trim();
        const message = String(formData.get("message")).trim();
        const body = [
            "Name: " + senderName,
            "Email: " + senderEmail,
            "",
            message
        ].join("\n");
        const status = document.querySelector("#contact-form-status");

        if (status) {
            status.textContent = "Your email app should open with a draft. If it doesn't, email me directly at pravinpotadar115@gmail.com.";
        }

        window.location.href = "mailto:pravinpotadar115@gmail.com?subject=" +
            encodeURIComponent(subject) +
            "&body=" +
            encodeURIComponent(body);
    });
}

const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
        element.classList.add("is-visible");
    });
} else {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
}
