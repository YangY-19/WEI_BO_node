/**
 * @description 获取时间
 * @author YangY
 */
function getNowDate() {
    var str = "";
    var weekList = ["日", "一", "二", "三", "四", "五", "六"];
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var week = date.getDay();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    month = month > 10 ? month : "0" + month;
    day = day > 10 ? day : "0" + day;
    seconds = seconds > 10 ? seconds : "0" + seconds;
    minutes = minutes > 10 ? minutes : "0" + minutes;
    hours = hours > 10 ? hours : "0" + hours;
    str += year + "年" + month + "月" + day + "日" + hours + ":" + minutes + ":" + seconds;
    return str;
}

module.exports = {
    getNowDate
}