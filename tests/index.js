var ukrstemmer = require('../');

describe('ukrstemmer', function () {
	it('should work on strings without exceptions', function () {
		ukrstemmer('картопля').should.eql('картопл');
	});
});
