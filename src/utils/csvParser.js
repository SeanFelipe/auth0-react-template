export function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onloadend = () => {
      /*
      const newLines = reader.result.split(/\r\n|\n/)
      console.log("PCF() with newLines: " + Array.isArray(newLines))
      */
      resolve(reader.result)
    }
  })
}
