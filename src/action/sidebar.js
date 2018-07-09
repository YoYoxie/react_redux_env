//获取列表
export function sidebarget() {
    return {
        type: 'SIDEBAR/GET',
    }
}
//设置状态
export function sidebarmode(mode) {
    return {
        type: 'SIDEBAR/MODE',
        mode: mode
    }
}
export function sidebaropen(open) {
    return {
        type: 'SIDEBAR/OPEN',
        open: open
    }
}
