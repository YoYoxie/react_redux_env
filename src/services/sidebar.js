import xFetch from './xFetch';
import API from './api';

export async function getMenuApp() {
    return xFetch(API.MENU_APP + '?type=bss');
}
