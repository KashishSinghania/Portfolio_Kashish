let boxes=document.querySelectorAll(".box");
let player0=true;
const winningpatterns=[
[0, 1, 2],
[0, 3, 6],
[0, 4, 8],
[1, 4, 7],
[2, 5, 8],
[2, 4, 6],
[3, 4, 5],
[6, 7, 8],
];
let count=0;
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(player0){
            box.style.color="red";
            box.innerText="O";
            player0=false;
        }
        else{
            box.style.color="black";
            box.innerText="X";
            player0=true;
        }
        box.disabled=true;
        count++;
        // if(checkWinner()) console.log("winner");
        if(!checkWinner()&&count==9){
            draw();
        }
    });
});

const enableBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=false;
        box.innerText="";
    });
}

const disableBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=true;
    });
}

let msg=document.querySelector("#msg");
let msgcontainer=document.querySelector(".msg-container");
const showWinner=(postVal)=>{
    msg.innerText=`Congratulations! \nWinner is Player ${postVal}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const draw=()=>{
    msg.innerText=`Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=()=>{
    for(let patterns of winningpatterns){
        let posVal1=boxes[patterns[0]].innerText;
        let posVal2=boxes[patterns[1]].innerText;
        let posVal3=boxes[patterns[2]].innerText;
        if(posVal1!="" && posVal2!="" && posVal3!=""){
            if(posVal1===posVal2 && posVal2===posVal3){
                showWinner(posVal1);
                return true;
            }
        }
    }
};

let newgame=document.querySelector("#new-btn");
let reset=document.querySelector("#reset-btn");
const resetGame = () => {
    player0 = true;
    count = 0;
    enableBoxes();
    msgcontainer.classList.add("hide");
  };
newgame.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
