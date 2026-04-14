async function loadShows() {
    const res = await fetch('../data/shows.json');
    const shows = await res.json();
    const container = document.getElementById('shows-container');
    const search = document.getElementById('search');

    function display(list) {
        container.innerHTML = '';
        list.forEach(show => {
            container.innerHTML += `
            <div class="card">
                <img src="${show.logo}" style="width:100%">
                <h3>${show.title}</h3>
                <p>${show.category}</p>
                <p>Cast: ${show.cast}</p>
                <p>${show.description}</p>
                <a class="btn" href="../contact/?show=${encodeURIComponent(show.title)}">Enquire</a>
            </div>`;
        });
    }

    display(shows);

    if (search) {
        search.addEventListener('input', () => {
            const val = search.value.toLowerCase();
            display(shows.filter(s => s.title.toLowerCase().includes(val)));
        });
    }
}

function autofill() {
    const params = new URLSearchParams(window.location.search);
    const show = params.get('show');
    if (show) {
        document.getElementById('showInput').value = show;
    }
}

window.onload = () => {
    if (document.getElementById('shows-container')) loadShows();
    if (document.getElementById('showInput')) autofill();
};
