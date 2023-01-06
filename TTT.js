document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".box");
    const status = document.querySelector("#status");
    const restart = document.querySelector("#reset");
    const Xscore = document.querySelector("#X_score");
    const Oscore = document.querySelector("#O_score");
    const srestart = document.querySelector("#sreset");

    const winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let currentplayer = "X";
    let Xwins = 0;
    let Owins = 0;
    status.innerHTML = currentplayer + "'s turn";
    let gamestatus = false;
    game();
    function game() {
        //box clicked
        boxes.forEach(box => box.addEventListener('click', function () {
            if (!gamestatus && status.innerHTML != (currentplayer + "won!"))
                box.innerHTML = currentplayer;
            playerwon();
            if (gamestatus) {
                if (currentplayer == "X" && status.innerHTML != "X won!") {
                    Xwins++;
                }
                else if (currentplayer == "O" && status.innerHTML != "O won!") {
                    Owins++;
                }
                status.innerHTML = currentplayer + ' won!';
                Xscore.innerHTML = "X score: " + Xwins;
                Oscore.innerHTML = "O score: " + Owins;
                return;
            }
            currentplayer = currentplayer == "X" ? "O" : "X";
            status.innerHTML = currentplayer + "'s turn";
        }));
        //reset game
        restart.addEventListener('click', function () {
            boxes.forEach(box => box.innerHTML = "");
            gamestatus = false;
            currentplayer = "X";
            status.innerHTML = currentplayer + "'s turn";
        })
        srestart.addEventListener('click', function () {
            Xscore.innerHTML = "X score: 0";
            Oscore.innerHTML = "O score: 0";
            Xwins = Owins = 0;
        })
    }
    //check if the player won
    function playerwon() {
        for (let condition of winCondition) {
            let [a, b, c] = condition;
            if (boxes[a].innerHTML == '' || boxes[b].innerHTML == '' || boxes[c].innerHTML == '') {
                continue;
            }
            if (boxes[a].innerHTML == boxes[b].innerHTML && boxes[b].innerHTML == boxes[c].innerHTML) {
                gamestatus = true;
                break;
            }
        }
    }

});