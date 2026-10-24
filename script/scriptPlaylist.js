//script de construction de la playlist



const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');



// données de la playlist

let data = [{
        'id': 'a1',
        'title': 'Rendre ou Garder',
        'name': '[Qu\'aurait fait Jésus 1] Rendre ou Garder.mp4',
        'duration': '0:27',
    },
    {
        'id': 'a2',
        'title': 'Parler ou se Taire',
        'name': '[Qu\'aurait fait Jésus 2] Parler ou se Taire.mp4',
        'duration': '2:29',
    },
    {
        'id': 'a3',
        'title': 'Lancer le Feu ou Pardonner',
        'name': '[Qu\'aurait fait Jésus 3] Lancer le Feu ou Pardonner.mp4',
        'duration': '3:01',
    }
];


// boucle pour afficher la playlist

data.forEach((video, i) => {
    let video_element = `
<div class="video" data-id="${video.id}">
<img src="images/play.svg" alt="">
<p>${i + 1 > 9 ? i + 1 : '0' + (i + 1)}. </p>
<h3 class="title">${video.title}</h3>
<p class="time">${video.duration}</p>
</div>
`;
    video_playlist.innerHTML += video_element;
})



let videos = document.querySelectorAll('.video'); // recupérer la playslist generé par le script dans un tableau

// initialiser la première video en pause
videos[0].classList.add('active');
videos[0].querySelector('img').src = 'images/pause.svg';


videos.forEach(selected_video => {

    selected_video.onclick = () => {

        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = 'images/play.svg';

        }

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = 'images/pause.svg';

        let match_video = data.find(video => video.id == selected_video.dataset.id);


		//valoriser source par la bonne video
        main_video.src = 'video/' + match_video.name;

		// valoriser le titre par le bon titre
        main_video_title.innerHTML = match_video.title;
    }
});