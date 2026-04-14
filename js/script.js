async function loadShows() {
    const res = await fetch('../data/shows.json');
    const shows = await res.json();
    const container = document.getElementById('shows-container');
    const search = document.getElementById('search');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let activeCategory = 'all';

    function createCard(show) {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h3');
        title.textContent = show.title;

        const category = document.createElement('p');
        category.className = 'card-category';
        category.textContent = show.category;

        const cast = document.createElement('p');
        const castLabel = document.createElement('strong');
        castLabel.textContent = 'Cast: ';
        cast.appendChild(castLabel);
        cast.appendChild(document.createTextNode(show.cast));

        const description = document.createElement('p');
        description.textContent = show.description;

        const link = document.createElement('a');
        link.className = 'btn';
        link.href = `../contact/?show=${encodeURIComponent(show.title)}`;
        link.textContent = 'Enquire';

        card.appendChild(title);
        card.appendChild(category);
        card.appendChild(cast);
        card.appendChild(description);
        card.appendChild(link);
        return card;
    }

    function display(list) {
        container.innerHTML = '';
        if (list.length === 0) {
            const msg = document.createElement('p');
            msg.className = 'empty-state';
            msg.textContent = 'No shows match your search.';
            container.appendChild(msg);
            return;
        }
        list.forEach(show => container.appendChild(createCard(show)));
    }

    function applyFilters() {
        const val = search ? search.value.toLowerCase() : '';
        const filtered = shows.filter(s => {
            const matchesSearch = s.title.toLowerCase().includes(val) || s.description.toLowerCase().includes(val);
            const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
        display(filtered);
    }

    display(shows);

    if (search) {
        search.addEventListener('input', applyFilters);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            applyFilters();
        });
    });
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
