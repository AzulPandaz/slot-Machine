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
            // https://pokemondb.net/sprites this is where the images will come from
            symbol1: {
                id: 1,
                multi: 1,
                img: "/media/charmander.png",
                name: "Charmander"
            },
            symbol2: {
                id: 2,
                multi: 2,
                img: "/media/pikachu.png",
                name: "Pickachu"
            },
            symbol3: {
                id: 3,
                multi: 3,
                img: "/media/wooloo.png",
                name: "Wooloo"
            },
            symbol4: {
                id: 4,
                multi: 4,
                img: "/media/cinccino.png",
                name: "Cinccino"
            },
            symbol5: {
                id: 5,
                multi: 5,
                img: "/media/darkrai.png",
                name: "Cinccino"
            },
            symbol6: {
                id: 6,
                multi: 6,
                img: "/media/zacian-crowned.png",
                name: "Cinccino"
            }
            
            // Premium Symbol
            
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
            var slotOneOneIdx = Math.ceil(Math.random() * 6)
            var slotOneTwoIdx = Math.ceil(Math.random() * 6)
            var slotOneThreeIdx = Math.ceil(Math.random() * 6)
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
                    }else if(slotResult[count] == 5){
                        element.innerHTML =`
                        <img src="${this.symbols.symbol5.img}" alt="" class="symbol-img">
                        `
                    }else if(slotResult[count] == 6){
                        element.innerHTML =`
                        <img src="${this.symbols.symbol6.img}" alt="" class="symbol-img">
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

            if (this.currency.totalCurrency > this.currency.betSize) {
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
        let count = 0;
        let slotInfoRowOne = document.getElementById('symbolRowOne');
        let slotInfoRowTwo = document.getElementById('symbolRowTwo');

        for(const key in this.symbols){
            const item = this.symbols[key]
            const product = document.createElement('div')
            product.className = 'col-4 symbol product'
            product.innerHTML=`<div class="card" style="width: 18rem;">
            <img src="${item.img}" class="card-img-top symbol-info " alt="${item.name}">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">The multiplier for this symbol is ${item.multi}</p>
            </div>
          </div>
            `

            if(count < 3){
                slotInfoRowOne.append(product);
            } else{
                slotInfoRowTwo.append(product)
            }
            
            count++
        }

    }

}


let action = new slotMachine;

action.spinSlot();
action.loadItems();
// action.winningSpins();
console.log("Test")