class Rectangle {
  constructor (x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  contains (p) {
    return (p.x > this.x - this.w &&
      p.x <= this.x + this.w &&
      p.y > this.y - this.h &&
      p.y <= this.y + this.h)
  }

  intersects (range) {
    return !(range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h)
  }
}