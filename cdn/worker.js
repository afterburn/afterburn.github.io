class Worker {
  constructor (code) {
    this.blob = URL.createObjectURL(new Blob(['(',
      code.toString(),
    ')()'], { type: 'application/javascript' }))
  }
  
  start () {
    this.worker = new Worker(this.blob)
  }
  
  stop () {
    this.worker.terminate()
  }
}