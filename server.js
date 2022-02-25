const express = require('express')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'ca7ac220f05d4164856d9f0fc3bb258f',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.use(express.json())

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.use(express.static(path.join(__dirname, "./public")))



app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(bots)
        rollbar.info('got the robots')
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        rollbar.critical('Cannot get bots!')
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
        rollbar.info('got the five bots')
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        rollbar.warning('Cannot get 5 bots')
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
            rollbar.info('player lost', {record: playerRecord})
        } else {
            playerRecord.wins++
            res.status(200).send('You won!', {record: playerRecord})
            rollbar.info('player won')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        rollbar.critical('Cannot duel!')
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
        rollbar.info('got player stats')
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        rollbar.warning('error getting player stats')
        res.sendStatus(400)
    }
})



const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})