const dateInfoWrap = document.querySelector("#date-info-wrap");
const clockDate = dateInfoWrap.querySelector("#clock-wrap .date");
const clockTime = dateInfoWrap.querySelector("#clock-wrap .time");

const dateMainMonth = dateInfoWrap.querySelector("#date-main-wrap .month");
const dateMainDay = dateInfoWrap.querySelector("#date-main-wrap .day");
const dateMainDayOfWeek = dateInfoWrap.querySelector("#date-main-wrap .day-of-week");

const calendarMonth = dateInfoWrap.querySelector("#calendar-wrap .month");
const calendar = dateInfoWrap.querySelector("#calendar-wrap .calendar");
const calendarTemplate = dateInfoWrap.querySelector("#calendar-wrap .template.calendar");
const calendarWeekTemplate = calendarTemplate.querySelector("#calendar-wrap .template.week-wrap");

const strMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getClock() {
    const now = new Date()
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const dayOfWeek = now.getDay();
    
    const monthNumStr = String(month).padStart(2, "0");
    const dayNumStr = String(day).padStart(2, "0");
    const hourNumStr = String(hour).padStart(2, "0");
    const minNumStr = String(min).padStart(2, "0");
    const secNumStr = String(sec).padStart(2, "0");

    const monthStr = strMonths[month];
    const dayOfWeekStr = weekDays[dayOfWeek];
    
    // clock
    clockDate.innerText = `${year}.${monthNumStr}.${dayNumStr}`;
    clockTime.innerText = `${hourNumStr}:${minNumStr}:${secNumStr}`;

    // date main
    dateMainMonth.innerText = monthStr;
    dateMainDay.innerText = day;
    dateMainDayOfWeek.innerText = dayOfWeekStr
    if(dayOfWeek == 0 || dayOfWeek == 6) dateMainDayOfWeek.classList.add(DAY_OFF_CLASSNAME);

    // calendar
    drawCalendar(now)
}

function drawCalendar(now) {
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month+1, 0);
    const monthDayCount = monthEnd.getDate();
    const monthStartWeekIdx = monthStart.getDay();
    const monthStr = strMonths[month];


    const newCalendar = calendarTemplate.cloneNode(true);
    newCalendar.classList.remove(TEMPLATE_CLASSNAME);
    
    const newCalendarTbody = newCalendar.querySelector("tbody");

    let dayCount = 0;
    while(dayCount < monthDayCount) {
        const newWeek = calendarWeekTemplate.cloneNode(true);
        newWeek.classList.remove(TEMPLATE_CLASSNAME);
        
        for (const [idx, td] of newWeek.querySelectorAll("td").entries()){
            const day = dayCount+1;
            if(dayCount == 0 && idx != monthStartWeekIdx) continue;
            if(dayCount >= monthDayCount) break;
            if(day == today) td.classList.add(TODAY_CLASSNAME);
            td.innerText = day;
            dayCount += 1;
        }
        
        newCalendarTbody.appendChild(newWeek);
    }

    calendarMonth.innerText = `${monthStr} ${year}`;
    calendar.innerHTML = newCalendar.outerHTML;
}



getClock();
setInterval(getClock, 1000);