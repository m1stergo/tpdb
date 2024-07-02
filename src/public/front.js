function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}


const app = {
    detailUrl() {
        return window.location.hash.substring(1);
    },
    init() {
        ready(() => {
            this.bindDetailClick();
            if (this.detailUrl()) {
                this.loadDetails(`${this.detailUrl()}`)
            }
        })
    },
    bindDetailClick() {
        document.querySelectorAll('[data-details]').forEach((link) => {
            link.addEventListener('click', (e) => {
                const url = e.target.getAttribute('data-details');
                this.loadDetails(url);
            })
        })
        document.querySelectorAll('[data-details-close]')[0].addEventListener('click', () => {
            document.getElementsByTagName('body')[0].classList.remove('details-visible');
            document.getElementById('details').innerHTML = '';
        })
    },
    loadDetails(url) {
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('details').innerHTML = html;
            document.getElementsByTagName('body')[0].classList.add('details-visible');
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementsByTagName('body')[0].classList.remove('details-visible');
            document.getElementById('details').innerHTML = '<p>An error occurred while loading the details.</p>';
        });
    }
}

app.init();