
import * as React from 'react';
import { RootViewModel } from '../../view-models/root-view-model';
import { LocalesNames } from '../../locales-names';
import * as util from 'util';
import { Place } from '@ournet/api-client';
import { PlaceHelper } from '../../data/places/place-helper';

export type SubscribeBarProps = {
    root: RootViewModel
    place: Place
}

export default class SubscribeBar extends React.Component<SubscribeBarProps>{

    render() {
        const { __, config, lang } = this.props.root;

        if (!config.oneSignal) {
            return null;
        }

        const place = this.props.place;

        return (
            <div>
                <div className="c-subscribe-bar u-hidden">
                    <div className="c-subscribe-bar__btn">{util.format(__(LocalesNames.notifications_subscribe_for_place), PlaceHelper.getName(place, lang))}</div>
                </div>
                <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
                <script dangerouslySetInnerHTML={{__html:`var OneSignal = window.OneSignal || [];

OneSignal.push(['init', {
  appId: "${config.oneSignal.appId}",
  autoRegister: false,
  persistNotification: false,
  notifyButton: {
    enable: true,
    showCredit: false,
    prenotify: true
  },
  welcomeNotification: {
    disable: true
  },
  safari_web_id: "${config.oneSignal.safari_web_id}"
}]);

OneSignal.push(function() {

  var category='notifications-weather';
  
  function initNotifications(permission) {
    var currentTags;
    var placeId = '${place.id}';
    var admin1Code = '${place.admin1Code}';

    function subscribedToCurrentPlace() {
      return currentTags && currentTags['place-id'] == placeId;
    }

    function setPlaceId() {
      OneSignal.sendTags({'place-id': placeId, 'admin1-code': admin1Code});
    }

    function subscribeToNotifications() {
      OneSignal.registerForPushNotifications();
      //ga('send', 'event', category, 'show-register-native');
    }

    function hideSubscribe() {
      $('.c-subscribe-bar').addClass('u-hidden');
    }
    function showSubscribe() {
      $('.c-subscribe-bar').removeClass('u-hidden');
    }

    if(permission === 'granted') {
      OneSignal.getTags(function(tags) {
        currentTags = tags;
        if (!subscribedToCurrentPlace()) {
          showSubscribe();
        } else {
          if(!currentTags['admin1-code']){
            OneSignal.sendTag('admin1-code', admin1Code);
          }
        }
      });
    } else {
      showSubscribe();
    }
    
    $('.c-subscribe-bar').click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      //ga('send', 'event', category, 'click-subscribe-btn');
      if(permission === 'granted') {
        setPlaceId();
        //ga('send', 'event', category, 'changed-place-id', placeId);
        hideSubscribe();
      } else {
        subscribeToNotifications();
      }
    });


    OneSignal.on('notificationPermissionChange', function(permissionChange) {
      var currentPermission = permissionChange.to;
      if (currentPermission === 'granted') {
        setPlaceId();
      }
      //ga('send', 'event', category, currentPermission);
    });
    // Occurs when the user's subscription changes to a new value.
    OneSignal.on('subscriptionChange', function (isSubscribed) {
      if (isSubscribed) {
        hideSubscribe();
        setPlaceId();
      } else {
        showSubscribe();
      }
    });

  }

  // If we're on an unsupported browser, do nothing
  if (OneSignal.isPushNotificationsSupported()) {
    OneSignal.push(["getNotificationPermission", function(permission) {
        initNotifications(permission);
    }]);
    //ga('send', 'event', category, 'supported');
  } else {
    hideSubscribe();
    //ga('send', 'event', category, 'not-supported');
  }
});`}}></script>
            </div>
        )
    }
}
