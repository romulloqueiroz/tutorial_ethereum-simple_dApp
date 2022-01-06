// eslint-disable-next-line no-undef
const StorageContract = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(StorageContract);
};
