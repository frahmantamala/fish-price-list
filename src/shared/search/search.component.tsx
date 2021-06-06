import React from 'react'

interface SearchState {
  search: any;
}

interface SearchPropsData {
  onChangeValue(value: any): any;
  data: any;
}
class SearchComponent extends React.Component<SearchPropsData, SearchState> {

  constructor(props: SearchPropsData) {
    super(props)

    this.state = {
      search: null
    }
  }

  searchSpace = (event: any) => {
    let keyword = event.target.value;
    this.setState({ search: keyword })
    setTimeout(() => {
      this.searchData();
    }, 200);
  }

  searchData = () => {
    const dataPriceList = this.props.data.filter((data: any) => {
      const keywordSearch = this.state.search ? this.state.search : '';
      const searchAreaKota = data.area_kota ? data.area_kota.toLowerCase().includes(keywordSearch.toLowerCase()) : false;
      const searchKomoditas = data.komoditas ? data.komoditas.toLowerCase().includes(keywordSearch.toLowerCase()) : false;
      const searchPrice = data.price ? data.price.toLowerCase().includes(keywordSearch.toLowerCase()) : false;
      const searchSize = data.size ? data.size.toLowerCase().includes(keywordSearch.toLowerCase()) : false;

      console.log(searchAreaKota, searchKomoditas, searchPrice, searchSize, data)
      if (this.state.search == null)
        return data
      else if (searchAreaKota || searchKomoditas || searchPrice || searchSize) {
        return data
      }
    })

    this.props.onChangeValue(dataPriceList)
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Enter item to be searched" onChange={(e) => this.searchSpace(e)} />
      </div>
    )
  }

}

export default SearchComponent