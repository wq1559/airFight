/**
 * 格式化时间
 *
 * @param {String} str
 * @returns 格式化后返回年月日时分秒
 */
export const dateTimeFormat = (value, type) => {
  if (!value) {
    return ""
  } else {
    value = parseFloat(value)
    let date = new Date(value); //value为时间戳
    let Y = date.getFullYear() + '-'; //年
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'; //月
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); //日 + ' '; //日
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'; //时
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'; //分
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); //秒
    if (type === 1) {
      return D + '/' + M.replace('-', '/') + Y.replace('-', '') + " " + h + m + s; // 7/12/2016 16:0:12
    } else if (type === 2) {
      return D + '/' + M.replace('-', '/') + Y.replace('-', '') // 7/12/2016 
    } else if (type === 3) {
      return h + m.replace(":", '') //16:0
    } else if (type === 4) {
      return D + '/' + M.replace('-', '/') + Y.replace('-', '') + ' ' + h + m.replace(":", '') // 7/12/2016 
    } else if (type === 5) {
      return Y + M + D;
    } else if (type === 6) {
      return D + '/' + M.replace('-', '/') + Y.replace('-', '') + " " + h + m.replace(":", '');
    } else if (type === 7) {
      return h + m + s + " " + D + '/' + M.replace('-', '/') + Y.replace('-', '')
    } else if (type === 8) {
      return Y + M + D + " " + h + m + s; // 7/12/2016 16:0:12
    }
    else {
      //return Y + M + D + " " + h + m + s; // 2016-12-7 16:0:12
      return D + '/' + M.replace('-', '/') + Y.replace('-', '') + " " + h + m + s; // 7/12/2016 16:0:12
    }
  }

}

export const timeCdd = (value) => {

  if (!value) return ''
  let date = new Date(value); //历史
  let currentDate = new Date(); //当前
  //let time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）

  let Y = date.getFullYear() + '/'; //年
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'; //月
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); //日


  let cY = currentDate.getFullYear() + '/'; //当前 年
  let cM = (currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1) + '/'; //当前 月
  let cD = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate(); + ' '; //当前 日


  let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'; //时
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); //分
  //let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); //秒



  let CYMD = cY + cM + cD;
  let YMD = Y + M + D;


  //判断是否是当天
  if (CYMD == YMD) {
    return h + m;
  } else if ((date.getDate() + 1) == currentDate.getDate()) {

    return "昨天";

  } else if ((date.getFullYear() + 1) == currentDate.getFullYear()) {
    //昨年
    return YMD; //年月日

  } else {
    return M + D; //月日
  }

}


/**
 * 毫秒转化为小时
 * 用法 truncate(50,"...")
 */
export const formatSeconds = (value) => {
  return (value / 1000 / 60 / 60).toFixed(2);
}


/**
 * 截取字符串
 * 用法 truncate(50,"...")
 */
export const truncate = (value, length, ellipses) => {
  if (!value) {
    return ''
  }

  length = length || 30;

  if (ellipses === undefined) {
    ellipses = '...';
  }

  value = value.toString();

  if (value.length < length) {
    return value;
  } else {
    return value.slice(0, length) + ellipses;
  }


}


export const fmoney = (value, n) => {
  /**
   * 钱后面加两位小数 | fmoney(2),2代码位数
   * fmoney
   */
  if (!value) return '0.00';
  n = n > 0 && n <= 20 ? n : 2;
  value = parseFloat((value + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = value.split(".")[0].split("").reverse(),
    r = value.split(".")[1];
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
  }
  return t.split("").reverse().join("") + "." + r;
}


export const dateFormatEnglish = (value, type) => {
  if (!value) {
    return ""
  };
  let date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let week = date.getDay();
  let weeks = "";
  let months = "";
  if (week === 1) {
    weeks = "Mon";
  } else if (week === 2) {
    weeks = "Tue";
  } else if (week === 3) {
    weeks = "Wed";
  } else if (week === 4) {
    weeks = "Thu";
  } else if (week === 5) {
    weeks = "Fri";
  } else if (week === 6) {
    weeks = "Sat";
  } else if (week === 0) {
    weeks = "Sun";
  };
  if (month === 1) {
    months = "Jan";
  } else if (month === 2) {
    months = "Feb";
  } else if (month === 3) {
    months = "Mar";
  } else if (month === 4) {
    months = "Apr";
  } else if (month === 5) {
    months = "May";
  } else if (month === 6) {
    months = "Jun";
  } else if (month === 7) {
    months = "Jul";
  } else if (month === 8) {
    months = "Aug";
  } else if (month === 9) {
    months = "Sep";
  } else if (month === 10) {
    months = "Oct";
  } else if (month === 11) {
    months = "Nov";
  } else if (month === 12) {
    months = "Dec";
  }

  if (!type) {
    return `${months} ${day},${year},${weeks}`;
  } else if (type == 1) {
    return `${weeks}, ${day} ${months}`
  } else if (type == 2) {
    return `${day} ${months} ${year}`
  } else if (type == 3) {
    return `${day} ${months}` //12 Apr
  } else if (type == 4) {
    return `${day}` //12 
  } else if (type == 5) {
    return `${year}` //2019
  } else if (type == 6) {
    return `${months}` //july
  } else if (type == 7) {
    return `${months} ${year}` //july、 2019
  }
}

export const monthFormatEnglish = (month) => {
  let months = ""
  if (month === 1) {
    months = "Jan";
  } else if (month === 2) {
    months = "Feb";
  } else if (month === 3) {
    months = "Mar";
  } else if (month === 4) {
    months = "Apr";
  } else if (month === 5) {
    months = "May";
  } else if (month === 6) {
    months = "Jun";
  } else if (month === 7) {
    months = "Jul";
  } else if (month === 8) {
    months = "Aug";
  } else if (month === 9) {
    months = "Sep";
  } else if (month === 10) {
    months = "Oct";
  } else if (month === 11) {
    months = "Nov";
  } else if (month === 12) {
    months = "Dec";
  }
  return `${months}`;
}

export const formatQian = (num) => {
  num = Math.round(num)
  return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}