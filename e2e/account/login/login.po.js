'use strict';

var LoginPage = function() {
    this.form = element(by.name('form'));
    this.email = this.form.element(by.name('email'));
    this.password = this.form.element(by.name('password'));
    this.loginButton = this.form.element(by.css('.btn-login'));
    this.helpBlock1 = element.all(by.css('.help-block')).get(0);
    this.helpBlock2 = element.all(by.css('.help-block')).get(1);
    this.helpBlock3 = element.all(by.css('.help-block')).get(2);

};

module.exports = new LoginPage();