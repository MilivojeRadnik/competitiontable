document.addEventListener('DOMContentLoaded', function () {
  const seasonSelect = document.getElementById('season-select');
  const dateInputContainer = document.getElementById('date-input-container');
  const dateInput = document.getElementById('date-input');

  seasonSelect.addEventListener('change', function () {
    const selectedValue = this.value;

    if (selectedValue === 'select-date') {
      dateInputContainer.classList.remove('hidden');
    } else {
      dateInputContainer.classList.add('hidden');
    }
  });

  const nextDate = document.getElementById('next-date-btn');
  const prevDate = document.getElementById('prev-date-btn');

  dateInput.addEventListener('change', function () {
    // Handle date input change event
    const selectedDate = this.value;
    console.log('Selected date:', selectedDate);
  });

  nextDate.addEventListener('click', function () {
    let date = Date.parse(dateInput.value);
    date = new Date(date + 86400000);
    date = date.toISOString().split('T')[0];
    dateInput.value = date;
  });

  prevDate.addEventListener('click', function () {
    let date = Date.parse(dateInput.value);
    date = new Date(date - 86400000);
    date = date.toISOString().split('T')[0];
    dateInput.value = date;
  });
});
