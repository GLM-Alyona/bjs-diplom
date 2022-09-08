'use strict';

const newUserForm = new UserForm();

newUserForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (!response.success) {
            newUserForm.setLoginErrorMessage(response.error);
        }
        else {
            location.reload();
        }
    });
};
newUserForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if (!response.success) {
            newUserForm.setRegisterErrorMessage(response.error);
        }
        else {
            location.reload();
        }
    });
};