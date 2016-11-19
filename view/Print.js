'use strict'

module.exports = class Print {

  constructor(cursor) {
    this.cursor = cursor
    this.separator = ': '
  }

  insertField(description, value) {
    this.cursor.bold().green().write(description)

    if (value) {
      this.cursor.write(this.separator).reset()
      this.cursor.hex('#00acc1').write(value)
    }

    this.cursor.write('\n').reset()
  }

  error(error, code) {
    this.cursor.red().write(error)
    this.cursor.write(this.separator)//.reset()
    this.cursor.write(code)
    this.cursor.write('\n').reset()
  }

}
