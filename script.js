// ============================================================
// KARIGARI X
// ARTIST FRONTEND
// ============================================================


// ============================================================
// INITIAL PRODUCT DATA
// ============================================================

const defaultProducts = [

    {
        id: "PT-001",
        name: "Pattachitra Painting",
        description: "Natural colours, cotton canvas",
        created: "12 Aug 2026",
        location: "Raghurajpur, Odisha",
        status: "available"
    },

    {
        id: "SR-002",
        name: "Sambalpuri Saree",
        description: "Cotton, natural dye",
        created: "14 Aug 2026",
        location: "Sambalpur, Odisha",
        status: "available"
    },

    {
        id: "DK-003",
        name: "Dokra Metal Craft",
        description: "Traditional bell metal",
        created: "15 Aug 2026",
        location: "Dhenkanal, Odisha",
        status: "available"
    },

    {
        id: "PT-009",
        name: "Traditional Painting",
        description: "Authentication required",
        created: "10 Aug 2026",
        location: "Odisha",
        status: "suspended"
    }

];


// ============================================================
// LOAD SAVED PRODUCTS
// ============================================================

let products =
    JSON.parse(
        localStorage.getItem("karigariProducts")
    ) || defaultProducts;


// ============================================================
// SAVE PRODUCTS
// ============================================================

function saveProducts() {

    localStorage.setItem(
        "karigariProducts",
        JSON.stringify(products)
    );

}


// ============================================================
// LOGIN
// ============================================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            if (!email) {
                return;
            }


            localStorage.setItem(
                "artistEmail",
                email
            );


            showDashboard(email);

        }
    );

}


// ============================================================
// DASHBOARD
// ============================================================

function showDashboard(email) {

    document.body.innerHTML = `

        <!-- NAVBAR -->

        <header class="dashboard-navbar">

            <div class="dashboard-logo">

                <div class="logo-symbol">
                    ♢
                </div>

                <div>

                    <h2>
                        KARIGARI
                    </h2>

                    <span>
                        DIGITAL CRAFT PASSPORT
                    </span>

                </div>

            </div>


            <div class="artist-profile">

                <div class="artist-avatar">
                    ${email.charAt(0).toUpperCase()}
                </div>

                <div>

                    <strong>
                        Artist
                    </strong>

                    <small>
                        ${email}
                    </small>

                </div>

            </div>

        </header>



        <!-- DASHBOARD -->

        <main class="dashboard">


            <!-- HEADER -->

            <section class="dashboard-header">

                <div>

                    <p class="small-heading">
                        ARTIST DASHBOARD
                    </p>

                    <h1>
                        Your Products
                    </h1>

                    <p>
                        Manage your registered crafts
                        and their current status.
                    </p>

                </div>


                <button
                    class="register-button"
                    onclick="openRegisterPage()"
                >
                    + Register Product
                </button>

            </section>



            <!-- STATISTICS -->

            <section class="stats">

                <div class="stat-card">

                    <span>
                        TOTAL PRODUCTS
                    </span>

                    <strong id="totalCount">
                        0
                    </strong>

                    <small>
                        Registered crafts
                    </small>

                </div>


                <div class="stat-card">

                    <span>
                        AVAILABLE
                    </span>

                    <strong id="availableCount">
                        0
                    </strong>

                    <small>
                        Ready for sale
                    </small>

                </div>


                <div class="stat-card">

                    <span>
                        SOLD OUT
                    </span>

                    <strong id="soldCount">
                        0
                    </strong>

                    <small>
                        Completed sales
                    </small>

                </div>


                <div class="stat-card">

                    <span>
                        SUSPENDED
                    </span>

                    <strong id="suspendedCount">
                        0
                    </strong>

                    <small>
                        Authentication issue
                    </small>

                </div>

            </section>



            <!-- AVAILABLE PRODUCTS -->

            <section class="product-section">

                <div class="section-header">

                    <div>

                        <p class="small-heading">
                            VERIFIED PRODUCTS
                        </p>

                        <h2>
                            Available Products
                        </h2>

                    </div>


                    <input
                        type="text"
                        id="availableSearch"
                        class="product-search"
                        placeholder="Search products..."
                        oninput="searchProducts('available')"
                    >

                </div>


                <div class="product-table">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    PRODUCT
                                </th>

                                <th>
                                    PRODUCT ID
                                </th>

                                <th>
                                    CREATED
                                </th>

                                <th>
                                    LOCATION
                                </th>

                                <th>
                                    STATUS
                                </th>

                            </tr>

                        </thead>


                        <tbody id="availableProducts">

                        </tbody>

                    </table>

                </div>

            </section>



            <!-- SOLD OUT PRODUCTS -->

            <section class="product-section">

                <div class="section-header">

                    <div>

                        <p class="small-heading">
                            SALES
                        </p>

                        <h2>
                            Sold Out Products
                        </h2>

                    </div>


                    <input
                        type="text"
                        id="soldSearch"
                        class="product-search"
                        placeholder="Search sold products..."
                        oninput="searchProducts('sold')"
                    >

                </div>


                <div class="product-table">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    PRODUCT
                                </th>

                                <th>
                                    PRODUCT ID
                                </th>

                                <th>
                                    CREATED
                                </th>

                                <th>
                                    LOCATION
                                </th>

                                <th>
                                    STATUS
                                </th>

                            </tr>

                        </thead>


                        <tbody id="soldProducts">

                        </tbody>

                    </table>

                </div>

            </section>



            <!-- SUSPENDED PRODUCTS -->

            <section class="product-section">

                <div class="section-header">

                    <div>

                        <p class="small-heading">
                            VERIFICATION ATTENTION
                        </p>

                        <h2>
                            Suspended Products
                        </h2>

                    </div>


                    <input
                        type="text"
                        id="suspendedSearch"
                        class="product-search"
                        placeholder="Search suspended products..."
                        oninput="searchProducts('suspended')"
                    >

                </div>


                <div class="product-table">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    PRODUCT
                                </th>

                                <th>
                                    PRODUCT ID
                                </th>

                                <th>
                                    CREATED
                                </th>

                                <th>
                                    LOCATION
                                </th>

                                <th>
                                    STATUS
                                </th>

                            </tr>

                        </thead>


                        <tbody id="suspendedProducts">

                        </tbody>

                    </table>

                </div>

            </section>

        </main>



        <!-- PRODUCT MODAL -->

        <div
            class="modal-overlay"
            id="productModal"
        >

            <div
                class="product-modal"
                id="productModalContent"
            >

            </div>

        </div>



        <!-- REGISTER PANEL -->

        <div
            class="register-overlay"
            id="registerOverlay"
        >

            <div class="register-panel">

                <button
                    class="modal-close"
                    onclick="closeRegisterPage()"
                >
                    ×
                </button>


                <p class="small-heading">
                    NEW PRODUCT
                </p>


                <h2>
                    Register Product
                </h2>


                <p class="panel-description">
                    Add the details of your craft to create
                    its digital product passport.
                </p>


                <form
                    id="registerForm"
                    onsubmit="registerNewProduct(event)"
                >


                    <div class="form-group">

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            id="productName"
                            placeholder="e.g. Pattachitra Painting"
                            required
                        >

                    </div>


                    <div class="form-row">

                        <div class="form-group">

                            <label>
                                Product ID
                            </label>

                            <input
                                type="text"
                                id="productId"
                                placeholder="PT-004"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                id="productLocation"
                                placeholder="Raghurajpur, Odisha"
                                required
                            >

                        </div>

                    </div>


                    <div class="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            id="productDescription"
                            placeholder="Describe your craft..."
                            rows="4"
                        ></textarea>

                    </div>


                    <button
                        type="submit"
                        class="register-submit"
                    >
                        Register Product →
                    </button>


                </form>

            </div>

        </div>

    `;


    renderProducts();

}


