'use strict';

var LoginPage = function() {
    this.form = element(by.name('form'));
    this.email = this.form.element(by.name('email'));
    this.password = this.form.element(by.name('password'));
    this.loginButton = this.form.element(by.css('.btn-login'));
 //   this.loginButton = element(by.xpath('//form[1]/input[@type="submit"]'))
};

module.exports = new LoginPage();