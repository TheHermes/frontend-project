const menuItems = [
    { menuTitle: "Hem", url: "../pages/test.html" },
    { menuTitle: "Memory", url: "../pages/memory.html" },
    { menuTitle: "SSP", url: "../pages/ssp.html"}
];


for (item of menuItems) {
    document.querySelector('.navbar-nav').innerHTML += `
    <li class="nav-item">
        <a class="text-light p-2 px-3 nav-link text-decoration-none d-flex rounded bg-dark mx-4" href="${item.url}">${item.menuTitle}</a>
    </li>`;
}