const moment = require('moment');

const genMessage = (from, text)=>{
    return {
        from,
        text,
        createAt: moment().valueOf()
    };
};

const genLocationMsg = (from, lat, long) =>{
    return {
        from,
        url:`https://www.google.com/maps?q=${lat},${long}`,
        createAt: moment().valueOf()
    };
};

module.exports = {genMessage, genLocationMsg};