// ============================================================
// RENDER PRODUCTS
// ============================================================

function renderProducts() {

    const available =
        document.getElementById(
            "availableProducts"
        );

    const sold =
        document.getElementById(
            "soldProducts"
        );

    const suspended =
        document.getElementById(
            "suspendedProducts"
        );


    if (!available) return;


    const availableProducts =
        products.filter(
            product => product.status === "available"
        );


    const soldProducts =
        products.filter(
            product => product.status === "sold"
        );


    const suspendedProducts =
        products.filter(
            product => product.status === "suspended"
        );


    available.innerHTML =
        createRows(
            availableProducts,
            "available"
        );


    sold.innerHTML =
        createRows(
            soldProducts,
            "sold"
        );


    suspended.innerHTML =
        createRows(
            suspendedProducts,
            "suspended"
        );
    function updateStatistics() {

    const total =
        products.length;

    const available =
        products.filter(
            product => product.status === "available"
        ).length;

    const sold =
        products.filter(
            product => product.status === "sold"
        ).length;

    const suspended =
        products.filter(
            product => product.status === "suspended"
        ).length;


    document.getElementById("totalCount").textContent =
        total;

    document.getElementById("availableCount").textContent =
        available;

    document.getElementById("soldCount").textContent =
        sold;

    document.getElementById("suspendedCount").textContent =
        suspended;
}

    updateStatistics();

}


// ============================================================
// CREATE TABLE ROWS
// ============================================================

function createRows(productList, type) {

    if (productList.length === 0) {

        return `
            <tr>
                <td
                    colspan="5"
                    class="empty-state"
                >
                    No products here yet.
                </td>
            </tr>
        `;

    }


    return productList.map(product => `

        <tr
            class="product-row"
            onclick="openProduct('${product.id}')"
        >

            <td>

                <strong>
                    ${product.name}
                </strong>

                <small>
                    ${product.description}
                </small>

            </td>


            <td>
                ${product.id}
            </td>


            <td>
                ${product.created}
            </td>


            <td>
                ${product.location}
            </td>


            <td>

                <span class="status ${product.status}">

                    ${getStatusText(product.status)}

                </span>

            </td>

        </tr>

    `).join("");

}


