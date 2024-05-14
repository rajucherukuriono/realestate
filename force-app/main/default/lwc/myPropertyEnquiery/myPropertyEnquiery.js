import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class MyPropertyEnquiery extends LightningElement {
    @api objectApiName;
    @api propertyId;
 
    handleSuccess(event){
        alert("Before Toast Event.....");
        const evt = new ShowToastEvent({
            title: "Feedback Submitted",
            message: "Success",
            variant: "success"
        });
        this.dispatchEvent(evt);
    }
}