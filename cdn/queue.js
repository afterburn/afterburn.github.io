class Queue {
  constructor (concurrency = 1) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  process (task) {
    this.running++
    task(() => {
      this.running--
      if (this.queue.length > 0) {
        this.process(this.queue.shift())
      }
    })
  }

  enqueue (task) {
    this.queue.push(task)
  }

  push (task) {
    if (this.running < this.concurrency) {
      this.process(task)
    } else {
      this.enqueue(task)
    }
  }
}