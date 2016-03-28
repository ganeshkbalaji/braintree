const assert = require('assert')

function Card (name, number, limit, balance, error){
  this.name = name;
  this.number = number;
  this.limit = limit;
  this.balance = 0;
  this.error = false;
}

// takes the form field value and returns true on valid number
function validCreditCardLuhn(value) {
  // accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm.
  var nCheck = 0, nDigit = 0, bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) == 0;
}

module.exports = {
    Card: Card,
    validCreditCard: validCreditCardLuhn
};


