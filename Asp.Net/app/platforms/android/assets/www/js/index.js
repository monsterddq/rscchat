var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent();
    },
    receivedEvent: function() {
       // var options = new ContactFindOptions();
       // options.multiple = true;
       // navigator.contacts.find(['displayName','phoneNumbers'],onSuccess,onError,options);
       // function onSuccess(contacts) {
       //   localStorage.setItem('contacts',JSON.stringify(contacts));
       // }
       // function onError(contactError) {
       //    alert('onError!');
       // }
    }
};

app.initialize();
