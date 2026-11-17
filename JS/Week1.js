



// Age-ify (A future age calculator)
let yearOfBirth = 1993;
let yearFuture = 2027;
let age = yearFuture - yearOfBirth;
console.log("You will be " + age + " years old in " + yearFuture);

// Goodboy-Oldboy (A dog age calculator)
let dogYearOfBirth = 2017;
let dogYearFuture = 2027;
let dogYear = dogYearFuture - dogYearOfBirth;
const shouldShowResultInDogYears = true;
if (shouldShowResultInDogYears) {
    console.log("Your dog will be " + dogYear * 7 + " dog years old in " + dogYearFuture);
} else {
    console.log("Your dog will be " + dogYear + " human years old in " + dogYearFuture);
}
 //


// House price (A house price estimator)
// Peter

const peterWidth = 8;
const peterDepth = 10;
const peterHeight = 10;
const peterGardenSize = 100;
const peterPrice = 2500000;
const peterVolume = peterWidth * peterDepth * peterHeight;
const peterHousePrice = peterVolume * 2.5 * 1000 + peterGardenSize * 300;
console.log("Peter's estimated price is: " + peterHousePrice);
console.log("Peter's actual price is: " + peterPrice);
if (peterPrice > peterHousePrice) {
    console.log("Peter is paying too much");
} else {
    console.log("Peter is paying too little");
}


// Julia

const juliaWidth = 5;
const juliaDepth = 11;
const juliaHeight = 8;
const juliaGardenSize = 70;
const juliaPrice = 1000000;
const juliaVolume = juliaWidth * juliaDepth * juliaHeight;
const juliaHousePrice = juliaVolume * 2.5 * 1000 + juliaGardenSize * 300;
console.log("Julia's estimated price is: " + juliaHousePrice);
console.log("Julia's actual price is: " + juliaPrice);
if (juliaPrice > juliaHousePrice) {
    console.log("Julia is paying too much");
} else {
    console.log("Julia is paying too little");
}






