const API_BASE_URL = "http://localhost:8080";


// ==========================================
// GET CRAFT ID FROM URL
// ==========================================

const pathParts = window.location.pathname.split("/");

const craftId = pathParts[pathParts.length - 1];


// ==========================================
// ELEMENTS
// ==========================================

const loadingState =
    document.getElementById("loadingState");

const productDetails =
    document.getElementById("productDetails");

const statusMessage =
    document.getElementById("statusMessage");


// ==========================================
// LOAD PRODUCT
// ==========================================

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


// ==========================================
// HANDLE BACKEND RESPONSE
// ==========================================

function handleResponse(data) {

    const status = data.status;


    // --------------------------------------
    // AVAILABLE
    // --------------------------------------

    if (status === "AVAILABLE") {

        showProduct(data);

        return;
    }


    // --------------------------------------
    // SUSPENDED
    // --------------------------------------

    if (status === "SUSPENDED") {

        showStatus(
            "Product Unavailable",
            "This product is currently unavailable."
        );

        return;
    }


    // --------------------------------------
    // SOLD OUT
    // --------------------------------------

    if (status === "SOLD_OUT" || status === "SOLD") {

        showStatus(
            "Product Already Sold",
            "This item is already sold out in the artist's inventory. What you're seeing may be a forgery."
        );

        return;
    }


    // --------------------------------------
    // UNKNOWN STATUS
    // --------------------------------------

    showStatus(
        "Product Unavailable",
        "This product could not be verified."
    );
}


// ==========================================
// SHOW PRODUCT
// ==========================================

function showProduct(data) {

    loadingState.classList.add("hidden");

    statusMessage.classList.add("hidden");

    productDetails.classList.remove("hidden");


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


// ==========================================
// SHOW STATUS MESSAGE
// ==========================================

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


// ==========================================
// START
// ==========================================

loadProduct();
const pathParts = window.location.pathname.split("/");
const craftId = pathParts[pathParts.length - 1];