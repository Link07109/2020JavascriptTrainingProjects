var input = process.stdin
var output = process.stdout

input.setEncoding('utf-8')
output.write("Enter a prompt: ")

input.on('data', function (data) {
    if (data == 'exit\r\n') {
        console.log("Closing program...")
        process.exit()
    } else {
        console.log(`You entered: ${data}\n`)
        output.write("Enter a prompt: ")
    }
})