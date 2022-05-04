function Solution(S, K) {
    let days = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ]

    let sIndex = days.indexOf(S);
    let finalIndex = (sIndex +(K%7))%7;
    return days[finalIndex]; 
}