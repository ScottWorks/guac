To test this contract first install node 8 or above. Then run `npm install`, `npm run migrate`, `npm run testrpc` (keep this running in the background), finally run `npm run test` to run the unit tests. There may be a bug in testrpc that prevents all the tests being run at once, so you can use blue-tape's test.only function to run only one of them.
