var unitObj = {
    'name': 'Warrior',
    'lvl': 1,
    'hp': 20,
    'mp': 0,
    'agi': 9,
    'def': 13,
    'int': 6,
    'luck': 8,
    'str': 14,
    'wis': 7,
    'img': 'https://play.retro-mmo.com/res/images/inns/girl.png'
};

var spiderObj = {
    'name': 'spider',
    'lvl': 1,
    'hp': 7,
    'mp': 0,
    'agi': 5,
    'def': 12,
    'int': 5,
    'luck': 5,
    'str': 6,
    'wis': 5,
    'img': 'https://play.retro-mmo.com/res/images/monsters/spider.png'
};

var lizardObj = {
    'name': 'lizard',
    'lvl': 1,
    'hp': 7,
    'mp': 0,
    'agi': 5,
    'def': 12,
    'int': 5,
    'luck': 5,
    'str': 6,
    'wis': 5,
    'img': 'https://play.retro-mmo.com/res/images/monsters/lizard.png'
};

var playArr = [];
var enemyArr = [];
var enemies = document.getElementById('enemies');
var party = document.getElementById('party');
var ability = {
    'attack': 100
};

function getAbility(abilityName) {
    return {'physicalPower': 100};
}

const getRandomlyVariedNumber = (number, variance) => number * (Math.random() * variance * 2 + (1 - variance));

const getAbilityPhysicalDamage = (abilityName, strength, defense)=> {
    const ability = getAbility(abilityName);
    const roll = (strength - defense / 4) * ability.physicalPower / 100;
    const variance = 0.8 * Math.pow(roll, -0.45);
    const damage = Math.round(getRandomlyVariedNumber(roll, variance));
    return damage > 0 ? damage : 1;
};

function simulateBattle() {
    var wins = 0;
    var rounds = parseInt(document.getElementById('battles').value);
    var heroGroup = [];
    var enemyGroup = [];

    if (playArr.length == 0 || enemyArr.length == 0) {
        return;
    }

    // Setting up the hero party
    for (var j = 0; j < playArr.length; j++) {
        var tempObj = {
            'hp': parseInt(document.getElementById(`p${j+1}-hp`).value),
            'mp': parseInt(document.getElementById(`p${j+1}-mp`).value),
            'agi': parseInt(document.getElementById(`p${j+1}-agi`).value),
            'def': parseInt(document.getElementById(`p${j+1}-def`).value),
            'int': parseInt(document.getElementById(`p${j+1}-int`).value),
            'luck': parseInt(document.getElementById(`p${j+1}-luck`).value),
            'str': parseInt(document.getElementById(`p${j+1}-str`).value),
            'wis': parseInt(document.getElementById(`p${j+1}-wis`).value)
        };
        heroGroup.push(tempObj);
    }

    // Setting up the enemy group
    for (var j = 0; j < enemyArr.length; j++) {
        var tempObj = {
            'hp': parseInt(document.getElementById(`e${j+1}-hp`).value),
            'mp': parseInt(document.getElementById(`e${j+1}-mp`).value),
            'agi': parseInt(document.getElementById(`e${j+1}-agi`).value),
            'def': parseInt(document.getElementById(`e${j+1}-def`).value),
            'int': parseInt(document.getElementById(`e${j+1}-int`).value),
            'luck': parseInt(document.getElementById(`e${j+1}-luck`).value),
            'str': parseInt(document.getElementById(`e${j+1}-str`).value),
            'wis': parseInt(document.getElementById(`e${j+1}-wis`).value)
        };
        enemyGroup.push(tempObj);
    }

    var remainingHP = 0;
    for (var i = 0; i < rounds; i++) {
        var finished = false;
        // var tempParty = [...heroGroup];
        // var tempEnemy = [...enemyGroup];
        var tempParty = [];
        var tempEnemy = [];

        // Setting up the hero party
        for (var j = 0; j < playArr.length; j++) {
            var tempObj = {
                'hp': parseInt(document.getElementById(`p${j+1}-hp`).value),
                'mp': parseInt(document.getElementById(`p${j+1}-mp`).value),
                'agi': parseInt(document.getElementById(`p${j+1}-agi`).value),
                'def': parseInt(document.getElementById(`p${j+1}-def`).value),
                'int': parseInt(document.getElementById(`p${j+1}-int`).value),
                'luck': parseInt(document.getElementById(`p${j+1}-luck`).value),
                'str': parseInt(document.getElementById(`p${j+1}-str`).value),
                'wis': parseInt(document.getElementById(`p${j+1}-wis`).value)
            };
            tempParty.push(tempObj);
        }

        // Setting up the enemy group
        for (var j = 0; j < enemyArr.length; j++) {
            var tempObj = {
                'hp': parseInt(document.getElementById(`e${j+1}-hp`).value),
                'mp': parseInt(document.getElementById(`e${j+1}-mp`).value),
                'agi': parseInt(document.getElementById(`e${j+1}-agi`).value),
                'def': parseInt(document.getElementById(`e${j+1}-def`).value),
                'int': parseInt(document.getElementById(`e${j+1}-int`).value),
                'luck': parseInt(document.getElementById(`e${j+1}-luck`).value),
                'str': parseInt(document.getElementById(`e${j+1}-str`).value),
                'wis': parseInt(document.getElementById(`e${j+1}-wis`).value)
            };
            tempEnemy.push(tempObj);
        }
        
        while (!finished) {
            for (var j = 0; j < tempParty.length && !finished; j++) {
                tempEnemy[tempEnemy.length-1].hp = tempEnemy[tempEnemy.length-1].hp - getAbilityPhysicalDamage('attack', tempParty[j].str, tempEnemy[tempEnemy.length -1].def);
                if (tempEnemy[tempEnemy.length-1].hp <= 0) {
                    tempEnemy.pop();
                    if (tempEnemy.length == 0) {
                        finished = true;
                        j = tempParty.length;
                        remainingHP += tempParty[0].hp;
                        wins = wins + 1;
                    }
                }
            }
            for (var j = 0; j < tempEnemy.length && !finished; j++) {
                tempParty[tempParty.length-1].hp = tempParty[tempParty.length-1].hp - getAbilityPhysicalDamage('attack', tempEnemy[j].str, tempParty[tempParty.length -1].def);
                if (tempParty[tempParty.length-1].hp <= 0) {
                    tempParty.pop();
                    if (tempParty.length == 0) {
                        j = tempEnemy.length;
                        finished = true;
                    }
                }
            }
        }
    }
    console.log(`Average HP on win: ${remainingHP / rounds}`);

    document.getElementById('results').textContent = `${Math.round((wins / rounds)*10)*10}% win rate`;
}

