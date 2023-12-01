





fetch("test.txt")
  .then((res) => res.text())
  .then((text) => {
    let array = text.split('\n')
    console.log(array)
    calculat(array)
   })
  .catch((e) => console.error(e));



function calculat(e){
    let strLen =  e.length,
    finalVals = [],
    total = 0;
    for(let i = 0; i < strLen; i++) {

        let r = 0,
        valueArray = []
        for(let x = 0; x < 2; x++){

            r += 1
            console.log(((r % 2 == 0) ? 0 : e[i].length - 1), ((r % 2 == 0) ? 1 : -1))
            valueArray.push(checkbf(e, r, i))

        }

        finalVals.push((valueArray[0].toString()) + (valueArray[1].toString()))

    }

    finalVals.forEach((val) => {
        total += Number(val)
    })

    console.log(total)
}

function checkbf(e, r, i){
    for(let y = 0; y < e[i].length; y++) {

        if(!isNaN(e[i][ ((r % 2 == 0) ? e[i].length - 1 : 0) + y * ((r % 2 == 0) ? -1 : 1)])) {
            return e[i][ ((r % 2 == 0) ? e[i].length - 1 : 0) + y * ((r % 2 == 0) ? -1 : 1)]
        }

    }
}