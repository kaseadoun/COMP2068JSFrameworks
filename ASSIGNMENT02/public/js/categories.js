document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("category");

    categorySelect.addEventListener("change", (event) => {
        if (event.target.value === "add-category") {
            window.location.href = "/categories";
        }
    });
});