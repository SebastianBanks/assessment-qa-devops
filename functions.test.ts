const {shuffleArray} = require('./utils')

const { Builder, Capabilities, By } = require("selenium-webdriver")
require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()


beforeAll(async () => {
    await driver.get('https://assessment-qa-devops-sb.herokuapp.com/')
})

afterAll(async () => {
    await driver.quit()
})

describe('shuffleArray should shuffle the given array', () => {
    test('should be same array', () => {
        expect(shuffleArray([1, 2, 3, 4])).not.toBe([1, 2, 3, 4])
    })
})

