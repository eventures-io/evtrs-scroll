'use strict';

describe('Login Page', function() {
    var page;

    beforeEach(function() {
        browser.get('/login');
        page = require('./login.po');
    });

    it('should ask for credentials', function() {
         page.loginButton.click();
        expect(page.helpBlock1.getAttribute('class')).not.toContain('ng-hide');
        expect(page.helpBlock1.getText()).toEqual('Please enter your email and password.');
    });

    it('should ask for valid email', function() {
        page.email.sendKeys('noat');
        page.loginButton.click();
        expect(page.helpBlock2.getAttribute('class')).not.toContain('ng-hide');
        expect(page.helpBlock2.getText()).toEqual('Please enter a valid email.');
    });

    it('should refuse the email address', function() {
        page.email.sendKeys('admin@nr.io');
        page.password.sendKeys('admin');
        page.loginButton.click();
        expect(page.helpBlock3.getText()).toEqual('This email is not registered.');
    });

    it('should authenticate the admin user', function() {
        page.email.sendKeys('admin@eventures.io');
        page.password.sendKeys('admin');
        page.loginButton.click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/admin/article-create');
    });

});

