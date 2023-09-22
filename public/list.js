const listItems = document.querySelectorAll('.name-list li');
listItems.forEach((item) => {
  item.addEventListener('click', () => {
    location.assign(
      window.location.protocol + `/admin/${item.getAttribute('value').slice(1)}`
    );
  });
});
