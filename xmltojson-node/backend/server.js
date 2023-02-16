const express = require('express');
const app = express();
const request = require('request-promise');
const fs = require('node:fs');
const parser = require('xml2json');
const ejs = require('ejs');
const port = 4000;
const cors = require('cors');

app.use(cors());
app.set('view engine', 'ejs');

let TOC = {
    northern: 'NT',
    tpe: 'TP',
    merseyrail: 'MR',
    tfw: 'AW',
    emr: 'EM'
}

// this is home
app.get('/', (req, res, next) => {
    res.render('index');
})

// this route will show raw json in browser
app.get(`/api/national-rail/disruptions/:id`, async (req, res, next) => {

    let opRef = TOC[req.params.id]; // takes the id param passed in ':id' and saves value TOC key in opRef

    var options = { // json parser options
        object: true,
        reversible: false,
        coerce: false,
        sanitize: true,
        trim: true,
        arrayNotation: false,
        alternateTextNode: false
    };

    const query = 'https://internal.nationalrail.co.uk/xml/5.0/incidents.xml';

        (async () => {
            let resp = await request({
                uri: query,
                headers: {'Content-Type': 'text/xml','User-Agent': '*'},
                timeout:10000,
                json: true,
                gzip: true
            });
    
            await fs.writeFileSync("incidents.xml", resp) // saves xml
            const read = await fs.readFileSync("incidents.xml"); // reads xml
            const output = await parser.toJson(read, options); // parses read xml to json
    
            //arrays & objects
            const toc_incident = await output.Incidents.PtIncident.map((disruption) => { // maps through each PtIncident object
                //console.log(disruption.Affects.Operators)
                    if (disruption.Affects.Operators){ // checks if object exists (can be just disruptions)
                        
                        if(disruption.Affects.Operators.AffectedOperator.constructor === Object){  // checks if is an Object type
                            if ( disruption.Affects.Operators.AffectedOperator.OperatorRef == opRef){ // checks if OperatorRef is in TOC e.g. 'NT' (northern)
                                if(disruption !== null){
                                    return disruption; // returns the object disruption that is Northern only
                                }
                            }
                        }
                        
                        if(disruption.Affects.Operators.AffectedOperator.constructor === Array){ // checks if is an Array (of objects) type
                            return disruption.Affects.Operators.AffectedOperator.map((disruptionArray) => { 
                                if(disruptionArray.OperatorRef == opRef){
                                    return disruption; 
                                    // filter array for object that has OperatorRef of 'NT' and returns object 
                                    // with Northern and any other affected TOC linked with that service
                                }
                            }) 
                        }
                    }
          
            })
            await res.send(toc_incident);
            next();
        })();
})

app.listen(port, (res) => {
    console.log(`Server started on port: ${port}`);
})
