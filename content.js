function beautifyTables() {

    document.querySelectorAll("table").forEach(table => {

        if (table.dataset.mtsStyled)
            return;

        table.dataset.mtsStyled = "1";

        table.classList.add("mts-table");

        // Wrap table

        if (!table.parentElement.classList.contains("mts-wrapper")) {

            const wrapper = document.createElement("div");

            wrapper.className = "mts-wrapper";

            table.parentNode.insertBefore(wrapper, table);

            wrapper.appendChild(table);
        }

        // Detect numeric columns

        table.querySelectorAll("tbody tr").forEach(row => {

            row.querySelectorAll("td").forEach(td => {

                const value = td.innerText.trim();

                if (/^[0-9,.()%+-]+$/.test(value)) {

                    td.classList.add("mts-number");

                }

            });

        });

    });

}

beautifyTables();

new MutationObserver(() => {

    beautifyTables();

}).observe(document.body, {

    childList: true,

    subtree: true

});