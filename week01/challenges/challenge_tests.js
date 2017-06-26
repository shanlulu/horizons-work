// -----------------------------
//   TRY NOT TO LOOK AT THESE
// -----------------------------

describe("calcPromotions(input) -> output", function() { 
  it("calcPromotions('1 2\n1 1\n1 1\n1 2') -> '1\n1\n1'", function() {
    expect(calcPromotions('1 2\n1 1\n1 1\n1 2')).toEqual('1\n1\n1');
  });
  it("calcPromotions('1000000 1000000\n1000000 1000000\n1000000 1000000\n1000000 1000000') -> '0\n0\n0'", function() {
    expect(calcPromotions('1000000 1000000\n1000000 1000000\n1000000 1000000\n1000000 1000000')).toEqual('0\n0\n0');
  });
  it("Test Case 3", function() {
    expect(calcPromotions('3 3\n3 3\n3 3\n0 1000000')).toEqual('1000000\n1000000\n1000000');
  });
  it("Test Case 4", function() {
    expect(calcPromotions('68690 43918\n20059 59118\n97763 10098\n13926 103953')).toEqual('41421\n2362\n90027');
  });
  it("Test Case 5", function() {
    expect(calcPromotions('5211 2325\n95368 89622\n2567 36003\n56429 112165')).toEqual('83426\n89172\n55736');
  });
  it("Test Case 6", function() {
    expect(calcPromotions('61393 72357\n18456 8445\n75011 9913\n78042 176209')).toEqual('23058\n33069\n98167');
  });
  it("Test Case 7", function() {
    expect(calcPromotions('13784 12640\n98537 91489\n75198 114700\n94324 139243')).toEqual('77373\n84421\n44919');
  });
  it("Test Case 8", function() {
    expect(calcPromotions('76091 110036\n68980 66937\n59956 122843\n41873 45399')).toEqual('64370\n66413\n3526');
  });
  it("Test Case 9", function() {
    expect(calcPromotions('61313 95144\n25857 1516\n16124 45241\n53895 75624')).toEqual('26505\n50846\n21729');
  });
  it("Test Case 10", function() {
    expect(calcPromotions('49676 130031\n93368 5835\n47739 52611\n10012 105072')).toEqual('12399\n99932\n95060');
  });
});