class Timer {
  constructor() {
    this.now = null;
    this.date = null;
    this.startTimer = null;

    this.dateInput = document.querySelector("#date-input");
    this.clockDay = document.querySelector(".clock-day");
    this.clockHours = document.querySelector(".clock-hours");
    this.clockMinutes = document.querySelector(".clock-minutes");
    this.clockSeconds = document.querySelector(".clock-seconds");

    this.loadEventListeners();
  }

  updateTimer(date) {
    const now = this.convertDateToUTC(new Date()).getTime();
    const { days, hours, minutes, seconds } = this.dateHandler(date, now);

    this.setTimer(days, hours, minutes, seconds);

    if (now >= date) {
      clearInterval(this.startTimer);
      this.setTimer("D", "O", "N", "E");
    }
  }

  setTimer(days, hours, minutes, seconds) {
    this.clockDay.innerHTML = days;
    this.clockHours.innerHTML = hours;
    this.clockMinutes.innerHTML = minutes;
    this.clockSeconds.innerHTML = seconds;
  }

  dateHandler(date, now) {
    const distance = date - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(distance / day);
    const hours = `0${Math.floor((distance % day) / hour)}`.slice(-2);
    const minutes = `0${Math.floor((distance % hour) / minute)}`.slice(-2);
    const seconds = `0${Math.floor((distance % minute) / second)}`.slice(-2);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  createTimer(date) {
    this.startTimer = setInterval(() => {
      this.updateTimer(date);
    }, 1000);
  }

  calculateTime(dates) {
    clearInterval(this.startTimer);

    if (dates) {
      this.date = new Date(`${dates}:00:00:00Z`).getTime();
      this.createTimer(this.date);
    }
  }

  loadEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.calculateTime();
    });

    this.dateInput.addEventListener("change", (event) => {
      this.calculateTime(event.target.value);
    });
  }

  convertDateToUTC(date) {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );
  }
}

export default Timer;
