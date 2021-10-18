/*
 * Validate JSON
 *
 * This method validates the list of JSON messages for proposals. It checks every message in the list, assuring it conforms roughly to the
 * Cosmos SDK's RPC spec:
 *
 * https://docs.cosmos.network/master/core/proto-docs.html
 *
 * Ideally, it would check that each message compiles into a valid RPC message.
 * For now, it just checks that each method *looks* like an RPC message. This
 * allows folks who define custom messages to not mess around with this
 * validation code.
 *
 * Remember: we don't have to worry about this validation for security reasons.
 * We can trust the RPC to validate these messages. If a user decides to emit
 * carefully-crafted messages to mess with an RPC endpoint, (1) we can't stop
 * them and (2) that's upstream of us.
 *
 */


// Takes the first object nested inside an object.
// This method assumes objects have only one object inside them!
function innerValue (obj: object) {
  return Object.values(obj)[0]
}


function isValidMsg (json: any): boolean {
  // input must be parseable as json!
  // if it's parseable, check that it's valid
  try {
    // valid messages look like this:
    //    { bank: { send: {"@type": ... } } }
    // we'll go two levels deep to take the inner object
    let inner = innerValue(innerValue(json))
    // if it has a valid, string-y @type,
    let typeDef: string = inner['@type']
    // it's fine for now
    return typeDef.length > 0
  } catch {
    // otherwise , reject it
    return false
  }
  return false
}


function isValidJson(json: any): boolean {
  if (Array.isArray(json)) {
    return json.map(isValidMsg).every(x => x==true)
  }
  return false
}


export default isValidJson;
