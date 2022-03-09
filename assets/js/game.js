// Game States
// "WIN" - Player robt has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
//  "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var startGame = function() {

    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++){
        if (playerHealth > 0){
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        
            var pickedEnemyName = enemyNames[i];
    
            enemyHealth = 50;
    
            //debgugger
    
            fight(pickedEnemyName);
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    //after the loop ends, the player is either out of health or enemies to fight, so run the endGame function.
    endGame();
}

var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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

 var fight = function(enemyName) {
    while(enemyHealth > 0  && enemyHealth > 0){
        //window.alert("Welcome to Robot Gladiators!");
        var promptFight = window.prompt("Would you like ot FIGHT OR SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);
        // var promptFight = "fight";

        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you's like to quit?");


            // if yes (true), leave fight
            if(confirmSkip) {
                console.log(playerName + " has chosen to skip the fight!");
                // subtract money from playerMoney fo skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney " + playerMoney);
                window.alert("playerMoney " + playerMoney);
                break;
                // if no (false), ask question again by running fight() again
            }
        }

        // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {

            //remove enemy's health by subtracting the amount set in the playerAttack variable.
            enemyHealth = enemyHealth - playerAttack;
    
        // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                console.log(enemyName + " has died!");
                break;
            }else {
                console.log(enemyName + " still has " + enemyHealth + " health left.");
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }
    
            // remove player's health by subtracting teh amount set in the enemyAttack variable
            playerHealth = playerHealth - enemyAttack;
    
            // check player's health
            if (playerHealth <= 0) {
                console.log(playerName + " has died!");
                window.alert(playerName + " has died!");
                break;
            }else {
                console.log(playerName + " still has " + playerHealth + " health left.");
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    } 
}

startGame();