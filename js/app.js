


let buttonRules = document.querySelector('.button-rules');
console.log(buttonRules)
let text = "Le but du jeu est d'avoir le plus de pions de sa couleur que \
l’adversaire à la fin de la partie. Celle-ci \
s’achève lorsque aucun des deux joueurs ne \
peut plus jouer de coup légal. Cela intervient généralement lorsque les 64 cases \
sont occupées. A son tour de jeu, le joueur doit poser un pion de sa couleur sur une \
case vide de l’othellier, adjacente à un pion adverse. Il doit également, en posant son \
pion, encadrer un ou plusieurs pions adverses entre le pion qu’il pose et un pion à sa couleur, \
déjà placé sur l’othellier. Cette prise en sandwich peut se faire aussi bien horizontalement ou \
verticalement, qu’en diagnonale. Le joueur retourne le ou les pions qu’il vient d’encadrer, qui \
devient ainsi de sa couleur. Les pions ne sont ni retirés de l’othellier, ni déplacés d’une case à l’autre."

buttonRules.onclick = () => {
    if (text == ''){
        document.querySelector('.container-regles').remove();
        jeu();
    }
        
    else {
        document.querySelector('.text-rules').textContent = text;
    text = '';
    console.log(document.querySelector('.text-rules'));
    }    
    
}


