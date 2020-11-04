const { configure } = require("enzyme")
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17")

configure({ adapter: new Adapter() })

global.___loader = {
  enqueue: jest.fn(),
}

global.__BASE_PATH__ = ``
