// import axios from 'axios';
import config from '../config'
import { logger } from '~/lib/logger'

// export const sendLog = async (logData) => {
//   if (!config.isDev) {
//     //   console.log('Log sending is disabled in production');
//     return;
//   }
//   // console.log ('sendLog Start');
//   // console.log ( config.isDev);
//   // console.log ( config.logServerUrl) ;

//   const { status, startTime, apiDetails, response, errorMessage } = logData;

//   try {
//     await axios.post(config.logServerUrl, {
//       timestamp: startTime,
//       apiDetails: JSON.stringify(apiDetails),
//       status: status,
//       ...(status === 'success' && { response: JSON.stringify(response) }),
//       ...(status === 'error' && { errorMessage: errorMessage }),
//     });
//     console.log(`${status} log sent successfully`);
//   } catch (error) {
//     console.log('sendLog Error');
//     //   console.error(`Failed to send ${status} log:`, error || 'Error:undefined');
//   }
// };

export const sendLogConsole = (logData) => {
  if (!config.isDev) {
    logger.info('Log sending is disabled in production')
    return
  }
  console.log('sendLogConsole Start')
  console.log('isDev:', config.isDev)

  const { status, startTime, apiDetails, response, errorMessage } = logData

  const logObject = {
    timestamp: startTime,
    apiDetails: apiDetails ? JSON.stringify(apiDetails) : '',
    status: status,
    ...(status === 'success' && { response: JSON.stringify(response) }),
    ...(status === 'error' && { errorMessage: errorMessage })
  }

  logger.info('Log data:', logObject)
}
