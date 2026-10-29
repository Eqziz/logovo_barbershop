/**
 * Logovo Barbershop Astana — MarketBar & Dispensary Ordering Module
 * WEB Technologies 1 — Assignment 4 (jQuery Migration)
 * Responsible Student: Nurken Mamay (Frontend Developer)
 * Assigned Pages: marketbar.html, careers.html
 *
 * Using jQuery v3.7.1 via official CDN.
 * The $(function () { ... }) construct ensures DOM elements are completely parsed
 * before binding listeners, eliminating race conditions during initial page load.
 */
'use strict';

(function ($) {
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

    const BRANCHES_MAP = {
        'syganak': 'Syganak Flagship (17/1 Syganak St)',
        'kabanbay': 'Kabanbay Studio (58A Kabanbay Batyr Ave)',
        'triumph': 'Triumph Club (38 Mangilik El Ave)'
    };

    // -------------------------------------------------------------------------
    // 2. Calculations & Selection Reusable Functions
    // -------------------------------------------------------------------------

    function findProductById(productId) {
        if (!productId || typeof productId !== 'string') return null;
        const key = $.trim(productId).toLowerCase();
        for (let i = 0; i < PRODUCTS_DATA.length; i++) {
            if (PRODUCTS_DATA[i].id === key) {
                return PRODUCTS_DATA[i];
            }
        }
        return null;
    }

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

    function updateOrderDisplay() {
        const $productSelect = $('#order-product-select');
        const $quantityInput = $('#order-quantity-input');
        const $totalPriceEl = $('#order-total-price');

        if (!$productSelect.length || !$totalPriceEl.length) return;

        const prodId = $productSelect.val();
        const qty = $quantityInput.length ? $quantityInput.val() : 1;

        const calc = calculateOrderTotal(prodId, qty);
        $totalPriceEl.text(calc.formattedTotal);

        highlightCatalogRow(prodId);
    }

    function highlightCatalogRow(productId) {
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
            $('#' + targetId)
                .addClass('selected-state')
                .siblings('tr')
                .removeClass('selected-state');
        }
    }

    // -------------------------------------------------------------------------
    // 3. Form Validation Flow (#form-market-order)
    // -------------------------------------------------------------------------
    function validateMarketOrderForm($form) {
        window.Logovo.clearFormErrors($form);

        let isValid = true;
        let $firstInvalid = null;
        const errorList = [];

        // 1. Product Item Select
        const $productSelect = $('#order-product-select');
        if ($.trim($productSelect.val()) === '') {
            window.Logovo.setFieldError($productSelect, 'Please choose a product or beverage item.');
            errorList.push('Product selection is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $productSelect;
        }

        // 2. Quantity (Integer 1-10)
        const $quantityInput = $('#order-quantity-input');
        const qtyVal = parseInt($quantityInput.val(), 10);
        if (isNaN(qtyVal) || qtyVal < 1 || qtyVal > 10) {
            window.Logovo.setFieldError($quantityInput, 'Quantity must be an integer between 1 and 10.');
            errorList.push('Quantity must be between 1 and 10.');
            isValid = false;
            $firstInvalid = $firstInvalid || $quantityInput;
        }

        // 3. Pickup Branch
        const $branchSelect = $('#order-branch-select');
        if ($.trim($branchSelect.val()) === '') {
            window.Logovo.setFieldError($branchSelect, 'Please choose a pickup branch.');
            errorList.push('Pickup branch selection is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $branchSelect;
        }

        // 4. Customer Full Name
        const $nameInput = $('#order-name-input');
        const trimmedName = $.trim($nameInput.val());
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError($nameInput, 'Full name must contain at least 3 characters.');
            errorList.push('Customer full name is required (min 3 chars).');
            isValid = false;
            $firstInvalid = $firstInvalid || $nameInput;
        }

        // 5. Contact Telephone
        const $phoneInput = $('#order-phone-input');
        if (!window.Logovo.isValidPhone($phoneInput.val())) {
            window.Logovo.setFieldError($phoneInput, 'Enter a valid Kazakhstan telephone number (+7...).');
            errorList.push('Valid Kazakhstan telephone number is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $phoneInput;
        }

        // 6. Agreement Checkbox via .prop('checked')
        const $agreeCheck = $('#order-agree-check');
        if (!$agreeCheck.prop('checked')) {
            window.Logovo.setFieldError($agreeCheck, 'Please confirm the 48-hour pickup reservation policy.');
            errorList.push('Policy confirmation is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $agreeCheck;
        }

        // Error Container with slideDown animation
        const $errorContainer = $('#order-error-container');
        if (!isValid) {
            $errorContainer.empty().removeClass('is-hidden').hide();
            const $heading = $('<strong class="d-block mb-1">Please correct the following order requirements:</strong>');
            const $ul = $('<ul class="mb-0 ps-3 small"></ul>');

            $.each(errorList, function (i, err) {
                $('<li></li>').text(err).appendTo($ul);
            });

            $errorContainer.append($heading).append($ul).slideDown(300);

            if ($firstInvalid) {
                $firstInvalid.focus();
            }
        } else {
            $errorContainer.fadeOut(200, function () {
                $(this).addClass('is-hidden').empty();
            });
        }

        return isValid;
    }

    /**
     * Renders pickup voucher with jQuery .slideDown() animation
     */
    function renderOrderVoucher(details) {
        const $card = $('#order-confirmation-card');
        const $wrapper = $('#order-confirmation-wrapper');
        if (!$card.length || !$wrapper.length) return;

        const referenceCode = window.Logovo.generateReference('RES');
        $('#order-voucher-code').text(referenceCode);
        $('#order-voucher-item').text(details.itemName + ' (Qty: ' + details.quantity + ')');
        $('#order-voucher-branch').text(details.branchName);
        $('#order-voucher-price').text(details.formattedTotal);

        $('#order-status-badge')
            .attr('class', 'status-badge-confirmed mt-2 mt-sm-0')
            .text('Status: Reserved for 48 Hours (Demo)');

        const noticeHtml = '<span class="text-warning d-block fw-semibold mb-1">★ Demonstration Notice: No financial transaction took place and no inventory has been deducted.</span>' +
            '<span class="d-block">Customer ' + $('<div>').text(details.customerName).html() + ', your reserved items will be held at ' + $('<div>').text(details.branchName).html() + ' for 48 hours under voucher code <strong>' + referenceCode + '</strong>.</span>';
        $('#order-voucher-notice').html(noticeHtml);

        $card.addClass('card-dark-highlight');

        // Effect: slideDown with duration and callback
        $wrapper.hide().removeClass('is-hidden').slideDown(400, function () {
            $('html, body').animate({
                scrollTop: $wrapper.offset().top - 80
            }, 300);
        });
    }

    // -------------------------------------------------------------------------
    // 4. Initialization & Event Binding
    // -------------------------------------------------------------------------
    function initMarketbarPage() {
        const $productSelect = $('#order-product-select');
        const $quantityInput = $('#order-quantity-input');
        const $orderForm = $('#form-market-order');

        updateOrderDisplay();

        $productSelect.on('change', updateOrderDisplay);
        $quantityInput.on('input change', updateOrderDisplay);

        // Delegated event on table to handle clicks on reserve buttons
        $('#table-market').on('click', '.select-product-btn', function (event) {
            event.preventDefault();

            const $row = $(this).closest('tr');
            const rowIndex = $('#table-market tbody tr').index($row);
            const mappedProduct = PRODUCTS_DATA[rowIndex];

            if (mappedProduct) {
                $productSelect.val(mappedProduct.id);
                $quantityInput.val(1);
                updateOrderDisplay();

                $('html, body').animate({
                    scrollTop: $('#order-reserve-section').offset().top - 40
                }, 300);
            }
        });

        // Clear error on input
        $orderForm.on('input change', '.is-error', function () {
            $(this)
                .removeClass('is-error')
                .removeAttr('aria-invalid')
                .siblings('.field-error-message')
                .fadeOut(150, function () {
                    $(this).remove();
                });
        });

        // Form submit
        $orderForm.on('submit', function (event) {
            event.preventDefault();

            if (validateMarketOrderForm($orderForm)) {
                const chosenProd = findProductById($productSelect.val());
                const qty = parseInt($quantityInput.val(), 10);
                const $branchSelect = $('#order-branch-select');
                const $nameInput = $('#order-name-input');

                const calc = calculateOrderTotal($productSelect.val(), qty);
                const branchText = BRANCHES_MAP[$branchSelect.val()] || $branchSelect.find('option:selected').text();

                const details = {
                    itemName: chosenProd ? chosenProd.name : 'Cosmetics Item',
                    quantity: qty,
                    branchName: branchText,
                    formattedTotal: calc.formattedTotal,
                    customerName: $.trim($nameInput.val())
                };

                renderOrderVoucher(details);
            }
        });

        $orderForm.on('reset', function () {
            setTimeout(function () {
                window.Logovo.clearFormErrors($orderForm);
                $productSelect.val('clay');
                $quantityInput.val(1);
                updateOrderDisplay();
            }, 10);
        });
    }

    $(function () {
        initMarketbarPage();
    });
})(jQuery);
