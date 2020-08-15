let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../server/index");
let should = chai.should();

const baseUrl = '/api/v1/trips';

chai.use(chaiHttp);
describe("TRIPS", function(){
    this.timeout(5000);
    it("Should Throw Validation Error", (done) => {
        let payload = {};
        chai.request(server)
        .post(baseUrl)
        .send(payload)
        .end((err, result) => {
        result.body.data.code.should.eq(140);
        console.log("Errors:", result.body.data.error.message);
        done();
        });
    });

    it("Should add Trip information", (done) => {
        let payload = {
            "registration_number": "foo",
            "visit_type": "round-trip" 
        };
        chai.request(server)
        .post(baseUrl)
        .send(payload)
        .end((err, result) => {
            result.body.data.code.should.eq(200);
            console.log("Response Body:", result.body.data.message);
            done();
        });
    });

    it ("Should Fetch all the Trips", (done)=>{
        chai.request(server)
        .get(baseUrl)
        .end((err, result)=>{
            result.body.data.code.should.eq(200);
            console.log ("Got",result.body.data.trips.length, "trips information");
            done();
        });
    });
});