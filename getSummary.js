const AWS = require ('aws-sdk')
const fs = require('fs')

json = fs.readFileSync(path = ./export.json', encoding = 'utf-8')

const tableData = JSON.parse(json)
const numItems = tableData.Count

const initialWrite = '['
fs.writeFileSync('exportedData.json', initialWrite)

tableData.Items.forEach(item, index) => {
  const atEnd = numItems - 1 === index
  const endValue = atEnd ? ']' : ','

  fs.appendFileSync(
    'exportedData.json',
    JSON.stringify(AWS.DynamoDB.Converter.unmarshall(item), null, 2) + endValue
  )
})
