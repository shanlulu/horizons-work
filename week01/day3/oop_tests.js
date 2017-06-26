"use strict";

describe("<Student> Class", function() {
  var student = new Student("Reginald", [1, 3] , "Theater Arts");
  
  describe("the name property", function() {
    it("should exist", function() {
      expect(student.name).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(student.name).toEqual(jasmine.any(String));
    });
    
    it("should reflect the name given during construction", function() {
      expect(student.name).toBe("Reginald");
    });
  });
  
  describe("the grades property", function() {
    it("should have a exist", function() {
      expect(student.grades).toBeDefined();
    });
    
    it("should be an array", function() {
      expect(student.grades).toEqual(jasmine.any(Array));
    });
    
    it("should reflect the grades given during construction", function() {
      expect(student.grades).toEqual([1, 3]);
    });
  });
  
  describe("the major property", function() {
    it("should exist", function() {
      expect(student.major).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(student.major).toEqual(jasmine.any(String));
    });
    
    it("should reflect the major given during construction", function() {
      expect(student.major).toBe("Theater Arts");
    });
  });
  
  describe("the `getGPA` method", function() {
    it("should exist", function() {
      expect(student.getGPA).toBeDefined();
    });
    
    it("should return a number", function() {
      expect(student.getGPA()).toEqual(jasmine.any(Number));
    });
    
    it("should properly calculate the GPA", function() {
      expect(student.getGPA()).toBe(2);
    });
  });

  
});

describe("the `sortByGPA` function", function() {
   var reggie = new Student("Reggie", [1, 3], "Theater Arts");
   var betty = new Student("Betty", [4, 3], "Biology");
   var archie = new Student("Archie", [2, 2], "Accounting");
   var dilton = new Student("Dilton", [4, 4], "Engineering");
   var s1 = [reggie, betty, archie];
   var s2 = [betty, archie];
   var s3 = [dilton, reggie];
   var s4 = [reggie, dilton];
  
  it("should return an array", function() {
    expect(sortByGPA(s1)).toEqual(jasmine.any(Array));
  });
  
  it("should reflect the major given during construction", function() {
    expect(sortByGPA(s1)).toEqual([reggie, archie, betty]);
    expect(sortByGPA(s2)).toEqual([archie, betty]);
    expect(sortByGPA(s3)).toEqual(s4);
    expect(sortByGPA(s4)).toEqual(s4);
  });
});
