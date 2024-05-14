import { LightningElement, api, track, wire } from 'lwc';
import getDetails from '@salesforce/apex/PropertyDetails.getDetails';
export default class MyMasterPropertyTab extends LightningElement {
    @api property;
    @api propertyOwnerId;
    @api propertyFound;
    @api propertyId;
    @track error;
    @track propertyOwnerId;
    @track video;

    @wire(getDetails, { propId: '$propertyId' })
    wiredProperties({ data, error }) {
        console.log('WiredProp propId :' + this.propertyId);
        //console.log('WiredProp property.propId :' + this.property.propertyId);
        if (data) {
            console.log('Data======>' + data.Property_Owner__c.value);
            this.property = data;
            this.propertyFound = true;
            this.propertyOwnerId = this.property.Property_Owner__c;
            this.video=this.property.Property_Video_URL__c;
            //console.log('WiredProp propertyOwnerId' + this.propertyOwnerId);

            console.log('WiredProp propertyOwnerId' + this.propertyOwnerId);            

        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error');
        }
    }
}