// ============================================================
// STATUS TEXT
// ============================================================

function getStatusText(status) {

    if (status === "available") {
        return "● Available";
    }

    if (status === "sold") {
        return "● Sold Out";
    }

    if (status === "suspended") {
        return "● Suspended";
    }

}


// ============================================================
// PRODUCT MODAL
// ============================================================

function openProduct(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    const modal =
        document.getElementById(
            "productModal"
        );


    const content =
        document.getElementById(
            "productModalContent"
        );


    let actionButton = "";


    if (product.status === "available") {

        actionButton = `

            <button
                class="modal-action sold-action"
                onclick="markSoldOut('${product.id}')"
            >
                Mark as Sold Out
            </button>

        `;

    }


    if (product.status === "suspended") {

        actionButton = `

            <button
                class="modal-action unsuspend-action"
                onclick="unsuspendProduct('${product.id}')"
            >
                Unsuspend Product
            </button>

        `;

    }


    content.innerHTML = `

        <button
            class="modal-close"
            onclick="closeProduct()"
        >
            ×
        </button>


        <p class="small-heading">
            PRODUCT DETAILS
        </p>


        <h2>
            ${product.name}
        </h2>


        <p class="modal-description">
            ${product.description}
        </p>


        <div class="modal-details">

            <div>
                <span>
                    Product ID
                </span>

                <strong>
                    ${product.id}
                </strong>
            </div>


            <div>
                <span>
                    Created
                </span>

                <strong>
                    ${product.created}
                </strong>
            </div>


            <div>
                <span>
                    Location
                </span>

                <strong>
                    ${product.location}
                </strong>
            </div>

        </div>


        <div class="modal-status">

            <span>
                Current Status
            </span>

            <strong
                class="status ${product.status}"
            >
                ${getStatusText(product.status)}
            </strong>

        </div>


        ${actionButton}

    `;


    modal.classList.add("show");

}


// ============================================================
// CLOSE PRODUCT
// ============================================================

function closeProduct() {

    const modal =
        document.getElementById(
            "productModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }

}


// ============================================================
// MARK SOLD OUT
// ============================================================

function markSoldOut(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    product.status = "sold";


    saveProducts();


    closeProduct();


    renderProducts();


    showToast(
        "Product marked as Sold Out."
    );

}


// ============================================================
// UNSUSPEND
// ============================================================

function unsuspendProduct(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    product.status = "available";


    saveProducts();


    closeProduct();


    renderProducts();


    showToast(
        "Product has been unsuspended."
    );

}


// ============================================================
// REGISTER PAGE
// ============================================================

function openRegisterPage() {

    const overlay =
        document.getElementById(
            "registerOverlay"
        );


    if (overlay) {

        overlay.classList.add("show");

    }

}


function closeRegisterPage() {

    const overlay =
        document.getElementById(
            "registerOverlay"
        );


    if (overlay) {

        overlay.classList.remove("show");

    }

}


// ============================================================
// REGISTER NEW PRODUCT
// ============================================================

function registerNewProduct(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("productName")
            .value
            .trim();


    const id =
        document
            .getElementById("productId")
            .value
            .trim();


    const location =
        document
            .getElementById("productLocation")
            .value
            .trim();


    const description =
        document
            .getElementById("productDescription")
            .value
            .trim();


    const newProduct = {

        id: id,

        name: name,

        description:
            description ||
            "Traditional handcrafted product",

        created: "18 Aug 2026",

        location: location,

        status: "available"

    };


    products.push(newProduct);


    saveProducts();


    closeRegisterPage();


    renderProducts();


    showToast(
        "Product registered successfully."
    );

}


// ============================================================
// SEARCH
// ============================================================

function searchProducts(type) {

    let inputId = "";


    if (type === "available") {
        inputId = "availableSearch";
    }

    if (type === "sold") {
        inputId = "soldSearch";
    }

    if (type === "suspended") {
        inputId = "suspendedSearch";
    }


    const input =
        document.getElementById(inputId);


    if (!input) return;


    const query =
        input.value
            .toLowerCase()
            .trim();


    const rows =
        document.querySelectorAll(
            `.product-row`
        );


    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();


        const status =
            row.querySelector(".status");


        if (!status) return;


        const matchesStatus =
            status.classList.contains(type);


        const matchesSearch =
            text.includes(query);


        row.style.display =
            matchesStatus && matchesSearch
                ? ""
                : "none";

    });

}


// ============================================================
// TOAST NOTIFICATION
// ============================================================

function showToast(message) {

    const existing =
        document.querySelector(
            ".toast"
        );


    if (existing) {
        existing.remove();
    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast";


    toast.innerHTML = `

        <span class="toast-check">
            ✓
        </span>

        <span>
            ${message}
        </span>

    `;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.classList.add(
            "hide"
        );

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2200);

}