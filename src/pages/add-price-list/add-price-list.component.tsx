import React from 'react';
import Api from '../../core/api';
import './add-price-list.component.scss';
// import JsonToForm from 'json-reactform';

interface AddState {
  uuid?: string;
  komoditas?: string;
  area_kota?: string;
  area_provinsi?: string;
  price?: string;
  size?: string;
  tgl_parsed?: string;
  timestamp?: string;
  error?: any
  isLoading?: boolean;
}

class AddPriceListComponent extends React.Component<any, AddState> {
  constructor(props: any) {
    super(props);

    this.state = {
      area_kota: '',
      area_provinsi: '',
      komoditas: '',
      price: '',
      size: '',
      tgl_parsed: '',
      timestamp: '',
      uuid: '',
      error: null,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event: any) {
    const api = new Api();
    const url = `storages/5e1edf521073e315924ceab4/list`;
    const data: AddState[] = [{
      area_kota: this.state.area_kota,
      area_provinsi: this.state.area_provinsi,
      komoditas: this.state.komoditas,
      price: this.state.price,
      size: this.state.size,
      tgl_parsed: this.state.tgl_parsed,
      timestamp: this.state.timestamp,
      uuid: this.state.uuid
    }]
    api.postData(url, data)
      .then((response: any) => {
        return response;
      })
      .catch(() => this.setState({
        error: true
      }))
      .finally(() => this.setState({
        isLoading: false
      }))
    this.props.onClose();
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          UUID:
        </label>
        <input type="text" name="uuid" value={this.state.uuid} onChange={this.handleChange} />
        <label>
          Komoditas:
        </label>
        <input type="text" name="komoditas" value={this.state.komoditas} onChange={this.handleChange} />
        <label>
          Area Kota:
        </label>
        <input type="text" name="area_kota" value={this.state.area_kota} onChange={this.handleChange} />
        <label>
          Area Provinsi:
        </label>
        <input type="text" name="area_provinsi" value={this.state.area_provinsi} onChange={this.handleChange} />
        <label>
          Price:
        </label>
        <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />
        <label>
          Size:
        </label>
        <input type="text" name="size" value={this.state.size} onChange={this.handleChange} />
        <label>
          Tanggal Parsed:
        </label>
        <input type="text" name="tgl_parsed" value={this.state.tgl_parsed} onChange={this.handleChange} />
        <label>
          Timestamp:
        </label>
        <input type="text" name="timestamp" value={this.state.timestamp} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default AddPriceListComponent;