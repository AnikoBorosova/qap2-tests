const chai = require("chai");
const expect = chai.expect;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const apiKey = require("../secret").apiKey;
const config = require("../configs/config");
const requestUrl = config.urls.requestUrl;

const chunkLoad = require("../testData/chunk").chunkLoad;

describe("Buffer tests", () => {

	it("Load request with correct chunk", (done) => {
		chai
			.request(requestUrl)
			.post("/load")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.send(chunkLoad)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.have.header("Content-Type", "application/json");
				expect(res.body).to.be.null;
				done();
			});
	});

	it("Debug/buffer request to check buffer content", (done) => {
		chai
			.request(requestUrl)
			.get("/debug/buffer")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.be.an("array").that.is.not.empty;
				done();
			});
	});

	it("Debug/buffer request to delete buffer content", (done) => {
		chai
			.request(requestUrl)
			.delete("/debug/buffer")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.be.an("array").that.is.empty;
				done();
			});
	});

	it("Debug/buffer request to check buffer content", (done) => {
		chai
			.request(requestUrl)
			.get("/debug/buffer")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("api-key", apiKey)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.be.an("array").that.is.empty;
				done();
			});
	});
});