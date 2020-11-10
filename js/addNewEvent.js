/* --------------------------
* UPDATE UPCOMING EVENT DATE
* --------------------------
*
* IMPORTANT: The date has to be in the Pacific Standard Time (PST) zone
*
*/
const
  // Format: YYYY (2020)
  EVENT_YEAR = 2020,
  // Format: MM (09) or M (9), both are valid
  EVENT_MONTH = 11,
  // Format: DD (09) or D (9), both are valid
  EVENT_DAY = 10
  // Format: 0 - 24 / 5 == 5 AM / 17 == 5 PM
  EVENT_HOUR = 10,
  // Format: MM (09) or M (9), both are valid
  EVENT_MINUTE = 00,
  // Format: milliseconds
  EVENT_DURATION = 2 * 60 * 60 * 1000; // 2 hours

/* --------------------------
* UPDATE UPCOMING EVENT NAME
* --------------------------
*/
const EVENT_NAME = 'One more thing';
