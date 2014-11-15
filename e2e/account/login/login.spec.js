'use strict';

describe('Login Page', function() {
    var page;

    beforeEach(function() {
        browser.get('/login');
        page = require('./login.po');
    });

    it('should authenticate the admin user', function() {
         page.email.sendKeys('admin@eventures.io');
         page.password.sendKeys('admin');
         page.loginButton.click();
         expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/admin/article-create');
    });

});

