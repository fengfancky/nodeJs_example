function Calculation(){

    this.add = function(arg1,arg2){
        return arg1+arg2;

    };

    this.sub =function(arg1,arg2){
        return arg1-arg2;

    };

    this.mul = function(arg1,arg2){
        return arg1*arg2;

    };

    this.div = function(arg1,arg2){
        return arg1/arg2;

    }
}

//  Calculation.prototype = {

//     add:function(arg1,arg2){
//         return arg1+arg2;
//     },

//     sub:function(arg1,arg2){
//         return arg1-arg2;
//     },

//     mul:function(arg1,arg2){
//         return arg1*arg2;
//     },

//     div:function(arg1,arg2){
//         return arg1/arg2;
//     }

//  };

module.exports = Calculation;