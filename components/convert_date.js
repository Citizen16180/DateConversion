'use strict';
//created by: Radu Marinache / radu.marinache@oracle.com
// Documentation for writing custom components: https://github.com/oracle/bots-node-sdk/blob/master/CUSTOM_COMPONENT.md

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch. 
// const fetch = require("node-fetch");
 
module.exports = {
  metadata: () => ({
    name: 'convert_date',
    properties: {
      var_dateStr: { required: true, type: 'string' },
    },
    supportedActions: []
  }),


  /**
   * invoke methods gets called when the custom component state is executed in the dialog flow
   * @param {CustomComponentContext} context 
   */
  invoke: async (context) => {
    const { var_dateStr } = context.properties();
    let converted_date = convertToStandardDateFormat(var_dateStr)
    context
    .setVariable("user.converted_date", converted_date)
    .transition()
    .keepTurn(true);

    
  }
};


function convertToStandardDateFormat(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) throw new Error('Invalid Date');
  const isoString = date.toISOString();
  return isoString.split('T')[0]; // Extract the date part   
}