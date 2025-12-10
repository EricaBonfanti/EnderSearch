document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const mobsContainer = document.getElementById('mobsContainer');
    const modal = document.getElementById('mobModal');
    const modalName = document.getElementById('mobName');
    const modalWeaknesses = document.getElementById('mobWeaknesses');
    const modalBehavior = document.getElementById('mobBehavior');
    const modalStrategy = document.getElementById('mobStrategy');
    const closeButton = document.querySelector('.close-button');

    let mobsData = [];

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            mobsData = data;
            displayMobs(mobsData);
        });

    function displayMobs(mobs) {
        mobsContainer.innerHTML = '';
        mobs.forEach(mob => {
            const mobCard = document.createElement('div');
            mobCard.classList.add('mob-card');

            const mobImage = document.createElement('img');
            mobImage.src = mob.imagem.replace('imagens/', '');
            mobImage.src = mob.imagem;
            mobImage.classList.add('mob-image');

            const mobName = document.createElement('h2');
            mobName.textContent = mob.nome;

            const mobDescription = document.createElement('p');
            mobDescription.textContent = mob.descricao;

            mobCard.appendChild(mobImage);
            mobCard.appendChild(mobName);
            mobCard.appendChild(mobDescription);

            mobCard.addEventListener('click', () => {
                showMobDetails(mob);
            });

            mobsContainer.appendChild(mobCard);
        });
    }

    function showMobDetails(mob) {
        modalName.textContent = mob.nome;
        modalWeaknesses.textContent = mob.fraquezas;
        modalBehavior.textContent = mob.comportamentos;
        modalStrategy.textContent = mob.estrategias;
        modal.style.display = 'block';
    }

    function closeModel(){
        modal.style.display = 'none';
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMobs = mobsData.filter(mob => 
            mob.nome.toLowerCase().includes(searchTerm)
        );
        displayMobs(filteredMobs);
    });

    closeButton.addEventListener('click', closeModel);

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModel();
        }
    });
});
