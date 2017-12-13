var str = '(sd) (sd) (sd) ';
var str2 = '(nw) (wd) (sw) ';
var tmp = '';

tmp = str2.split(' ');
str = tmp[0]+' '+str;
tmp.splice(0,1);
str2 = tmp;
console.log(str2)
return;
/**
 * 
 * @param {string} path 要用node命令
 */
function analysePath(path) {
    var bbb = '';
    path = path.split(' ');
    for (var i in path) {
        for (var j in path[i]) {
            if (parseInt(path[i][j]) % 10 == path[i][j]) {
                for (var k = 0; k < path[i][j]; k++) {
                    bbb += path[i].substr(1) + ' '
                }
                break;
            } else {
                bbb += path[i][j];
            }
        }
    }
    // console.log(bbb)
}
// reversePath('n (nw) (nd) (wd) (nd) (wd) (sd) (nu) (nd) (nd) (ed) (wu) (nu) (wd) (eu) (nd) w (nu) (nu) (nu) (sd) (sd) (sd) e n n')
function reversePath(path) {
    var rpath = '';
    path = path.split(' ');
    for (var i = 0; i < path.length; i++) {
        if (path[i]) {
            if (/nu/.test(path[i])) {
                rpath += path[i].replace(/nu/, 'sd') + ' ';
            } else if (/nd/.test(path[i])) {
                rpath += path[i].replace(/nd/, 'su') + ' ';
            } else if (/ne/.test(path[i])) {
                rpath += path[i].replace(/ne/, 'sw') + ' ';
            } else if (/nw/.test(path[i])) {
                rpath += path[i].replace(/nw/, 'se') + ' ';
            } else if (/su/.test(path[i])) {
                rpath += path[i].replace(/su/, 'nd') + ' ';
            } else if (/sd/.test(path[i])) {
                rpath += path[i].replace(/sd/, 'nu') + ' ';
            } else if (/se/.test(path[i])) {
                rpath += path[i].replace(/se/, 'nw') + ' ';
            } else if (/sw/.test(path[i])) {
                rpath += path[i].replace(/sw/, 'ne') + ' ';
            } else if (/e/.test(path[i])) {
                rpath += path[i].replace(/e/, 'w') + ' ';
            } else if (/w/.test(path[i])) {
                rpath += path[i].replace(/w/, 'e') + ' ';
            } else if (/s/.test(path[i])) {
                rpath += path[i].replace(/s/, 'n') + ' ';
            } else if (/n/.test(path[i])) {
                rpath += path[i].replace(/n/, 's') + ' ';
            } else if (/out/.test(path[i])) {
                rpath += path[i].replace(/out/, 'enter') + ' ';
            } else if (/enter/.test(path[i])) {
                rpath += path[i].replace(/enter/, 'out') + ' ';
            } else if (/u/.test(path[i])) {
                rpath += path[i].replace(/u/, 'd') + ' ';
            } else {
                rpath += path[i].replace(/d/, 'u') + ' ';
            }
        }
    }
    // xs.loading = true;
    console.log('--->'+rpath);
    return rpath;
}