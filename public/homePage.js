'use strict';

const userLogout = new LogoutButton();

userLogout.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
};
ApiConnector.current(response => { // запрос информации о текушем пользователе
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});
const newRates = new RatesBoard(); // запрос и обновление курсов валют
const getCourses = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            newRates.clearTable();
            newRates.fillTable(response.data);
        }
    });
};
getCourses();

let updateCourses = setInterval(getCourses, 60000);

const userMoneyManager = new MoneyManager();

userMoneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            userMoneyManager.setMessage(response.success, 'Счёт успешно пополнен');
        }
        else {
            userMoneyManager.setMessage(response.success, response.error);
        }
    });
};
userMoneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            userMoneyManager.setMessage(response.success, 'Валюта успешно конвертирована');
        }
        else {
            userMoneyManager.setMessage(response.success, response.error);
        }
    });
};
userMoneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            userMoneyManager.setMessage(response.success, 'Перевод выполнен успешно');
        }
        else {
            userMoneyManager.setMessage(response.success, response.error);
        }
    });
};
const newFavorit = new FavoritesWidget(); // запрос и обновление списка Избранное
ApiConnector.getFavorites(response => {
        if (response.success) {
            newFavorit.clearTable();
            newFavorit.fillTable(response.data);
            userMoneyManager.updateUsersList(response.data);
        }
    });

newFavorit.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            newFavorit.clearTable();
            newFavorit.fillTable(response.data);
            userMoneyManager.updateUsersList(response.data);
            newFavorit.setMessage(response.success, 'Удачное добавление в избранное');
        } else {
            newFavorit.setMessage(response.success, response.error);
        }
    });
};

newFavorit.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            newFavorit.clearTable();
            newFavorit.fillTable(response.data);
            userMoneyManager.updateUsersList(response.data);
            newFavorit.setMessage(response.success, 'Удачное удаление из избранного');
        } else {
            newFavorit.setMessage(response.success, response.error);
        }
    });
};