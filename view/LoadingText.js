'use strict'

module.exports = class LoadingText {

  constructor(cursor, beginText, endText) {
    this.cursor = cursor
    this.beginText = beginText
    this.endText = endText

    cursor.green()
    cursor.write(beginText)
  }

  init() {
    let i = 1
    let size = this.beginText.length + 1

    this.interval = setInterval(() => {

      if(i++ % 4 === 0)
        this.cursor.horizontalAbsolute(size).eraseLine()
      else
        this.cursor.write('.')

    }, 800)
  }

  end()  {
    clearInterval(this.interval)

    this.cursor.horizontalAbsolute(0).eraseLine()
    this.cursor.write(this.endText)

    this.cursor.reset().write('\n')
  }

}
