var limit_hourly = 15 //enter the limit not to be exceeded
var consecutive_limit_hourly = 3//enter consecutive hourly

var hourly_consumption = [
  {
    "heure": 1,
    "jour": 1,
    "consommation": 0
  },
  {
    "heure": 2,
    "jour": 1,
    "consommation": 16
  },
  {
    "heure": 3,
    "jour": 1,
    "consommation": 19
  },
  {
    "heure": 4,
    "jour": 1,
    "consommation": 10
  },
  {
    "heure": 5,
    "jour": 1,
    "consommation": 0
  },
  {
    "heure": 6,
    "jour": 1,
    "consommation": 20
  },
  {
    "heure": 7,
    "jour": 1,
    "consommation": 34
  },
  {
    "heure": 8,
    "jour": 1,
    "consommation": 50
  },
  {
    "heure": 9,
    "jour": 1,
    "consommation": 0
  },
  {
    "heure": 10,
    "jour": 1,
    "consommation": 23
  },
  {
    "heure": 11,
    "jour": 1,
    "consommation": 42
  },
  {
    "heure": 12,
    "jour": 1,
    "consommation": 24
  },
  {
    "heure": 13,
    "jour": 1,
    "consommation": 26
  },
  {
    "heure": 14,
    "jour": 1,
    "consommation": 0
  },
  {
    "heure": 15,
    "jour": 1,
    "consommation": 0
  },
  {
    "heure": 16,
    "jour": 1,
    "consommation": 12
  },
  {
    "heure": 17,
    "jour": 1,
    "consommation": 1
  },
  {
    "heure": 18,
    "jour": 1,
    "consommation": 10
  },
  {
    "heure": 19,
    "jour": 1,
    "consommation": 0
  },
  {
    "heure": 20,
    "jour": 1,
    "consommation": 20
  },
  {
    "heure": 21,
    "jour": 1,
    "consommation": 12
  },
  {
    "heure": 22,
    "jour": 1,
    "consommation": 0
  },
  {
    "heure": 23,
    "jour": 1,
    "consommation": 0
  },
  {
    "heure": 24,
    "jour": 1,
    "consommation": 23
  },
  {
    "heure": 1,
    "jour": 1,
    "consommation": 0
  },
  {
    "heure": 2,
    "jour": 2,
    "consommation": 16
  },
  {
    "heure": 3,
    "jour": 2,
    "consommation": 19
  },
  {
    "heure": 4,
    "jour": 2,
    "consommation": 10
  },
  {
    "heure": 5,
    "jour": 2,
    "consommation": 0
  },
  {
    "heure": 6,
    "jour": 2,
    "consommation": 3
  },
  {
    "heure": 7,
    "jour": 2,
    "consommation": 10
  },
  {
    "heure": 8,
    "jour": 2,
    "consommation": 5
  },
  {
    "heure": 9,
    "jour": 2,
    "consommation": 0
  },
  {
    "heure": 10,
    "jour": 2,
    "consommation": 3
  },
  {
    "heure": 11,
    "jour": 2,
    "consommation": 4
  },
  {
    "heure": 12,
    "jour": 2,
    "consommation": 2
  },
  {
    "heure": 13,
    "jour": 2,
    "consommation": 26
  },
  {
    "heure": 14,
    "jour": 2,
    "consommation": 0
  },
  {
    "heure": 15,
    "jour": 2,
    "consommation": 0
  },
  {
    "heure": 16,
    "jour": 2,
    "consommation": 2
  },
  {
    "heure": 17,
    "jour": 2,
    "consommation": 9
  },
  {
    "heure": 18,
    "jour": 2,
    "consommation": 10
  },
  {
    "heure": 19,
    "jour": 2,
    "consommation": 0
  },
  {
    "heure": 20,
    "jour": 2,
    "consommation": 0
  },
  {
    "heure": 21,
    "jour": 2,
    "consommation": 12
  },
  {
    "heure": 22,
    "jour": 2,
    "consommation": 5
  },
  {
    "heure": 23,
    "jour": 2,
    "consommation": 0
  },
  {
    "heure": 24,
    "jour": 2,
    "consommation": 2
  }
]

// consumption hour by hour
var only_consumption = hourly_consumption.map(x => x.consommation)


// convert consumption to true or false (if it's true the limit has been exceeded)
var exceed_true = only_consumption.map(x => x > limit_hourly)


// only get the indices equal to true
var indices = [];
var element = true;
var idx = exceed_true.indexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = exceed_true.indexOf(element, idx + 1);
}


// we only recover the suites
var suite_w_duplicate = []
for( var i = 0; i < indices.length; i++) {
  if(indices[i] === indices[i+1] -1) {
    suite_w_duplicate.push(indices[i], indices[i+1])
  }
}


// Eliminate duplicate results
var suite_wo_duplicate = []
for(var i = 0; i < suite_w_duplicate.length; i++) {
  if(suite_w_duplicate[i] !== suite_w_duplicate[i+1]) {
    suite_wo_duplicate.push(suite_w_duplicate[i])
  }
}


// split tab with suites
var finalArray = []
var temporaryArray = []

for (var i = 0; i < suite_wo_duplicate.length; ++i) {
  if (i == 0) {
    temporaryArray.push(suite_wo_duplicate[i])
    continue
  }
  if(suite_wo_duplicate[i - 1] != (suite_wo_duplicate[i] - 1)) {
    finalArray.push(temporaryArray)
    temporaryArray = []
  }
  temporaryArray.push(suite_wo_duplicate[i])
}
finalArray.push(temporaryArray)


//eliminate the suites below the desired number of hours
var result = []
for(var i = 0; i <= finalArray.length-1; i++) {
  if(finalArray[i].length >= consecutive_limit_hourly) {
    result.push(finalArray[i])
  }
}


// index with object
var potential_leakage = []
var e = []
for(var i = 0; i < result.length; i++) {
  result[i].forEach(x => e.push(hourly_consumption[x]))
  potential_leakage.push(e)
  e = []
}
console.log('potential_leakage : \n' , potential_leakage)
