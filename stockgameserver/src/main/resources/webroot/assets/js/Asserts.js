/**
 *  Author: Joris De Rijck
 *  Date:   2017-02-04
 *  Description:
 *          Small testing utils for creating tests.
 */

Tests = []; // general module
Tests.testList = []; // list of tests to run.
// you can create testsuites by using new Test();

var Test = function(_name,_function){
    this.name= _name;
    this.test=_function;
};

Tests.addTest = function(testName,testFunction){
    Tests.testList.push(new Test(testName,testFunction));
};


Tests.defaultOutput = function(testName,failed,results){
    if(failed){
        console.warn("Test with name: "+testName+" failed");
        results.forEach(function(res){console.warn(res);})
    } else {
        console.info("Test with name: " + testName + " Succeded");
    }
};


/**
 * @param outputFunction(isFailed)
 *      Callback for all the assert function, as well as the general success of a test.
 *      if none is provide then the default is used, or the one set by Tests.setOutputCallback(function());
 * */
Tests.run = function (outputFunction){
    while(Tests.testList.length != 0){
        // test setup
        Tests.currentTest = [];
        var test = Tests.testList.shift();
        Tests.currentTest.test = test.test;// first test is the Test object, second the test it self.
        Tests.currentTest.name = test.name;
        Tests.currentTest.isFailed = false;
        Tests.currentTest.results = []; // results of individual asserts.
        // actual test
        Tests.currentTest.test();
        var chosenOutput = outputFunction || Tests.outputCallback || Tests.defaultOutput;
        chosenOutput(test.name,Tests.currentTest.isFailed,Tests.currentTest.results);
    }
};

Tests.setOutputFunction = function(func){
    Tests.outputCallback=func;
};

var equals = function(x,y){
    if ((typeof x === 'function' && typeof y === 'function') ||
        (x instanceof Date && y instanceof Date) ||
        (x instanceof RegExp && y instanceof RegExp) ||
        (x instanceof String && y instanceof String) ||
        (x instanceof Number && y instanceof Number)) {
        return x.toString() === y.toString();
    }
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
        return true;
    }
    return JSON.stringify(x) === JSON.stringify(y);
};

assertEquals = function(expected,actual){
    if (!equals(expected,actual)) {
        Tests.currentTest.isFailed = true;
        var message = "assertEquals failed, expected: " + JSON.stringify(expected) + " gotten: "+JSON.stringify(actual);
        // find out some logic to accuratly show what is different?

        Tests.currentTest.results.push(message);
    }
};

assertNotEquals = function(expected,actual){
    if (equals(expected,actual)) {
        Tests.currentTest.isFailed = true;
        var message = "assertNotEquals failed, expected was equals to actual: '"+JSON.stringify(expected)+"' and '"+JSON.stringify(actual)+"'";
        // find out some logic to accuratly show what is different?

        Tests.currentTest.results.push(message);
    }
};

assertTrue = function(expression){
    if (!expression) {
        Tests.currentTest.isFailed = true;
        var message = "assertTrue failed.";
        // find out some logic to accuratly show what is different?
        Tests.currentTest.results.push(message);
    }
};

assertFalse = function(expression){
    if (expression) {
        Tests.currentTest.isFailed = true;
        var message = "assertTrue failed.";
        // find out some logic to accuratly show what is different?
        Tests.currentTest.results.push(message);
    }
};


// add selftests, will run when the tests run. (not directly)

Tests.addTest("selfTest: true=true",function(){
    assertTrue(true);
});
Tests.addTest("selfTest: false=false",function(){
    assertFalse(false);
});
Tests.addTest("selfTest: equals-string",function() {
    assertEquals("test", "test");
});
Tests.addTest("selfTest: equals-number",function(){
    assertEquals(7,7);
});
Tests.addTest("selfTest: equals-function",function(){
    assertEquals(function(){return 9;},function(){return 9;});
});
Tests.addTest("selfTest: equals-array",function(){
    assertEquals([],[]);
});
Tests.addTest("selfTest: not-equals-string",function() {
    assertNotEquals("test", "tset");
});
Tests.addTest("selfTest: not-equals-number",function(){
    assertNotEquals(7,9);
});
Tests.addTest("selfTest: not-equals-function",function(){
    assertNotEquals(function(){return 9;},function(){return 7;});
});
Tests.addTest("selfTest: not-equals-array",function(){
    assertNotEquals([],[7]);
});
Tests.addTest("selfTest: not-equals-difType",function(){
    assertNotEquals([],"");
});