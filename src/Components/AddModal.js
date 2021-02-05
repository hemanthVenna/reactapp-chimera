import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

class AddDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device: "",
            manufacturer: '',
            lastCheckedOutDate: "",
            lastCheckedOutBy: "",
            isCheckedOut: "",
            os: ""
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }

    handleUpdate = () => {
        const leadObj = {
            device: this.state.device,
            manufacturer: this.state.manufacturer,
            lastCheckedOutDate: this.state.lastCheckedOutDate,
            lastCheckedOutBy: this.state.lastCheckedOutBy,
            isCheckedOut: this.state.isCheckedOut,
            os: this.state.os
        }
        axios.post(`http://localhost:3000/add-device`, leadObj).then((res) => {
            console.log("Updated successfully");
            this.props.closeModal()
        })
    }
    handleClose = () => {
        this.props.closeModal()
    }
    render() {
        return (
            <div className="App">

                <Modal
                    isOpen={this.props.showModal}
                    contentLabel="Example Modal"
                >
                    <div>
                        <div className="alignCenter">
                            <div className="flex">

                                <div>
                                    <p>DEVICE</p>
                                    <input type="text" name="device" placeholder='DEVICE' className="inputStyle" value={this.state.device} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div>
                                    <p>MANUFACTURER</p>
                                    <input type="text" name="manufacturer" placeholder='MANUFACTURER' className="inputStyle" value={this.state.manufacturer} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="flex">

                                <div>
                                    <p>OS</p>
                                    <input type="text" name="os" placeholder='OS' className="inputStyle" value={this.state.os} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div>
                                    <p>lastCheckedOutBy</p>
                                    <input type="text" name="lastCheckedOutBy" placeholder='lastCheckedOutBy' className="inputStyle" value={this.state.lastCheckedOutBy} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="flex">

                                <div>
                                    <p>Last CheckedOut Date</p>
                                    <input type="text" name="lastCheckedOutDate" placeholder='Last CheckedOut Date' className="inputStyle" value={this.state.lastCheckedOutDate} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div>
                                    <p>isCheckedOut</p>
                                    <input type="text" name="isCheckedOut" placeholder='isCheckedOut' className="inputStyle" value={this.state.isCheckedOut} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={this.handleClose}>Close</button>
                            <button onClick={this.handleUpdate}>Save</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AddDevice;
