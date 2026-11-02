// URBAN THREAD - PART 3 JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {

    // 1. PRODUCT SEARCH AND FILTERING

    const searchInput = document.getElementById("product-search");
    const products = document.querySelectorAll(
        ".product-item, .product-card"
    );

    if (searchInput) {
        searchInput.addEventListener("input", function () {

            const searchText = searchInput.value.toLowerCase();

            products.forEach(function (product) {

                const productText = product.textContent.toLowerCase();

                if (productText.includes(searchText)) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }

            });

        });
    }


    // 2. PRODUCT IMAGE LIGHTBOX

    const productImages = document.querySelectorAll(
        ".product-item img, .product-card img"
    );

    productImages.forEach(function (img) {

        img.style.cursor = "pointer";

        img.addEventListener("click", function () {

            const lightbox = document.createElement("div");

            lightbox.className = "lightbox-overlay";

            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close"
                            aria-label="Close enlarged image">
                        &times;
                    </button>

                    <img src="${img.src}"
                         alt="${img.alt || "Urban Thread product"}">

                    <p>${img.alt || "Urban Thread product"}</p>
                </div>
            `;

            document.body.appendChild(lightbox);

            const closeButton =
                lightbox.querySelector(".lightbox-close");

            closeButton.addEventListener("click", function () {
                lightbox.remove();
            });

            lightbox.addEventListener("click", function (event) {
                if (event.target === lightbox) {
                    lightbox.remove();
                }
            });

            document.addEventListener("keydown", function closeOnEscape(event) {

                if (event.key === "Escape") {
                    lightbox.remove();
                    document.removeEventListener(
                        "keydown",
                        closeOnEscape
                    );
                }

            });

        });

    });


    // 3. FAQ ACCORDION

    const accordionButtons = document.querySelectorAll(
        ".accordion-button"
    );

    accordionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const answer = button.nextElementSibling;

            if (!answer) {
                return;
            }

            const isOpen = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isOpen));

            answer.hidden = isOpen;

        });

    });


    // 4. ENQUIRY FORM VALIDATION

    const enquiryForm = document.getElementById("enquiry-form");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            const product = document.getElementById("product").value;
            const name = document.getElementById("name").value.trim();

            const feedback =
                document.getElementById("enquiry-feedback");

            const prices = {
                tshirt: "R250",
                hoodie: "R450",
                jeans: "R600",
                cap: "R180",
                sneakers: "R800"
            };

            if (!product) {
                document.getElementById("product").setCustomValidity(
                    "Please select a product."
                );

                document.getElementById("product").reportValidity();

                document.getElementById("product").setCustomValidity("");

                return;
            }

            feedback.textContent =
                "Thank you, " + name + "! Your enquiry about the selected " +
                "product has been checked. The listed price is " +
                prices[product] +
                ". Please contact Urban Thread to confirm stock and availability.";

            feedback.style.display = "block";

            enquiryForm.reset();

        });

    }


    // 5. CONTACT FORM VALIDATION AND EMAIL PREPARATION

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name =
                document.getElementById("contact-name").value.trim();

            const email =
                document.getElementById("contact-email").value.trim();

            const type =
                document.getElementById("message-type").value;

            const message =
                document.getElementById("contact-message").value.trim();

            if (!name || !email || !type || !message) {
                alert("Please complete all required fields.");
                return;
            }

            const subject = encodeURIComponent(
                "Urban Thread Website - " + type
            );

            const body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Message type: " + type + "\n\n" +
                "Message:\n" + message
            );

            const recipient = "info@urbanthread.co.za";

            const mailtoLink =
                "mailto:" + recipient +
                "?subject=" + subject +
                "&body=" + body;

            window.location.href = mailtoLink;

        });

    }


    // 6. SIMPLE REVEAL ANIMATION

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }

});