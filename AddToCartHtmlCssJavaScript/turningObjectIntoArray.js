let scrimbaUsers = {
    "00": "sindre@scrimba.com",
    "01": "per@scrimba.com",
    "02": "frode@scrimba.com"
}
let scrimbaUsersEmails = object.values(scrimbaUsers)
let scrimbaUsersIDs = object.keys(scrimbaUsers)
let scrimbaUsersEntries = object.entries(scrimbaUsers)
console.log(scrimbaUsersEmails)
console.log(scrimbaUsersIDs)
console.log(scrimbaUsersEntries)