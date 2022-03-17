const chai = require("chai");
const expect = chai.expect;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const apiKey = require("../secret").apiKey;

const config = require("../configs/config");
const requestUrl = config.urls.requestUrl;

const patternTooLong = require("../testData/pattern").patternTooLong; // length: 201
const patternMalformedNested = require("../testData/pattern").patternMalformedNested;
const patternMalformedString = require("../testData/pattern").patternMalformedString;
const patternMalformedObject = require("../testData/pattern").patternMalformedObject;
const patternMalformedInteger = require("../testData/pattern").patternMalformedInteger;
const patternEmpty = require("../testData/pattern").patternEmpty;
const patternBoundary = require("../testData/pattern").patternBoundary; // length: 200


describe("check tests", () => {

	it("Check request with missing pattern", (done) => {
		chai
			.request(requestUrl)
			.post("/check")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send("")
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(422);
				expect(res.body.detail[0].msg).to.equal("field required");
				done();
			});
	});

	it("Check request with too long pattern", (done) => {
		chai
			.request(requestUrl)
			.post("/check")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(patternTooLong)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(413);
				expect(res.body.detail.reason).to.equal("Pattern cannot be longer than 200");
				done();
			});
	});

	it("Check request with empty pattern", (done) => {
		chai
			.request(requestUrl)
			.post("/check")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(patternEmpty)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				expect(res.body.detail.reason).to.equal("Pattern cannot be empty");
				done();
			});
	});

	it("Check request with malformed data - nested array", (done) => {
		chai
			.request(requestUrl)
			.post("/check")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(patternMalformedNested)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(422);
				expect(res.body.detail[0].msg).to.equal("value is not a valid integer");
				done();
			});
	});

	it("Check request with malformed data - string", (done) => {
		chai
			.request(requestUrl)
			.post("/check")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(patternMalformedString)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(422);
				expect(res.body.detail[0].msg).to.equal("value is not a valid list");
				done();
			});
	});

	it("Check request with malformed data - object", (done) => {
		chai
			.request(requestUrl)
			.post("/check")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(patternMalformedObject)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(422);
				expect(res.body.detail[0].msg).to.equal("value is not a valid list");
				done();
			});
	});

	it("Check request with malformed data - integer", (done) => {
		chai
			.request(requestUrl)
			.post("/check")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(patternMalformedInteger)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(422);
				expect(res.body.detail[0].msg).to.equal("value is not a valid list");
				done();
			});
	});

	it("Check request with correct data - acceptable length", (done) => {
		chai
			.request(requestUrl)
			.post("/check")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(patternBoundary)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body.exists).to.be.true;
				done();
			});
	});
});