// Your code here

function createEmployeeRecord(employee) {
    const firstName=employee[0]
    const familyName= employee[1]
    const title = employee[2]
    const payPerHour= employee[3]
    return {firstName, familyName, title, payPerHour, timeInEvents:[], timeOutEvents:[]}
}

function createEmployeeRecords(rows) {
    const employees=rows.map(employee=>{
        const firstName=employee[0]
        const familyName= employee[1]
        const title = employee[2]
        const payPerHour= employee[3]
        return {firstName, familyName, title, payPerHour, timeInEvents:[], timeOutEvents:[]}
    })
    return employees
}

function createTimeInEvent(employee, str) {
    const time = str.split(' ')
    const timeIn = {
        type: 'TimeIn', date: time[0], hour: parseInt(time[1])
    }
    employee.timeInEvents.unshift(timeIn)
    return employee
}

function createTimeOutEvent(employee, str) {
    const time = str.split(' ')
    const timeOut = {
        type: 'TimeOut', date: time[0], hour: parseInt(time[1])
    }
    employee.timeOutEvents.unshift(timeOut)
    return employee
}
 function hoursWorkedOnDate(record, str) {
    const recordDate = record.timeInEvents.findIndex(el=> el.date === str)
    
    return (record.timeOutEvents[recordDate].hour - record.timeInEvents[recordDate].hour)/100
    
 }
 function wagesEarnedOnDate(record, str) {
    const hours = hoursWorkedOnDate(record, str)
    return hours * record.payPerHour
 }
function allWagesFor(record) {
    const dates= record.timeInEvents.map((el)=>{
        const str = el.date
        return wagesEarnedOnDate(record, str)
    })
    return dates.reduce((prev,curr)=>{
        return prev + curr
    })
    
}

function calculatePayroll(arr) {
    const allWages= arr.map((el)=>
        allWagesFor(el)
    )
    return allWages.reduce((prev,curr)=>prev+curr)
}

let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
let updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
 updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
 updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
 updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 1100")
const test=  hoursWorkedOnDate(cRecord, "0044-03-15")
// console.log(allWagesFor(cRecord))
allWagesFor(cRecord)