class Vector2 {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

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

class Quadtree {
  constructor (boundary, capacity) {
    this.boundary = boundary
    this.capacity = capacity
    this.divided = false
    this.items = []
  }

  insert (p) {
    if (this.boundary.contains(p)) {
      if (this.items.length < this.capacity) {
        this.items.push(p)
        return true
      } else {
        this.trySubdivide()
        if (this.ne.insert(p) || this.nw.insert(p) || this.se.insert(p) || this.sw.insert(p)) {
          return true
        }
      }
    }
    return false
  }

  trySubdivide () {
    if (!this.divided) {
      const { x, y, w, h } = this.boundary
      let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2)
      let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2)
      let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2)
      let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2)
      this.nw = new Quadtree(nw, this.capacity)
      this.ne = new Quadtree(ne, this.capacity)
      this.sw = new Quadtree(sw, this.capacity)
      this.se = new Quadtree(se, this.capacity)
      this.divided = true
    }
  }

  query (range, found) {
    if (!found) found = []
    if(this.boundary.intersects(range)) {
      for (let p of this.items) {
        if (range.contains(p)) {
          found.push(p)
        }
      }
      if(this.divided) {
        this.ne.query(range, found)
        this.nw.query(range, found)
        this.se.query(range, found)
        this.sw.query(range, found)
      }
    }
    return found
  }
}