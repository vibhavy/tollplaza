import React from 'react';

class TripListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderList() {
        let items = this.props.items.map((item) => {
            return this.renderItem(item)
        });
        return items;
    }

    renderItem(item) {
        return (
            <div key={item.id} className='item--single'>
                <p>Vehicle: <span>{item.registration_number}</span></p>
                <p>Type: <span>{item.visit_type}</span></p>
                <p>Amount: <span>{item.amount}</span></p>
                <p>Entry: <span>{item.entry_date} ({item.entry_time})</span></p>
                <p>Exit: <span>{item.exit_date} ({item.exit_time ? item.exit_time : 'Trip in progress'})</span></p>
            </div>
        );
    }

    render() {
        if(!this.props.items || this.props.items.length === 0) {
            return('No Trips Registered for Today');
        }
        return(
            this.renderList()
        );
    }
}

export default TripListItem;