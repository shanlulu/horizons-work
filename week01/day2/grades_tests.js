"use strict";

describe("grades.average(arr)", function() {
  it("should return a number", function() {
    expect(grades.average([0, 2, 3, -1])).toEqual(jasmine.any(Number));
  });
  
  it("should return 0 with an empty array", function() {
    expect(grades.average([])).toBe(0);
  });
  
  it("should return 4/3 for [1, 2, 1]", function() {
    expect(grades.average([1, 2, 1])).toEqual(4/3);
  });
  
  it("should return -7/3 for [-12, 9, -4]", function() {
    expect(grades.average([-12, 9, -4])).toEqual(-7/3);
  });
});

describe("grades.getGPA(student)", function() {
  it("should return a number", function() {
    expect(grades.getGPA(studentData[0])).toEqual(jasmine.any(Number));
  });
  
  it("should properly calculate student GPA", function() {
    expect(grades.getGPA(studentData[0])).toEqual(2);
    expect(grades.getGPA(studentData[1])).toEqual(2.5);
    expect(grades.getGPA(studentData[2])).toEqual(1.5);
  });
});

describe("grades.highestGPA(data)", function() {
  it("should return an object", function() {
    expect(grades.highestGPA(studentData)).toEqual(jasmine.any(Object));
  });
  
  it("should say the student with the highest GPA is Scott", function() {
    expect(grades.highestGPA(studentData).name).toBe("Scott");
  });

});

describe("grades.majorWithHighestGPA(data)", function() {
  it("should return a string", function() {
    expect(grades.majorWithHighestGPA(studentData)).toEqual(jasmine.any(String));
  });
  
  it("should correspond to an existing major", function() {
    var majors = studentData.map(function(student) {
      return student.major;
    });    
    expect(majors.indexOf(grades.majorWithHighestGPA(studentData))).not.toBe(-1);

  });
  
  it("should say the major with the highest GPA is Film Studies", function() {
    expect(grades.majorWithHighestGPA(studentData)).toBe("Film Studies");
  });

});

describe("grades.avgGPAPerClass(data)", function() {
  it("should return an object", function() {
    expect(grades.avgGPAPerClass(studentData)).toEqual(jasmine.any(Object));
  });
  
  it("should have two keys, `class1` and `class2`", function() {
    expect(grades.avgGPAPerClass(studentData).class1).toBeDefined();
    expect(grades.avgGPAPerClass(studentData).class2).toBeDefined();
  });
  
  it("should be around 2.488 and 2.644 for class1 and class2 respectively", function() {
    expect(grades.avgGPAPerClass(studentData).class1).toBe(112 / 45);
    expect(grades.avgGPAPerClass(studentData).class2).toBe(119 / 45);
  });

});
