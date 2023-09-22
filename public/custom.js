document.addEventListener('DOMContentLoaded', function () {
  const seasonSelect = document.getElementById('season-select');
  const nameSelect = document.getElementById('name-select');
  const dateInputContainer = document.getElementById('date-input-container');
  const dateInput = document.getElementById('date-input');
  const resultContainer = document.getElementById('result-container');
  let state = {
    player: null,
    season: null,
    date: new Date().toJSON().slice(0, 10),
  };

  seasonSelect.addEventListener('change', function () {
    resultContainer.innerHTML = '';
    const selectedValue = this.value;

    if (selectedValue === 'select-date') {
      dateInputContainer.classList.remove('hidden');
      state.season = null;
      state.date = new Date().toJSON().slice(0, 10);
      console.log(state);
      showData();
    } else {
      dateInputContainer.classList.add('hidden');
      state.date = null;
      state.season = selectedValue;
      console.log(state);

      showData();
    }
  });

  nameSelect.addEventListener('change', function () {
    const selectedValue = this.value != 'table' ? this.value : null;
    state.player = selectedValue;
    console.log(state);

    showData();
  });

  const nextDate = document.getElementById('next-date-btn');
  const prevDate = document.getElementById('prev-date-btn');

  dateInput.addEventListener('change', function () {
    // Handle date input change event
    const selectedDate = this.value;
    state.date = selectedDate;
    console.log(state);

    showData();
  });

  nextDate.addEventListener('click', function () {
    let date = Date.parse(dateInput.value);
    date = new Date(date + 86400000);
    date = date.toISOString().split('T')[0];
    dateInput.value = date;
    state.date = date;
    console.log(state);

    showData();
  });

  prevDate.addEventListener('click', function () {
    let date = Date.parse(dateInput.value);
    date = new Date(date - 86400000);
    date = date.toISOString().split('T')[0];
    dateInput.value = date;
    state.date = date;
    console.log(state);

    showData();
  });

  let table = `<table class="table">
                <thead>
                  <tr>
                    <th>Rbr.</th>
                    <th>Name</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <% let counter = 1 %> <% for (let i = 0; i < data.length; i++) { %>
                  <tr id="<%= data[i].player_id %>">
                    <td><%= counter %>.</td>
                    <td><%= data[i].name %></td>
                    <td><%= data[i].points %></td>
                  </tr>
                  <% counter++ %> <% } %>
                </tbody>
              </table>`;

  let list = `<ul class="element-list">
              <% for (let i = 0; i < data.length; i++) { %>
              <li>
                <div class="card">
                  <div class="label"><%= data[i].label %></div>
                  <div class="info">
                    <div class="points">Points: <%= data[i].points %></div>
                    <div class="date">Date: <%= data[i].played_at %></div>
                    <% if(data[i].thrown_at !== null && ( locals.date === undefined || data[i].thrown_at <= locals.date ) ) { %>
                      </div>
                      <br />
                      <div class="info red">
                        <div class="points">THROWN!!</div>
                        <div class="date">Date: <%= data[i].thrown_at %></div>
                    <% } %>
                  </div>
                </div>
              </li>
              <% } %>
              </ul>`;

  let showData = async function () {
    if (state.player === null && state.season !== null && state.date === null) {
      try {
        let response = await fetch(
          window.location.protocol + `/api/gettable?season=${state.season}`
        );
        response = await response.json();
        console.log(response);
        let html = ejs.render(table, { data: response });
        resultContainer.innerHTML = html;
      } catch (error) {
        console.error(error);
      }
    } else if (
      state.player === null &&
      state.season === null &&
      state.date !== null
    ) {
      try {
        let response = await fetch(
          window.location.protocol + `/api/gettable?date=${state.date}`
        );
        response = await response.json();
        console.log(response);
        let html = ejs.render(table, { data: response });
        resultContainer.innerHTML = html;
      } catch (error) {
        console.error(error);
      }
    } else if (
      state.player !== null &&
      state.season !== null &&
      state.date === null
    ) {
      try {
        let response = await fetch(
          window.location.protocol +
            `/api/getplayeractions?player=${state.player}&season=${state.season}`
        );
        response = await response.json();
        response.forEach((obj) => {
          const [pyear, pmonth, pday] = obj.played_at.split('-');
          const formattedPlayedAt = `${pday}.${pmonth}.${pyear}`;
          obj.played_at = formattedPlayedAt;

          if (obj.thrown_at !== null) {
            const [tyear, tmonth, tday] = obj.thrown_at
              .split('T')[0]
              .split('-');
            const formattedThrownAt = `${tday}.${tmonth}.${tyear}`;
            obj.thrown_at = formattedThrownAt;
          }
        });
        console.log(response);
        let html = ejs.render(list, { data: response, locals: {} });
        resultContainer.innerHTML = html;
      } catch (error) {
        console.error(error);
      }
      // lista u sezoni
    } else if (
      state.player !== null &&
      state.season === null &&
      state.date !== null
    ) {
      try {
        let response = await fetch(
          window.location.protocol +
            `/api/getplayeractions?player=${state.player}&date=${state.date}`
        );
        response = await response.json();
        response.forEach((obj) => {
          const [pyear, pmonth, pday] = obj.played_at.split('-');
          const formattedPlayedAt = `${pday}.${pmonth}.${pyear}`;
          obj.played_at = formattedPlayedAt;

          if (obj.thrown_at !== null) {
            const [tyear, tmonth, tday] = obj.thrown_at
              .split('T')[0]
              .split('-');
            const formattedThrownAt = `${tday}.${tmonth}.${tyear}`;
            obj.thrown_at = formattedThrownAt;
          }
        });
        console.log(response);
        let html = ejs.render(list, {
          data: response,
          locals: { date: state.date.split('-').reverse().join('.') },
        });
        resultContainer.innerHTML = html;
      } catch (error) {
        console.error(error);
      }
      // lista na datum
    } else state = { player: null, season: null, date: null };
  };
});
