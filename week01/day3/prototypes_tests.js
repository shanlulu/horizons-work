"use strict";

 describe("allKeys(obj)", function() {

   var macBook = {
     ram: "8gb",
     processor: "i3",
   }
   var macBookPro = {
     processor: "i5",
     color: "Space gray"
   }
   var touchBarMacbook = {
     extras: "touchBar"
   };

   macBookPro.__proto__ = macBook;
   touchBarMacbook.__proto__ = macBookPro;

   it("should return all the keys on an object, that doesn't inherit.", function() {
     expect(prototypes.allKeys(macBook)).toEqual(["ram", "processor"]);
   });
   it("should return all the keys on an object. Including the parent's keys", function() {
     expect(prototypes.allKeys(macBookPro)).toEqual(["processor", "color", "ram"]);
   });
   it("should return all the keys on an object. Including the parent's keys", function() {
     expect(prototypes.allKeys(touchBarMacbook)).toEqual(["extras", "processor", "color", "ram"]);
   });

 });

  describe("keys(obj)", function() {

    var macBook = {
      ram: "8gb",
      processor: "i3",
    }
    var macBookPro = {
      processor: "i5",
      color: "Space gray"
    }
    var touchBarMacbook = {
      extras: "touchBar"
    };
    macBookPro.__proto__ = macBook;

    it("should return all the keys on an object, that doesn't inherit.", function() {
      expect(prototypes.keys(macBook)).toEqual(["ram", "processor"]);
    });
    it("should return all the keys on an object that has inheritance.", function() {
      expect(prototypes.keys(macBookPro)).toEqual(["processor", "color"]);
    });
  });
