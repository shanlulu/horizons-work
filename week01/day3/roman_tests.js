"use strict";

describe("roman.parse()", function() {
  it("roman.parse('XXVIII') -> 28", function() {
    expect(roman.parse('XXVIII') ).toBe(28);
  });
  it("roman.parse('CCCXXVII') -> 327", function() {
    expect(roman.parse('CCCXXVII') ).toBe(327);
  });
  it("roman.parse('CCCXLV') -> 345", function() {
    expect(roman.parse('CCCXLV') ).toBe(345);
  });
  it("roman.parse('CCCLIX') -> 359", function() {
    expect(roman.parse('CCCLIX') ).toBe(359);
  });
  it("roman.parse('CDV') -> 405", function() {
    expect(roman.parse('CDV') ).toBe(405);
  });
  it("roman.parse('DCCIX') -> 709", function() {
    expect(roman.parse('DCCIX') ).toBe(709);
  });
  it("roman.parse('DCCLII') -> 752", function() {
    expect(roman.parse('DCCLII') ).toBe(752);
  });
  it("roman.parse('MCCIX') -> 1209", function() {
    expect(roman.parse('MCCIX') ).toBe(1209);
  });
  it("roman.parse('MCCLXXXVIII') -> 1288", function() {
    expect(roman.parse('MCCLXXXVIII') ).toBe(1288);
  });
  it("roman.parse('MDXXI') -> 1521", function() {
    expect(roman.parse('MDXXI') ).toBe(1521);
  });
  it("roman.parse('MDLXXXV') -> 1585", function() {
    expect(roman.parse('MDLXXXV') ).toBe(1585);
  });
  it("roman.parse('MDCXLIX') -> 1649", function() {
    expect(roman.parse('MDCXLIX') ).toBe(1649);
  });
  it("roman.parse('MDCCLXXII') -> 1772", function() {
    expect(roman.parse('MDCCLXXII') ).toBe(1772);
  });
  it("roman.parse('MDCCCX') -> 1810", function() {
    expect(roman.parse('MDCCCX') ).toBe(1810);
  });
  it("roman.parse('MCMLXXXII') -> 1982", function() {
    expect(roman.parse('MCMLXXXII') ).toBe(1982);
  });
  it("roman.parse('MMLXVI') -> 2066", function() {
    expect(roman.parse('MMLXVI') ).toBe(2066);
  });
  it("roman.parse('MMLXXXVII') -> 2087", function() {
    expect(roman.parse('MMLXXXVII') ).toBe(2087);
  });
  it("roman.parse('MMCXXXVIII') -> 2138", function() {
    expect(roman.parse('MMCXXXVIII') ).toBe(2138);
  });
  it("roman.parse('MMDCLIV') -> 2654", function() {
    expect(roman.parse('MMDCLIV') ).toBe(2654);
  });
  it("roman.parse('MMCMXVIII') -> 2918", function() {
    expect(roman.parse('MMCMXVIII') ).toBe(2918);
  });
  it("roman.parse('MMCMLXIII') -> 2963", function() {
    expect(roman.parse('MMCMLXIII') ).toBe(2963);
  });
  it("roman.parse('MMMCXIII') -> 3113", function() {
    expect(roman.parse('MMMCXIII') ).toBe(3113);
  });
  it("roman.parse('MMMCCXLVIII') -> 3248", function() {
    expect(roman.parse('MMMCCXLVIII') ).toBe(3248);
  });
  it("roman.parse('MMMCCCXXXIII') -> 3333", function() {
    expect(roman.parse('MMMCCCXXXIII') ).toBe(3333);
  });
  it("roman.parse('MMMDCCXXXV') -> 3735", function() {
    expect(roman.parse('MMMDCCXXXV') ).toBe(3735);
  });
  it("roman.parse('MMMMCXXVII') -> 4127", function() {
    expect(roman.parse('MMMMCXXVII') ).toBe(4127);
  });
  it("roman.parse('MMMMDLVIII') -> 4558", function() {
    expect(roman.parse('MMMMDLVIII') ).toBe(4558);
  });
  it("roman.parse('MMMMDCXX') -> 4620", function() {
    expect(roman.parse('MMMMDCXX') ).toBe(4620);
  });
  it("roman.parse('MMMMDCXXVI') -> 4626", function() {
    expect(roman.parse('MMMMDCXXVI') ).toBe(4626);
  });
  it("roman.parse('MMMMDCCCLXIV') -> 4864", function() {
    expect(roman.parse('MMMMDCCCLXIV') ).toBe(4864);
  });
});

