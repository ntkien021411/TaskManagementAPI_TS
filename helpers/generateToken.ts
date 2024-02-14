export const generateRandomString = (length :number) :string => { 
    const characters = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";
    for (let index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result
}
export const generateRandomSNumber = (length :number) :string  => { 
    const characters = "0123456789";
    let result = "";
    for (let index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result
}