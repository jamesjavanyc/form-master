const StrUtils = {}

StrUtils.check_str_contains_symbol = (str) =>{
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
    if (pattern.test(str)) {
        return true;
    }
    return false;
}

module.exports = StrUtils