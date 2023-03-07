

var createSubscriber = require("pg-listen");
var connObj = require("../config/db");

//var connStr =`dbname=${connObj.database}, host=${connObj.host}, user=${connObj.user}, passwd=${connObj.password}`;
var connStr =`postgres://${connObj.user}:${connObj.password}@localhost/${connObj.database}`;

// Accepts the same connection config object that the "pg" package would take
const subscriber = createSubscriber({ connectionString: connStr })

subscriber.notifications.on("watchers", (payload) => {
  // Payload as passed to subscriber.notify() (see below)
  console.log("Received notification in channel [watchers]:", payload)
})

subscriber.events.on("error", (error) => {
  console.error("Fatal database connection error:", error)
  process.exit(1)
})

process.on("exit", () => {
  subscriber.close()
})

exports.connect = async function connect () {
  await subscriber.connect()
  await subscriber.listenTo("watchers")
}


/*

export async function sendSampleMessage () {
  await subscriber.notify("my-channel", {
    greeting: "Hey, buddy.",
    timestamp: Date.now()
  })
}
*/