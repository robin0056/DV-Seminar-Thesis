var expect = require("chai").expect;
var exec   = require("exec");
var path   = require("path");

var execOpts = {
  cwd: path.join(__dirname, "..")
};

describe("When there are no BibTex warnings", function () {

  var out, code;
  before(function (done) {
    exec("grunt bibtex:succeed", execOpts, function (_err, _out, _code) {
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
    expect(out).to.contain("Generated bibliography for tmp/succeed.aux");
  });

  it("should not contain warnings", function () {
    expect(out).to.not.contain("I didn't find a database entry");
  });

});

describe("When there are BibTex warnings", function () {

  var out, code;
  before(function (done) {
    exec("grunt bibtex:warn", execOpts, function (_err, _out, _code) {
      out = _out;
      code = _code;
      done();
    });
  });

  it("should have output code 0", function () {
    expect(code).to.equal(0);
  });

  it("should still report success message", function () {
    expect(out).to.contain("Done, without errors.");
    expect(out).to.contain("Generated bibliography for tmp/warn.aux");
  });

  it("should output warning message", function () {
    expect(out).to.contain("I didn't find a database entry for \"test123\"");
  });

});

describe("When there are BibTex errors", function () {

  var out, code;
  before(function (done) {
    exec("grunt bibtex:fail", execOpts, function (_err, _out, _code) {
      out = _out;
      code = _code;
      done();
    });
  });

  it("should have output code 1", function () {
    expect(code).to.equal(1);
  });

  it("should output error message", function () {
    expect(out).to.contain("I couldn't open database file fail-blx.bib");
    expect(out).to.contain("Fatal error: Unable to generate bibliography for tmp/fail.aux");
  });

});