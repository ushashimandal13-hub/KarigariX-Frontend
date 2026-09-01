const API_BASE_URL = "https://adventurous-joy-production-a1d8.up.railway.app";

// GET CRAFT ID FROM URL

const pathParts = window.location.pathname.split("/");

const craftId = pathParts[pathParts.length - 1];

// ELEMENTS

const loadingState =
    document.getElementById("loadingState");

const productDetails =
    document.getElementById("productDetails");

const statusMessage =
    document.getElementById("statusMessage");
const tipSection =
    document.getElementById("tipSection");

const tipMessage =
    document.getElementById("tipMessage");

let currentProduct = null;
// LOAD PRODUCT

async function loadProduct() {

    if (!craftId || isNaN(craftId)) {

        showStatus(
            "Invalid Product",
            "This QR code does not contain a valid product."
        );

        return;
    }


    try {

        const response = await fetch(
            `${API_BASE_URL}/api/public/scan/${craftId}`
        );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch product."
            );
        }


        const data = await response.json();


        console.log("QR Scan Response:", data);


        handleResponse(data);


    } catch (error) {

        console.error(
            "Product verification error:",
            error
        );


        showStatus(
            "Product Unavailable",
            "We couldn't verify this product at the moment. Please try again later."
        );
    }
}

// HANDLE BACKEND RESPONSE

function handleResponse(data) {

    const status = data.status;

    // AVAILABLE
     if (status === "SECURE" || status === "AVAILABLE") {

        showProduct(data);

        return;
    }

    // SUSPENDED

    if (status === "SUSPENDED") {

        showStatus(
            "Product Unavailable",
            "This product is currently unavailable."
        );

        return;
    }

    // SOLD OUT

    if (status === "SOLD_OUT" || status === "SOLD") {

        showStatus(
            "Product Already Sold",
            "This item is already sold out in the artist's inventory. What you're seeing may be a forgery."
        );

        return;
    }

    // UNKNOWN STATUS

    showStatus(
        "Product Unavailable",
        "This product could not be verified."
    );
}

// SHOW PRODUCT

function showProduct(data) {
    currentProduct = data;
    loadingState.classList.add("hidden");

    statusMessage.classList.add("hidden");

    productDetails.classList.remove("hidden");

 if (tipSection) {
        tipSection.classList.remove("hidden");
    }

    document.getElementById(
        "productName"
    ).textContent =
        data.productName || "Unnamed Craft";


    document.getElementById(
        "artistName"
    ).textContent =
        data.artistName || "Unknown Artist";


    document.getElementById(
        "detailProductName"
    ).textContent =
        data.productName || "-";


    document.getElementById(
        "detailArtistName"
    ).textContent =
        data.artistName || "-";


    document.getElementById(
        "detailPrice"
    ).textContent =
        data.price ?? "-";


    document.getElementById(
        "materialDetails"
    ).textContent =
        data.materialDetails || "-";


    document.getElementById(
        "craftHistory"
    ).textContent =
        data.history || "-";
}

// SHOW STATUS MESSAGE

function showStatus(title, description) {

    loadingState.classList.add("hidden");

    productDetails.classList.add("hidden");

    statusMessage.classList.remove("hidden");


    document.getElementById(
        "statusTitle"
    ).textContent = title;


    document.getElementById(
        "statusDescription"
    ).textContent = description;
}
// ADD TIP

async function addTip(tier) {

    if (!currentProduct) {
        console.error("Product data is not available.");
        return;
    }

    const tipData = {
        craftId: String(currentProduct.craftId),
        artistEmail: currentProduct.artistEmail,
        tier: tier
    };

    console.log("Sending tip:", tipData);

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/tips/add`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tipData)
            }
        );

        if (!response.ok) {
            throw new Error("Could not process tip.");
        }

        const result = await response.json();

        console.log("Tip response:", result);

        if (tipMessage) {

            if (tier === 0) {
                tipMessage.textContent =
                    "Thank you for exploring this artisan's work!";
            } else {
                tipMessage.textContent =
                    `Thank you! Your ${tier}% tip has been added.`;
            }
        }

    } catch (error) {

        console.error("Tip error:", error);

        if (tipMessage) {
            tipMessage.textContent =
                "Unable to process your tip. Please try again.";
        }
    }
}
// START
loadProduct();