class Inventory {
  constructor(id='', name='', origin='') {
    this.id = id
    this._name = name
    this.origin = origin
  }

  static fromData(data) {
    return new Inventory(
      data.id || '',
      data.name || '',
      data
    )
  }

  get name () {
    return this._name
  }

  set name (name) {
    this._name = name
  }

  toData() {
    return {
      id: this.id,
      name: this._name
    }
  }

  reset() {
    this.name = this.origin.name
  }
}

export {
  Inventory
}