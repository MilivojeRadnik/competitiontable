const rows = document.querySelectorAll('.table tbody tr');
rows.forEach((row) => {
  row.addEventListener('click', () => {
    location.assign(
      window.location.protocol +
        `/players/${row.cells[1].textContent}?player=${row.id}`
    );
  });
});

let clickHandler = function () {
  location.href = window.location.protocol + '/customselect';
};
