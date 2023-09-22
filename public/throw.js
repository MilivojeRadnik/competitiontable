const player = document.getElementById('player-select');
const selectDiv = document.getElementById('select-div');
const play = document.getElementById('play-select');

player.addEventListener('change', async (e) => {
  try {
    let response = await fetch(
      window.location.protocol + `/api/getplayeractions?player=${player.value}`
    );
    response = await response.json();
    let option = document.createElement('option');
    response.forEach((element) => {
      option.value = element.play_id;
      option.innerHTML = element.label + ' - ' + element.played_at;
      play.append(option);
    });
  } catch (error) {
    console.error(error);
  }
  selectDiv.style.visibility = 'visible';
});
