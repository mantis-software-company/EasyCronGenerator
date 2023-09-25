# Easy Cron Generator

Easy Cron Generator is a library for scheduling tasks on a daily, weekly, or monthly basis through a simple, user-friendly graphical interface. 
It provides the cron expression format for scheduling tasks with an external scheduler.

With simplicity, themeability and localization in mind, the code is written using plain vanilla JavaScript and no CSS. This library currently supports only the English and Turkish languages, but it is possible to localize it to your needs. However, you can feel free to add your own language to the library and send PR.  

## Usage

Just insert `EasyCron.js` or `EasyCron.min.js` to `<head>` tag, add container div for graphical interface and init library using: 

```js
EasyCronGenerator.init('#crongui', {
    language: "en",
    selectClasses: "cron-select",
    valueInputSelector: "#myInput",
    callbackFunction: printCron
});
```


### Options

- **valueInputSelector**: _CSS selector of input/hidden input for storing cron-expression_
    
    Required

    **Type:** String

- **callbackFunction**: _Function which will call on value changes_

     Required

     **Type:** Function 

     **Function arguments:** `cronExpression (String)`

- **language**: _Language of graphical interface_
 
    Optional 
    
    **Type:** String 
    
    **Default value:** "en"

    **Possible values:** "en" or "tr"


- **selectClasses**: _HTML classes of select boxes_

    Optional
    
    **Type:** String. _Add space between classes if you want add multiple classes_

    **Default value:** ""

- **locale**: _Custom localization language. Used as localization dictionary if defined._

    Optional

    **Type:** Object

    **Default value:** 
    ```js
    {
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
    ```