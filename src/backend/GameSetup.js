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
            imageUrl: "https://images.pexels.com/photos/3757957/pexels-photo-3757957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Festivals",
            imageUrl: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Books",
            imageUrl: "https://images.pexels.com/photos/3494806/pexels-photo-3494806.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Beaches",
            imageUrl: "https://images.pexels.com/photos/7017468/pexels-photo-7017468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Excel",
            imageUrl: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Love",
            imageUrl: "https://images.pexels.com/photos/6788862/pexels-photo-6788862.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Vacation",
            imageUrl: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Elvis",
            imageUrl: "https://images.pexels.com/photos/270968/pexels-photo-270968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Meetings",
            imageUrl: "https://images.pexels.com/photos/7648040/pexels-photo-7648040.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Video Games",
            imageUrl: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
        },
        {
            description: "Mountains",
            imageUrl: "https://images.pexels.com/photos/705075/pexels-photo-705075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260&fit=crop"
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

var games = {
    DHL01: createGame("DHL01", gameSetup),
    DHL02: createGame("DHL02", gameSetup),
    DHL03: createGame("DHL03", gameSetup),
    DHL04: createGame("DHL04", gameSetup),
    DHL05: createGame("DHL05", gameSetup),
    DHL06: createGame("DHL06", gameSetup),
}