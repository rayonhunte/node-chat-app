const expect = require('expect');

const {genMessage, genLocationMsg} = require('./message');


describe('genMessage', ()=>{
    it('should gen a message object', ()=>{
        const message = genMessage('rayon', 'dont test me');
        expect(message.from).toBe('rayon');
        expect(message.text).toBe('dont test me');
        expect( typeof message.createAt).toBe('number');
    });
});


describe('genLocationMsg', ()=>{
    it('it should generate correct location message', ()=>{
        const message = genLocationMsg('rayon', 1, 3);
        expect(message.from).toBe('rayon');
        expect(typeof message.createAt).toBe('number');
        expect(message.url).toBe('https://www.google.com/maps?q=1,3');
    });
});