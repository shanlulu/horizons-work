describe("EventEmitter", function() {
  var ten = 10, hundred = 100;
  var fnRemove = (e) => ten+=e;
  it("on(eventName, fn)", function() {
    myEventEmitter.on('testFn10', fnRemove);
    myEventEmitter.on('testFn100', (e) => hundred+=e);
    expect(myEventEmitter.listeners['testFn10']).toEqual([jasmine.any(Function)]);
    expect(myEventEmitter.listeners['testFn100']).toEqual([jasmine.any(Function)]);
  });
  it("emit(eventName, arg)", function() {
    myEventEmitter.emit('testFn100', 100);
    myEventEmitter.emit('testFn100', 100);
    myEventEmitter.emit('testFn10', 100);
    myEventEmitter.emit('testFn100', 100);
    expect(ten).toEqual(110);
    expect(hundred).toEqual(400);
  });
  it("removeListener(eventName, fn)", function() {
    expect(myEventEmitter.listeners['testFn10']).toEqual([jasmine.any(Function)]);
    myEventEmitter.removeListener('testFn10', fnRemove)
    expect(myEventEmitter.listeners['testFn10']).toEqual([]);
  });
  it("once(eventName, fn) should store function [until called]", function() {
    var ret1; var arr = [(arg) => ret1 += arg];
    myEventEmitter.once('connection', arr[0])
    expect(myEventEmitter.listeners['connection']).toEqual([jasmine.any(Function)]);
  });
  it("in once(eventName, fn) when eventName triggered run&remove function - uses emit", function() {
    myEventEmitter.emit('connection', 100)
    expect(myEventEmitter.listeners['connection']).toEqual([])
  });
});
