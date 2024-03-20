const genOTP = () => {
    let first = Math.floor(Math.random()*10);
    let second = Math.floor(Math.random()*10);
    let third = Math.floor(Math.random()*10);
    let fourth = Math.floor(Math.random()*10);
    return `${first}${second}${third}${fourth}`
}

module.exports = genOTP;