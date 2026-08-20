// KARIGARIX - FRONTEND
const API_BASE_URL = "https://adventurous-joy-production-a1d8.up.railway.app";

// 1. LANDING PAGE → DASHBOARD
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();

        if (!email) return;

        localStorage.setItem("artistEmail", email);

        window.location.href = "dashboard.html";
    });
}

// 2. DASHBOARD

const productsTableBody =
    document.getElementById("productsTableBody");

const suspendedTableBody =
    document.getElementById("suspendedTableBody");

if (productsTableBody && suspendedTableBody) {

    const artistEmail = localStorage.getItem("artistEmail");

    const artistEmailElement =
        document.getElementById("artistEmail");

    if (artistEmailElement && artistEmail) {
        artistEmailElement.textContent = artistEmail;
    }

    const productSearch =
        document.getElementById("productSearch");

    const suspendedSearch =
        document.getElementById("suspendedSearch");

    if (productSearch && artistEmail) {
        productSearch.value = artistEmail;
    }

    if (suspendedSearch && artistEmail) {
        suspendedSearch.value = artistEmail;
    }

    if (artistEmail) {
        loadProducts(artistEmail);
        loadSuspendedProducts(artistEmail);
    }

    // Normal product search
    const searchProductsBtn =
        document.getElementById("searchProductsBtn");

    if (searchProductsBtn) {
        searchProductsBtn.addEventListener("click", function () {

            const email = productSearch.value.trim();

            if (email) {
                loadProducts(email);
            }
        });
    }

    // Suspended product search
    const searchSuspendedBtn =
        document.getElementById("searchSuspendedBtn");

    if (searchSuspendedBtn) {
        searchSuspendedBtn.addEventListener("click", function () {

            const email = suspendedSearch.value.trim();

            if (email) {
                loadSuspendedProducts(email);
            }
        });
    }
}

// 3. GET NORMAL PRODUCTS

async function loadProducts(email) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/artist/search?email=${encodeURIComponent(email)}`
        );

        if (!response.ok) {
            throw new Error("Could not fetch products.");
        }

        const products = await response.json();

        console.log("Products received from backend:", products);

        renderProducts(products);

    } catch (error) {

        console.error("Product loading error:", error);

        if (productsTableBody) {
            productsTableBody.innerHTML = `
                <tr>
                    <td colspan="4">
                        Unable to load products.
                    </td>
                </tr>
            `;
        }
    }
}

// ==========================================
// 4. GET SUSPENDED PRODUCTS
// ==========================================

async function loadSuspendedProducts(email) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/artist/suspended?email=${encodeURIComponent(email)}`
        );

        if (!response.ok) {
            throw new Error("Could not fetch suspended products.");
        }

        const products = await response.json();

        renderSuspendedProducts(products);

    } catch (error) {

        console.error(
            "Suspended product loading error:",
            error
        );

        if (suspendedTableBody) {
            suspendedTableBody.innerHTML = `
                <tr>
                    <td colspan="4">
                        Unable to load suspended products.
                    </td>
                </tr>
            `;
        }
    }
}


// ==========================================
// 5. RENDER NORMAL PRODUCTS
// ==========================================

function renderProducts(products) {

    productsTableBody.innerHTML = "";

    if (!products || products.length === 0) {

        productsTableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    No products found.
                </td>
            </tr>
        `;

        return;
    }

    products.forEach(product => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${escapeHTML(product.productName)}</strong>
            </td>

            <td>
                ${escapeHTML(product.artistName || "-")}
            </td>

            <td>
                ₹${product.fixedCost ?? 0}
            </td>

            <td>
                <span class="status ${getStatusClass(product.status)}">
                    ${formatStatus(product.status)}
                </span>
            </td>
        `;

        row.addEventListener("click", function () {
            openProductModal(product, false);
        });

        productsTableBody.appendChild(row);
    });
}


// ==========================================
// 6. RENDER SUSPENDED PRODUCTS
// ==========================================

function renderSuspendedProducts(products) {

    suspendedTableBody.innerHTML = "";

    if (!products || products.length === 0) {

        suspendedTableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    No suspended products found.
                </td>
            </tr>
        `;

        return;
    }

    products.forEach(product => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${escapeHTML(product.productName)}</strong>
            </td>

            <td>
                ${escapeHTML(product.artistName || "-")}
            </td>

            <td>
                ₹${product.fixedCost ?? 0}
            </td>

            <td>
                <span class="status suspended">
                    SUSPENDED
                </span>
            </td>
        `;

        row.addEventListener("click", function () {
            openProductModal(product, true);
        });

        suspendedTableBody.appendChild(row);
    });
}


// ==========================================
// 7. PRODUCT MODAL
// ==========================================

let selectedProduct = null;
let selectedProductIsSuspended = false;

