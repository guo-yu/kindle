'use strict'

module.exports = class Print {

  constructor(cursor) {
    this.cursor = cursor
    this.separator = ': '
  }

  log(text) {
    this.cursor.write(text)
    this.cursor.write('\n')
  }

  successLog(text) {
    this.cursor.bold().green()
    this.cursor.write(text)
    this.cursor.reset().write('\n')
  }

  insertField(description, value) {
    this.cursor.bold().green().write(description)

    if (value) {
      this.cursor.write(this.separator).reset()
      this.cursor.hex('#00acc1').write(value)
    }

    this.cursor.write('\n').reset()
  }

  warning(description, value) {
    this.cursor.hex('#ff9800')
    this.cursor.write(description)
    this.cursor.write(this.separator).reset()
    this.cursor.write(value)
    this.cursor.write('\n')
  }

  error(error, code) {
    this.cursor.red().write(error)

    if(code) {
      this.cursor.write(this.separator)//.reset()
      this.cursor.write(code)
    }
    
    this.cursor.write('\n').reset()
  }

}
