const chai = require("chai");
const expect = chai.expect;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const apiKey = require("../secret").apiKey;

const config = require("../configs/config");
const requestUrl = config.urls.requestUrl;

const chunkTooLong = require("../testData/chunk").chunkTooLong; // length: 201
const chunkMalformedNested = require("../testData/chunk").chunkMalformedNested;
const chunkMalformedString = require("../testData/chunk").chunkMalformedString;
const chunkMalformedObject = require("../testData/chunk").chunkMalformedObject;
const chunkMalformedInteger = require("../testData/chunk").chunkMalformedInteger;
const chunkEmpty = require("../testData/chunk").chunkEmpty;
const chunkBoundary = require("../testData/chunk").chunkBoundary; // length: 200

describe("Load tests", () => {

	it("Load request with too long chunk", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(chunkTooLong)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				expect(res.body.detail.reason).to.equal("Chunk cannot be longer than 200");
				done();
			});
	});

	it("Load request with missing chunk", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
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

	it("Load request with malformed data - nested array", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(chunkMalformedNested)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(422);
				expect(res.body.detail[0].msg).to.equal("value is not a valid integer");
				done();
			});
	});

	it("Load request with malformed data - string", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(chunkMalformedString)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(422);
				expect(res.body.detail[0].msg).to.equal("value is not a valid list");
				done();
			});
	});

	it("Load request with malformed data - object", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(chunkMalformedObject)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(422);
				expect(res.body.detail[0].msg).to.equal("value is not a valid list");
				done();
			});
	});

	it("Load request with malformed data - integer", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(chunkMalformedInteger)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(422);
				expect(res.body.detail[0].msg).to.equal("value is not a valid list");
				done();
			});
	});

	it("Load request with correct data - empty array", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(chunkEmpty)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.be.null;
				done();
			});
	});

	it("Load request with correct data - acceptable length", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(chunkBoundary)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.be.null;
				done();
			});
	});
});