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

export function getGame(gamePin) {
    return games[gamePin]
}

export function startGame(gamePin, user) {
    if (user.isModerator) {
        var game = getGame(gamePin)
        game.status = "open"
    } else {
        console.log("Only moderators can open a game")
    }
}

export function handleOptionSelection(gamePin, isOptionASelected, isOptionBSelected) {
    var game = getGame(gamePin)

        var new_option = game.options[game.currentRound -1]


        if (game.currentRound === game.totalRounds) {
            game.status = "game_over"
        }

        if (isOptionASelected) {
            console.log("option A selected")
            game.roundWinner = game.optionA
            // Get the next option and set it in optionB
            game.optionB = new_option
            // Go to next round
            if (game.currentRound < game.totalRounds) {
                game.currentRound = game.currentRound + 1
            }
            
        } else if (isOptionBSelected) {
            console.log("option B selected")
            game.roundWinner = game.optionB
            // Get the next option and set it in optionA
            game.optionA = new_option
            if (game.currentRound < game.totalRounds) {
                game.currentRound = game.currentRound + 1
            }
        }
        else {
            console.log("Nothing selected")
        }  
}

var games = {
    DHL01: createGame("DHL01", gameSetup),
    DHL02: createGame("DHL02", gameSetup),
    DHL03: createGame("DHL03", gameSetup),
    DHL04: createGame("DHL04", gameSetup),
    DHL05: createGame("DHL05", gameSetup),
    DHL06: createGame("DHL06", gameSetup),
}