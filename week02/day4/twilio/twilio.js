"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC80d5ea1278fe5641f98d21086ebb1fce";
  this.authToken = "e26e3ab85b13cff6cec0e5953b2d6eda";
  this.fromNumber = "+14159171999 ";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return $.trim(textStr).length > 0;
    // for (var i = 0; i < phoneStr.length; i++) {
    //   if (phoneStr[i] !== " ") return true;
    // }
    // return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if (phoneStr.length !== 11) return false;
    for (var i = 0; i < phoneStr.length; i++) {
      if (!'1234567890'.includes(phoneStr[i])) {
        return false;
      }
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    var self = this;
    event.preventDefault();
    var msg = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    var validMsg = this.validateMessageField(msg);
    var validPhone = this.validatePhoneField(phone);

    if (validMsg && validPhone) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + self.accountId + '/SMS/Messages', {
        success: function(x) {
          console.log('Message sent', x);
          self.displayMessage(phone, msg);
          self.messageInputField.attr('placeholder', '');
        },
        error: function(x) {
          alert("Something went wrong...");
        },
        method: 'POST',
        data: {
          From: self.fromNumber,
          To: JSON.parse(phone),
          Body: msg
        },
        headers: {
          "Authorization": "Basic " + btoa(self.accountId + ":" + self.authToken)
        }
      });
    }
  },

    // REMOVE THE NEXT LINE, IT'S FOR TEST
    //this.displayMessage('9999999999', 'Testing testing!');

  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }
};

window.twilio = new TwilioApp();
