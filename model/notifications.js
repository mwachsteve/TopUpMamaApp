import PushNotification from 'react-native-push-notification';

class Notifications {
    constructor(){
        PushNotification.configure({
            onRegister: function (token){
                // console.log('TOKEN', token);
            },

            onNotification: function (notification){
                // console.log('NOTIFICATION', notification);
            },

            popInitialNotification: true,
            requestPermissions: false,
        });

        PushNotification.createChannel(
            {
                channelId: 'reminders',
                channelName: 'Task Reminder Notification',
                channelDescription: 'Reminder for any tasks',
            },
            ()=>{},
        );

        PushNotification.getScheduledLocalNotifications(rn =>{
            console.log('SN === ', rn);
        });

    }

    schduleNotification(date,title,msg)
    {
        PushNotification.localNotificationSchedule({
            channelId: 'reminders',
            title: 'Weather Today in ' + title,
            message: msg,
            date,
        });
    }
}

export default new Notifications();