/*
Making a slot machine
    three bar slot machine
        needs to randomly generate three ID's to set as the spin.
            way to set the win condition is to set a break statement 
    six symbols
    use contructor to make the img show up and use price, id, name, and etc.
        three lower symbols
        three premimum
    trigger will be a button that will spin the slot and consume a token.
        spin cost one token
        if no token then game !
        wins will be 1 x icon id
    cash out button
        ends the game and tells you good job for cashing out.

    Functions in my class object.
        One to set win conditions()
            if win condition = array then pay X
        one for making the pictures appear from the spin()
            making the spin animation is possible if we layer picture and gif on top of each other.
            or a question mark with a small animation to hide the symbol while spinning
        one for keeping track of the tokens and currency()

        one to cashout ()
        clear screen ()

        free codecamp challenge 69



        Data needed:
        currency
        costOfSpin

        firstSlotValue
        SeconedSlotValue
        ThirdSlotValue
        (AND IF I WANT TO RANDOMLY GENERATE random symbols cut of to give the illusion. Prolly not tho tbh)

*/

// const gameBoard = document.getElementById('gameBoard');
// const gameBoardCTX = gameBoard.getContext('2d');

// const boardBorder = 'silver'
// const boardBackground = 'crimson red'

// gameBoardCTX.fillStyle = boardBackground;
// gameBoardCTX.strokeStyle= boardBorder;
// gameBoardCTX.fillRect(0, 0, gameBoard.clientWidth, gameBoard.height)
// gameBoardCTX.strokeRect(0, 0, gameBoard.width, gameBoard.height)



class slotMachine {
    constructor() {
        this.currency = {
            totalCurrency: 10,
            betSize: 1
        }
        this.slotspaces = {
            oneOneSlot: 0,
            oneTwoSlot: 0,
            oneThreeSlot: 0,
        }

        this.symbols = {
            symbol1: {
                id: 1,
                multi: 1,
                img: "/media/charmander.jpg",
                name: "TEN"
            },
            symbol2: {
                id: 2,
                multi: 2,
                img: "/media/pickachu.png",
                name: "KING"
            },
            symbol3: {
                id: 3,
                multi: 3,
                img: "/media/turtwig.jpg",
                name: "ACE"
            },
            // Premium Symbol
            symbol4: {
                id: 4,
                multi: 4,
                img: "/media/articino.png",
                name: "CAT"
            }
            // ADD MORE SYMBOLS ONOCE YOU GET IT TO WORK.
        }


    }

