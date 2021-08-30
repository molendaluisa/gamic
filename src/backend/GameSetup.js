const api = true
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
            description: "Nutella",
            imageUrl: "https://images.pexels.com/photos/2776935/pexels-photo-2776935.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=308&w=462&fit=crop"
        },
        {
            description: "Mosquitos",
            imageUrl: "https://images.pexels.com/photos/86722/tiger-mosquito-mosquito-asian-tigermucke-sting-86722.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=308&w=462&fit=crop"
        },
        {
            description: "Video Games",
            imageUrl: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Music",
            imageUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Wi-fi",
            imageUrl: "https://images.pexels.com/photos/4140208/pexels-photo-4140208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Free Wi-fi",
            imageUrl: "https://images.pexels.com/photos/7563691/pexels-photo-7563691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Timo",
            imageUrl: "https://media-exp1.licdn.com/dms/image/C4D03AQHyZRzgU6EVqw/profile-displayphoto-shrink_800_800/0/1568711682735?e=1635984000&v=beta&t=iKOK3JKLen48JVPhHgt0RPQK45angWhwCBWGQinecnA"
        },
        {
            description: "Minions",
            imageUrl: "https://images.pexels.com/photos/1606655/pexels-photo-1606655.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=308&w=462&fit=crop"
        },
        {
            description: "KPIs",
            imageUrl: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Netflix",
            imageUrl: "https://images.pexels.com/photos/2726370/pexels-photo-2726370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "COVID-19",
            imageUrl: "https://images.pexels.com/photos/4113084/pexels-photo-4113084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Teddy Bears",
            imageUrl: "https://images.pexels.com/photos/207891/pexels-photo-207891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Deadlines",
            imageUrl: "https://images.pexels.com/photos/1314544/pexels-photo-1314544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Vacation",
            imageUrl: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "HR Team",
            imageUrl: "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
    ],
}

function createGame(gamePin, gameSetup) {
    return {
        pin: gamePin,
        optionA: JSON.parse(JSON.stringify(gameSetup.defaultOptionA)),
        optionB: JSON.parse(JSON.stringify(gameSetup.defaultOptionB)),
        options: JSON.parse(JSON.stringify(gameSetup.options)),
        totalRounds: gameSetup.options.length + 1,
        moderator: null,
        roundWinner: null,
        winner: null,
        players: [],
        currentRound: 1,
        votesOptionA: [],
        votesOptionB: [],
        status: "initial"
    };
}

function getOption(gamePin) {
    var game = getGame(gamePin)
    var randomOption = game.options.splice(Math.floor(Math.random() * game.options.length), 1);

    return randomOption;
}

export function getRoundWinner(gamePin, callbackFunction) {
    // if (api) {
    //     // Get round winner from the server
    //     fetch('http://localhost:5000/game/' +  gamePin + "/finishRound")
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         callbackFunction(data.roundWinner);
    //     })
    // } else {
    var game = getGame(gamePin)
    var winner = null;

    if (game.votesOptionA.length > game.votesOptionB.length) {
        winner = JSON.parse(JSON.stringify(game.optionA))
    } else if (game.votesOptionB.length > game.votesOptionA.length) {
        winner = JSON.parse(JSON.stringify(game.optionB))
    } else {
        console.log("It's a tie, play round again")
    }
    return winner;

    //     callbackFunction(winner)
    // }    
}

export function getGame(gamePin) {
    if (api) {
        fetch('https://boiling-wave-10637.herokuapp.com/game/ABC01')
            .then(response => response.json())
    }
    return games[gamePin]
}


export function joinGame(gamePin, user) {
    var game = getGame(gamePin)
    if (user.isModerator) {
        game.moderator = user;
    } else {
        game.players.push(user)
    }
}


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

export function finishRound(gamePin) {
    var game = getGame(gamePin)

    if (game.options.length === 0) {
        console.log("Game over")
    }
    // Set new optionB
    var newContender = getOption(gamePin)

    if (newContender.length === 0) {
        console.log("No more options to offer")
        return true
    }
    game.roundWinner = getRoundWinner(gamePin)
    if (game.votesOptionA.length > game.votesOptionB.length) {
        game.optionB = newContender[0]
        game.currentRound = game.currentRound + 1
    } else if (game.votesOptionB.length > game.votesOptionA.length) {
        game.optionA = newContender[0]
        game.currentRound = game.currentRound + 1
    } else {
        console.log("It's a tie, play round again")
    }

    // Reset votes
    game.votesOptionA = []
    game.votesOptionB = []
}

export function startGame(gamePin, user) {
    if (user.isModerator) {
        var game = getGame(gamePin)
        game.status = "open"
    } else {
        console.log("Only moderators can open a game")
    }
}

export function isGameReady(gamePin) {
    var game = getGame(gamePin)
    if (game.status === "open") {
        return true
    } else {
        return false
    }
}

// printGameInfo("ABC01")
// finishRound("ABC01")
// printGameInfo("ABC01")


// var user1 = {
//     nickname: "Luisita",
//     isModerator: false
// }
// var user2 = {
//     nickname: "Ale",
//     isModerator: false
// }
// var user3 = {
//     nickname: "Toti",
//     isModerator: true
// }

// printGameInfo("ABC01")
// joinGame("ABC01", user1)
// joinGame("ABC01", user2)
// printGameInfo("ABC01")


var game1 = createGame("ABC01", gameSetup)
var game2 = createGame("ABC02", gameSetup)
var game3 = createGame("ABC03", gameSetup)

var games = {
    ABC01: game1,
    ABC02: game2,
    ABC03: game3
}

// submitVote("ABC01", user1, "Waffles")
// submitVote("ABC01", user2, "Waffles")
// var round1Winner = getRoundWinner("ABC01")
// console.log(JSON.stringify(round1Winner, null, 2))