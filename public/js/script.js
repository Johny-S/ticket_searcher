const button = document.getElementById('fetchTicket');
const form = document.getElementById('dataForm');

button.addEventListener('click', async e => {
  e.preventDefault();
  const date = `date=${form.date.value}`;
  const from = `&from=${form.from.value}`;
  const to = `&to=${form.to.value}`;
  let resp = await fetch(`http://localhost:3101/getTicket?${date}${from}${to}`);

  let json = await resp.json();
  fill(json.segments);
});

const fill = stations => {
  const getDate = str =>
    `${str.slice(8, 10)}.${str.slice(5, 7)}.${str.slice(0, 4)}`;
  const getTime = str => str.slice(11, 16);
  const getDuration = num => `${~~(num / 3600)} ч. ${(num % 3600) / 60} мин.`;

  const addLine = (trains, parent) => {
    let str = ``;
    str += `<div class="coll-1">${trains.thread.number}</div>`;
    str += `<div class="coll-2">${getTime(trains.departure)}</div>`;
    str += `<div class="coll-3">${getTime(trains.arrival)} / ${getDate(
      trains.arrival
    )}</div>`;
    str += `<div class="coll-4">${getDuration(trains.duration)}</div>`;
    parent.innerHTML += str;
  };

  const parent = document.querySelector('.line-data');
  parent.innerHTML = '';

  stations.forEach(el => {
    addLine(el, parent);
  });
};