function clearAll() {
    playArr = [];
    enemyArr = [];
    enemies.innerHTML = "";
    party.innerHTML = "";
}

function createDOMStats(id, object) {
    var statsForm = document.createElement('form');
    statsForm.id = `${id}-form`;
    for (x in object) {
        if (x == 'name' || x == 'img') {
            // console.log(unitObj[x]);
        }
        else {
            var label = document.createElement('label');
            var input = document.createElement('input');
            input.type = 'number';
            label.innerText = x.toUpperCase();
            input.id = `${id}-${x}`;
            input.value = object[x];
            statsForm.appendChild(label);
            statsForm.appendChild(input);
        }
        
    }
    return statsForm;
}

const monsters = document.querySelectorAll('.monster img');
monsters.forEach(function(monster) {
    monster.addEventListener('click', function() {
        if (enemyArr.length < 5) {
            var tempEnemy = {...unitObj};
            tempEnemy.img = this.getAttribute('src');
            tempEnemy.name = tempEnemy.img.split('/').pop().split('.')[0]
            enemyArr.push(tempEnemy)
            var enem = document.createElement('div');
            enem.className = 'enemy';
            var enemyTitle = document.createElement('p');
            enemyTitle.textContent = tempEnemy.name;
            var enemyImg = document.createElement('img');
            enemyImg.src = tempEnemy.img;
            enem.appendChild(enemyTitle);
            enem.appendChild(enemyImg);
            if (tempEnemy.name == 'spider') {
                enem.appendChild(createDOMStats(`e${enemyArr.length}`, spiderObj));
            }
            else if (tempEnemy.name == 'lizard') {
                enem.appendChild(createDOMStats(`e${enemyArr.length}`, lizardObj));
            }
            enemies.appendChild(enem);
        }
    })
})

const players = document.querySelectorAll('.player-container p');
players.forEach(function(player) {
    player.addEventListener('click', function() {
        if (playArr.length < 1) {
            var tempPlayer = {...unitObj};
            tempPlayer.name = this.textContent;
            playArr.push(tempPlayer);
            var play = document.createElement('div');
            play.className = 'player';
            var playerTitle = document.createElement('p');
            playerTitle.textContent = tempPlayer.name;
            var playerImg = document.createElement('img');
            playerImg.src = tempPlayer.img;
            play.appendChild(playerTitle);
            play.appendChild(playerImg);
            play.appendChild(createDOMStats(`p${playArr.length}`, unitObj));
            party.appendChild(play);
        }
    })
})