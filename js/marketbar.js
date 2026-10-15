/**
 * Logovo Barbershop Astana — MarketBar & Dispensary Ordering Module
 * WEB Technologies 1 — Assignment 4 & 5
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
        'triumph': 'Triumph Club (38 Mangilik El Ave)'
    };

    // -------------------------------------------------------------------------
    // 2. Calculations & Selection Reusable Functions
    // -------------------------------------------------------------------------

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
     * Calculates total order amount based on item unit price and quantity
     * Calls window.Logovo.formatPrice
     * @param {string} productId - Product ID
     * @param {number} quantity - Number of items
     * @returns {Object} Calculation details
     */
    function calculateOrderTotal(productId, quantity) {
        const product = findProductById(productId);
        const validQty = Math.max(1, Math.min(10, parseInt(quantity, 10) || 1));

        if (!product) {
            return {
                product: null,
                quantity: validQty,
                unitPrice: 0,
                totalAmount: 0,
                formattedTotal: window.Logovo.formatPrice(0)
            };
        }

        const totalAmount = product.unitPrice * validQty;
        return {
            product: product,
            quantity: validQty,
            unitPrice: product.unitPrice,
            totalAmount: totalAmount,
            formattedTotal: window.Logovo.formatPrice(totalAmount)
        };
    }

    /**
     * Updates the total price display in the summary box
     */
    function updateOrderDisplay() {
        const productSelect = document.getElementById('order-product-select');
        const quantityInput = document.getElementById('order-quantity-input');
        const totalPriceEl = document.getElementById('order-total-price');

        if (!productSelect || !totalPriceEl) return;

        const prodId = productSelect.value;
        const qty = quantityInput ? quantityInput.value : 1;

        const calc = calculateOrderTotal(prodId, qty);
        totalPriceEl.textContent = calc.formattedTotal;

        // Highlight table row
        highlightCatalogRow(prodId);
    }

    /**
     * Highlights the corresponding table row in the catalog table
     * @param {string} productId - Selected product ID
     */
    function highlightCatalogRow(productId) {
        const rows = document.querySelectorAll('#table-market tbody tr');
        rows.forEach(function (r) {
            r.classList.remove('selected-state');
        });

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

        // 1. Product Item Select
        const productSelect = document.getElementById('order-product-select');
        if (!productSelect || productSelect.value.trim() === '') {
            window.Logovo.setFieldError(productSelect, 'Please choose a product or beverage item.');
            errorList.push('Product selection is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || productSelect;
        }

        // 2. Quantity (Integer between 1 and 10)
        const quantityInput = document.getElementById('order-quantity-input');
        const qtyVal = parseInt(quantityInput ? quantityInput.value : '0', 10);
        if (isNaN(qtyVal) || qtyVal < 1 || qtyVal > 10) {
            window.Logovo.setFieldError(quantityInput, 'Quantity must be an integer between 1 and 10.');
            errorList.push('Quantity must be between 1 and 10.');
            isValid = false;
            firstInvalidField = firstInvalidField || quantityInput;
        }

        // 3. Pickup Branch
        const branchSelect = document.getElementById('order-branch-select');
        if (!branchSelect || branchSelect.value.trim() === '') {
            window.Logovo.setFieldError(branchSelect, 'Please choose a pickup branch.');
            errorList.push('Pickup branch selection is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || branchSelect;
        }

        // 4. Customer Full Name (Trimmed, min 3 chars)
        const nameInput = document.getElementById('order-name-input');
        const trimmedName = window.Logovo.sanitize(nameInput ? nameInput.value : '');
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError(nameInput, 'Full name must contain at least 3 characters.');
            errorList.push('Customer full name is required (min 3 chars).');
            isValid = false;
            firstInvalidField = firstInvalidField || nameInput;
        }

        // 5. Contact Telephone (+7...)
        const phoneInput = document.getElementById('order-phone-input');
        const phoneVal = phoneInput ? phoneInput.value : '';
        if (!window.Logovo.isValidPhone(phoneVal)) {
            window.Logovo.setFieldError(phoneInput, 'Enter a valid Kazakhstan telephone number (+7...).');
            errorList.push('Valid Kazakhstan telephone number is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || phoneInput;
        }

        // 6. Agreement Checkbox
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
                errorList.forEach(function (err) {
                    const li = document.createElement('li');
                    li.textContent = err;
                    errorUl.appendChild(li);
                });
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
     * Renders pickup voucher upon successful submission
     * @param {Object} details - Order reservation details
     */
    function renderOrderVoucher(details) {
        const voucherCard = document.getElementById('order-confirmation-card');
        const voucherWrapper = document.getElementById('order-confirmation-wrapper');
        if (!voucherCard || !voucherWrapper) return;

        const codeEl = document.getElementById('order-voucher-code');
        const itemEl = document.getElementById('order-voucher-item');
        const branchEl = document.getElementById('order-voucher-branch');
        const priceEl = document.getElementById('order-voucher-price');
        const statusBadge = document.getElementById('order-status-badge');
        const noticeP = document.getElementById('order-voucher-notice');

        const referenceCode = window.Logovo.generateReference('RES');
        if (codeEl) codeEl.textContent = referenceCode;
        if (itemEl) itemEl.textContent = details.itemName + ' (Qty: ' + details.quantity + ')';
        if (branchEl) branchEl.textContent = details.branchName;
        if (priceEl) priceEl.textContent = details.formattedTotal;

        if (statusBadge) {
            statusBadge.className = 'status-badge-confirmed mt-2 mt-sm-0';
            statusBadge.textContent = 'Status: Reserved for 48 Hours (Demo)';
        }

        if (noticeP) {
            noticeP.textContent = '';
            const noticeSpan = document.createElement('span');
            noticeSpan.className = 'text-warning d-block fw-semibold mb-1';
            noticeSpan.textContent = '★ Demonstration Notice: No financial transaction took place and no inventory has been deducted.';

            const pickSpan = document.createElement('span');
            pickSpan.className = 'd-block';
            pickSpan.textContent = 'Customer ' + details.customerName + ', your reserved items will be held at ' + details.branchName + ' for 48 hours under voucher code ' + referenceCode + '.';

            noticeP.appendChild(noticeSpan);
            noticeP.appendChild(pickSpan);
        }

        voucherCard.classList.add('card-dark-highlight');
        voucherWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // -------------------------------------------------------------------------
    // 4. Initialization & Event Binding
    // -------------------------------------------------------------------------
    function initMarketbarPage() {
        const productSelect = document.getElementById('order-product-select');
        const quantityInput = document.getElementById('order-quantity-input');
        const orderForm = document.getElementById('form-market-order');

        // Initial calculation
        updateOrderDisplay();

        if (productSelect) {
            productSelect.addEventListener('change', updateOrderDisplay);
        }

        if (quantityInput) {
            quantityInput.addEventListener('input', updateOrderDisplay);
        }

        // Table "Reserve Item" Button Click Listeners
        const reserveButtons = document.querySelectorAll('.select-product-btn');
        reserveButtons.forEach(function (button, index) {
            button.addEventListener('click', function () {
                const mappedProduct = PRODUCTS_DATA[index];
                if (mappedProduct) {
                    if (productSelect) {
                        productSelect.value = mappedProduct.id;
                    }
                    if (quantityInput) {
                        quantityInput.value = 1;
                    }
                    updateOrderDisplay();
                }
            });
        });

        // Form submission
        if (orderForm) {
            orderForm.addEventListener('submit', function (event) {
                event.preventDefault();

                if (validateMarketOrderForm(orderForm)) {
                    const chosenProd = findProductById(productSelect.value);
                    const qty = parseInt(quantityInput.value, 10);
                    const branchSelect = document.getElementById('order-branch-select');
                    const nameInput = document.getElementById('order-name-input');

                    const calc = calculateOrderTotal(productSelect.value, qty);
                    const branchText = BRANCHES_MAP[branchSelect.value] || branchSelect.options[branchSelect.selectedIndex].text;

                    const details = {
                        itemName: chosenProd ? chosenProd.name : 'Cosmetics Item',
                        quantity: qty,
                        branchName: branchText,
                        formattedTotal: calc.formattedTotal,
                        customerName: window.Logovo.sanitize(nameInput.value)
                    };

                    renderOrderVoucher(details);
                }
            });

            orderForm.addEventListener('reset', function () {
                setTimeout(function () {
                    window.Logovo.clearFormErrors(orderForm);
                    if (productSelect) productSelect.value = 'clay';
                    if (quantityInput) quantityInput.value = 1;
                    updateOrderDisplay();
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