function openProductModal(product, isSuspended) {

    selectedProduct = product;
    selectedProductIsSuspended = isSuspended;

    document.getElementById("modalProductName").textContent =
        product.productName || "Product";

    document.getElementById("modalArtistName").textContent =
        product.artistName || "-";

    document.getElementById("modalMaterial").textContent =
        product.materialDetails || "-";

    document.getElementById("modalHistory").textContent =
        product.history || "-";

    document.getElementById("modalCost").textContent =
        product.fixedCost ?? "0";

    document.getElementById("modalStatus").textContent =
        formatStatus(product.status);

    const soldOutBtn =
        document.getElementById("soldOutBtn");

    const unsuspendBtn =
        document.getElementById("unsuspendBtn");

    if (isSuspended) {

        soldOutBtn.style.display = "none";
        unsuspendBtn.style.display = "block";

    } else {

        unsuspendBtn.style.display = "none";

        if (product.status === "SOLD_OUT") {
            soldOutBtn.style.display = "none";
        } else {
            soldOutBtn.style.display = "block";
        }
    }

    document
        .getElementById("productModal")
        .classList.remove("hidden");
}

// 8. CLOSE MODAL

const closeProductModal =
    document.getElementById("closeProductModal");

if (closeProductModal) {

    closeProductModal.addEventListener("click", function () {

        document
            .getElementById("productModal")
            .classList.add("hidden");

    });
}

const productModal =
    document.getElementById("productModal");

if (productModal) {

    productModal.addEventListener("click", function (event) {

        if (event.target === productModal) {

            productModal.classList.add("hidden");
        }
    });
}

// 9. SOLD OUT
const soldOutBtn =
    document.getElementById("soldOutBtn");

if (soldOutBtn) {

    soldOutBtn.addEventListener("click", async function () {

        if (!selectedProduct) return;

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/artist/craft/${selectedProduct.craftId}/sold`,
                {
                    method: "PUT"
                }
            );

            if (!response.ok) {
                throw new Error("Could not mark product as sold.");
            }

            const updatedProduct =
                await response.json();

            selectedProduct = updatedProduct;

            document
                .getElementById("productModal")
                .classList.add("hidden");

            const email =
                localStorage.getItem("artistEmail");

            if (email) {
                loadProducts(email);
            }

        } catch (error) {

            console.error("Sold out error:", error);
        }
    });
}

// 10. UNSUSPEND
const unsuspendBtn =
    document.getElementById("unsuspendBtn");

if (unsuspendBtn) {

    unsuspendBtn.addEventListener("click", async function () {

        if (!selectedProduct) return;

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/artist/craft/${selectedProduct.craftId}/unsuspend`,
                {
                    method: "PUT"
                }
            );

            if (!response.ok) {
                throw new Error("Could not unsuspend product.");
            }

            await response.json();

            document
                .getElementById("productModal")
                .classList.add("hidden");

            const email =
                localStorage.getItem("artistEmail");

            if (email) {
                loadProducts(email);
                loadSuspendedProducts(email);
            }

        } catch (error) {

            console.error(
                "Unsuspend error:",
                error
            );
        }
    });
}

// 11. STATUS FORMATTING

function formatStatus(status) {

    if (!status) {
        return "UNKNOWN";
    }

    if (status === "SOLD") {
        return "SOLD OUT";
    }

    return status;
}


function getStatusClass(status) {

    if (status === "SOLD") {
        return "sold";
    }

    if (status === "SUSPENDED") {
        return "suspended";
    }

    return "available";
}

// 12. HTML SAFETY

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 13. REGISTER PRODUCT

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const product = {
            artistName: document.getElementById("artistName").value.trim(),
            artistEmail: document.getElementById("artistEmail").value.trim(),
            productName: document.getElementById("productName").value.trim(),
            materialDetails: document.getElementById("materialDetails").value.trim(),
            history: document.getElementById("history").value.trim(),
            fixedCost: Number(document.getElementById("fixedCost").value),
            payout: Number(document.getElementById("payout").value)
        };

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/artist/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(product)
                }
            );

            if (!response.ok) {
                const errorText = await response.text();

                throw new Error(
                    `Registration failed (${response.status}): ${errorText}`
                );
            }

            const qrData = await response.json();

            console.log(
                "Product registered successfully:",
                qrData
            );

            const qrModal =
                document.getElementById("qrModal");

            const qrProductName =
                document.getElementById("qrProductName");

            const qrImage =
                document.getElementById("qrImage");

            // Show product name
            if (qrProductName) {
                qrProductName.textContent =
                    qrData.productName;
            }

            // Show QR code
            if (qrImage && qrData.qrCodeString) {
                qrImage.src =
                    "data:image/png;base64," +
                    qrData.qrCodeString;
            }

            // Open QR popup
            if (qrModal) {
                qrModal.classList.add("show");
            }

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            alert(
                "Unable to register product.\n\n" +
                error.message
            );
        }

    });
}
function printQR() {
    const productName =
        document.getElementById("qrProductName").textContent;

    const qrImage =
        document.getElementById("qrImage").src;

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Digital Product Passport</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 40px;
                }

                h1 {
                    margin-bottom: 25px;
                }

                img {
                    width: 300px;
                    height: 300px;
                }

                p {
                    margin-top: 20px;
                }
            </style>
        </head>

        <body>
            <h1>${escapeHTML(productName)}</h1>
            <img src="${qrImage}" alt="Product QR Code">
            <p>Digital Product Passport — KarigariX</p>
        </body>
        </html>
    `);

    printWindow.document.close();

    printWindow.onload = function () {
        printWindow.print();
    };
}
