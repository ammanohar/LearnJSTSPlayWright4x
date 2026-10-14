let responseTime = 850; // ms
let sla = 1000; // ms
let slaStatus = responseTime <= sla ? "SLA met" : "SLA not met";
console.log(`Response time: ${responseTime} ms - ${slaStatus}`); // Response time: 850 ms - SLA met


// Template literals with ternary operator
console.log(`What is the SLA time ? - ${sla}`);