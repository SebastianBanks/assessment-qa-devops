
const { Builder, Capabilities, By } = require("selenium-webdriver")
require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()
const { } = require('./public/index.js')


beforeAll(async () => {
    await driver.get('https://assessment-qa-devops-sb.herokuapp.com/')
})

afterAll(async () => {
    await driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})