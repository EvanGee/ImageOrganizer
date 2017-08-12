

export default function deepCopy() {
    var DC
    function copy() {

        if (Object.prototype.toString.call(target) === "[object Object]") {
            for (let [key, value] of Object.entries(target)) {
                this.DC[key] = value
                copy(value)
            }
        } else if (Object.prototype.toString.call(target) === "[object Array]") {
            for (let i = 0; i < target.length; i++) {
                DC[i] = value
                copy(value)
            }
        }
        else {
            DC
        }

    }



    const copy = (target) => {

        if (Object.prototype.toString.call(target) === "[object Object]") {
            for (let [key, value] of Object.entries(target)) {
                DC[key] = value
                copy(value)
            }
        } else if (Object.prototype.toString.call(target) === "[object Array]") {
            for (let i = 0; i < target.length; i++) {
                DC[i] = value
                copy(value)
            }
        }
        else {
            DC
        }
    }

}
