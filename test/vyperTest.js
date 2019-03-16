const CalleeContract = artifacts.require('Callee.vyper');
const CallerContract = artifacts.require('Caller.vyper');

const ethers = require('ethers');
const { BN, expectEvent, shouldFail } = require('openzeppelin-test-helpers');

contract("Vyper Caller-Callee", function (accounts) {

  before(async function() {
    // Log time to keep track when debugging
    console.log(Date())
  });

  // new contract before each test to get a clean state
  before(async function() {
    this.callee = await CalleeContract.new({ from: accounts[0] });
    this.caller = await CallerContract.new(this.callee.address, {from: accounts[0] });
  });

  describe('Owner & Writer Properties', function() {

    it("Should have owner address be same address who deployed contract", async function() {
      const owner = accounts[0];

      console.log(`Address of caller: ${this.caller.address}`);
      console.log(`Address of callee: ${this.callee.address}`);

      assert.equal(
        (await this.callee.owner()),
        owner,
        "Initial owner is not expected address."
      );
    });

    it("Should set writer on callee", async function() {
      const owner = accounts[0];
      const writer = accounts[1];

      console.log("Owner: " + accounts[0]);
      console.log("Writer: " + accounts[1]);

      await this.callee.setWriter(this.caller.address, { from: accounts[0] });

      console.log(`Address of writer: ${await this.callee.writer()}`);

      assert.equal(
        (await this.callee.writer()),
        this.caller.address,
        "Writer is not expected address"
      );
    });

  });

  describe('Get/Set bytes', function() {
    it("Should let writer set bytes", async function() {

      let hello = ethers.utils.hexlify(ethers.utils.toUtf8Bytes("hello"));
      let world = ethers.utils.hexlify(ethers.utils.toUtf8Bytes("world"));

      console.log("hello: " + hello);
      console.log("world: " + world);

      await this.caller.storeBytes(hello, world);

      console.log(`Wrote this: ${ethers.utils.toUtf8Bytes(await this.caller.getBytes(hello))}`)

      assert.equal(
        (ethers.utils.hexlify(ethers.utils.toUtf8Bytes(await this.caller.getBytes(hello)))),
        world,
        "Message not equal"
      );
    });
  });

});

// ethers.utils.id("some id")
// ethers.utils.hexlify(ethers.utils.toUtf8Bytes("a string to store"))
