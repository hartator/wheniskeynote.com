let start = new Date(month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ' GMT-0700'),
    end = new Date(month + '/' + day + '/' + year + ' ' + (hour+2) + ':' + minute + ' GMT-0700'),
    now = new Date(),
    distance = start - now,
    _second = 1000,
    _minute = _second * 60,
    _hour = _minute * 60,
    _day = _hour * 24,
    timer;

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      eventHtml = '<h2><a href="https://www.apple.com/apple-events/" target="_blank">' + eventName + '</a></h2><h3 id="dark">In your time zone, this event will be held on:</h3><div id="localtime">' + dayNames[start.getDay()] + ', ' + monthNames[start.getMonth()] + ' ' + start.getDate() + ' at ' + ("0" + start.getHours()).slice(-2) + ':' + ("0" + start.getMinutes()).slice(-2) + '</div><h4 id="dark">Time remaining:</h4><div id="countdown" class="countdown"><div class="col col1 days"><span id="days" class="ce-days time-cont"></span><span class="ce-days-label">Days</span></div><div class="col col2"><span id="hours" class="ce-hours time-cont"></span><span class="ce-hours-label">Hours</span></div><div class="col col3"><span id="minutes" class="ce-minutes time-cont"></span><span class="ce-minutes-label">Minutes</span></div><div class="col col4"><span id="seconds" class="ce-seconds time-cont"></span><span class="ce-seconds-label">Seconds</span></div>';

// 7200000 = 2 hours
if (distance < -7200001) {
  $('#response').append('<h2>No event confirmed at this time :(</h2>');
} else if (distance > -7200000 && distance < 0) {
  $('#response').append(eventHtml);
  $('#days').html('00');
  $('#hours').html('00');
  $('#minutes').html('00');
  $('#seconds').html('00');
} else {
  $('#response').append(eventHtml);
  timer = setInterval(showRemaining, 1000);
}

createCalendar(eventName, start, end);

function showRemaining() {
  let now = new Date(),
      distance = start - now;

  if (distance < 0) {
    clearInterval(timer);
    return;
  }
  let days = Math.floor(distance / _day),
      hours = Math.floor((distance % _day) / _hour),
      minutes = Math.floor((distance % _hour) / _minute),
      seconds = Math.floor((distance % _minute) / _second);

console.log(days / 100)

  if(days / 100 < 1) {
    $('#days').html(("0" + days).slice(-2));
  } else {
    $('#days').html(("0" + days).slice(-3));
  }
  $('#hours').html(("0" + hours).slice(-2));
  $('#minutes').html(("0" + minutes).slice(-2));
  $('#seconds').html(("0" + seconds).slice(-2));
}

function createCalendar(title, startDate, endDate) {
  let startTime = startDate.toISOString().replace(/-|:|\.\d+/g, '');
  let endTime = endDate.toISOString().replace(/-|:|\.\d+/g, '');
  let href = encodeURI(
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

  $("#localtime").append('<a href="' + href + '"><img class="ics" src="./images/cal.svg" alt=""/></a>');
}
