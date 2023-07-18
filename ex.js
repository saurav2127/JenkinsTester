// aws dynamodb scan --table-name 'AppleTable' > exports.json

const fs = require('fs')
const { table } = require('console');
// 
json = fs.readFileSync(path = 'cleanedexports.json', encoding = 'utf-8')

var getUrl = process.argv[2]
var startDate = process.argv[3]
var endDate = process.argv[4]

const tableData = JSON.parse(json)
fields = {}
var perList = []
var accList = []
var fcpList = []
var lcpList = []
var siList = []
var tbtList = []
var clsList = []
for ( let index = 0; index < tableData["Items"].length ; index++) {
    if(tableData["Items"][index]["date"].S>startDate && tableData["Items"][index]["date"].S<endDate && 
    tableData["Items"][index]["url"].S==getUrl){
    perList.push([tableData["Items"][index]["per"].S, tableData["Items"][index]["date"].S])
    accList.push([tableData["Items"][index]["acc"].S, tableData["Items"][index]["date"].S])
    fcpList.push([tableData["Items"][index]["fcp"].S, tableData["Items"][index]["date"].S])
    lcpList.push([tableData["Items"][index]["lcp"].S, tableData["Items"][index]["date"].S])
    siList.push([tableData["Items"][index]["si"].S, tableData["Items"][index]["date"].S])
    tbtList.push([tableData["Items"][index]["tbt"].S, tableData["Items"][index]["date"].S])
    clsList.push([tableData["Items"][index]["cls"].S, tableData["Items"][index]["date"].S])
    }
}
fields["performance"] = perList
fields["accessibility"] = perList
fields["fcp"] = perList
fields["lcp"] = perList
fields["si"] = perList
fields["tbt"] = perList
fields["cls"] = perList
//console.log(fields)

fstr = JSON.stringify(fields)
jfile = JSON.parse(fstr)
//console.log(jfile)
fs.writeFile("./exportedData.json", fstr, (error) => {
  // throwing the error
  // in case of a writing problem
  if (error) {
    // logging the error
    console.error(error);

    throw error;
  }

  console.log("exportedData.json written correctly");
});
// const numItems = tableData.Count

// const initialWrite = '['
// fs.writeFileSync('exportedData.json', initialWrite)

// tableData.Items.forEach((item, index) => {
//   const atEnd = numItems - 1 === index
//   const endValue = atEnd ? ']' : ','

//   fs.appendFileSync(
//     'exportedData.json',
//     JSON.stringify(AWS.DynamoDB.Converter.unmarshall(item), null, 2) + endValue
//   )
// }) 
