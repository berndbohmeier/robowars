const Robots = artifacts.require('./Robots.sol');

contract('Robots', accounts => {
  describe('Basics', () => {
    it('should give the first user 10 robots', async () => {
      const robotsInstance = await Robots.new()

      const numberOfRobots = await robotsInstance.balanceOf.call(accounts[0])

      assert.equal(numberOfRobots, 10, 'Number of robots was not 10')
    });

    it('should transfer a robot', async () => {
      const robotsInstance = await Robots.new()
      robotsInstance.transferFrom(accounts[0], accounts[1], 2, {from: accounts[0]})
      const numberOfRobotsSender = await robotsInstance.balanceOf.call(accounts[0])
      const numberOfRobotsReceiver = await robotsInstance.balanceOf.call(accounts[1])
      const ownerOfRobot = await robotsInstance.ownerOf.call(2)

      assert.equal(numberOfRobotsSender, 9, 'Number of robots was not reduced')
      assert.equal(numberOfRobotsReceiver, 1, 'Receiver does not have his robot')
      assert.equal(ownerOfRobot, accounts[1], 'Robot was not transferred')
    })

  })

  describe('Fighting', () => {

    it('should create a new robot', async () => {
      const robotsInstance = await Robots.new();
      robotsInstance.transferFrom(accounts[0], accounts[1], 2, {from: accounts[0]})
      robotsInstance.fight(1, 2, {from: accounts[0]})

      const numberOfRobots = Number(await robotsInstance.balanceOf.call(accounts[0])) +
        Number(await robotsInstance.balanceOf.call(accounts[1]))

      assert.equal(numberOfRobots, 11, 'No new robot was created')
    })
  })
});
