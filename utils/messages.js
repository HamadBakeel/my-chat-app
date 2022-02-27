const moment = requier('moment');
// import {moment} from moment;
function formatMessage(userName,text){
    return{
        userName,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;