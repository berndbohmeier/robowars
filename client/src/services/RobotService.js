

export class RobotService {
  constructor(robotsContract) {
    this.robotsContract = robotsContract
  }

  async robotsOf(owner) {
    const numberOfRobots = await this.robotsContract.balanceOf(owner)
    const robots = []
    for(let i = 0; i < numberOfRobots; i++) {
      robots.push((await this.robotsContract.tokenOfOwnerByIndex(owner, i)).toString())
    }
    return robots
  }

  async getAllRobots() {
    const totalSupplyOfRobots = await this.robotsContract.totalSupply()
    const robots = []
    for (let i = 0; i < totalSupplyOfRobots; i++) {
      robots.push((await this.robotsContract.tokenByIndex(i)).toString())
    }
    return robots
  }

  async ownerOf(id) {
    return this.robotsContract.ownerOf(id)  
  }
}
