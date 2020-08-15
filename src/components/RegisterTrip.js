import React from 'react';
import { getData, postData } from '../helpers/utils';
import TripListItem from './TripListItem';

class RegisterTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registration_number: '',
            visit_type: 'one-way',
            trips: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit() {
        if(this.state.registration_number.length === 0)
            return;
        
        // decide the amount
        const payload = {
            registration_number: this.state.registration_number,
            visit_type: this.state.visit_type
        };

        // get trip information
        let res = await postData('/trips', payload);
        
        // store data into state
        if(res&& res.data && res.data.trips) {
            this.setState({trips: res.data.trips});
        }

    }

    async componentDidMount() {

        // get trip information
        let res = await getData('/trips');

        // store data into state
        if(res&& res.data && res.data.trips) {
            this.setState({trips: res.data.trips});
        }

    }

    listView() {
        return(
            <div className='item--list'>
                <TripListItem items={this.state.trips}/>
            </div>
        );
    }

    addForm() {
        return(
            <div>
                <input type='text' name='registration_number' value={this.state.registration_number} onChange={this.handleChange} className='field--input' placeholder='Vehicle Registration No.'/>
                <select name='visit_type' value={this.state.visit_type} onChange={this.handleChange} className='field--input'>
                    <option value="one-way" defaultValue="selected">One Way</option>
                    <option value="round-trip">Round Trip</option>
                </select>
                <button type='button' className='btn btn-red' onClick={this.handleSubmit}>Add Vehicle</button>
            </div>
        );
    }

    todaysDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    render() {
        return(
            <div>
                <h3>Today: { this.todaysDate() }</h3>
                { this.addForm() }
                { this.listView() }
            </div>
        );
    }
}

export default RegisterTrip;