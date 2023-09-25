const EasyCronGenerator = (function() {
    var modeSelectElement = document.createElement('select');
    var weekdaySelectElement = document.createElement('select');
    var monthdaySelectElement = document.createElement('select');
    var hourSelectElement = document.createElement('select');
    var minuteSelectElement = document.createElement('select');
  
    var modeLabelElement = document.createElement('label');
    var weekdayLabelElement = document.createElement('label');
    var monthdayLabelElement = document.createElement('label');
    var hourLabelElement = document.createElement('label');
    var minuteLabelElement = document.createElement('label');
  
    var container;
    var options;
  
    const locale = {
      "modes.label.day": {
        "en": "Every ",
        "tr": "Her "
      },
      "modes.label.week": {
        "en": "Every ",
        "tr": "Her "
      },
      "modes.label.month": {
        "en": "Every ",
        "tr": "Her "
      },
      "hour.label.day": {
        "en": " at ",
        "tr": " saat "
      },
      "hour.label.week": {
        "en": " at ",
        "tr": " günü saat "
      },
      "hour.label.month": {
        "en": " at ",
        "tr": " günü saat "
      },
      "minute.label.day": {
        "en": ":",
        "tr": ":"
      },
      "minute.label.week": {
        "en": ":",
        "tr": ":"
      },
      "minute.label.month": {
        "en": ":",
        "tr": ":"
      },
      "weekday.label.day": {
        "en": "",
        "tr": ""
      },
      "weekday.label.week": {
        "en": " on ",
        "tr": ""
      },
      "weekday.label.month": {
        "en": "",
        "tr": ""
      },
      "monthday.label.day": {
        "en": "",
        "tr": ""
      },
      "monthday.label.week": {
        "en": "",
        "tr": ""
      },
      "monthday.label.month": {
        "en": " on the ",
        "tr": " ın "
      },
      "modes.value.day": {
        "en": "day",
        "tr": "gün"
      },
      "modes.value.week": {
        "en": "week",
        "tr": "hafta"
      },
      "modes.value.month": {
        "en": "month",
        "tr": "ay"
      },
      "weekday.value.sunday": {
        "en": "Sunday",
        "tr": "Pazar"
      },
      "weekday.value.monday": {
        "en": "Monday",
        "tr": "Pazartesi"
      },
      "weekday.value.tuesday": {
        "en": "Tuesday",
        "tr": "Salı"
      },
      "weekday.value.wednesday": {
        "en": "Wednesday",
        "tr": "Çarşamba"
      },
      "weekday.value.thursday": {
        "en": "Thursday",
        "tr": "Perşembe"
      },
      "weekday.value.friday": {
        "en": "Friday",
        "tr": "Cuma"
      },
      "weekday.value.saturday": {
        "en": "Saturday",
        "tr": "Cumartesi"
      },
      "monthday.values": {
        "en": [
          "1st",
          "2nd",
          "3rd",
          "4th",
          "5th",
          "6th",
          "7th",
          "8th",
          "9th",
          "10th",
          "11th",
          "12th",
          "13th",
          "14th",
          "15th",
          "16th",
          "17th",
          "18th",
          "19th",
          "20th",
          "21st",
          "22nd",
          "23rd",
          "24th",
          "25th",
          "26th",
          "27th",
          "28th",
          "29th",
          "30th",
          "31st"
        ],
        "tr": [
          "1.",
          "2.",
          "3.",
          "4.",
          "5.",
          "6.",
          "7.",
          "8.",
          "9.",
          "10.",
          "11.",
          "12.",
          "13.",
          "14.",
          "15.",
          "16.",
          "17.",
          "18.",
          "19.",
          "20.",
          "21.",
          "22.",
          "23.",
          "24.",
          "25.",
          "26.",
          "27.",
          "28.",
          "29.",
          "30.",
          "31.",
        ]
      }
  
    }
  
    const _localize = function(key) {
      let language = "en"
      let dict = locale;
  
      if (options && options.locale) {
        dict = options.locale;
      }
  
      if (options && options.language) {
        language = options.language;
      }
  
      return dict[key][language];
  
    }
  
    const _renderFields = function(mode) {
      // Clear wrapper
      container.innerHTML = '';
  
      modeSelectElement.value = mode;
      modeLabelElement.innerText = _localize(`modes.label.${mode}`);
      hourLabelElement.innerText = _localize(`hour.label.${mode}`);
      minuteLabelElement.innerText = _localize(`minute.label.${mode}`);
      weekdayLabelElement.innerText = _localize(`weekday.label.${mode}`);
      monthdayLabelElement.innerText = _localize(`monthday.label.${mode}`);
  
      switch (mode) {
        case 'day':
          container.appendChild(modeLabelElement);
          container.appendChild(modeSelectElement);
          container.appendChild(hourLabelElement);
          container.appendChild(hourSelectElement);
          container.appendChild(minuteLabelElement);
          container.appendChild(minuteSelectElement);
          break;
        case 'week':
          container.appendChild(modeLabelElement);
          container.appendChild(modeSelectElement);
          container.appendChild(weekdayLabelElement);
          container.appendChild(weekdaySelectElement);
          container.appendChild(hourLabelElement);
          container.appendChild(hourSelectElement);
          container.appendChild(minuteLabelElement);
          container.appendChild(minuteSelectElement);
          break;
        case 'month':
          container.appendChild(modeLabelElement);
          container.appendChild(modeSelectElement);
          container.appendChild(monthdayLabelElement);
          container.appendChild(monthdaySelectElement);
          container.appendChild(hourLabelElement);
          container.appendChild(hourSelectElement);
          container.appendChild(minuteLabelElement);
          container.appendChild(minuteSelectElement);
          break;
      }
  
      modeSelectElement.addEventListener('change', onModeChange);
      hourSelectElement.addEventListener('change', _calculateCronExpression);
      minuteSelectElement.addEventListener('change', _calculateCronExpression);
      weekdaySelectElement.addEventListener('change', _calculateCronExpression);
      monthdaySelectElement.addEventListener('change', _calculateCronExpression);
      _calculateCronExpression();
    }
  
    const onModeChange = function() {
      _renderFields(modeSelectElement.value);
      _calculateCronExpression();
    }
  
    const _calculateCronExpression = function() {
      let cron = ['*', '*', '*', '*', '*'];
      switch (modeSelectElement.value) {
        case 'day':
          cron[0] = minuteSelectElement.value;
          cron[1] = hourSelectElement.value;
          break;
        case 'week':
          cron[0] = minuteSelectElement.value;
          cron[1] = hourSelectElement.value;
          cron[4] = weekdaySelectElement.value;
          break;
        case 'month':
          cron[0] = minuteSelectElement.value;
          cron[1] = hourSelectElement.value;
          cron[2] = monthdaySelectElement.value;
          break;
      }
  
      _calculationCallback(cron.join(' '));
  
    }
  
    const _calculationCallback = function(cronExpression) {
      let valueInputElement = document.querySelector(options.valueInputSelector);
      valueInputElement.value = cronExpression;
      options.callbackFunction(cronExpression);
    }
  
    const init = function(selector, _options = null) {
  
      container = document.querySelector(selector);
      options = _options

      modeSelectElement.innerHTML = '';
      weekdaySelectElement.innerHTML = '';
      monthdaySelectElement.innerHTML = '';
      hourSelectElement.innerHTML = '';
      minuteSelectElement.innerHTML = '';
  
      modeLabelElement.innerHTML = '';
      weekdayLabelElement.innerHTML = '';
      monthdayLabelElement.innerHTML = '';
      hourLabelElement.innerHTML = '';
      minuteLabelElement.innerHTML = '';
  
      modes = ["day", "week", "month"]
      for (let i = 0; i < modes.length; i++) {
        let optionElement = document.createElement('option');
        optionElement.text = _localize(`modes.value.${modes[i]}`);
        optionElement.value = modes[i];
        modeSelectElement.appendChild(optionElement);
      }
  
      weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  
      for (let i = 0; i < weekdays.length; i++) {
        let optionElement = document.createElement('option');
        optionElement.text = _localize(`weekday.value.${weekdays[i]}`);
        optionElement.value = i;
        weekdaySelectElement.appendChild(optionElement);
      }
  
      monthdays = _localize('monthday.values')
  
      for (let i = 0; i < monthdays.length; i++) {
        let optionElement = document.createElement('option');
        optionElement.text = monthdays[i];
        optionElement.value = i + 1;
        monthdaySelectElement.appendChild(optionElement);
      }
  
      for (let i = 0; i < 24; i++) {
        let optionElement = document.createElement('option');
        optionElement.text = i.toString().padStart(2, "0");
        optionElement.value = i;
        hourSelectElement.appendChild(optionElement);
      }
  
      for (let i = 0; i < monthdays.length; i++) {
        let optionElement = document.createElement('option');
        optionElement.text = i.toString().padStart(2, "0");
        optionElement.value = i;
        minuteSelectElement.appendChild(optionElement);
      }
  
      if (options && options.selectClasses) {
        modeSelectElement.classList = options.selectClasses;
        hourSelectElement.classList = options.selectClasses;
        minuteSelectElement.classList = options.selectClasses;
        weekdaySelectElement.classList = options.selectClasses;
        monthdaySelectElement.classList = options.selectClasses;
      }
  
      _renderFields("day");
  
    };
  
    return {
      init: init,
    };
  })();