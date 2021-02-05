import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

class UpdateDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckedOut: ""
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }

    handleUpdate = () => {
        const deviceObj = {...this.props.device, "isCheckedOut": this.state.isCheckedOut}
        axios.put(`http://localhost:3000/add-device`, deviceObj).then((res) => {
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
                <Modal class="Modal"
                    isOpen={true}
                    contentLabel="Example Modal"
                    className="Modal"
                    overlayClassName="Overlay">
                    <div>
                        <div>
                            <textarea className="inputStyle" type="text" name="isCheckedOut" value={this.state.isCheckedOut} onChange={(e) => this.handleChange(e)} />
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

export default UpdateDevice;
