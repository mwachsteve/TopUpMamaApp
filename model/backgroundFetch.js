// import BackgroundFetch from 'react-native-background-fetch';

import Notifications from './notifications';

// const initBackGroundFetch = () => {
//     BackgroundFetch.configure(
//       {
//         minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
//         // Android options
//         forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
//         stopOnTerminate: false,
//         startOnBoot: true,
//         requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Network connection needed
//       },
//       async taskId => {

//         // Do stuff with notifications, for example:
//         // const notificationService = new NotificationService(
//         //    () => {//... what to do on register},
//         //    () => {//... what to do on notification }
//         // )
//         const date = new Date(Date.now() + 60 * 1000) // adjust according to your use case
//         notificationService.scheduleNotif(date, "title", "message");
//         BackgroundFetch.finish(taskId);
//       },
//       error => {
//         console.log('[js] RNBackgroundFetch failed to start');
//       },
//     );
//   };