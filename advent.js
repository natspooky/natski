/*fetch("test.txt")
  .then((res) => res.text())
  .then((text) => {
    let array = text.split('\n'),
    numList = [['one','o1e'],['two','t2o'],['three','t3e'],['four','f4r'],['five','f5e'],['six','s6x'],['seven','s7n'],['eight','e8t'],['nine','n9e']]
    calculat(array, numList)
   })
  .catch((e) => console.error(e));
function calculat(e, numList){
    let strLen =  e.length,
    total = 0;
    for(let i = 0; i < strLen; i++) {
        let r = 0,
        valueArray = []
        for(let x = 0; x < 2; x++) {
            r += 1
            e[i] = getSTRnum(e, r, i, numList)
        }
        for(let b = 0; b < 2; b++) {
            r += 1
            valueArray.push(checkbf(e, r, i))
        }
        total += Number((valueArray[0].toString()) + (valueArray[1].toString()))
    }
    console.log(total)
}
function checkbf(e, r, i) {
    for(let y = 0; y < e[i].length; y++) {
        if(!isNaN(e[i][ ((r % 2 == 0) ? e[i].length - 1 : 0) + y * ((r % 2 == 0) ? -1 : 1)])) {
            return e[i][((r % 2 == 0) ? e[i].length - 1 : 0) + y * ((r % 2 == 0) ? -1 : 1)]
        }
    }
}
function getSTRnum(e, r, i, numList) {
    for(let y = 0; y < e[i].length - 4; y++) {
        let miniVal = e[i].slice(((r % 2 == 0) ? e[i].length - 5 - y : y), ((r % 2 == 0) ? (e[i].length - y) : y + 5));
        for(let v = 0; v < numList.length; v++) {
            if(miniVal.indexOf(numList[v][0]) != -1) {
                return (e[i].slice(0, ((r % 2 == 0) ? e[i].length - 5 - y : y)) + miniVal.replace(numList[v][0], numList[v][1]) + e[i].slice(((r % 2 == 0) ? (e[i].length - y) : y + 5), e[i].length))
            }
        }
    }
    return e[i]
}*/