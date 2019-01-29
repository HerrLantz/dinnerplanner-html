class Observable {
    constructor(){
	   this._observers = [];
   }

    addObserver(observer){
	   this._observers.push(observer);
    }
   
    notifyObservers(changeDetails) {
           for(var i=0; i<this._observers.length; i++) {
                 this._observers[i].update(this, changeDetails);
           }	
     }

     removeObserver(observer){  /* remove observer from array */}
}