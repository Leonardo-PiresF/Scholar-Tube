document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('videoContainer');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categoryBtns = document.querySelectorAll('.chip');

    function renderVideos(videos) {
        videoContainer.innerHTML = '';

        if (videos.length === 0) {
            videoContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Nenhum vídeo encontrado.</p>';
            return;
        }

        videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card';

            card.onclick = () => {
                localStorage.setItem('selectedVideoId', video.id);
                window.location.href = 'video.html';
            };

            card.innerHTML = `
                <div class="thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                </div>
                <div class="video-info">
                    <img src="${video.avatar}" alt="Canal" class="channel-avatar">
                    <div class="video-details">
                        <h3 class="video-title">${video.title}</h3>
                        <p class="channel-name">${video.channel}</p>
                        <p class="views-date">${video.views} • ${video.date}</p>
                    </div>
                </div>
            `;

            videoContainer.appendChild(card);
        });
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            if (category === 'Tudo') {
                renderVideos(videoData);
            } else {
                const filtered = videoData.filter(video => video.category === category);
                renderVideos(filtered);
            }
        });
    });

    function filterBySearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = videoData.filter(video =>
            video.title.toLowerCase().includes(searchTerm) ||
            video.channel.toLowerCase().includes(searchTerm)
        );
        renderVideos(filtered);
    }

    searchBtn.addEventListener('click', filterBySearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterBySearch();
        }
    });

    renderVideos(videoData);
});
