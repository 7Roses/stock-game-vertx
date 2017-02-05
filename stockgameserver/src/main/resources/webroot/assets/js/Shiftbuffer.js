/**
 * Author:  Joris De Rijck
 * Date:    2017-02-04
 */
Shiftbuffer = function(_maxSize){
    this.data = [];
    this.maxSize = _maxSize;
    this.add = function (element){
        if (this.data.length>=this.maxSize) {
            this.data.shift();
        }
        this.data.push(element);
    }
};


// tests

Tests.addTest("buffer empty",function(){
    var buffer = new Shiftbuffer(2);
    assertEquals([],buffer.data);
});
Tests.addTest("add function",function(){
    var buffer = new Shiftbuffer(2);
    buffer.add(3);
    assertEquals([3],buffer.data);
});
Tests.addTest("add till capacity",function(){
    var buffer = new Shiftbuffer(2);
    buffer.add(3);
    buffer.add(5);
    assertEquals([3,5],buffer.data);
});
Tests.addTest("test shifting of data",function(){
    var buffer = new Shiftbuffer(2);
    buffer.add(3);
    buffer.add(5);
    buffer.add(7);
    assertEquals([5,7],buffer.data);
});
