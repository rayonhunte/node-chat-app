const expect = require('expect');

const {genMessage} = require('./message');


describe('genMessage', ()=>{
    it('should gen a message object', ()=>{
        const message = genMessage('rayon', 'dont test me');
        expect(message.from).toBe('rayon');
        expect(message.text).toBe('dont test me');
        expect( typeof message.createAt).toBe('number');
    });
});