function jeu(){

let test = document.querySelector('.test');

let player1 = 0;
let player2 = 1;
let tour = 0;
let combienDeTour = 0;
let tab;
let haveAlreadyEvent = [];

grid(8,8);

initTab();

displayTab();


let playsPlayer1 = availablePlays(player1, player2);
let playsPlayer2 =  availablePlays(player2, player1);



displayPlays(playsPlayer1,playsPlayer2);

let scoreJoueur1 = document.getElementsByClassName('blanc').length;
let scoreJoueur2 = document.getElementsByClassName('noir').length;
 
document.querySelector('.scoreJoueur1').textContent = scoreJoueur1;
document.querySelector('.scoreJoueur2').textContent = scoreJoueur2;
document.querySelector('.tour').textContent = combienDeTour;

// créer une grille de row*column, ajoute les classes/id:
// x * row => y * column => y * token
// row.class = 'row i', row.id = '0i'
// column.class = 'column j', column.id = 'ij' 
// token.class = 'token', token.id = 'token ij' 

function grid(row, column){
    for (let i = 0; i < row; i++){
        let row = document.createElement('div');
        row.className = `row ${i}`;
        row.id = `0${i}`;
        console.log(row)
        for (let j = 0; j < column; j++){
            let column = document.createElement('div');
            column.className = `column ${j}`;
            column.id = `${i}${j}`;
            row.appendChild(column);
            let c = document.createElement('div');
            c.className = `token`;
            c.id = `token ${i}${j}`;
            column.appendChild(c);
        }
        test.appendChild(row).focus();
    }
}


// initialise le tableau 8x8 avec les 4 jetons au centre
function initTab(){
    tab = [];
    for (let i = 0; i < 8; i++){
        tab[i] = [];
        for (let j = 0; j < 8; j++){
            if (i === 3 && j === 3)
                tab[i][j] = 0;
            else if (i === 3 && j === 4)
                tab[i][j] = 1;
            else if (i === 4 && j === 3)
                tab[i][j] = 1;
            else if (i === 4 && j === 4)
                tab[i][j] = 0;
            else tab[i][j] = -1;
        }
    }
}

// ajoute la classe 'blanc/noir' aux jetons, suivant le joueur
function displayTab(){
    for (let i = 0; i < tab.length; i++){
        for (let j = 0; j < tab[i].length;  j++){
            if (tab[i][j] === 0){
                    if(document.getElementById(`token ${i}${j}`).classList.contains("noir"))
                        document.getElementById(`token ${i}${j}`).classList.remove("noir");
                    document.getElementById(`token ${i}${j}`).classList.add("blanc");
            }
            else if (tab[i][j] === 1){
                if(document.getElementById(`token ${i}${j}`).classList.contains("blanc"))
                        document.getElementById(`token ${i}${j}`).classList.remove("blanc");
                    document.getElementById(`token ${i}${j}`).classList.add("noir");
            }
        }
    }
}

// ajoute la classe 'availablePlays1-2' suivant les coups possibles ('playsPlayer1-2')
function displayPlays(playsPlayer1, playsPlayer2){


    for (let i = 0; i < tab.length; i ++){
        for (let j = 0; j <tab[i].length; j++){

            for (let a = 0; a < playsPlayer1.length; a++){
                let e1 = playsPlayer1[a][0];
                let e2 = playsPlayer1[a][1];
                if (e1 === i && e2 === j){
                     if(!document.getElementById(`token ${i}${j}`).classList.contains('blanc') && !document.getElementById(`token ${i}${j}`).classList.contains('availablePlays2'))
                            document.getElementById(`token ${i}${j}`).classList.add("availablePlays1")
                }
            }

            for (let a = 0; a < playsPlayer2.length; a++){
                let e1 = playsPlayer2[a][0];
                let e2 = playsPlayer2[a][1];
                if (e1 === i && e2 === j){
                     if(!document.getElementById(`token ${i}${j}`).classList.contains('noir')&& !document.getElementById(`token ${i}${j}`).classList.contains('availablePlays1'))
                            document.getElementById(`token ${i}${j}`).classList.add("availablePlays2")
                }
            }
           
        }
    }
}

// return un tableau de coups possibles sous la forme d'un tab [i,j]
function availablePlays(player1, player2){
    let plays = [];
    for (let i =0; i < tab.length; i++){
        for (let j = 0; j < tab[i].length; j++){
            if (tab[i][j] === player1){
                    
                 if (i >= 2 && tab[i-1][j] === player2){
                     let a = i;
                     while (a >= 2 && tab[a-1][j] === player2){
                         if (tab[a-2][j] === -1)
                                plays.push([a-2,j])
                        a--;
                     }
                } 
                if (i >= 2 && j >= 2 && tab[i-1][j-1] === player2){
                    let a = i;
                    let b = j;
                    while (a >= 2 && b >= 2 && tab[a-1][b-1] === player2){
                        if (tab[a-2][b-2] === -1)
                               plays.push([a-2,b-2])
                       a--;
                       b--;
                    }
               } 
               if (j >= 2 && tab[i][j-1] === player2){
                let a = j;
                while (a >= 2 && tab[i][a-1] === player2){
                    if (tab[i][a-2] === -1)
                           plays.push([i,a-2])
                   a--;
                }
                }
                if (j >= 2 && i <= 5 && tab[i+1][j-1] === player2){
                    let a = i;
                    let b = j; 
                    while (a <= 5 && b >= 2 && tab[a+1][b-1] === player2){
                        if (tab[a+2][b-2] === -1)
                               plays.push([a+2,b-2])
                       a++;
                       b--;
                    }
                }
                if (i >= 2 && j <= 5 && tab[i-1][j+1] === player2){
                    let a = i;
                    let b = j; 
                    while (a >= 2 && b <= 5 && tab[a-1][b+1] === player2){
                        if (tab[a-2][b+2] === -1)
                                plays.push([a-2,b+2])
                        a--;
                        b++;
                    }
                }
                if (i <= 5  && tab[i+1][j] === player2){
                    let a = i;
                    while (a <= 5 && tab[a+1][j] === player2){
                        if (tab[a+2][j] === -1)
                               plays.push([a+2,j])
                       a++;
                    }
               } 
               if (i <= 5 && j <= 5 && tab[i+1][j+1] === player2){
                let a = i;
                let b = j;
                    while (a <= 5 && b <= 5 && tab[a+1][b+1] === player2){
                        if (tab[a+2][b+2] === -1)
                            plays.push([a+2,b+2])
                    a++;
                    b++;
                    }
                } 
                if (j <= 5 && tab[i][j+1] === player2){
                    let a = j;
                        while (a <= 6 && tab[i][a+1] === player2){
                            if (tab[i][a+2] === -1)
                                plays.push([i,a+2])
                        a++;
                        }
                }
                } 

            }   
        }
        return plays;
    }
    

// modifier tab, suivant un tab t: avec les indices i,j à jouer, et suivant un joueur
function playToken(t, player1, player2){
    combienDeTour++;
    tab[t[0]][t[1]] = player1;
    updateTab(t, player1, player2);
    resetAvailablePlays();
    playsPlayer1 = availablePlays(player1, player2);
    playsPlayer2 =  availablePlays(player2, player1);
    displayPlays(playsPlayer1,playsPlayer2);
    displayTab();
    updateTabScores();
    tour++;
    console.log(tour+' t1');
  
         setTimeout(() => {
        if (playsPlayer2.length !== 0){
            console.log("/////////////////")
            console.log(tab);
            console.log(playsPlayer2);

                let oui = randomIA();
                console.log(oui+' JOUÉE')
                tab[oui[0]][oui[1]] = player2;
                updateTab(oui, player2, player1);
                resetAvailablePlays();
                playsPlayer1 = availablePlays(player1, player2);
                playsPlayer2 =  availablePlays(player2, player1);
                displayPlays(playsPlayer1,playsPlayer2);
                displayTab();
                updateTabScores();
                tour--;
                animation();
                console.log(tour+' t2')
        }
            
    }, 4000)
    
    animation();
   
    
}

function resetAvailablePlays(){
    document.querySelectorAll('.token').forEach(function(e){
        e.classList.remove('availablePlays1');
        e.classList.remove('availablePlays2');
        e.style.backgroundColor = '';
    })
    availablePlaysEventPlayer1.forEach(e => {
        console.log('reset')
        e.removeEventListener('click', function(){eventClick(e)});
        e.removeEventListener('mouseenter', function(){eventMouseEnter(e)});
        e.removeEventListener('mouseleave', function(){eventMouseLeave(e)});
    })

} 

function changeLine(i,j,d, player){
    if (d === 'h'){
        for (let a = i; a >= 0 ; a--){
            if (tab[a][j] === player)
                return true;
        }
    } else if (d === 'hg'){
        let a = i;
        let b = j;
        while (a >= 0 && b >= 0){
            if (tab[a][b] === player)
                return true;
            a--;
            b--;
        }
    } else if (d === 'g'){
        for (let a = j; a >= 0 ; a--){
            if (tab[i][a] === player)
                return true;
        }
    } else if (d === 'bg'){
        let a = i;
        let b = j;
        while (a <= 7 && b >= 0){
            if (tab[a][b] === player)
                return true;
            a++;
            b--;
        }
    } else if (d === 'hd'){
        let a = i;
        let b = j;
        while (a >= 0 && b <= 7){
            if (tab[a][b] === player)
                return true;
            a--;
            b++;
        }
    } else if (d === 'b'){
        for (let a = i; a <= 7 ; a++){
            if (tab[a][j] === player)
                return true;
        }
    } else if (d === 'bd'){
        let a = i;
        let b = j;
        while (a <= 7 && b <= 7){
            if (tab[a][b] === player)
                return true;
            a++;
            b++;
        }
    } else if (d === 'd'){
        for (let a = j; a <= 7 ; a++){
            if (tab[i][a] === player)
                return true;
        }
    }

}

function updateTab(t, player1, player2){
    for (let i = 0; i < tab.length; i++){
        for (let j = 0; j < tab[i].length; j++){
             if (i == t[0] && j == t[1]){

                if (changeLine(i-1,j,'h', player1) && i >= 1 && tab[i-1][j] === player2){
                    let a = i;
                    
                    while ( a >= 1 && tab[a-1][j] === player2){
                        tab[a-1][j] = player1;
                        a--;
                    }
                } 
                if (changeLine(i-1,j-1,'hg', player1) && i >= 1 && j >= 1 && tab[i-1][j-1] === player2){
                    let a = i; 
                    let b = j;
                    while (tab[a-1][b-1] === player2) {
                        tab[a-1][b-1] = player1;
                        a--;
                        b--;
                    }
                } 
                if (changeLine(i,j-1,'g', player1) && j >= 1 && tab[i][j-1] === player2){
                    let a = j;
                    while ( a >= 1 && tab[i][a-1] === player2) {
                        tab[i][a-1] = player1;
                        a--;
                    }
                } 
                if (changeLine(i+1,j-1,'bg', player1) && i <= 6 && j >= 1 && tab[i+1][j-1] === player2){
                    let a = i;
                    let b = j;
                    while (tab[a+1][b-1] === player2) {
                        tab[a+1][b-1] = player1;
                        a++;
                        b--;
                    }
                }
                if (changeLine(i-1,j+1,'hd', player1) && i >= 1 && j <= 6 && tab[i-1][j+1] === player2){
                    let a = i;
                    let b = j;
                    while (tab[a-1][b+1] === player2) {
                        tab[a-1][b+1] = player1;
                        a--;
                        b++;
                    }
                }
                if (changeLine(i+1,j,'b', player1) && i <= 6 && tab[i+1][j] === player2){
                    let a = i;
                    while (tab[a+1][j] === player2) {
                        tab[a+1][j] = player1;
                        a++;
                    }
                }
                if ( changeLine(i+1,j+1,'bd', player1) && i <= 6 && j <= 6 && tab[i+1][j+1] === player2){
                    let a = i;
                    let b = j;
                    while (tab[a+1][b+1] === player2) {
                        tab[a+1][b+1] = player1;
                        a++;
                        b++;
                    }
                }
                if (changeLine(i,j+1,'d', player1) && j <= 6 && tab[i][j+1] === player2){
                    let a = j;
                    while (tab[i][a+1] === player2) {
                        tab[i][a+1] = player1;
                        a++;
                    }
                }
            }
        }
    }
}

function randomIA(){
    let r = Math.random() * 100 ;
    let rr = Math.floor(r / playsPlayer2.length);
    rr = Math.floor(rr / 10);
    if (rr >= 1)
        rr -= 1;
    return playsPlayer2[rr]
}

function updateTabScores(){
    scoreJoueur1 = document.getElementsByClassName('blanc').length;
    scoreJoueur2 = document.getElementsByClassName('noir').length;
    document.querySelector('.scoreJoueur1').textContent = scoreJoueur1;
    document.querySelector('.scoreJoueur2').textContent = scoreJoueur2;
    document.querySelector('.tour').textContent = combienDeTour;
}


let availablePlaysEventPlayer1 = document.querySelectorAll('.availablePlays1');
let availablePlaysEventPlayer2 = document.querySelectorAll('.availablePlays2');

animation();


var eventClick =function(e) {
    console.log("clicked//////////////////////")
        let regexp = e.id.match(/[0-9]/g);
        playToken(regexp, player1, player2);
}

function eventMouseEnter(e){
        let available = e.classList.contains('availablePlays1');
        let contain = e.classList.contains('blanc');
        if (!contain && available)
            e.classList.replace('availablePlays1', 'eblanc');
}

function eventMouseLeave(e){
        let available = e.classList.contains('eblanc');
        let contain = e.classList.contains('blanc');
        if (!contain && available)
            e.classList.replace('eblanc', 'availablePlays1');
}


function animation(){

    availablePlaysEventPlayer1 = document.querySelectorAll('.availablePlays1');
    availablePlaysEventPlayer2 = document.querySelectorAll('.availablePlays2');

        availablePlaysEventPlayer1.forEach(e => {
            if (!haveAlreadyEvent.includes(e)){
                haveAlreadyEvent.push(e);
                e.addEventListener('click', function(){eventClick(e), this.removeEventListener('click', arguments.callee);});
            }
            e.addEventListener('mouseenter', function(){eventMouseEnter(e)});
            e.addEventListener('mouseleave', function(){eventMouseLeave(e)});
        })
    
}

}
