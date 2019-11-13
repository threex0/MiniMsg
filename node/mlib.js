module.exports = {
    // This is something we should probably have in a ton of places going forward
    isset: function(obj){
        return typeof(obj) !== 'undefined';
    },

    cl: function(v = 'test'){
        console.log(v)
    }
}