'use strict'

module.exports = class LoadingText {

  constructor(cursor, beginText) {
    this.cursor = cursor
    this.beginText = beginText
  }

  init() {
    let i = 1
    let size = this.beginText.length + 1

    this.cursor.green()
    this.cursor.write(this.beginText)

    this.interval = setInterval(() => {

      if(i++ % 4 === 0)
        this.cursor.horizontalAbsolute(size).eraseLine()
      else
        this.cursor.write('.')

    }, 800)
  }

  successEnd(text)  {
    clearInterval(this.interval)

    this.cursor.horizontalAbsolute(0).eraseLine()
    this.cursor.bold().write(text)

    this.cursor.reset().write('\n')
  }

  errorEnd(text)  {
    clearInterval(this.interval)

    this.cursor.red()
    this.cursor.horizontalAbsolute(0).eraseLine()
    this.cursor.write(text)

    this.cursor.reset().write('\n')
  }

}
