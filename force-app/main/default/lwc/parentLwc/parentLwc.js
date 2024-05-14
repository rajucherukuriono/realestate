import { LightningElement } from 'lwc';

export default class parentLwc extends LightningElement {
    onButtonClick(){  
        console.log("Parent LWC component function invoked")  
       this.template.querySelector("c-child-lwc").childFunction();  
      }  

}
