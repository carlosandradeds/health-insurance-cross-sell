function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Score Prediction')
    .addItem('Get Prediction','PredictAll')
    .addToUi();
}


// Helper Function

host_production = 'health-insurance-cross.herokuapp.com'

function ApiCall(data,endpoint){
  var url = 'https://'+ host_production + endpoint;
  var payload = JSON.stringify(data);

  var options = {'method': 'POST', 'contentType': 'application/json', 'payload': payload};
  Logger.log( url )
  Logger.log( options )

  var response = UrlFetchApp.fetch(url, options);

  var rc = response.getResponseCode();
  var responseText = response.getContentText();
  if (rc !== 200){
    Logger.log('Response (%s)%s',rc,responseText)
  }
  else{
    prediction = JSON.parse(responseText);
  }
  return prediction
};

// Function Sort

function SortPred(){
 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var sheet = ss.getSheets()[0];
 var lastRow = sheet.getLastRow();
 var lastColumn = sheet.getLastColumn();
 var range = sheet.getRange('A2' + ':' + 'L' + lastRow);
 range.sort({column: lastColumn, ascending: false});
}

// Function Predict All

function PredictAll(){
  var ss = SpreadsheetApp.getActiveSheet();
  var titleColumns = ss.getDataRange().getValues()[0];
  var data = ss.getDataRange().getValues();
  data.shift();
 
  //Logger.log(data)
  
  for (row in data){
    var json = new Object();
    
    for(var j=0; j < titleColumns.length; j++){
      json[titleColumns[j]] = data[row][j];
    };
  
  //Json file to send
    var json_send = new Object();				
    json_send['id'] = json['id']
    json_send['gender'] = json['Gender']
    json_send['age'] = json['Age']
    json_send['driving_license'] = json['Driving_License']
    json_send['region_code'] = json['Region_Code']
    json_send['previously_insured'] = json['Previously_Insured']
    json_send['vehicle_age'] = json['Vehicle_Age']
    json_send['vehicle_damage'] = json['Vehicle_Damage']
    json_send['annual_premium'] = json['Annual_Premium']
    json_send['policy_sales_channel'] = json['Policy_Sales_Channel']
    json_send['vintage'] = json['Vintage']
    
    
    pred = ApiCall(json_send,'/predict');

    Logger.log(pred)

    // Send back to google sheets
    ss.getRange( Number( row ) + 2 , titleColumns.length).setValue( pred[0]['score'] )


  };
    // call sort function
  SortPred()
  
};