describe("roman.toString()", function() {
  it("roman.toString(28) -> 'XXVIII'", function() {
    expect(roman.toString(28) ).toBe('XXVIII');
  });
  it("roman.toString(327) -> 'CCCXXVII'", function() {
    expect(roman.toString(327) ).toBe('CCCXXVII');
  });
  it("roman.toString(345) -> 'CCCXLV'", function() {
    expect(roman.toString(345) ).toBe('CCCXLV');
  });
  it("roman.toString(359) -> 'CCCLIX'", function() {
    expect(roman.toString(359) ).toBe('CCCLIX');
  });
  it("roman.toString(405) -> 'CDV'", function() {
    expect(roman.toString(405) ).toBe('CDV');
  });
  it("roman.toString(709) -> 'DCCIX'", function() {
    expect(roman.toString(709) ).toBe('DCCIX');
  });
  it("roman.toString(752) -> 'DCCLII'", function() {
    expect(roman.toString(752) ).toBe('DCCLII');
  });
  it("roman.toString(1209) -> 'MCCIX'", function() {
    expect(roman.toString(1209) ).toBe('MCCIX');
  });
  it("roman.toString(1288) -> 'MCCLXXXVIII'", function() {
    expect(roman.toString(1288) ).toBe('MCCLXXXVIII');
  });
  it("roman.toString(1521) -> 'MDXXI'", function() {
    expect(roman.toString(1521) ).toBe('MDXXI');
  });
  it("roman.toString(1585) -> 'MDLXXXV'", function() {
    expect(roman.toString(1585) ).toBe('MDLXXXV');
  });
  it("roman.toString(1649) -> 'MDCXLIX'", function() {
    expect(roman.toString(1649) ).toBe('MDCXLIX');
  });
  it("roman.toString(1772) -> 'MDCCLXXII'", function() {
    expect(roman.toString(1772) ).toBe('MDCCLXXII');
  });
  it("roman.toString(1810) -> 'MDCCCX'", function() {
    expect(roman.toString(1810) ).toBe('MDCCCX');
  });
  it("roman.toString(1982) -> 'MCMLXXXII'", function() {
    expect(roman.toString(1982) ).toBe('MCMLXXXII');
  });
  it("roman.toString(2066) -> 'MMLXVI'", function() {
    expect(roman.toString(2066) ).toBe('MMLXVI');
  });
  it("roman.toString(2087) -> 'MMLXXXVII'", function() {
    expect(roman.toString(2087) ).toBe('MMLXXXVII');
  });
  it("roman.toString(2138) -> 'MMCXXXVIII'", function() {
    expect(roman.toString(2138) ).toBe('MMCXXXVIII');
  });
  it("roman.toString(2654) -> 'MMDCLIV'", function() {
    expect(roman.toString(2654) ).toBe('MMDCLIV');
  });
  it("roman.toString(2918) -> 'MMCMXVIII'", function() {
    expect(roman.toString(2918) ).toBe('MMCMXVIII');
  });
  it("roman.toString(2963) -> 'MMCMLXIII'", function() {
    expect(roman.toString(2963) ).toBe('MMCMLXIII');
  });
  it("roman.toString(3113) -> 'MMMCXIII'", function() {
    expect(roman.toString(3113) ).toBe('MMMCXIII');
  });
  it("roman.toString(3248) -> 'MMMCCXLVIII'", function() {
    expect(roman.toString(3248) ).toBe('MMMCCXLVIII');
  });
  it("roman.toString(3333) -> 'MMMCCCXXXIII'", function() {
    expect(roman.toString(3333) ).toBe('MMMCCCXXXIII');
  });
  it("roman.toString(3735) -> 'MMMDCCXXXV'", function() {
    expect(roman.toString(3735) ).toBe('MMMDCCXXXV');
  });
  it("roman.toString(4127) -> 'MMMMCXXVII'", function() {
    expect(roman.toString(4127) ).toBe('MMMMCXXVII');
  });
  it("roman.toString(4558) -> 'MMMMDLVIII'", function() {
    expect(roman.toString(4558) ).toBe('MMMMDLVIII');
  });
  it("roman.toString(4620) -> 'MMMMDCXX'", function() {
    expect(roman.toString(4620) ).toBe('MMMMDCXX');
  });
  it("roman.toString(4626) -> 'MMMMDCXXVI'", function() {
    expect(roman.toString(4626) ).toBe('MMMMDCXXVI');
  });
  it("roman.toString(4864) -> 'MMMMDCCCLXIV'", function() {
    expect(roman.toString(4864) ).toBe('MMMMDCCCLXIV');
  });
});
