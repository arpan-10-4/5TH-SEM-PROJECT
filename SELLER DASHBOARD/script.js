// seller-dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const sidebarToggle = document.querySelector('.navbar-toggler'); // Assuming you have a navbar-toggler
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay'); //  overlay


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
    // In a real application, you would fetch this data from your server.
    function fetchData() {
        // Example: Update dashboard numbers
        setTimeout(() => {
            const totalProductsElement = document.querySelector('.dashboard-content .col-md-4:nth-child(1) span');
            const newOrdersElement = document.querySelector('.dashboard-content .col-md-4:nth-child(2) span');
            const totalEarningsElement = document.querySelector('.dashboard-content .col-md-4:nth-child(3) span');

            if (totalProductsElement) {
                totalProductsElement.textContent = '130'; // Example update
            }
            if (newOrdersElement) {
                 newOrdersElement.textContent = '22';
            }
            if (totalEarningsElement) {
                totalEarningsElement.textContent = '$15,250';
            }


            // Example: Update Recent Orders Table (Add a new order)
            const ordersTableBody = document.querySelector('.table-responsive tbody');
            if (ordersTableBody) {
                const newOrderRow = document.createElement('tr');
                newOrderRow.innerHTML = `
                    <td>#1003</td>
                    <td>Alice Johnson</td>
                    <td>2025-05-07</td>
                    <td>$62.00</td>
                    <td><span class="badge bg-primary">Processing</span></td>
                    <td><a href="#" class="btn btn-sm btn-outline-primary">View</a></td>
                `;
                ordersTableBody.appendChild(newOrderRow);
            }

            console.log('Dashboard data updated.');
        }, 1500); // Simulate a 1.5-second delay
    }

    fetchData(); // Call the function to simulate data loading


    // ---  Auto-resize textareas ---
    function autoResizeTextarea() {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        });
    }

    // --- Event listener for textareas ---
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', autoResizeTextarea);
    });
    autoResizeTextarea(); //call at load

});
