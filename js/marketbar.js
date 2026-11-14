/**
 * Logovo Barbershop Astana — MarketBar & Shopping Cart Module
 * WEB Technologies 1 — Endterm Project (Plain JavaScript Module: Weeks 6–8)
 * Responsible Student: Nurken Mamay (Frontend Developer)
 * Assigned Pages: marketbar.html, careers.html
 */
'use strict';

(function () {
    // -------------------------------------------------------------------------
    // 1. Core Products Catalog Data Array (6 objects with 7 meaningful properties)
    // -------------------------------------------------------------------------
    const PRODUCTS_DATA = [
        {
            id: 'clay',
            name: 'Extreme Hold Matte Finish Clay',
            category: 'Haircare',
            volume: '100 ml',
            unitPrice: 7500,
            inStock: true,
            description: 'Organic styling clay providing maximum all-day grip with zero artificial gloss.'
        },
        {
            id: 'shampoo',
            name: 'Botanical Tea Tree Clarifying Shampoo',
            category: 'Haircare',
            volume: '250 ml',
            unitPrice: 5200,
            inStock: true,
            description: 'Sulfate-free scalp tonic with eucalyptus and tea tree extracts.'
        },
        {
            id: 'oil',
            name: 'Argan & Cedar Wood Conditioning Oil',
            category: 'Beard & Shave',
            volume: '50 ml',
            unitPrice: 6000,
            inStock: true,
            description: 'Softens stiff facial whiskers and prevents dry skin itching.'
        },
        {
            id: 'balm',
            name: 'Sandalwood Soothing Aftershave Balm',
            category: 'Beard & Shave',
            volume: '100 ml',
            unitPrice: 5800,
            inStock: true,
            description: 'Alcohol-free soothing aloe lotion for post-blade recovery.'
        },
        {
            id: 'espresso',
            name: 'Double Shot Colombian Roast Espresso',
            category: 'Lounge Bar',
            volume: '60 ml',
            unitPrice: 1000,
            inStock: true,
            description: 'Freshly ground specialty arabica beans pulled at 9 bars.'
        },
        {
            id: 'tonic',
            name: 'Cold-Pressed Tonic & Bergamot Beverage',
            category: 'Lounge Bar',
            volume: '330 ml',
            unitPrice: 1200,
            inStock: true,
            description: 'Botanical carbonated elixir with citrus and cinchona bark.'
        }
    ];

    // Branch Mapping
    const BRANCHES_MAP = {
        'syganak': 'Syganak Flagship (17/1 Syganak St)',
        'kabanbay': 'Kabanbay Studio (58A Kabanbay Batyr Ave)',
        'triumph': 'Triumph Club (51/1 Mangilik El Ave)',
        'baitursynuly': 'Baitursynuly Branch (47 A. Baitursynuly St)',
        'saryarka': 'Saryarka Lounge (42 Saryarka Ave)',
        'abay': 'Abylai Khan Branch (20B Abylai Khan Ave)',
        'turan': 'Turan Club (50/2 Turan Ave)',
        'tolebi': 'Tole Bi Branch (44/1 Tole Bi St)',
        'tarkhan': 'Tarkhan Lounge (2/6 Zh. Tarkhan St)',
        'beybitshilik': 'Beybitshilik Branch (29 Beybitshilik St)',
        'kosshygululy': 'Kosshygululy Studio (21 Sh. Kosshygululy St)',
        'mukhamedkhanov': 'Mukhamedkhanov Club (20 K. Mukhamedkhanov St)'
    };

    // -------------------------------------------------------------------------
    // 2. Shopping Cart State & Management (Plain JavaScript)
    // -------------------------------------------------------------------------
    let cart = [];

    /**
     * Finds a product by its unique identifier
     * @param {string} productId - Product ID
     * @returns {Object|null} Matching product object
     */
    function findProductById(productId) {
        if (!productId || typeof productId !== 'string') return null;
        const key = productId.trim().toLowerCase();
        for (let i = 0; i < PRODUCTS_DATA.length; i++) {
            if (PRODUCTS_DATA[i].id === key) {
                return PRODUCTS_DATA[i];
            }
        }
        return null;
    }

    /**
     * Adds an item to the shopping cart or increments its count
     * @param {string} productId - Product ID
     * @param {number} qty - Quantity to add
     */
    function addToCart(productId, qty) {
        const product = findProductById(productId);
        if (!product) return;

        const addQty = Math.max(1, Math.min(10, parseInt(qty, 10) || 1));
        let existingItem = null;

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                existingItem = cart[i];
                break;
            }
        }

        if (existingItem) {
            existingItem.quantity = Math.min(10, existingItem.quantity + addQty);
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                volume: product.volume,
                unitPrice: product.unitPrice,
                quantity: addQty
            });
        }

        renderCart();
        highlightCatalogRow(product.id);
    }

    /**
     * Updates an existing cart item's quantity
     * @param {string} productId - Target product ID
     * @param {number} newQty - New quantity
     */
    function updateCartItemQty(productId, newQty) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productId) {
                if (newQty <= 0) {
                    cart.splice(i, 1);
                } else {
                    cart[i].quantity = Math.min(10, newQty);
                }
                break;
            }
        }
        renderCart();
    }

    /**
     * Removes an item entirely from the cart
     * @param {string} productId - Target product ID
     */
    function removeFromCart(productId) {
        cart = cart.filter(function (item) {
            return item.id !== productId;
        });
        renderCart();
    }

    /**
     * Empties all items from the shopping cart
     */
    function clearCart() {
        cart = [];
        renderCart();
    }

    /**
     * Calculates shopping cart totals with 10% club privilege discount condition
     * @returns {Object} Calculated totals breakdown
     */
    function calculateCartTotals() {
        let itemCount = 0;
        let subtotal = 0;

        for (let i = 0; i < cart.length; i++) {
            itemCount += cart[i].quantity;
            subtotal += cart[i].unitPrice * cart[i].quantity;
        }

        // Conditional Calculation: 10% discount for orders >= 15 000 KZT
        let discount = 0;
        if (subtotal >= 15000) {
            discount = Math.round(subtotal * 0.10);
        }

        const finalTotal = Math.max(0, subtotal - discount);

        return {
            itemCount: itemCount,
            subtotal: subtotal,
            discount: discount,
            finalTotal: finalTotal,
            formattedSubtotal: window.Logovo.formatPrice(subtotal),
            formattedDiscount: discount > 0 ? ('-10% Club Discount (' + window.Logovo.formatPrice(discount) + ')') : 'No Discount (0 KZT)',
            formattedFinalTotal: window.Logovo.formatPrice(finalTotal)
        };
    }

    /**
     * Renders shopping cart items dynamically using safe DOM methods (Zero raw HTML injection)
     */
    function renderCart() {
        const container = document.getElementById('cart-items-container');
        const badgeEl = document.getElementById('cart-count-badge');
        const subtotalEl = document.getElementById('cart-subtotal-price');
        const discountEl = document.getElementById('cart-discount-value');
        const finalTotalEl = document.getElementById('cart-final-total');
        const orderTotalEl = document.getElementById('order-total-price');

        const totals = calculateCartTotals();

        if (badgeEl) {
            badgeEl.textContent = totals.itemCount + (totals.itemCount === 1 ? ' Item' : ' Items');
        }
        if (subtotalEl) {
            subtotalEl.textContent = totals.formattedSubtotal;
        }
        if (discountEl) {
            discountEl.textContent = totals.formattedDiscount;
        }
        if (finalTotalEl) {
            finalTotalEl.textContent = totals.formattedFinalTotal;
        }
        if (orderTotalEl) {
            orderTotalEl.textContent = totals.formattedFinalTotal;
        }

        if (!container) return;

        // Clear existing items cleanly
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Empty state check
        if (cart.length === 0) {
            const emptyBox = document.createElement('div');
            emptyBox.className = 'p-4 text-center border border-secondary border-opacity-25 rounded bg-black';
            emptyBox.id = 'cart-empty-message';

            const p = document.createElement('p');
            p.className = 'text-secondary mb-0';
            p.textContent = 'Your shopping cart is currently empty. Click ';

            const strong = document.createElement('strong');
            strong.textContent = '+ Add to Cart';
            p.appendChild(strong);

            const tail = document.createTextNode(' on any apothecary product or craft drink above.');
            p.appendChild(tail);

            emptyBox.appendChild(p);
            container.appendChild(emptyBox);
            return;
        }

        // Render Cart Items Table
        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'table-responsive rounded border border-secondary border-opacity-25 shadow-sm';

        const table = document.createElement('table');
        table.className = 'table table-dark table-hover align-middle mb-0';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const thItem = document.createElement('th');
        thItem.scope = 'col';
        thItem.className = 'text-gold py-2 px-3';
        thItem.textContent = 'Item';

        const thPrice = document.createElement('th');
        thPrice.scope = 'col';
        thPrice.className = 'text-gold py-2 text-end';
        thPrice.textContent = 'Unit Price';

        const thQty = document.createElement('th');
        thQty.scope = 'col';
        thQty.className = 'text-gold py-2 text-center';
        thQty.textContent = 'Quantity';

        const thSubtotal = document.createElement('th');
        thSubtotal.scope = 'col';
        thSubtotal.className = 'text-gold py-2 text-end px-3';
        thSubtotal.textContent = 'Total';

        const thAction = document.createElement('th');
        thAction.scope = 'col';
        thAction.className = 'text-gold py-2 text-center';
        thAction.textContent = 'Action';

        headerRow.appendChild(thItem);
        headerRow.appendChild(thPrice);
        headerRow.appendChild(thQty);
        headerRow.appendChild(thSubtotal);
        headerRow.appendChild(thAction);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            const row = document.createElement('tr');

            // Item Name & Volume
            const tdItem = document.createElement('td');
            tdItem.className = 'px-3';

            const nameStrong = document.createElement('strong');
            nameStrong.className = 'text-light d-block';
            nameStrong.textContent = item.name;

            const volSmall = document.createElement('small');
            volSmall.className = 'text-secondary';
            volSmall.textContent = item.volume;

            tdItem.appendChild(nameStrong);
            tdItem.appendChild(volSmall);

            // Unit Price
            const tdPrice = document.createElement('td');
            tdPrice.className = 'text-end text-secondary';
            tdPrice.textContent = window.Logovo.formatPrice(item.unitPrice);

            // Quantity Controller (- Qty +)
            const tdQty = document.createElement('td');
            tdQty.className = 'text-center';

            const qtyGroup = document.createElement('div');
            qtyGroup.className = 'btn-group btn-group-sm';
            qtyGroup.setAttribute('role', 'group');

            const btnDec = document.createElement('button');
            btnDec.type = 'button';
            btnDec.className = 'btn btn-outline-secondary py-0 px-2';
            btnDec.textContent = '−';
            btnDec.setAttribute('data-action', 'decrease');
            btnDec.setAttribute('data-id', item.id);
            btnDec.setAttribute('aria-label', 'Decrease quantity');

            const spanQty = document.createElement('span');
            spanQty.className = 'btn btn-outline-secondary py-0 px-2 text-light disabled border-start-0 border-end-0';
            spanQty.textContent = item.quantity;

            const btnInc = document.createElement('button');
            btnInc.type = 'button';
            btnInc.className = 'btn btn-outline-secondary py-0 px-2';
            btnInc.textContent = '+';
            btnInc.setAttribute('data-action', 'increase');
            btnInc.setAttribute('data-id', item.id);
            btnInc.setAttribute('aria-label', 'Increase quantity');

            qtyGroup.appendChild(btnDec);
            qtyGroup.appendChild(spanQty);
            qtyGroup.appendChild(btnInc);
            tdQty.appendChild(qtyGroup);

            // Total
            const tdSub = document.createElement('td');
            tdSub.className = 'text-end fw-bold text-gold px-3';
            tdSub.textContent = window.Logovo.formatPrice(item.unitPrice * item.quantity);

            // Remove Button
            const tdAct = document.createElement('td');
            tdAct.className = 'text-center';

            const btnRemove = document.createElement('button');
            btnRemove.type = 'button';
            btnRemove.className = 'btn btn-outline-danger btn-sm py-0 px-2';
            btnRemove.textContent = '✕';
            btnRemove.setAttribute('data-action', 'remove');
            btnRemove.setAttribute('data-id', item.id);
            btnRemove.setAttribute('title', 'Remove item from cart');
            btnRemove.setAttribute('aria-label', 'Remove ' + item.name);

            tdAct.appendChild(btnRemove);

            row.appendChild(tdItem);
            row.appendChild(tdPrice);
            row.appendChild(tdQty);
            row.appendChild(tdSub);
            row.appendChild(tdAct);
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        tableWrapper.appendChild(table);
        container.appendChild(tableWrapper);
    }

    /**
     * Highlights corresponding row in catalog table
     * @param {string} productId - Selected product ID
     */
    function highlightCatalogRow(productId) {
        const rows = document.querySelectorAll('#table-market tbody tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.remove('selected-state');
        }

        const idMapping = {
            'clay': 'market-row-1',
            'shampoo': 'market-row-2',
            'oil': 'market-row-3',
            'balm': 'market-row-4',
            'espresso': 'market-row-5',
            'tonic': 'market-row-6'
        };

        const targetId = idMapping[productId];
        if (targetId) {
            const row = document.getElementById(targetId);
            if (row) {
                row.classList.add('selected-state');
            }
        }
    }

    // -------------------------------------------------------------------------
    // 3. Form Validation Flow (#form-market-order)
    // -------------------------------------------------------------------------
    function validateMarketOrderForm(form) {
        window.Logovo.clearFormErrors(form);

        let isValid = true;
        let firstInvalidField = null;
        const errorList = [];

        // 1. Verify Cart has items (or auto-add quick select if picked)
        const productSelect = document.getElementById('order-product-select');
        const quantityInput = document.getElementById('order-quantity-input');

        if (productSelect && productSelect.value.trim() !== '') {
            const q = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;
            addToCart(productSelect.value, q);
            productSelect.value = '';
        }

        if (cart.length === 0) {
            errorList.push('Your shopping cart is empty. Please click "+ Add to Cart" on at least one product.');
            isValid = false;
        }

        // 2. Pickup Branch
        const branchSelect = document.getElementById('order-branch-select');
        if (!branchSelect || branchSelect.value.trim() === '') {
            window.Logovo.setFieldError(branchSelect, 'Please choose a pickup branch.');
            errorList.push('Pickup branch selection is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || branchSelect;
        }

        // 3. Customer Full Name (Trimmed, min 3 chars)
        const nameInput = document.getElementById('order-name-input');
        const trimmedName = window.Logovo.sanitize(nameInput ? nameInput.value : '');
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError(nameInput, 'Full name must contain at least 3 characters.');
            errorList.push('Customer full name is required (min 3 chars).');
            isValid = false;
            firstInvalidField = firstInvalidField || nameInput;
        }

        // 4. Contact Telephone (+7...)
        const phoneInput = document.getElementById('order-phone-input');
        const phoneVal = phoneInput ? phoneInput.value : '';
        if (!window.Logovo.isValidPhone(phoneVal)) {
            window.Logovo.setFieldError(phoneInput, 'Enter a valid Kazakhstan telephone number (+7...).');
            errorList.push('Valid Kazakhstan telephone number is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || phoneInput;
        }

        // 5. Agreement Checkbox
        const agreeCheck = document.getElementById('order-agree-check');
        if (!agreeCheck || !agreeCheck.checked) {
            window.Logovo.setFieldError(agreeCheck, 'Please confirm the 48-hour pickup reservation policy.');
            errorList.push('Policy confirmation is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || agreeCheck;
        }

        // Error Container
        const errorContainer = document.getElementById('order-error-container');
        if (errorContainer) {
            if (!isValid) {
                errorContainer.classList.remove('is-hidden');
                errorContainer.textContent = '';

                const heading = document.createElement('strong');
                heading.className = 'd-block mb-1';
                heading.textContent = 'Please correct the following order requirements:';
                errorContainer.appendChild(heading);

                const ul = document.createElement('ul');
                ul.className = 'mb-0 ps-3 small';
                for (let i = 0; i < errorList.length; i++) {
                    const li = document.createElement('li');
                    li.textContent = errorList[i];
                    ul.appendChild(li);
                }
                errorContainer.appendChild(ul);

                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            } else {
                errorContainer.classList.add('is-hidden');
                errorContainer.textContent = '';
            }
        }

        return isValid;
    }

    /**
     * Creates a fully interactive stacked order voucher element (R1)
     * @param {Object} order - Stored order object
     * @param {boolean} startCollapsed - Whether to initialize in collapsed state
     * @returns {HTMLElement} Voucher container element
     */
    function createOrderVoucherElement(order, startCollapsed) {
        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'order-voucher-item';
        itemWrapper.id = 'order-voucher-item-' + order.id;

        // Persistent Toggle Bar
        const toggleBar = document.createElement('div');
        toggleBar.className = 'voucher-toggle-bar mb-2';
        toggleBar.setAttribute('role', 'button');
        toggleBar.setAttribute('tabindex', '0');
        toggleBar.setAttribute('aria-expanded', startCollapsed ? 'false' : 'true');

        const leftBox = document.createElement('div');
        leftBox.className = 'd-flex align-items-center gap-2 flex-wrap';

        const badge = document.createElement('span');
        badge.className = 'badge bg-gold text-dark';
        badge.textContent = 'Dispensary Hold';
        leftBox.appendChild(badge);

        const summary = document.createElement('strong');
        summary.className = 'text-light';
        summary.textContent = order.id + ' — ' + order.itemsSummary;
        leftBox.appendChild(summary);

        const meta = document.createElement('span');
        meta.className = 'text-secondary small';
        meta.textContent = '(' + order.formattedTotal + ')';
        leftBox.appendChild(meta);

        const rightBox = document.createElement('div');
        rightBox.className = 'd-flex align-items-center gap-2';

        const actionLabel = document.createElement('span');
        actionLabel.className = 'text-secondary small toggle-status-label d-none d-sm-inline';
        actionLabel.textContent = startCollapsed ? 'View Details' : 'Hide Details';
        rightBox.appendChild(actionLabel);

        const arrow = document.createElement('span');
        arrow.className = 'voucher-toggle-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = startCollapsed ? '▼' : '▲';
        rightBox.appendChild(arrow);

        toggleBar.appendChild(leftBox);
        toggleBar.appendChild(rightBox);

        // Details Card
        const card = document.createElement('div');
        card.className = 'confirmation-voucher shadow card-dark-highlight';
        card.id = 'order-card-' + order.id;
        if (startCollapsed) {
            card.classList.add('is-hidden');
        }

        // Header Row
        const cardHeader = document.createElement('div');
        cardHeader.className = 'd-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-3';

        const titleDiv = document.createElement('div');
        const cardBadge = document.createElement('span');
        cardBadge.className = 'badge bg-gold text-dark mb-1';
        cardBadge.textContent = 'Dispensary Hold';
        const cardH3 = document.createElement('h3');
        cardH3.className = 'h5 text-gold mb-0';
        cardH3.textContent = 'Product Pre-Order Pickup Voucher';
        titleDiv.appendChild(cardBadge);
        titleDiv.appendChild(cardH3);

        const actionDiv = document.createElement('div');
        actionDiv.className = 'd-flex align-items-center gap-2 mt-2 mt-sm-0';
        const statusBadge = document.createElement('span');
        statusBadge.className = 'status-badge-confirmed mt-2 mt-sm-0';
        statusBadge.textContent = 'Status: Reserved for 48 Hours (Demo)';
        const btnHide = document.createElement('button');
        btnHide.type = 'button';
        btnHide.className = 'btn btn-outline-gold btn-sm';
        btnHide.setAttribute('title', 'Close Voucher');
        btnHide.setAttribute('aria-label', 'Close Voucher');
        btnHide.textContent = '✕ Hide Voucher';
        actionDiv.appendChild(statusBadge);
        actionDiv.appendChild(btnHide);

        cardHeader.appendChild(titleDiv);
        cardHeader.appendChild(actionDiv);
        card.appendChild(cardHeader);

        // Divider
        const div1 = document.createElement('div');
        div1.className = 'voucher-divider';
        card.appendChild(div1);

        // 4 Columns Grid
        const grid = document.createElement('div');
        grid.className = 'row g-3 small';

        // Col 1
        const col1 = document.createElement('div');
        col1.className = 'col-12 col-md-3';
        const s1 = document.createElement('span');
        s1.className = 'text-secondary d-block';
        s1.textContent = 'Reservation Code:';
        const d1 = document.createElement('strong');
        d1.className = 'text-gold';
        d1.textContent = order.id;
        col1.appendChild(s1);
        col1.appendChild(d1);

        // Col 2
        const col2 = document.createElement('div');
        col2.className = 'col-12 col-md-3';
        const s2 = document.createElement('span');
        s2.className = 'text-secondary d-block';
        s2.textContent = 'Reserved Items:';
        const d2 = document.createElement('strong');
        d2.className = 'text-light';
        d2.textContent = order.itemsSummary;
        col2.appendChild(s2);
        col2.appendChild(d2);

        // Col 3
        const col3 = document.createElement('div');
        col3.className = 'col-12 col-md-3';
        const s3 = document.createElement('span');
        s3.className = 'text-secondary d-block';
        s3.textContent = 'Pickup Desk:';
        const d3 = document.createElement('strong');
        d3.className = 'text-light';
        d3.textContent = order.branchName;
        col3.appendChild(s3);
        col3.appendChild(d3);

        // Col 4
        const col4 = document.createElement('div');
        col4.className = 'col-12 col-md-3';
        const s4 = document.createElement('span');
        s4.className = 'text-secondary d-block';
        s4.textContent = 'Amount Due at Desk:';
        const d4 = document.createElement('strong');
        d4.className = 'text-gold fs-6';
        d4.textContent = order.formattedTotal;
        col4.appendChild(s4);
        col4.appendChild(d4);

        grid.appendChild(col1);
        grid.appendChild(col2);
        grid.appendChild(col3);
        grid.appendChild(col4);
        card.appendChild(grid);

        // Divider
        const div2 = document.createElement('div');
        div2.className = 'voucher-divider';
        card.appendChild(div2);

        // Notice
        const noticeP = document.createElement('p');
        noticeP.className = 'mb-3 text-secondary small';
        const noticeText1 = document.createTextNode('* Please quote voucher code ');
        const noticeCode = document.createElement('strong');
        noticeCode.textContent = order.id;
        const noticeText2 = document.createTextNode(' to the club administrator upon your visit. Items will remain safely packaged in your name.');
        noticeP.appendChild(noticeText1);
        noticeP.appendChild(noticeCode);
        noticeP.appendChild(noticeText2);
        card.appendChild(noticeP);

        // Bottom action bar
        const bottomBar = document.createElement('div');
        bottomBar.className = 'd-flex flex-wrap justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-25';
        const bottomSmall = document.createElement('small');
        bottomSmall.className = 'text-secondary';
        bottomSmall.textContent = 'Present this voucher code to the club administrator upon your visit.';
        const btnBottomClose = document.createElement('button');
        btnBottomClose.type = 'button';
        btnBottomClose.className = 'btn btn-outline-gold btn-sm mt-2 mt-sm-0';
        btnBottomClose.textContent = '✕ Close Voucher / New Order';
        bottomBar.appendChild(bottomSmall);
        bottomBar.appendChild(btnBottomClose);
        card.appendChild(bottomBar);

        // Independent Toggle Behavior for this Voucher
        function toggleVoucher() {
            const isHidden = card.classList.contains('is-hidden');
            if (isHidden) {
                card.classList.remove('is-hidden');
                arrow.textContent = '▲';
                actionLabel.textContent = 'Hide Details';
                toggleBar.setAttribute('aria-expanded', 'true');
            } else {
                card.classList.add('is-hidden');
                arrow.textContent = '▼';
                actionLabel.textContent = 'View Details';
                toggleBar.setAttribute('aria-expanded', 'false');
            }
        }

        function collapseVoucher() {
            card.classList.add('is-hidden');
            arrow.textContent = '▼';
            actionLabel.textContent = 'View Details';
            toggleBar.setAttribute('aria-expanded', 'false');
            toggleBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        toggleBar.addEventListener('click', toggleVoucher);
        toggleBar.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleVoucher();
            }
        });

        btnHide.addEventListener('click', collapseVoucher);
        btnBottomClose.addEventListener('click', function () {
            collapseVoucher();
            const catalog = document.getElementById('marketbar-cart-section');
            if (catalog) {
                catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        itemWrapper.appendChild(toggleBar);
        itemWrapper.appendChild(card);
        return itemWrapper;
    }

    /**
     * Renders pickup voucher upon successful submission and stacks it (R1)
     * @param {Object} details - Order reservation details
     */
    function renderOrderVoucher(details) {
        const voucherWrapper = document.getElementById('order-confirmation-wrapper');
        const vouchersStack = document.getElementById('order-vouchers-stack');
        if (!voucherWrapper || !vouchersStack) return;

        const referenceCode = window.Logovo.generateReference('RES');
        const order = {
            id: referenceCode,
            itemsSummary: details.itemsSummary,
            branchName: details.branchName,
            formattedTotal: details.formattedTotal,
            customerName: details.customerName,
            status: 'Reserved for 48 Hours (Demo)',
            createdAt: new Date().toISOString()
        };

        if (window.Logovo && window.Logovo.saveOrder) {
            window.Logovo.saveOrder(order);
        }

        const voucherElement = createOrderVoucherElement(order, false);
        vouchersStack.appendChild(voucherElement);

        voucherWrapper.classList.remove('is-hidden');
        voucherElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Reset cart upon successful checkout
        clearCart();
    }

    // -------------------------------------------------------------------------
    // 4. Initialization & Event Binding (Pure Plain JavaScript)
    // -------------------------------------------------------------------------
    function initMarketbarPage() {
        const orderForm = document.getElementById('form-market-order');
        const cartContainer = document.getElementById('cart-items-container');
        const clearCartBtn = document.getElementById('btn-clear-cart');

        // Render previously stored orders from client session (R1 & R2)
        const existingOrders = window.Logovo && window.Logovo.getOrders ? window.Logovo.getOrders() : [];
        const stack = document.getElementById('order-vouchers-stack');
        const wrapper = document.getElementById('order-confirmation-wrapper');
        if (existingOrders.length > 0 && stack && wrapper) {
            wrapper.classList.remove('is-hidden');
            for (let eIdx = 0; eIdx < existingOrders.length; eIdx++) {
                const el = createOrderVoucherElement(existingOrders[eIdx], true);
                stack.appendChild(el);
            }
        }

        // Initial default items for demonstration (e.g. 1 clay item)
        addToCart('clay', 1);

        // Catalog "+ Add to Cart" buttons
        const addButtons = document.querySelectorAll('.btn-add-to-cart');
        for (let i = 0; i < addButtons.length; i++) {
            addButtons[i].addEventListener('click', function () {
                const prodId = this.getAttribute('data-product-id');
                if (prodId) {
                    addToCart(prodId, 1);
                    // Smoothly scroll down to cart to show addition
                    const cartSection = document.getElementById('marketbar-cart-section');
                    if (cartSection) {
                        cartSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }
            });
        }

        // Cart items delegated buttons: increase, decrease, remove
        if (cartContainer) {
            cartContainer.addEventListener('click', function (event) {
                const target = event.target;
                const action = target.getAttribute('data-action');
                const prodId = target.getAttribute('data-id');

                if (!action || !prodId) return;

                if (action === 'increase') {
                    for (let i = 0; i < cart.length; i++) {
                        if (cart[i].id === prodId) {
                            updateCartItemQty(prodId, cart[i].quantity + 1);
                            break;
                        }
                    }
                } else if (action === 'decrease') {
                    for (let j = 0; j < cart.length; j++) {
                        if (cart[j].id === prodId) {
                            updateCartItemQty(prodId, cart[j].quantity - 1);
                            break;
                        }
                    }
                } else if (action === 'remove') {
                    removeFromCart(prodId);
                }
            });
        }

        // Clear Cart button
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function () {
                clearCart();
            });
        }

        // Form submission
        if (orderForm) {
            orderForm.addEventListener('submit', function (event) {
                event.preventDefault();

                if (validateMarketOrderForm(orderForm)) {
                    const branchSelect = document.getElementById('order-branch-select');
                    const nameInput = document.getElementById('order-name-input');
                    const totals = calculateCartTotals();

                    const itemNames = [];
                    for (let k = 0; k < cart.length; k++) {
                        itemNames.push(cart[k].name + ' × ' + cart[k].quantity);
                    }

                    const branchText = BRANCHES_MAP[branchSelect.value] || branchSelect.options[branchSelect.selectedIndex].text;

                    const details = {
                        itemsSummary: itemNames.join(', '),
                        branchName: branchText,
                        formattedTotal: totals.formattedFinalTotal,
                        customerName: window.Logovo.sanitize(nameInput.value)
                    };

                    renderOrderVoucher(details);
                }
            });

            orderForm.addEventListener('reset', function () {
                setTimeout(function () {
                    window.Logovo.clearFormErrors(orderForm);
                }, 10);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMarketbarPage);
    } else {
        initMarketbarPage();
    }
})();
