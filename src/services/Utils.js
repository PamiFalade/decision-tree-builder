const formatDateTime = (date) => {
    var dateObject = new Date(date);

    var month = dateObject.toLocaleString('default', {month: 'long'});
    var time = dateObject.toLocaleTimeString();

    var formattedDateTime = `${month} ${dateObject.getDate()}, ${dateObject.getFullYear()}, ${time}`;
    return formattedDateTime;
}


export { formatDateTime };