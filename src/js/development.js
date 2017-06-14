function getFnName(fn) {
    return fn.toString().match(/function ([^(]*)\(/)[1];
}