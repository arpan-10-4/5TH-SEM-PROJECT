// buyer-dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const sidebarToggle = document.querySelector('.navbar-toggler');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');


    // --- Sidebar Toggle Functionality (for mobile) ---
      if (sidebarToggle && mobileMenuOverlay) { // Check if elements exist
        sidebarToggle.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent propagation to document
            sidebar.classList.toggle('show');
            mobileMenuOverlay.classList.toggle('show');
        });

        mobileMenuOverlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            mobileMenuOverlay.classList.remove('show');
        });

        // Close sidebar when clicking outside (on document)
        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove('show');
                mobileMenuOverlay.classList.remove('show');
            }
        });
    }


    // --- Simulate Data Fetching (for demonstration) ---
    function fetchData() {
        setTimeout(() => {
            // Update overview numbers
            const totalOrdersElement = document.querySelector('.dashboard-content .col-md-4:nth-child(1) span');
            const wishlistItemsElement = document.querySelector('.dashboard-content .col-md-4:nth-child(2) span');
            const unreadMessagesElement = document.querySelector('.dashboard-content .col-md-4:nth-child(3) span');

            if (totalOrdersElement) {
                totalOrdersElement.textContent = '45';
            }
            if (wishlistItemsElement) {
                wishlistItemsElement.textContent = '25';
            }
            if (unreadMessagesElement) {
                unreadMessagesElement.textContent = '5';
            }

            // Update Recent Orders Table
            const ordersTableBody = document.querySelector('.table-responsive tbody');
            if (ordersTableBody) {
                const newOrderRow = document.createElement('tr');
                newOrderRow.innerHTML = `
                    <td>#B-2003</td>
                    <td>2025-05-08</td>
                    <td>Laptop, Charger</td>
                    <td>$850.00</td>
                    <td><span class="badge bg-warning">Processing</span></td>
                    <td><a href="#" class="btn btn-sm btn-outline-primary">View Details</a></td>
                `;
                ordersTableBody.appendChild(newOrderRow);
            }

            // Simulate fetching product data and updating the carousel
            // In a real application, fetch product data from your API
            const products = [
                { id: 9, name: 'Product 9', price: '$40.00', image: 'product9.jpg' },
                { id: 10, name: 'Product 10', price: '$80.00', image: 'product10.jpg' },
                { id: 11, name: 'Product 11', price: '$110.00', image: 'product11.jpg' },
                { id: 12, name: 'Product 12', price: '$150.00', image: 'product12.jpg' },
            ];

            const carouselInner = document.querySelector('#product-carousel .carousel-inner');
            if (carouselInner) {
                //create a new div element with class carousel-item
                const newCarouselItem = document.createElement('div');
                newCarouselItem.classList.add('carousel-item');
                //create a div with class row and g-4
                const rowDiv = document.createElement('div');
                rowDiv.classList.add('row','g-4')

                products.forEach(product => {
                    const productCol = document.createElement('div');
                    productCol.classList.add('col-md-3');
                    productCol.innerHTML = `
                        <div class="product-card bg-white shadow-sm rounded p-3">
                            <img src="${product.image}" alt="${product.name}" class="product-image img-fluid rounded mb-3">
                            <h5 class="product-title mb-2">${product.name}</h5>
                            <p class="product-price text-muted">${product.price}</p>
                            <button class="btn btn-primary w-100 add-to-cart-btn" data-product-id="${product.id}"><i class="bi bi-cart-plus me-2"></i> Add to Cart</button>
                        </div>
                    `;
                    rowDiv.appendChild(productCol);
                });
                newCarouselItem.appendChild(rowDiv);
                carouselInner.appendChild(newCarouselItem);

            }
             // Update Wishlist (Simulated)
            const wishlistContainer = document.querySelector('#wishlist-container');
            if (wishlistContainer) {
                const newWishlistItem = document.createElement('div');
                newWishlistItem.classList.add('col-md-4');
                newWishlistItem.innerHTML = `
                    <div class="dashboard-card bg-white shadow-sm rounded p-3">
                        <h5 class="mb-0">New Product</h5>
                        <img src="new-product.jpg" alt="New Product" class="img-fluid rounded mb-2" style="max-height: 200px; object-fit: cover;">
                        <p class="text-muted">$99.99</p>
                        <button class="btn btn-sm btn-outline-danger remove-wishlist-btn" data-product-id="3"><i class="bi bi-trash-fill"></i> Remove</button>
                    </div>
                `;
                wishlistContainer.appendChild(newWishlistItem);
            }

            console.log('Buyer dashboard data updated.');
        }, 1500);
    }

    fetchData();

    // --- Add to Cart functionality (Simulated) ---
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = event.target.dataset.productId;
            console.log(`Product ${productId} added to cart.`);
            // In a real application, you would:
            // 1.  Send an AJAX request to your server to add the product to the user's cart.
            // 2.  Update the cart display on the page (e.g., show a notification, update the cart count).
            alert(`Product ${productId} added to cart!`);  //temporary
        }
    });

    // --- Remove from Wishlist Functionality ---
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-wishlist-btn')) {
            const productId = event.target.dataset.productId;
            console.log(`Product ${productId} removed from wishlist.`);
            // In a real application, you would:
            // 1.  Send an AJAX request to your server to remove the product from the user's wishlist.
            // 2.  Update the wishlist display on the page (e.g., remove the corresponding product card).

            // Remove the product card from the DOM
            const productCard = event.target.closest('.col-md-4'); // Or however the card is structured
            if (productCard) {
                productCard.remove();
            }
        }
    });

    // --- Simulate Order Status Update (for demonstration) ---
    function updateOrderStatus(orderId, newStatus) {
        console.log(`Order ${orderId} status updated to ${newStatus}.`);
        // In a real application, you would send an AJAX request to your server
        // to update the order status in the database.

        // Update the display (find the correct order in the table and update its badge)
        const orderTable = document.querySelector('.table-responsive table'); // Adjust selector if needed
        if (orderTable) {
            const orderRows = orderTable.querySelectorAll('tbody tr');
            orderRows.forEach(row => {
                const orderIdCell = row.querySelector('td:first-child'); // Assuming order ID is in the first cell
                if (orderIdCell && orderIdCell.textContent.includes(orderId)) {
                    const statusCell = row.querySelector('td:nth-child(5)'); // Assuming status is in the fifth cell
                    if (statusCell) {
                        statusCell.innerHTML = `<span class="badge bg-${getStatusColor(newStatus)}">${newStatus}</span>`;
                    }
                }
            });
        }
    }

    // --- Helper function to get badge color based on status ---
    function getStatusColor(status) {
        switch (status) {
            case 'Pending': return 'warning';
            case 'Processing': return 'info';
            case 'Shipped': return 'primary';
            case 'Delivered': return 'success';
            case 'Cancelled': return 'danger';
            default: return 'secondary';
        }
    }

    // Simulate an order status update after a delay
    setTimeout(() => {
        updateOrderStatus('#B-2001', 'Shipped'); // Example: Update order #B-2001 to "Shipped"
    }, 3000);
});