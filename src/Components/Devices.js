import React from 'react';
import axios from 'axios';
import AddDevice from "./AddModal";
import UpdateDevice from "./UpdateModal";
import DeleteDevice from "./DeleteDevice";


class Devices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceList: [],
            addShowModal: false,
            updateShowModal: false,
            showDeleteModal: false,
            reqDevice: {}
        }
    }
    componentDidMount() {
        this.getDevices()
    }

    getDevices = () => {
        const config = {
            headers: {
                "Accept": "*/*",
                "Access-Control-Allow-Headers": "Accept",
                'Content-Type': 'application/json',
            }
          }
        axios.get(`http://localhost:3000/get-devices`).then((res) => {
            console.log("res", res);
            if (res && res.data) {
                this.setState({
                    deviceList: res.data
                })
            }
        })
    }

    handleShowAddModal = () => {
        this.setState({
            addShowModal: true
        })
    }

    handleCloseAddModal = () => {
        this.setState({
            addShowModal: false
        }, () => {
            this.getDevices()
        })
    }

    handleUpdate = (item) => {
        this.setState({
            updateShowModal: true,
            reqDevice: item
        })
    }

    handleCloseUpdateModal = () => {
        this.setState({
            updateShowModal: false
        },() => {
            this.getDevices()
        })
    }

    handleDelete = (device) => {
        this.setState({
            showDeleteModal: true,
            reqDevice: device
        })
    }

    handleDeleteClose = (device) => {
        this.setState({
            showDeleteModal: false,
            reqDevice: device
        },() => {
            this.getDevices()
        })
    }

    render() {
        const { deviceList } = this.state;
        const deviceWrap = deviceList && deviceList.length ? deviceList.map((item) => {
            return (
                <tr>
                    <td>{`${item.device}`}</td>
                    <td>{item.manufacturer}</td>
                    <td>{item.os}</td>
                    <td>{item.lastCheckedOutDate}</td>
                    <td>{item.lastCheckedOutBy}</td>
                    <td>{item.isCheckedOut}</td>
                    <td>
                        <button className="" onClick={() => this.handleUpdate(item)}>Update</button>
                        <button className="" onClick={() => this.handleDelete(item)}>Delete</button>
                    </td>
                </tr>
            )
        }) : ""
        return (
            <div className="App">
                <div>
                    <div>
                        <button className="" onClick={this.handleShowAddModal} style={{display:"block"}}>Add Device</button>
                    </div>
                    <table className="leads_table">
                        <tr>
                            <th>Device</th>
                            <th>Manufacturer</th>
                            <th>OS</th>
                            <th>Last CheckedOut Date</th>
                            <th>lastCheckedOutBy</th>
                            <th>isCheckedOut</th>
                        </tr>
                        {deviceWrap && deviceWrap}
                    </table>
                    {this.state.addShowModal && <AddDevice showModal={this.state.addShowModal} closeModal={this.handleCloseAddModal} />}
                    {this.state.updateShowModal && <UpdateDevice showModal={this.state.updateShowModal} closeModal={this.handleCloseUpdateModal} device={this.state.reqDevice} />}
                    {this.state.showDeleteModal && <DeleteDevice showModal={this.state.showDeleteModal} closeModal={this.handleDeleteClose} device={this.state.reqDevice} />}
                </div>
            </div>
        );
    }
}

export default Devices;
