/*!
 * ENCORE ALL PURPOSE FUNCTIONS
 * Author: NATSKI
 * MIT License
 */


class APF {

    static imageColor(image){
        let a, o, c, s, l = document.createElement("canvas"), 
        r = l.getContext && l.getContext("2d"), 
        n = {r: 0, g: 0, b: 0}, 
        i = 0;
        c = l.height = e.naturalHeight || e.offsetHeight || e.height, 
        o = l.width = e.naturalWidth || e.offsetWidth || e.width, 
        r.drawImage(e, 0, 0), 
        s = (a = r.getImageData(0, 0, o, c)).data.length;
        for (let g = 0; g < s; g += 12) n.r += a.data[g], n.g += a.data[g + 1],
        n.b += a.data[g + 2], i++;
        n.r = Math.floor(n.r / i),
        n.g = Math.floor(n.g / i),
        n.b = Math.floor(n.b / i)
        return `rgb(${n.r}, ${n.g}, ${n.b})`
    }

    static absolute(number){
        if(number < 0) return -number
        return number
    }
    static sortBubble(array){
        let len = array.length,
        sortedArray = array;
        for(let i = 0; i < len; i++) {
            for(let x = 0; x < len - 1; x++) {
                if(sortedArray[x] > sortedArray[x + 1]) {
                    //console.log(sortedArray)
                    let tempStorage = sortedArray[x];
                    sortedArray[x] = sortedArray[x + 1]
                    sortedArray[x + 1] = tempStorage
                }
            }
        }
        return sortedArray
    }
    static sortMerge(array) {
        // Base case
        if (array.length <= 1) return array

        let center = this.floor(array.length / 2),
        front = this.sortMerge(array.slice(0, center)),
        back = this.sortMerge(array.slice(center))

        return this.merge(front, back)
    }
    static merge(left, right) {
        let sortedArray = []
        while(left.length && right.length) {

          if(left[0] < right[0]) {
            sortedArray.push(left.shift())
          }else {
            sortedArray.push(right.shift())
          }
        }
        return [...sortedArray, ...left, ...right]
    }


