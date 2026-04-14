async function loadShows() {
    const res = await fetch('../data/shows.json');
    const shows = await res.json();
    const container = document.getElementById('shows-container');
    const search = document.getElementById('search');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let activeCategory = 'all';

    function display(list) {
        container.innerHTML = '';
        if (list.length === 0) {
            container.innerHTML = '<p style="padding:20px 0;color:#aaa;">No shows match your search.</p>';
            return;
        }
        list.forEach(show => {
            container.innerHTML += `
            <div class="card">
                <h3>${show.title}</h3>
                <p class="card-category">${show.category}</p>
                <p><strong>Cast:</strong> ${show.cast}</p>
                <p>${show.description}</p>
                <a class="btn" href="../contact/?show=${encodeURIComponent(show.title)}">Enquire</a>
            </div>`;
        });
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
