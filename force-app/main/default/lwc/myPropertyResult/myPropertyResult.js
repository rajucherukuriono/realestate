import { LightningElement, track, wire,api } from 'lwc';
import getLatestProperty from '@salesforce/apex/PropertyDetails.getLatestProperty';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin} from 'lightning/navigation';
import getSearchedProperty from '@salesforce/apex/PropertyDetails.getSearchedProperty';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
//import pubsub from 'c/pubsub';

import { CurrentPageReference } from 'lightning/navigation';

export default class MyPropertyResult extends NavigationMixin(LightningElement) {
    @track properties;
    @track propertiesFound;
    @track propid;
    @track enquiryDetails=false;
    @track feedbackPropertId;
    @track locFilter;
    @track bedroomFilter;
    @track bathroomFilter;
    @track budgetFilter;
    openOwnerDetail=false; 
    propOwnerId;
   
    @wire(getLatestProperty)
    wiredProperties({data,error}){
        if(data){
            this.properties = data;
            this.propertiesFound = true;
        }
        else if(error){
            this.showToast('Error',error.body.message,'error');
            this.propertiesFound = false;
        }
    }
    get propertiesFound() {
        if (this.properties) {
            return true;
        }
        return false;
    }
    showToast(title,message,variant){
        const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant:variant,
        });  
        this.dispatchEvent(evt);  
    }
    ownerDetailsClick(event){
        console.log("====================================> JVH");
        alert("Jai JVH ....JAI");
        alert(event.target.value);
        alert("Jai JVH ....JAI2");
        this.propOwnerId=event.target.value;
        this.openOwnerDetail=true;
        alert(this.openOwnerDetail);
        alert("Property OwnerId :"+this.propOwnerId);

    }
    feedbackClicked(event){
        alert("Jai JVH ....you are in Enquiry form");
        this.feedbackPropertId=event.target.value;
        this.enquiryDetails=true;
    }
    closeFeedbackModal(event){
        this.enquiryDetails=false;
    }
    closeOwnerModel(event){
        this.openOwnerDetail=false;
    }
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        console.log('Connected Call back ');
        registerListener('handleLocChangeEvent', this.handleLocChangeEvent,this) ; 
        registerListener('handleBedChangeEvent', this.handleBedChangeEvent,this) ;   
        registerListener('handleBathChangeEvent', this.handleBathChangeEvent,this) ; 
        registerListener('handleBudgetChangeEvent', this.handleBudgetChangeEvent,this) ; 
    }
    disconnectedCallback(){
        unregisterAllListeners(this);    
    }
    handleLocChangeEvent(locchange){
        console.log('handleLocChangeEvent invoked ');
        this.locFilter = locchange;
        getSearchedProperty({
            location: this.locFilter,
            bedroom : this.bedroomFilter,
            bathroom :this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.properties = result;
        })
        .catch(error =>{
            this.showToast('ERROR',error.body.message,'error');
        });
    }
    handleBedChangeEvent(bedchange){
        console.log('handleBedChangeEvent invoked ');
        this.bedroomFilter = bedchange;
        getSearchedProperty({
            location: this.locFilter,
            bedroom : this.bedroomFilter,
            bathroom :this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.properties = result;
        })
        .catch(error =>{
            this.showToast('ERROR',error.body.message,'error');
        });
    }
    handleBathChangeEvent(bathchange){
        console.log('handleBathChangeEvent invoked ');
        this.bathroomFilter = bathchange;
        getSearchedProperty({
            location: this.locFilter,
            bedroom : this.bedroomFilter,
            bathroom :this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.properties = result;
        })
        .catch(error =>{
            this.showToast('ERROR',error.body.message,'error');
        });
    }
    handleBudgetChangeEvent(budgetchange){
        console.log('handleBudgetChangeEvent invoked ');
        this.budgetFilter = budgetchange;
        getSearchedProperty({
            location: this.locFilter,
            bedroom : this.bedroomFilter,
            bathroom :this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.properties = result;
        })
        .catch(error =>{
            this.showToast('ERROR',error.body.message,'error');
        });
    }
    NavigateToPropDetails(event){

        this.propid=event.target.value;
        console.log('In Navigation .....'+this.propid);
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName:'c__MyProperty360View'
            },
            state: {
                c__propertyId:this.propid
            }
        });
        console.log('In Navigation .....'+this.propid);
    }
}