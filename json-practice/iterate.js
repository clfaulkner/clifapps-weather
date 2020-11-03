var graph = {
  "sparkData" : [ {
    "one" : [ 97, 5, 69, 35, 28, 52, 51, 55 ]
  }, {
    "two" : [ 96, 63, 18, 55, 13, 47, 77, 64 ]
  }, {
    "three" : [ 94, 75, 83, 44, 43, 86, 68, 26 ]
  } ]
}

document.writeln("<br><br><div align='center'><table border='1'><tr>");

for ( var i = 0; i < graph.sparkData.length; i++) {
  var obj = graph.sparkData[i];
  console.log(obj);

  document.writeln("<td>");
  document.writeln("<table border='0'  width=100 >");

  for ( var key in obj) {
    crunchifyName = key;
    crunchifyValue = obj[key].toString();  // convert array values to a string
    document.writeln("<tr><td><B>" 
      + crunchifyName
      + ":  </B></td><td width=50>" 
      + crunchifyValue
      + "</td></tr>");
    document.writeln("</table>");
  }
}
document.writeln("</tr></table></div>");

var dictionary = {
"employees":[
    {
      "id":"1", 
      "name":"Google"
    },
    {
      "id":"2", 
      "name":"eBay"
    },
    {
      "id":"3", 
      "name":"Yahoo"
    },
    {
      "id":"4", 
      "name":"Facebook"
    }
]
};

for ( var i in dictionary.employees) {
  let 
    id = dictionary.employees[i].id,
    name = dictionary.employees[i].name

  console.log(id + name);
}
