function isCharDigit(n){
    return !!n.trim() && !isNaN(+n);
}

var str = 'wss';
console.log(isCharDigit(str))