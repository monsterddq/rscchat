var registerServiceWorker = require("/Scripts/registerServiceWorker");
var App = require("/Scripts/App");

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
