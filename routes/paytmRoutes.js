const checksum_lib = require('../Paytm_Karo/checksum/checksum')
const port = 1234

module.exports=(app)=>{
    app.get('/payment',(req,res)=>{
        let params ={}
        params['MID'] = 'KnPdKN53586095210313',
        params['WEBSITE'] = 'WEBSTAGING',
        params['CHANNEL_ID'] = 'WEB',
        params['INDUSTRY_TYPE_ID'] = 'Retail',
        params['ORDER_ID'] = 'ORD0001',
        params['CUST_ID'] = 'CUST0011',
        params['TXN_AMOUNT'] = '100',
        params['CALLBACK_URL'] = 'http://localhost:'+port+'/food/',
        params['EMAIL'] = 'chandankr.pra@gmail.com',
        params['MOBILE_NO'] = '8581922415'

        checksum_lib.genchecksum(params,'_fUQtnWfGxLBfws&',function(err,checksum){
            let txn_url = "https://securegw-stage.paytm.in/order/process"

            let form_fields = ""
            for(x in params)
            {
                form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"'/>"

            }

            form_fields+="<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' />"

            var html = '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="get" action="'+txn_url+'" name="f1">'+form_fields +'</form><script type="text/javascript">document.f1.submit()</script></body></html>'
            res.writeHead(200,{'Content-Type' : 'text/html'})
            res.write(html)
            res.end()
        })
    })
}