    static max(array) {
        return this.sortMerge(array)[array.length - 1]
    }
    static min(array) {
        return this.sortMerge(array)[0]
    }
    static sum(array) {
        let size = array.length,
        total = 0
        for(let i = 0; i < size; i++) {
            if(!isNaN(array[i])){
                total += array[i]
            }
        }
        return total
    }
    static squareRoot(number) {
        //return number ** (1/2)
        if (number < 0 || isNaN(number)) {//checking if number is negative or non-numeric
            return NaN
        }
        let squareRoot = number / 2;//starting the calculation from half of the number
     
        for(let i = 0; i < 6; i++) {// Iterating while square_root is not equal to temp  //while (squareRoot != temp) {// aproximates to 13 loops but use 6 for accuracy
            squareRoot = (number / squareRoot + squareRoot) / 2// smalling the squareroot value to find square root
        }
        return squareRoot
    }
    /*static power(value, exponent){
        if(value > 0){
            //console.log(APF.exponential(exponent * APF.log(value)))
            return this.exponential(exponent * this.log(value))
        }
    }*/
    static exponential(number) {
        let approximation = 0
        if(isNaN(number)) return 0
        for(let i = 0; i < 10; i++) {
            approximation += ((number ** i) / this.factorial(i))
        }
        return approximation
    }
    static log(number) {
        let approximation = 0
        if(isNaN(number)) return 0
        for(let i = 1; i < 10; i++) {
            approximation += ((i % 2 === 0) ? -1 : 1) * (((number - 1) ** i) / i)
        }
        return approximation
    }
    static power(value, exponent) {
        if(exponent === 0){return 1}
        else if (exponent % 2 === 0) {
            return this.power(value,parseInt(exponent/2))*this.power(value,parseInt(exponent/2))
        }else{
             return value*this.power(value,parseInt(exponent/2))*this.power(value,parseInt(exponent/2))
        }
   
   }
    static inverseTan(opposite, adjacent) {
        let ratio = opposite / adjacent,
        approximation = 0
        if(isNaN(ratio)) return 0
        for(let i = 0; i < 10; i++) {
            approximation += ((i % 2 === 0) ? 1 : -1) * ((ratio ** (2 * i + 1)) / (2 * i + 1))
        }
        return approximation//this.max([-6.28, this.min([approximation, 6.28])])

        //ratio / (1 + (b1 * this.absolute(ratio)) + (b2 * (ratio ** 2)))
    }
    static multiplyMatrix(matrixOne, matrixTwo) {
        if(matrixOne[0].length != matrixTwo.length) return 0

        let matrix = this.createMatrix(matrixOne.length, matrixTwo[0].length)

        for(let i = 0; i < matrixOne.length; i++) {
            for(let p = 0; p < matrixTwo[0].length; p++) {
                for(let y = 0; y < matrixOne[0].length; y++) {
                    matrix[i][p] += matrixOne[i][y] * matrixTwo[y][p]
                }
            }
        }

        return matrix
    }
    static createMatrix(row, column) {
        return Array(row).fill().map(() => Array(column).fill(0))
    }
    static sin(angle) {
        let approximation = 0
        if(isNaN(angle)) return 0
        for(let i = 0; i < 8; i++) {
            approximation += ((i % 2 === 0) ? 1 : -1) * ((angle ** (2 * i + 1)) / this.factorial(2 * i + 1))
        }
        return approximation
    }
    static cos(angle) {
        //return this.sin((1.5708 - angle))
        let approximation = 1
        if(isNaN(angle)) return 0
        for(let i = 1; i < 8; i++) {
            approximation += ((i % 2 === 0) ? 1 : -1) * ((angle ** (2 * i)) / this.factorial(2 * i))
        }
        return approximation
    }
    static factorial(number) {
        if(number <= 0) return 1
        let fact = number
        for(let i = 1; i < number; i++) {
            fact *= number - i
        }
        return fact
    }
    static isInt(number) {
        return number % 1 === 0
    }
    static floor(number) {
        if(this.isInt(number)) return number
        return number - (number % 1)
    }
    static round(number) {
        if(this.isInt(number)) return number
        let val = number % 1
        if(val >= 0.5) return number - val + 1
        return number - val
    }
    static ceil(number) {
        if(this.isInt(number)) return number
        return number - (number % 1) + 1
    }
    static PI(){
        let PI = 0;
        for(let i = 0; i < 20; i++) {
            PI -= (8 * (i % 2) - 4) / (2 * i + 1)
        }
        return PI
    }
    static mobile(){
        return this.generalDevice() || this.IOSdevice()
    }
    generalDevice(){
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }
    IOSdevice(){
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }
}




function createObserver(options, observerFunc, intersector) {
    let observer = new IntersectionObserver(observerFunc, options);
    for(let i = 0; i < intersector.length; i++){
        observer.observe(intersector[i]);
    }
}


//make this work better for other sites
function alertAPF(text, color) {
    let popup = document.createElement('div'),
    popuptxt = document.createElement('p');
    popup.id = 'alertAPF'
    popup.style.backgroundColor = color
    popuptxt.innerHTML = text
    popup.appendChild(popuptxt)
    document.body.appendChild(popup)
    setTimeout(() => {
        popup.classList.add('active')
    }, 500);
}



  //talk about other attempts to make a square root

  /*
function SquareRoot(value){
    // Find MSB(Most significant Bit) of N
    let msb = parseInt(Math.log2(value));
 
    // (a = 2^msb)
    let a = 1 << msb,
    result = 0;
    while(a != 0) {
 
        // Check whether the current value
        // of 'a' can be added or not
        if ((result + a) * (result + a) <= value) {
            result += a;
        }
 
        // (a = a/2)
        a >>= 1;
    }
 
    // Return the result
    return result;
}
*/
