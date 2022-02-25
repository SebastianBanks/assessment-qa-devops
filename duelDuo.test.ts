
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

test('check draw button id === choices', async () => {
    const drawBtn = await driver.findElement(By.id("draw"))
    const choicesDiv = await driver.findElement(By.xpath("//section/div"))
    let equalToChoices = false

    await drawBtn.click()
    console.log(choicesDiv.getAttributes("id"))
    if (await choicesDiv.getAttributes("id") === "choices") {
        equalToChoices = true
    }
    expect(equalToChoices).toBe(true)
})

test('add to duo btn id === player-duo', async () => {
    const drawBtn = await driver.findElement(By.id("draw"))
    const addToDuoBtn = await driver.findElement(By.xpath("//section/div/div/button"))
    const playerDiv = await driver.findElement(By.xpath('//section[2]/section/div'))
    let isPlayerDuo = false
    drawBtn.click()
    addToDuoBtn.click()
    if (await playerDiv.getAttributes("id") === "player-duo") {
        isPlayerDuo = true
    }
    expect(isPlayerDuo).toBe(true)
})

