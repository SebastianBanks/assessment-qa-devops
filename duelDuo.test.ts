
const { Builder, Capabilities, By } = require("selenium-webdriver")
require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()



beforeAll(async () => {
    await driver.get('https://assessment-qa-devops-sb.herokuapp.com/')
    await driver.sleep(1000)
})

afterAll(async () => {
    await driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    await driver.sleep(1000)
    const displayed = await title.isDisplayed()
    
    expect(displayed).toBe(true)
})

test('check draw button id === choices', async () => {
    const drawBtn = await driver.findElement(By.id("draw"))
    await driver.sleep(1000)
    const choicesDiv = await driver.findElement(By.xpath("//section/div"))
    await driver.sleep(1000)
    let equalToChoices = false

    await drawBtn.click()
    await driver.sleep(1000)
    
    if (await choicesDiv.getAttribute("id") === "choices") {
        equalToChoices = true
    }
    expect(equalToChoices).toBe(true)
})

test('add to duo btn id === player-duo', async () => {
    await driver.sleep(1000)
    const playerDiv = await driver.findElement(By.xpath('//section[contains(@class,"container")]/section[1]/div'))
    let isPlayerDuo = false
    await driver.sleep(1000)
    if (await playerDiv.getAttribute("id") === "player-duo") {
        isPlayerDuo = true
    }
    expect(isPlayerDuo).toBe(true)
})

