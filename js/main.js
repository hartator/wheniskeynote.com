const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const start = new Date(`${EVENT_MONTH}/${EVENT_DAY}/${EVENT_YEAR} ${EVENT_HOUR}:${EVENT_MINUTE} ${EVENT_TIMEZONE}`);
const end = new Date(start.getTime() + EVENT_DURATION);

let timer;
let now = new Date();
let distance = start - now;

const $statusActive = document.getElementById('status-active');
const $eventName = document.getElementById('event-name');
const $localtime = document.getElementById('localtime');
const $days = document.getElementById('days');
const $hours = document.getElementById('hours');
const $minutes = document.getElementById('minutes');
const $seconds = document.getElementById('seconds');

const $statusInactive = document.getElementById('status-inactive');

$eventName.innerText = EVENT_NAME;
$localtime.innerText = `${DAY_NAMES[start.getDay()]}, ${MONTH_NAMES[start.getMonth()]} ${start.getDate()} at ${`0${start.getHours()}`.slice(-2)}:${`0${start.getMinutes()}`.slice(-2)}`;
$localtime.dateTime = start.toISOString();

const updateCounter = () => {
  now = new Date();
  distance = start - now;

  if (distance < -EVENT_DURATION) {
    $statusActive.style.display = 'none';
    $statusInactive.style.display = 'block';
    clearInterval(timer);
    return;
  }

  $statusActive.style.display = 'block';
  $statusInactive.style.display = 'none';

  if (distance < 0) {
    $days.innerText = '00';
    $hours.innerText = '00';
    $minutes.innerText = '00';
    $seconds.innerText = '00';
    setTimeout(updateCounter, (-distance / 1000) | 0);
  }

  const seconds = Math.floor(distance / 1000) % 60;
  const minutes = Math.floor(distance / 1000 / 60) % 60;
  const hours = Math.floor(distance / 1000 / 60 / 60) % 60;
  const days = Math.floor(distance / 1000 / 60 / 60 / 24);

  if (days > 100) {
    $days.innerText = `${days}`;
  } else {
    $days.innerText = `0${days}`.slice(-2);
  }
  $hours.innerText = `0${hours}`.slice(-2);
  $minutes.innerText = `0${minutes}`.slice(-2);
  $seconds.innerText = `0${seconds}`.slice(-2);
};

const createCalendar = (title, startDate, endDate) => {
  const startTime = startDate.toISOString().replace(/-|:|\.\d+/g, '');
  const endTime = endDate.toISOString().replace(/-|:|\.\d+/g, '');
  const href = encodeURI(
    'data:text/calendar;charset=utf8,' + [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'URL:' + document.URL,
      'DTSTART:' + (startTime || ''),
      'DTEND:' + (endTime),
      'SUMMARY:' + (title || ''),
      'DESCRIPTION:' + (''),
      'LOCATION:' + (''),
      'END:VEVENT',
      'END:VCALENDAR'].join('\n')
  );

  const $link = document.createElement('a');
  $link.href = href;
  $link.innerHTML = '<img class="ics" src="./images/cal.svg" alt="" />';
  $localtime.append($link);
};

updateCounter();
timer = setInterval(updateCounter, 1000);
createCalendar(EVENT_NAME, start, end);
