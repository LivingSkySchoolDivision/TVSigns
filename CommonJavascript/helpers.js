function LimitCharacters(input,maxLength) {
    if (maxLength < 1) {
        maxLength = 1;
    }
    
    if (input.length < maxLength) {
        return input;
    }

    return input.substring(0,maxLength) + "[..]";
}