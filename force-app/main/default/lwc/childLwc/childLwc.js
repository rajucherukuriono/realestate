import { LightningElement, track, api } from 'lwc';  
export default class childLwc extends LightningElement {  
  @track checkBoxChecked = false;  
  @api childFunction(){  
   console.log("Child LWC Component method invoked");  
   this.checkBoxChecked = true;  
 }  
} 