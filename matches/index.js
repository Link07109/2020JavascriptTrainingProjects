var json
var isFileLoaded
var input = process.stdin
var output = process.stdout

input.setEncoding('utf-8')
output.write('Enter a file path: ')

input.on('data', function (data) {
    if (isFileLoaded) {
        if (/^\d+$/.test(Number(data))) { // check if the input is an integer
            var matchesWithTeam = []
            var message = `Team ${Number(data)} is in the following matches:\n`
    
            json.forEach(match => {
                if (match.alliances.blue.team_keys.includes(`frc${Number(data)}`) | match.alliances.red.team_keys.includes(`frc${Number(data)}`)) {
                    matchesWithTeam.push(match)
                }
            })
    
            var tableObject
            var tableArray = []
            var blueAlliance = []
            var redAlliance = []
    
            matchesWithTeam.forEach(match => {
                match.alliances.blue.team_keys.forEach(team => {
                    blueAlliance.push(Number(team.replace(/frc/g, ' ')))
                })
                match.alliances.red.team_keys.forEach(team => {
                    redAlliance.push(Number(team.replace(/frc/g, ' ')))
                })
    
                tableObject = {
                    'match': match.match_number,
                    'compLevel': match.comp_level,
                    'blueAlliance': blueAlliance,
                    'redAlliance': redAlliance,
                }
    
                tableArray.push(tableObject)
                // message += `Match ${match.match_number} (${match.comp_level}): ${blueAlliance.toString()} | ${redAlliance.toString()}\n` // the way vijay shows
                
                blueAlliance = []
                redAlliance = []
            })
            console.log(message)
            console.table(tableArray)
            output.write('Enter a team: ')
        } else {
            console.log('Input is not a valid team number.')
            output.write('Enter a team: ')
            return
        }
    } else {
        try {
            json = require(data.trim())
            console.log(`File ${data.trim()} loaded successfully.`)
            isFileLoaded = true
            output.write('Enter a team: ')
        } catch(e) {
            console.log(`Input is not a recognized JSON file.`)
            output.write('Enter a file path: ')
            return
        }
    }
})
