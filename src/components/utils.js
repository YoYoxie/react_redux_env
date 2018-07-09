export function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function';
    }
}

export function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 15 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

export function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

export function setLeaf(treeData, level) {
    const loopLeaf = (data, lev) => {
        const l = lev - 1;
        data.forEach((item) => {
            // if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
            //   curKey.indexOf(item.key) !== 0) {
            //   return;
            // }
            if (item.children) {
                loopLeaf(item.children, l);
            } else if (l < 1) {
                item.isLeaf = true;
            }
        });
    };
    loopLeaf(treeData, level);
}

export function getNewTreeData(treeData, curKey, child, level) {
    const loop = (data) => {
        //if (level < 1 || curKey.length - 3 > level * 2) return;
        data.forEach((item) => {
            if (curKey.indexOf(item.key) === 0) {
                if (item.children) {
                    loop(item.children);
                } else {
                    item.children = child;
                }
            } else if (item.children) {
                loop(item.children);
            }
        });
    };
    loop(treeData);
    //setLeaf(treeData, level);
}
//获取浏览器地址参数
export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//获取选项值
export function getValue(name, key, value) {
    let result = undefined;
    if(name){
        for(let i in name){
            if(value){
                result = name[key][value];
            }else{
                result = name[key];
            }
        }
    }
    return result;
}
