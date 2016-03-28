const assert = require('assert');
const creditCard = require('../credit_card.js');
const creditCardProcessor = require('../credit_processor.js');


describe('Card', function() {
  describe("constructor", function() {
    it ('should create a valid credit card with parameters passed in', function() {
      var card = new creditCard.Card("Tom", "4111111111111111");
      assert.equal("Tom", card.name);
      assert.equal("4111111111111111", card.number);
    })
  });
});

describe('validCreditCardLuhn', function() {
  it('should return true or false for a given input credit card #', function() {
    assert.equal(true, creditCard.validCreditCard('4111111111111111'));
    assert.equal(true, creditCard.validCreditCard('5454545454545454'));
    assert.equal(false, creditCard.validCreditCard('1234567890123456'));
  });
})

