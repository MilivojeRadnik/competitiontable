const listItems = document.querySelectorAll('.name-list li');
listItems.forEach((item) => {
  item.addEventListener('click', () => {
    location.assign(
      `http://localhost:3000/admin/${item.getAttribute('value').slice(1)}`
    );
  });
});
