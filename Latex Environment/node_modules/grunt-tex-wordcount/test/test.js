var expect = require("chai").expect;
var exec   = require("exec");
var path   = require("path");

var execOpts = {
  cwd: path.join(__dirname, "..")
};

describe("When there are no errors", function () {

  var out, code;
  before(function (done) {
    exec("grunt wordcount:succeed", execOpts, function (_err, _out, _code) {
      out = _out;
      code = _code;
      done();
    });
  });

  it("should have output code 0", function () {
    expect(code).to.equal(0);
  });

  it("should output success message", function () {
    expect(out).to.contain("Done, without errors.");
    expect(out).to.contain("Wordcount for test/fixtures/succeed.tex: 4");
  });

});