'use strict'
var assert = require('chai').assert;

// asserts that I have written that are frequently used
const asserts = {
/**
 * Checks that the text of an element equals the string that is expected
 * @param {string} selector - CSS selector for element to check
 * @param {string} expected - expected string that the text will equal
 * @param {module: leadfoot/Command} command - command chain
 */
  checkTextEquals: function (selector, expected, command) {
    return function () {
      return command.findByCssSelector(selector)
          .getVisibleText()
          .then((text) => assert.equal(text, expected, 'The text matches what is expected'))
          .end();
    };
  },
/**
 * Checks that the text of an element is displayed and equals the string that is expected
 * @param {string} selector - CSS selector for element to check
 * @param {string} expected - expected string that the text will equal
 * @param {module: leadfoot/Command} command - command chain
 */
  checkDisplayedTextEquals: function (selector, expected, command) {
    return function () {
      return command.findByCssSelector(selector)
          .isDisplayed()
          .then((displayed) => assert.equal(displayed, true))
          .end()
        .then(asserts.checkTextEquals(selector, expected, command));
    };
  },
/**
 * Checks that the current url is what is expected
 * @param {string} expected - expected string that the url will equal
 * @param {module: leadfoot/Command} command - command chain
 */
  checkUrlEquals: function (expected, command) {
    return function () {
      return command.getCurrentUrl()
        .then((url) => assert.equal(url, expected, 'The url matches what is expected'));
    };
  },
/**
 * Checks that the current page title is what is expected
 * @param {string} expected - expected string that the page title will equal
 * @param {module: leadfoot/Command} command - command chain
 */
  checkPageTitleEquals: function (expected, command) {
    return function () {
      return command.getPageTitle()
        .then((title) => assert.equal(title, expected, 'The page title matches what is expected'));
    };
  },
/**
 * Checks that the current page title and url are what is expected
 * @param {string} expectedUrl - expected string that the url will equal
 * @param {string} expectedTitle - expected string that the page title will equal
 * @param {module: leadfoot/Command} command - command chain
 */
  checkPage: function (expectedUrl, expectedTitle, command) {
    return function () {
      return command
        .then(asserts.checkUrlEquals(expectedUrl, command))
        .then(asserts.checkPageTitleEquals(expectedTitle, command));
    };
  }
};

module.exports = {
  asserts
};