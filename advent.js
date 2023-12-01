





fetch("test.txt")
  .then((res) => res.text())
  .then((text) => {
    let array = text.split('\n'),
    numList = [['one',1],['two',2],['three',3],['four',4],['five',5],['six',6],['seven',7],['eight',8],['nine',9]]
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



function getSTRnum(e, r, i, numList){
    console.log(e[i], i, (r % 2 == 0) ? 'op' : 'strt')
    for(let y = 0; y < e[i].length - 4; y++) {
        let miniVal = e[i].slice(((r % 2 == 0) ? e[i].length - 6 : y), ((r % 2 == 0) ? (e[i].length - 1 - y) : y + 5));
        console.log(miniVal)
        for(let v = 0; v < numList.length; v++) {
            if(miniVal.indexOf(numList[v][0]) != -1) {
                console.log((e[i].slice(0, ((r % 2 == 0) ? e[i].length - 6 : y)) + miniVal.replace(numList[v][0], numList[v][1]) + e[i].slice(((r % 2 == 0) ? (e[i].length - 1 - y) : y + 5), e[i].length)))
                return (e[i].slice(0, ((r % 2 == 0) ? e[i].length - 6 : y)) + miniVal.replace(numList[v][0], numList[v][1]) + e[i].slice(((r % 2 == 0) ? (e[i].length - 1 - y) : y + 5), e[i].length))
            }
        }
    }
    return e[i]
}