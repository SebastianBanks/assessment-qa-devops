const {shuffleArray} = require('./utils')

const { Builder, Capabilities, By } = require("selenium-webdriver")
require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()


beforeAll(async () => {
    await driver.get('http://localhost:3000/')
})

afterAll(async () => {
    await driver.quit()
})

describe('shuffleArray should shuffle the given array', () => {
    // CODE HERE
})

