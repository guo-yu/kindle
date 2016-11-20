'use strict'

var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

const allowedFormats = [
  'doc', 'docx', 'html', 'htm', 'rtf', 'jpeg', 'jpg',
  'mobi', 'azw', 'gif', 'png', 'bmp', 'pdf'
]

module.exports = {

  checkEmail: function(str) {
    return email.test(str);
  },

  resolveFormats: function(files) {
    let accepted = files.filter((file) => {

      let ext = file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase()
      ext = ext.toLowerCase()

      return allowedFormats.indexOf(ext) !== -1
    })

    let ignored = files.filter((file) => {

      let ext = file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase()
      ext = ext.toLowerCase()

      return allowedFormats.indexOf(ext) === -1
    })

    return {
      acceptedFiles: accepted,
      ignoredFiles: ignored
    }

  }

}