    // THIS IS GOING TO SPIN THE SLOT AND GIVE THE VALUES FOR THE HTML FOR THE DISPLAY AND VALUES FOR JS SO THAT IT CAN BE USED FOR WIN CONDITIONS 
    spinSlot() {
        // Changing the betSizing
        // https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/

        let betBtn = document.getElementById('betSizeBtn')
        let betRadioButtons = document.querySelectorAll('input[name="Bets"]')
        betBtn.addEventListener("click", () => {
            for (const betRadioButton of betRadioButtons) {
                if (betRadioButton.checked) { //&& betRadioButton.checked <= this.currency.totalCurrency
                    this.currency.betSize = betRadioButton.value;
                    console.log(this.currency.betSize)
                    break;
                }
            }
        })


        let slotOneOne = document.getElementById('oneOneSlot');
        let slotOneTwo = document.getElementById('oneTwoSlot');
        let slotOneThree = document.getElementById('oneThreeSlot');

        // THIS IS THE BUTTON THAT TRIGGERS THE "SPIN"
        let spinButton = document.getElementById('spinButton')

        spinButton.addEventListener('click', () => {
            // ON CLICK => RANDOM-IDX THE THREE SLOT VALUES AND CHANGE THE INNER TEXT OF THOSE THREE VALUES. THOSE VALUES WILL BE USED LATER WHEN I CREATE THE WIN CONDITIONS

            let spinImg = document.querySelectorAll('.spin-img')
            var slotOneOneIdx = Math.ceil(Math.random() * 4)
            var slotOneTwoIdx = Math.ceil(Math.random() * 4)
            var slotOneThreeIdx = Math.ceil(Math.random() * 4)
            // CHANGE THIS WHEN YOU ADD MORE SYMBOLS USING CEIL PREVENTS FROM GETTING 0

            this.slotspaces.oneOneSlot = slotOneOneIdx
            this.slotspaces.oneTwoSlot = slotOneTwoIdx
            this.slotspaces.oneThreeSlot = slotOneThreeIdx

            spinImg.forEach(element => {
                element.classList.remove("d-none")
            });
            
            // MAKE A FOR EACH LOOP THAT WILL GO THROUGH EACH SLOT SPACE AND READ THE NUMBER TO CHANGE THE IMG ACCORDINGLY 

            for (let i = 0; i < spinImg.length; i++) {
                setTimeout(() => {
                    spinImg[i].classList.add("d-none")
                }, 2000)
            }


            let slotResult = [this.slotspaces.oneOneSlot, this.slotspaces.oneTwoSlot, this.slotspaces.oneThreeSlot]
            let reelOne = document.getElementById('reelOne')
            let reelTwo = document.getElementById('reelTwo')
            let reelThree = document.getElementById('reelThree')
            let reels =[reelOne, reelTwo, reelThree]

            let totalCurrency = document.getElementById('totalCurrency')
            let gameState = document.getElementById('gameState')
            let slotMachine = document.getElementById('slotMachine')
            // END OF THE SPINING LOGIC

            // for (let i = 0; i < slotResult.length; i++) {
                let count = 0
                reels.forEach(element => {
                    if (slotResult[count] == 1) {
                        // <img src="" alt="" class="symbol-img">
                        element.innerHTML =`
                        <img src="${this.symbols.symbol1.img}" alt="" class="symbol-img">
                        `
                    } else if(slotResult[count] == 2){
                        element.innerHTML =`
                        <img src="${this.symbols.symbol2.img}" alt="" class="symbol-img">
                        `
                    } else if(slotResult[count] == 3){
                        element.innerHTML =`
                        <img src="${this.symbols.symbol3.img}" alt="" class="symbol-img">
                        `
                    } else if(slotResult[count] == 4){
                        element.innerHTML =`
                        <img src="${this.symbols.symbol4.img}" alt="" class="symbol-img">
                        `
                    } else{
                        console.log("error")
                    }
                    count++
                }
                )
            ;


            // START OF THE WINNING LOGIC
            const winningSpins = [
                [1, 1, 1],
                [2, 2, 2],
                [3, 3, 3],
                [4, 4, 4],
            ]

            // https://www.30secondsofcode.org/articles/s/javascript-array-comparison
            // THIS IS WHERE I GOT THE IDEA OF JSON.STRIGFY IT TURNS A ARRAY INTO A STRING SO THAT YOU CAN ACTUALLY COMPARE IT BECAUSE ARRAYS ARE WEIRD

            if (this.currency.totalCurrency >= this.currency.betSize) {
                switch (JSON.stringify(slotResult)) {
                    case JSON.stringify(winningSpins[0]):
                        this.currency.totalCurrency += this.currency.betSize * this.symbols.symbol1.multi
                        spinImg.src="https://via.placeholder.com/150"
                        totalCurrency.innerText = this.currency.totalCurrency
                        break;
                    case JSON.stringify(winningSpins[1]):
                        this.currency.totalCurrency += this.currency.betSize * this.symbols.symbol2.multi
                        totalCurrency.innerText = this.currency.totalCurrency
                        break;
                    case JSON.stringify(winningSpins[2]):
                        this.currency.totalCurrency += this.currency.betSize * this.symbols.symbol3.multi
                        totalCurrency.innerText = this.currency.totalCurrency
                        break;
                    case JSON.stringify(winningSpins[3]):
                        this.currency.totalCurrency += this.currency.betSize * this.symbols.symbol4.multi
                        totalCurrency.innerText = this.currency.totalCurrency
                        break;
                    default:
                        this.currency.totalCurrency -= this.currency.betSize
                        totalCurrency.innerText = this.currency.totalCurrency
                }
            } else if (this.currency.totalCurrency < this.currency.betSize) {
                gameState.innerText = "BET SIZE TOO LARGE MUST CHANGE BET SIZE"
                slotOneOne.innerText = "0"
                slotOneTwo.innerText = "0"
                slotOneThree.innerText = "0"

            } else {
                gameState.innerText = "YOUR OUT OF MONEY!"
                slotMachine.classList.add("d-none")
            }
            // END OF THE WIN LOGIC STATEMENT
            console.log(slotResult)
        })
    }

    loadItems(){
        let test = document.querySelectorAll(".testing-img")


    }


}


let action = new slotMachine;

action.spinSlot();
// action.winningSpins();
