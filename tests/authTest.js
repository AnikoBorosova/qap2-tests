const chai = require("chai");
const expect = chai.expect;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const apiKey = require("../secret").apiKey;
const apiKeyIncorrect = require("../configs/config").apiKeyIncorrect;
const apiKeyMalformed = require("../configs/config").apiKeyMalformed;

const config = require("../configs/config");
const requestUrl = config.urls.requestUrl;

const testDataLoad = require("../testData/testData").testDataLoad;

describe("Auth tests", () => {

	it("Load request with incorrect apiKey", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKeyIncorrect)
			.send(testDataLoad)
			.end((err, res) => {
				expect(res).to.have.status(401);
				expect(res.error.text).to.equal(`{"detail":"Invalid API Key"}`)
				done();
			});
	});

	it("Load request with malformed apiKey", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKeyMalformed)
			.send(testDataLoad)
			.end((err, res) => {
				expect(res).to.have.status(401);
				expect(res.error.text).to.equal(`{"detail":"Invalid API Key"}`)
				done();
			});
	});

	it("Load request with missing apiKey", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", "")
			.send(testDataLoad)
			.end((err, res) => {
				expect(res).to.have.status(403);
				expect(res.error.text).to.equal(`{"detail":"Not authenticated"}`)
				done();
			});
	});

	it("Load request with correct apiKey", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(testDataLoad)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.have.header("Content-Type", "application/json");
				expect(res.body).to.be.null;
				done();
			});
	});
});