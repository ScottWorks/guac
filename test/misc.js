const test = require("blue-tape");
const p = require("util").promisify;

const {
  filterLogs,
  takeSnapshot,
  revertSnapshot,
  solSha3
} = require("./utils.js");

module.exports = function(PaymentChannels) {
  test("Misc", async () => {
    const accounts = await p(web3.eth.getAccounts)();
    const instance = await PaymentChannels.deployed();

    test("submitPreimage", async t => {
      const eventLog = instance.allEvents();

      await instance.submitPreimage(
        solSha3(
          "0x1000000000000000000000000000000000000000000000000000000000000000"
        ),
        "0x1000000000000000000000000000000000000000000000000000000000000000"
      );

      t.shouldFail(
        instance.submitPreimage(
          solSha3(
            "0x1000000000000000000000000000000000000000000000000000000000000000"
          ),
          "0x2000000000000000000000000000000000000000000000000000000000000000"
        )
      );

      const logs = await p(eventLog.get.bind(eventLog))();
      console.log("logs", filterLogs(logs));
      eventLog.stopWatching();
    });

    test("mintTokens", async t => {
      const snapshot = await takeSnapshot();

      await instance.mint(accounts[0], 120000);
      t.equal((await instance.balanceOf(accounts[0])).c[0], 120000);
      await revertSnapshot(snapshot);
    });
  });
};
