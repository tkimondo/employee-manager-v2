var ClickByText = (browser, text) => {
    browser
        .useXpath()
        .click(`//*[text()="${text}"]`)
        .useCss()
}

let manager = {}
let editTest = require('../testAssets/editTests')

module.exports = {
    beforeEach: browser => {
        manager = browser.page.employeeManagerPage()
        manager.navigate()
            .expect.element('@titleText').text.to.equal('Employee Manager')
    },
    after: browser => {
        browser.end()
    },
    'It can add an employee': browser => {
            browser.pause(1000)
            ClickByText(browser, " + Add Employee ")
            browser.pause(1000)
        manager
            .clickEmployee('New Employee')
            .expect.element('@cardTitle').text.to.contain('New Employee').before(500)
    /*
        },
    'It can delete an employee': browser => {

    },
    'It can edit a new employee': browser => {
            browser.pause(5000);
        manager
            .click('@addButton')
    */        
        editTest(manager, 'New Employee', {name:'Test New', phone: '0000000000', email: 'test@new.com', title: 'Engineer'}, 'Do not Delete me')

    },
    'It can edit an existing employee': browser => {
            browser.pause(1000)
        manager
            .clickEmployee('Test New')
            .expect.element('@cardTitle').text.to.contain('Test New').before(500)
        manager
            editTest(manager, 'Test New', {name: 'Test Edit', phone: '0000000001', email: 'test@edit.com', title: 'Tester 1'}, 'Do not Delete me')

    },

    'It can delete an existing employee': browser => {
        browser.pause(1000)
    manager
        .clickEmployee('Test Edit')
        .expect.element('@cardTitle').text.to.contain('Test Edit').before(500)
    manager
        .click('@deleteButton')   
    browser   
        .acceptAlert()
    manager
        .waitForElementPresent('@ID', 5000)
}
}