const addonsList = document.getElementById('addons-list');
let addons;
const urlParams = new URLSearchParams(window.location.search);
const highlightAddon = urlParams.get('addon');

(async () => {
    const result = await fetch(window.addonListUrl);
    addons = await result.json();

    addons.forEach((addon, id) => {
        let downloads = '';
        Object.entries(addon.versions).forEach(([version, data]) => {
            downloads +=
                `<tr>
                    <td class="minecraft-version">${version}</td>
                    <td class="download-buttons">
                        ${data.store ? `<button onclick="openLink('${data.store}')" title="LabyMod Store"><i class="fa-solid fa-store"></i></button>` : ''}
                        ${data.download ? `<button onclick="openLink('${data.download}')" title="Download"><i class="fas fa-download" aria-hidden="true"></i></button>` : ''}
                        ${data.source ? `<button onclick="openLink('${data.source}')" title="Source"><i class="fa-brands fa-github" aria-hidden="true"></i></button>` : ''}
                        ${data.text ? data.text : ''}
                    </td>
                </tr>`;
        });

        let addonElement = document.createElement('template');
        addonElement.innerHTML =
            `<div class="addon ${highlightAddon == addon.name ? 'highlight-addon' : ''}" data-id="${id}">
                <img class="icon" src="img/addons/${addon.icon}">
                <div class="name">${addon.name}</div>
                <div class="version">${addon.version}</div>
                <div class="description">${addon.description}</div>
                <table class="downloads">${downloads}</table>
                <div class="notes">${addon.notes ? addon.notes : '&nbsp;'}</div>
            </div>`;
        addonElement = addonsList.appendChild(addonElement.content.firstChild);
        if(highlightAddon == addon.name) {
            addonElement.scrollIntoView({block:'center'});
        }
    });
})();

function openLink(url) {
    location.href = url;
}

document.querySelector('.version-selector').addEventListener('change', event => {
    location.href = event.target.value;
});
