class EventEmitter {
  constructor () {
    this.events = {}  
  }
  
  on (event, callback) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  call () {
    const event = arguments[0]
    const newargs = [...arguments].splice(0).slice(1, arguments.length)
    if (this.events.hasOwnProperty(event)) {
      this.events[event].forEach(callback => callback.bind(null, ...newargs)())
    }
  }
}