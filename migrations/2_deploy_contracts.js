const Callee = artifacts.require("Callee.vyper");
module.exports = function(deployer) {
  deployer.deploy(Callee);
};
