document.addEventListener("DOMContentLoaded", () => {
const sheetId = "1x5i0cg5iP9RgcaNswLtUrnXKa4p1evZTgTFtqZltIIc";      
const sheetName = "deals";             
const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

  const container = document.getElementById("deals-container");
  container.innerHTML = '<p class="loading">Loading deals...</p>';

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not OK, status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data || data.length === 0) {
        container.innerHTML = '<p class="no-deals">No deals found.</p>';
        return;
      }

      container.innerHTML = ""; // Clear loading text

      data.forEach(deal => {
        const card = document.createElement("div");
        card.classList.add("deal-card");

        const product = document.createElement("div");
        product.classList.add("deal-product");
        product.textContent = deal.product || "Unnamed Deal";

        const price = document.createElement("div");
        price.classList.add("deal-price");
        price.textContent = deal.price || "";

        const link = document.createElement("a");
        link.classList.add("deal-link");
        link.href = deal.link || "#";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "View Deal";

        card.appendChild(product);
        card.appendChild(price);
        card.appendChild(link);

        container.appendChild(card);
      });
    })
    .catch(error => {
      container.innerHTML = `<p class="error">Error loading deals: ${error.message}</p>`;
      console.error("Fetch error:", error);
    });
});
