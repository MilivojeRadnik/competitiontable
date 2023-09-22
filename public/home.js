const rows = document.querySelectorAll('.table tbody tr');
rows.forEach((row) => {
  row.addEventListener('click', () => {
    location.assign(
      `http://localhost:3000/players/${row.cells[1].textContent}?player=${row.id}`
    );
  });
});

let clickHandler = function () {
  location.href = 'http://localhost:3000/customselect';
};
