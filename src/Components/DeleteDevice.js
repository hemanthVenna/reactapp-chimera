import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

class DeleteDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    handleDelete = () => {
        axios.get(`http://localhost:3000/delete/${this.props.device._id}`,{}).then((res) => {
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
                        <div>
                            <p>Are you sure want to delete?</p>

                        </div>
                        <div>
                            <button onClick={this.handleDelete}>Delete</button>
                            <button onClick={this.handleClose}>Close</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default DeleteDevice;
