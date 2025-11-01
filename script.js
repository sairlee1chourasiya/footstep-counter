const musicContainer = document.querySelector('.player-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');

// Song list
const songs = [
  { title: 'Shape of You', artist: 'Ed Sheeran', file: 'music/song1.mp3', cover: 'images/cover1.jpg' },
  { title: 'Let Me Love You', artist: 'Justin Bieber', file: 'music/song2.mp3', cover: 'images/cover2.jpg' },
  { title: 'Blinding Lights', artist: 'The Weeknd', file: 'music/song3.mp3', cover: 'images/cover3.jpg' }
];

let songIndex = 0;

// Load song
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.file;
  cover.src = song.cover;
}
loadSong(songs[songIndex]);

// Play
function playSong() {
  musicContainer.classList.add('play');
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  audio.play();
}

// Pause
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.innerHTML = '<i class="fa fa-play"></i>';
  audio.pause();
}

// Prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
}

// Set progress on click
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
