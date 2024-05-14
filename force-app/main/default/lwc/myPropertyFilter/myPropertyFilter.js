import { LightningElement, track, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
export default class MyPropertyFilter extends LightningElement {
    @track location;
    @track noOfBedRoom;
    @track noOfBathRoom; 
    @track maxBudget;
    @wire(CurrentPageReference) pageRef;
    get locationOptions(){
        return [
            {label:'ALL',value:'ALL'},
            { label: 'Banglore', value: 'Banglore' },
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Hyderabad', value: 'Hyderabad' },
            { label: 'Pune', value: 'Pune' },
            { label: 'Bhubaneswar', value: 'Bhubaneswar' }
        ];
    }
    get noOfBedRoomOptions(){
        return [
            {label:'ALL',value:'ALL'},
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' }
        ];

    }
    get noOfBathRoomOptions(){
        return [
            {label:'ALL',value:'ALL'},
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' }
        ];

    }
    handleLocationChange(event){
        this.location=event.target.value;
        console.log('Location selected as '+this.location);
        fireEvent(this.pageRef,'handleLocChangeEvent',this.location);
        console.log('After Event is fired... '+this.location);
    }
    handleBedRoomChange(event){
        this.noOfBedRoom=event.target.value;
        console.log('BedRoom selected as '+this.noOfBedRoom);
        fireEvent(this.pageRef,"handleBedChangeEvent",this.noOfBedRoom);
        console.log('BedRoom selected Fired '+this.noOfBedRoom);

    }
    handleBathRoomChange(event){
        this.noOfBathRoom=event.target.value;    
        console.log('BathRoom selected as '+this.noOfBathRoom);
        fireEvent(this.pageRef,"handleBathChangeEvent",this.noOfBathRoom);
        console.log('BathRoom selected Fired '+this.noOfBathRoom);
    }
    handleBudgetChange(event){
        this.maxBudget=event.target.value;
        console.log('Budget selected as '+this.maxBudget);
        fireEvent(this.pageRef,"handleBudgetChangeEvent",this.maxBudget);
        console.log('Budget selected Fired '+this.maxBudget);
    }
   
}