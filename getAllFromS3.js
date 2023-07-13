const AWS = require('aws-sdk');
var config = require('./config.json')
AWS.config.update({accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region});

const s3 = new AWS.S3({
  accessKeyId: 'AKIASX7ODB6BPOBTS5FH',
  secretAccessKey: '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'
});

var params = {
  Bucket: 'reportslighthouse'    
};

var allKeys = [];
listAllKeys();
function listAllKeys() {
  s3.listObjectsV2(params, function (err, data) {
      if (err) {
          console.log(err, err.stack); // an error occurred
      } else {
          //console.log(data)
          var contents = data.Contents;
          
          contents.forEach(function (content) {
              var new_params = {Bucket: 'reportslighthouse', Key: content.Key};

              s3.getObject(new_params, function(new_err, new_data) {

                if(new_err) console.log(new_err, new_err.stack);
                else{
              
                  let text = new_data.Body;
                  const obj = JSON.parse(text);
                  console.log(content.Key)
                  fields = {};
                  fields['url'] = {S:obj["requestedUrl"]}
                  fields['date'] = {S:obj["fetchTime"].substring(0,10)}   
                  fields['per'] = {S:obj["categories"]["performance"]['score'].toString()}
                  fields['acc'] = {S:obj["categories"]["accessibility"]['score'].toString()}               
                  fields['fcp'] = {S:obj["audits"]["first-contentful-paint"]['score'].toString()}
                  fields['lcp'] = {S:obj["audits"]["largest-contentful-paint"]['score'].toString()}
                  fields['si'] = {S:obj["audits"]["speed-index"]['score'].toString()}
                  fields['tbt'] = {S:obj["audits"]["total-blocking-time"]['score'].toString()}
                  fields['cls'] = {S:obj["audits"]["cumulative-layout-shift"]['score'].toString()}
                  console.log(fields)
              
                  var new_params = {
              
                    TableName: 'AppleTable',
                    Item: fields
                  
                  };
                  
                  // Call DynamoDB to add the item to the table
                  var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
                  ddb.putItem(new_params, function(new_err, new_data) {
              
                  if (new_err) {
                    console.log('Error', new_err);
                  } else {
                    console.log('Success', new_data);
                  }
              
              });
                } 
              });
              allKeys.push(content.Key);
          });

          if (data.IsTruncated) {
              params.ContinuationToken = data.NextContinuationToken;
              console.log("get further list...");
              listAllKeys();
          } 

      }
  });
}

console.log(allKeys)
 
