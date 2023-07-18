// aws dynamodb scan --table-name 'AppleTable' > exports.json
const AWS = require('aws-sdk');
AWS.config.update({accessKeyId:process.argv[2], secretAccessKey: process.argv[3], region: "us-east-1"});
const fs = require('fs')
const { table } = require('console');
var s3 = new AWS.S3();
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
var params = {Bucket: 'myuploads3', Key: 'data.txt'};

var getUrl ;
var startDate ;
var endDate ;

s3.getObject(params, function(err, data) {

  if(err) console.log(err, err.stack);
  else{

    let text = data.Body.toString();
    const contents = text.split(',')
    getUrl = contents[0]
    startDate = contents[1]
    endDate = contents[2]
    const query = async () => {
        const response = await documentClient
          .query({
            TableName: "AppleTable",
            ExpressionAttributeNames: {
              "#url": "url",
              "#date": "date"
            },
            ExpressionAttributeValues: {
              ":urlname": getUrl,
              ":st": startDate,
              ":end": endDate,
            },
            FilterExpression: "#date BETWEEN :st and :end",
            KeyConditionExpression: "#url = :urlname",
          })
          .promise();
          //console.log(response)
          jstr = JSON.stringify(response, null, 2);
          
          //console.log(jstr)
          const tableData = JSON.parse(jstr)
fields = {}
var perList = []
var accList = []
var fcpList = []
var lcpList = []
var siList = []
var tbtList = []
var clsList = []
for ( let index = 0; index < tableData["Items"].length ; index++) {
    obj1 = {}
    obj1['score'] = tableData["Items"][index]["per"];
    obj1['date'] =  tableData["Items"][index]["date"];
    perList.push(obj1)
    obj2 = {}
    obj2['score'] = tableData["Items"][index]["acc"];
    obj2['date'] =  tableData["Items"][index]["date"];
    accList.push(obj2)
    obj3 = {}
    obj3['score'] = tableData["Items"][index]["fcp"];
    obj3['date'] =  tableData["Items"][index]["date"];
    fcpList.push(obj3)
    obj4 = {}
    obj4['score'] = tableData["Items"][index]["lcp"];
    obj4['date'] =  tableData["Items"][index]["date"];
    lcpList.push(obj4)
    obj5 = {}
    obj5['score'] = tableData["Items"][index]["si"];
    obj5['date'] =  tableData["Items"][index]["date"];
    siList.push(obj5)
    obj6 = {}
    obj6['score'] = tableData["Items"][index]["tbt"];
    obj6['date'] =  tableData["Items"][index]["date"];
    tbtList.push(obj6)
    obj7 = {}
    obj7['score'] = tableData["Items"][index]["cls"];
    obj7['date'] =  tableData["Items"][index]["date"];
    clsList.push(obj7)
    
}
fields["performance"] = perList
fields["accessibility"] = accList
fields["fcp"] = fcpList
fields["lcp"] = lcpList
fields["si"] = siList
fields["tbt"] = tbtList
fields["cls"] = clsList
      
fstr = JSON.stringify(fields)
var buf = Buffer.from(fstr);
      
      var data = {
          Bucket: 'myuploads3',
          Key: 'exportedData.json',
          Body: buf,
          ContentEncoding: 'base64',
          ContentType: 'application/json',
          ACL: 'public-read'
      };
      
      s3.upload(data, function (err, data) {
          if (err) {
              console.log(err);
              console.log('Error uploading data: ', data);
          } else {
              console.log('succesfully uploaded!!!');
          }
      });
      };
      
      query().catch((error) => console.error(JSON.stringify(error, null, 2)));
  } 
});



