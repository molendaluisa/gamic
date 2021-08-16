// console.log("hello")
const defaultOptionA = {
    description: "Pancakes",
    imageUrl: "https://images.pexels.com/photos/718739/pexels-photo-718739.jpeg?auto=compress&cs=tinysrgb&https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=462&h=308"
}

const defaultOptionB = {
    description: "Waffles",
    imageUrl: "https://images.pexels.com/photos/374092/pexels-photo-374092.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=462&h=308"
}

const gameSetup = {
    defaultOptionA: defaultOptionA,
    defaultOptionB: defaultOptionB,
    options: [
        {
            description: "Minions",
            imageUrl: "https://images.pexels.com/photos/1606655/pexels-photo-1606655.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=308&w=462&fit=crop"
        },
        {
            description: "Nutella",
            imageUrl: "https://images.pexels.com/photos/2776935/pexels-photo-2776935.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=308&w=462&fit=crop"
        },
        {
            description: "Mosquitos",
            imageUrl: "https://images.pexels.com/photos/86722/tiger-mosquito-mosquito-asian-tigermucke-sting-86722.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=308&w=462&fit=crop"
        },
        {
            description: "Treadmill",
            imageUrl: "https://images.pexels.com/photos/3757957/pexels-photo-3757957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=308&w=462&fit=crop"
        },
        {
            description: "Festivals",
            imageUrl: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=308&w=462&fit=crop"
        },
        {
            description: "Books",
            imageUrl: "https://images.pexels.com/photos/3494806/pexels-photo-3494806.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=308&w=462&fit=crop"
        },
    ],
    totalRounds: 7
}

function createGame(gamePin, gameSetup) {
    return {
        pin: gamePin,
        optionA: JSON.parse(JSON.stringify(gameSetup.defaultOptionA)),
        optionB: JSON.parse(JSON.stringify(gameSetup.defaultOptionB)),
        options: JSON.parse(JSON.stringify(gameSetup.options)),
        totalRounds: gameSetup.totalRounds,
        moderator: null,
        roundWinner: null,
        winner: null,
        players: [],
        currentRound: 1,
        votesOptionA: [],
        votesOptionB: []
    };
}

var game1 = createGame("ABC01", gameSetup)
var game2 = createGame("ABC02", gameSetup)
var game3 = createGame("ABC03", gameSetup)

var games = {
    ABC01: game1,
    ABC02: game2,
    ABC03: game3
}

function printGameInfo(gamePin) {
    console.log(JSON.stringify(getGame(gamePin), null, 2))
}


export function getGame(gamePin) {
    return games[gamePin]
}

function getOption(gamePin) {
    var game = getGame(gamePin)
    var randomOption = game.options.splice(Math.floor(Math.random() * game.options.length), 1);

    return randomOption;
}

// printGameInfo("ABC01")
// getOption("ABC01")
// getOption("ABC01")
// getOption("ABC01")


function joinGame(gamePin, user) {
    var game = getGame(gamePin)
    game.players.push(user)
}
var user1 = {
    nickname: "Luisita",
    isModerator: false
}
var user2 = {
    nickname: "Ale",
    isModerator: false
}
var user3 = {
    nickname: "Toti",
    isModerator: true
}

// printGameInfo("ABC01")
joinGame("ABC01", user1)
joinGame("ABC01", user2)
// printGameInfo("ABC01")

export function submitVote(gamePin, user, option) {
    console.log("Submiting vote")
    var game = getGame(gamePin)
    if (option.description === game.optionA.description) {
        console.log("User choose option A")
        game.votesOptionA.push(user)
    }
    if (option.description === game.optionB.description) {
        console.log("User choose option B")
        game.votesOptionB.push(user)
    }
}

function getRoundWinner(gamePin) {
    var game = getGame(gamePin)
    var winner = null;

    if (game.votesOptionA.length > game.votesOptionB.length) {
        winner = JSON.parse(JSON.stringify(game.optionA))
    } else if (game.votesOptionB.length > game.votesOptionA.length) {
        winner = JSON.parse(JSON.stringify(game.optionB))
    } else {
        console.log("It's a tie, play round again")
    }

    return winner
}

// submitVote("ABC01", user1, "Waffles")
// submitVote("ABC01", user2, "Waffles")
// var round1Winner = getRoundWinner("ABC01")
// console.log(JSON.stringify(round1Winner, null, 2))

export function finishRound(gamePin) {
    var game = getGame(gamePin)
    var roundWinner = getRoundWinner(gamePin)

    if (roundWinner != null) {
        game.roundWinner = roundWinner
        // Set optionA as the winner of the previous round
        game.optionA = roundWinner

        // Set new optionB
        var newContender = getOption("ABC01")
        if (newContender == null) {
            console.log("No more options to offer")
        } else {
            game.optionB = newContender[0]
            game.currentRound = game.currentRound + 1
        }



    } else {
        console.log("Its a tie!, vote again")
    }

    // Reset votes
    game.votesOptionA = []
    game.votesOptionB = []
}
// printGameInfo("ABC01")
// finishRound("ABC01")
// printGameInfo("ABC01")


export function test(gamePin) {
    return "test " + gamePin
}