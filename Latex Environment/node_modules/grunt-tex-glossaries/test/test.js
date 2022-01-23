var expect = require("chai").expect;
var exec   = require("exec");
var path   = require("path");

var execOpts = {
  cwd: path.join(__dirname, "..")
};

describe("When there are no makeglossaries errors", function () {

  var out, code;
  before(function (done) {
    exec("grunt glossaries:succeed", execOpts, function (_err, _out, _code) {
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
    expect(out).to.contain("Generated glossary for tmp/succeed.glo");
  });

});

describe("When there are makeglossaries errors", function () {

  var out, code;
  before(function (done) {
    exec("grunt glossaries:fail", execOpts, function (_err, _out, _code) {
      out = _out;
      code = _code;
      done();
    });
  });

  it("should have output code 1", function () {
    expect(code).to.equal(1);
  });

  it("should output error message", function () {
    expect(out).to.contain("fail.aux' doesn't exist. Have you run LaTeX?");
    expect(out).to.contain("Fatal error: Unable to generate glossary for tmp/fail.fail");
  });

});