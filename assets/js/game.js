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

            // if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {

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
        shopOptionPrompt = window.prompt("Would you like ot REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', OR 'LEAVE' to make a choice.");
        switch (shopOptionPrompt) {
            case "refill":
            case "REFILL":
                if (playerMoney >= 7) {
                    window.alert("Refilling player's health by 20 for 7 dollars");

                    //increase health and decrease money
                    playerAttack = playerHealth + 20;
                    playerMoney = playerMoney -7;
                } else {
                    window.alert("You don't have enough money!");
                }

                break;
            case "upgrade":
            case "UPGRADE":
                if (playerMoney >= 7) {
                    window.alert("Upgrading player's attack by 6 for 7 dollars.");

                    //increase attack and decrease money
                    playerAttack = playerAttack + 6;
                    playerMoney = playerMoney - 7;
                } else {
                    window.alert("You don't have enough money!");
                }

                break;
            case "leave":
            case "LEAVE":
                window.alert("Leaving the store.");

                //do nothing, so the function will end
                shopping = false;
                break;
            default:
                window.alert("You did not pick a valid option. Try again.");

                // call shop() again to force player to pick a valid option
                shop();
                break;
        }
    }
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