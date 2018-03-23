class Queue {
  constructor () {
    this.queue = []
    this.isProcessing = false
  }
  
  enqueue (task) {
  	this.queue.push(task)
    this.dequeue()
  }
  
  dequeue () {
  	if (this.queue.length > 0) {
    	if (!this.isProcessing) {
      	this.isProcessing = true
        const task = this.queue.shift()
        task(() => {
        	this.isProcessing = false
          this.dequeue()
        })
      }
    }
  }
}