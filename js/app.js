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
            totalCurrency: 25,
            betSize: 1
        }
        this.slotspaces = {
            oneOneSlot: 0,
            oneTwoSlot: 0,
            oneThreeSlot: 0,
        }

        this.symbols = {
            // https://pokemondb.net/sprites this is where the images will come from
            symbol1: {
                id: 1,
                multi: 2,
                gif: "/media/bulbasaur.gif",
                img: "/media/bulbasaur.png",
                name: "Bulbasaur"
            },
            symbol2: {
                id: 2,
                multi: 4,
                gif: "/media/staraptor.gif",
                img: "/media/staraptor.png",
                name: "Staraptor"
            },
            symbol3: {
                id: 3,
                multi: 6,
                gif: "/media/luxray.gif",
                img: "/media/luxray-f.png",
                name: "Luxray"
            },
            symbol4: {
                id: 4,
                multi: 8,
                gif: "/media/tyranitar.gif",
                img: "/media/tyranitar.png",
                name: "Tyranitar"
            },
            // Premium Symbol
            symbol5: {
                id: 5,
                multi: 10,
                gif: "/media/darkrai.gif",
                img: "/media/darkrai.png",
                name: "DarkRai"
            },
            symbol6: {
                id: 6,
                multi: 15,
                gif: "/media/dialga.gif",
                img: "/media/dialga.png",
                name: "Dialga"
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
        let totalCurrency = document.getElementById('totalCurrency')
        totalCurrency.innerText = this.currency.totalCurrency

        let slotMachine = document.getElementById('slotMachine')
        let gameState = document.getElementById('gameState')

        spinButton.addEventListener('click', () => {
            let spinSound = document.getElementById('spinSound')
            spinSound.play()
            // ON CLICK => RANDOM-IDX THE THREE SLOT VALUES AND CHANGE THE INNER TEXT OF THOSE THREE VALUES. THOSE VALUES WILL BE USED LATER WHEN I CREATE THE WIN CONDITIONS

            // let spinImg = document.querySelectorAll('.spin-img')
            var slotOneOneIdx = Math.ceil(Math.random() * 6)
            var slotOneTwoIdx = Math.ceil(Math.random() * 6)
            var slotOneThreeIdx = Math.ceil(Math.random() * 6)
            // CHANGE THIS WHEN YOU ADD MORE SYMBOLS USING CEIL PREVENTS FROM GETTING 0

            this.slotspaces.oneOneSlot = slotOneOneIdx
            this.slotspaces.oneTwoSlot = slotOneTwoIdx
            this.slotspaces.oneThreeSlot = slotOneThreeIdx

            // spinImg.forEach(element => {
            //     element.classList.remove("d-none")
            // });

            // MAKE A FOR EACH LOOP THAT WILL GO THROUGH EACH SLOT SPACE AND READ THE NUMBER TO CHANGE THE IMG ACCORDINGLY 

            // for (let i = 0; i < spinImg.length; i++) {
            //     setTimeout(() => {
            //         spinImg[i].classList.add("d-none")
            //     }, 2000)
            // }


            let slotResult = `[${this.slotspaces.oneOneSlot},${this.slotspaces.oneTwoSlot},${this.slotspaces.oneThreeSlot}]`
            let slotImgCheck = [this.slotspaces.oneOneSlot, this.slotspaces.oneTwoSlot, this.slotspaces.oneThreeSlot]
            console.log(slotResult)
            let reelOne = document.getElementById('reelOne')
            let reelTwo = document.getElementById('reelTwo')
            let reelThree = document.getElementById('reelThree')
            let reels = [reelOne, reelTwo, reelThree]

            let smallWin = document.getElementById('smallWin')
            let midWin = document.getElementById('midWin')
            let bigWin = document.getElementById('bigWin')
            


            const winningSpins = [
                `[1,1,1]`,
                `[2,2,2]`,
                `[3,3,3]`,
                `[4,4,4]`,
                `[5,5,5]`,
                `[6,6,6]`
            ]

            // END OF THE SPINING LOGIC
            if (this.currency.totalCurrency >= this.currency.betSize) {
                gameState.innerText = "LETS KEEP SPINNING!"
                let count = 0
                reels.forEach(element => {
                    if (slotImgCheck[count] == 1) {
                        // <img src="" alt="" class="symbol-img">
                        element.innerHTML = `
                            <img src="${this.symbols.symbol1.gif}" alt="" class="symbol-img">
                            `
                    } else if (slotImgCheck[count] == 2) {
                        element.innerHTML = `
                            <img src="${this.symbols.symbol2.gif}" alt="" class="symbol-img">
                            `
                    } else if (slotImgCheck[count] == 3) {
                        element.innerHTML = `
                            <img src="${this.symbols.symbol3.gif}" alt="" class="symbol-img">
                            `
                    } else if (slotImgCheck[count] == 4) {
                        element.innerHTML = `
                            <img src="${this.symbols.symbol4.gif}" alt="" class="symbol-img">
                            `
                    } else if (slotImgCheck[count] == 5) {
                        element.innerHTML = `
                            <img src="${this.symbols.symbol5.gif}" alt="" class="symbol-img">
                            `
                    } else if (slotImgCheck[count] == 6) {
                        element.innerHTML = `
                            <img src="${this.symbols.symbol6.gif}" alt="" class="symbol-img">
                            `
                    } else {
                        console.log("error")
                    }
                    count++
                });
                // START OF THE WINNING LOGIC
                // https://www.30secondsofcode.org/articles/s/javascript-array-comparison
                // THIS IS WHERE I GOT THE IDEA OF JSON.STRIGFY IT TURNS A ARRAY INTO A STRING SO THAT YOU CAN ACTUALLY COMPARE IT BECAUSE ARRAYS ARE WEIRD

                // if (this.currency.totalCurrency >= this.currency.betSize) {

                

                switch (slotResult) {
                    case winningSpins[0]:
                        this.currency.totalCurrency += this.currency.betSize * this.symbols.symbol1.multi
                        totalCurrency.innerText = this.currency.totalCurrency
                        smallWin.play()
                        break;
                    case winningSpins[1]:
                        this.currency.totalCurrency += this.currency.betSize * this.symbols.symbol2.multi
                        totalCurrency.innerText = this.currency.totalCurrency
                        smallWin.play()
                        break;
                    case winningSpins[2]:
                        this.currency.totalCurrency += this.currency.betSize * this.symbols.symbol3.multi
                        totalCurrency.innerText = this.currency.totalCurrency
                        midWin.play()
                        break;
                    case winningSpins[3]:
                        this.currency.totalCurrency += this.currency.betSize * this.symbols.symbol4.multi
                        totalCurrency.innerText = this.currency.totalCurrency
                        midWin.play()
                        break;
                    case winningSpins[4]:
                        this.currency.totalCurrency += this.currency.betSize * this.symbols.symbol5.multi
                        totalCurrency.innerText = this.currency.totalCurrency
                        bigWin.play()
                        break;
                    case winningSpins[5]:
                        this.currency.totalCurrency += this.currency.betSize * this.symbols.symbol6.multi
                        totalCurrency.innerText = this.currency.totalCurrency
                        bigWin.play()
                        break;
                    default:
                        this.currency.totalCurrency -= this.currency.betSize
                        totalCurrency.innerText = this.currency.totalCurrency
                }
            } else { //(this.currency.totalCurrency < this.currency.betSize)
                gameState.innerText = "BET SIZE TOO LARGE MUST CHANGE BET SIZE"
                slotOneOne.innerText = "0"
                slotOneTwo.innerText = "0"
                slotOneThree.innerText = "0"

            }
            // END OF THE WIN LOGIC STATEMENT

            // GameState
            if (this.currency.totalCurrency == 0) {
                slotMachine.classList.add("d-none")
                cashOutBtn.classList.add('d-none')
                gameState.innerText = "YOU LOST ALL YOUR MONEY?!"
            } else {
                console.log("error")
            }

        })
        // Cashout Button Stuff
        let cashOutBtn = document.getElementById('cashoutBtn')
        let startingBetSize = this.currency.totalCurrency
        // cashOut will cause the game to end once button is pressed, will display message that says the user left with more money or less money. Will also d-none all parts of the and show a image that says something sweet ig. I don't like that word but oh well!

        cashOutBtn.addEventListener('click', () => {
            slotMachine.classList.add("d-none")
            if (this.currency.totalCurrency > startingBetSize) {
                gameState.innerText = `HEY! YOU CASHED OUT AND MADE IT OUT WITH SOME PROFIT!,$${this.currency.totalCurrency - startingBetSize} IN PROFIT TO BE EXACT!NICE ONE TRAINER`
            } else if (this.currency.totalCurrency < startingBetSize) {
                gameState.innerText = `Hey at least you made that right choice to leave, Sorry your went -$${this.currency.totalCurrency - startingBetSize} down. Remember to gamble for fun never to profit. Next time you got this Champ.`
            } else {
                gameState.innerText = `Going even is never bad, at least I hope you had fun.`
            }
        })
    }

    loadItems() {
        let count = 0;
        let slotInfoRowOne = document.getElementById('symbolRowOne');
        let slotInfoRowTwo = document.getElementById('symbolRowTwo');

        for (const key in this.symbols) {
            const item = this.symbols[key]
            const product = document.createElement('div')
            product.className = 'col-4 symbol product'
            product.innerHTML = `<div class="card symbol-card" style="width: 18rem;">
            <img src="${item.img}" class="card-img-top symbol-info " alt="${item.name}">
            <div class="card-body bgtest">
              <h5 class="card-title white-text">${item.name}</h5>
              <p class="card-text white-text">The multiplier for this symbol is ${item.multi}x</p>
            </div>
          </div>
            `

            if (count < 3) {
                slotInfoRowOne.append(product);
            } else {
                slotInfoRowTwo.append(product)
            }

            count++
        }

    }

}


let action = new slotMachine;

action.spinSlot();
action.loadItems();