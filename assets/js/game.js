var startGame = function() {

    // reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++){
        if (playerInfo.health > 0){
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        
            var pickedEnemyObj = enemyInfo[i];
    
            pickedEnemyObj.health = randomNumber(40, 60);
    
            //debgugger
    
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {

                //ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm){
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    //after the loop ends, the player is either out of health or enemies to fight, so run the endGame function.
    endGame();
}

var shop = function() {
    // ask the player what they'd like to do
    var shopOptionPrompt = "";
    var shopping = true; // indicates if player is still shopping

    // stay in shop until player chooses to leave
    while (shopping === true) {
        shopOptionPrompt = window.prompt("Would you like ot REFILL your health, UPGRADE your attack, or LEAVE the store? REFILL: Press '1', UPGRADE: Press '2', LEAVE: Press '3'.");
        shopOptionPrompt = parseInt(shopOptionPrompt);
        switch (shopOptionPrompt) {
            case 1:
                playerInfo.refillHealth();
                break;
            case 2:
                playerInfo.upgradeAttack();
                break;
            case 3:
                window.alert("Leaving the store.");
                //do nothing, so the function will end
                shopping = false;
                break;
            default:
                window.alert("You did not pick a valid option. Try again.");

                // call shop() again to force player to pick a valid option
                return shop();
        }
    }
}

var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if(highScore === null){
        highScore = 0;
    }

    // if player has more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerinfo.name + "did not beat teh high score of " + highScore + ". Maybe next time!");
    }

    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

 var fight = function(enemy) {
     // keep track of who goes first
     var isPlayerTurn = true;

     if(Math.random() > 0.5) {
         isPlayerTurn = false;
     }

    while(playerInfo.health > 0  && enemy.health > 0){
        

        if(isPlayerTurn) {
            // ask player if they would like to fight or skip
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }

            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
        
            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                console.log(enemy.name + " has died!");
                break;
            }else {
                console.log(enemy.name + " still has " + enemy.health + " health left.");
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        }

        if(!isPlayerTurn){
            // generate random damage value based on enemy's attack power
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            
            // check player's health
            if (playerInfo.health <= 0) {
                console.log(playerInfo.name + " has died!");
                window.alert(playerInfo.name + " has died!");
                break;
            }else {
                console.log(playerInfo.name + " still has " + playerInfo.health + " health left.");
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
    
        isPlayerTurn = !isPlayerTurn;   
    } 
}

var fightOrSkip = function(){
    // ask player if they'd like ot fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    promptFight = promptFight.toLowerCase();

    if (!(promptFight === "fight" || promptFight === "skip")) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you's like to quit?");

        // if yes (true), leave fight
        if(confirmSkip) {
            console.log(playerInfo.name + " has chosen to skip the fight!");
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerInfo.money fo skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            // return true if player wants to leave
            return true;
        }  
        return false;
    }
}

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}



var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 30,
    reset: function() {
        this.health = 100;
        this.money = 30;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            winddow.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7){
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

startGame();