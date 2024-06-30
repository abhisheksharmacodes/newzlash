let selectTwoNiches = (niches) => {
    let first, second = 0

    first = Math.floor(Math.random() * (niches.length - 0 + 1)) + 0
    let first_n = niches[first]
    niches.splice(first,1)

    while(second == first) {
        second = Math.floor(Math.random() * (niches.length - 0 + 1)) + 0
    }
    
    console.log(niches)
    return first_n + '+' + niches[second]

}   

console.log(selectTwoNiches(['A','B','C','D','E','F']))