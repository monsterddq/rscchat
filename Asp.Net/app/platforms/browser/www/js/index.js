var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent();
    },
    receivedEvent: function() {
       var duration = 0.5, // animation time in seconds
            direction = "right";
       nativetransitions.flip(duration, direction);
       var options = new ContactFindOptions();
       options.multiple = true;
       navigator.contacts.find(['displayName','phoneNumbers'],onSuccess,onError,options);
       function onSuccess(contacts) {
         localStorage.setItem('contacts',JSON.stringify(contacts));
       }
       function onError(contactError) {
          alert('onError!');
       }
    }
};

app.initialize();
