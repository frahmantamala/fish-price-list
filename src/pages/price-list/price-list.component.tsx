import React, { Suspense } from 'react';
import Api from '../../core/api';
import './price-list.component.scss'
import ModalComponent from '../../shared/modal/modal.component';
import AddPriceListComponent from '../add-price-list/add-price-list.component';

const CardComponent = React.lazy(() => import('../../shared/card/card.component'));
const FilterItemsComponent = React.lazy(() => import('./filter-items/filter-items.component'));
const SearchComponent = React.lazy(() => import('../../shared/search/search.component'));

interface FetchState {
  isLoading: boolean;
  hasError: boolean;
  dataList: any[];
  tempDataList: any[];
  params: any;
  showModal: boolean;
}

class PriceListComponent extends React.Component<{}, FetchState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      hasError: false,
      dataList: [],
      tempDataList: [],
      params: {
        search: null
      },
      showModal: false
    }
  }

  componentDidMount() {
    this.getData();
    this.getDataArea();
  }

  async getData(param?: { limit?: number, offset?: number, search?: any }) {
    this.setState({ isLoading: true });

    const api = new Api();
    const url = `storages/5e1edf521073e315924ceab4/list`;
    let params: any = {
      limit: 50,
      offset: 0,
      search: param?.search
    }

    if (params.search && params.search.area_kota === 'All') {
      delete params.search
    }

    let data = await api.getData(url, params)
      .then((response: any) => {
        return response;
      })
      .catch(() => this.setState({
        hasError: true
      }))
      .finally(() => this.setState({
        isLoading: false
      }))

    const filtered = data.data.filter((items: any) => {
      return items.uuid !== null
    })

    if (!params.search) {
      this.setState({ dataList: filtered, isLoading: false })
      return;
    }
    this.setState({ dataList: filtered, isLoading: false })
  }

  async getDataArea() {
    this.setState({ isLoading: true });

    const api = new Api();
    const url = `storages/5e1edf521073e315924ceab4/option_area`;


    let data = await api.getData(url)
      .then((response: any) => {
        return response.data;
      })
      .catch(() => this.setState({
        hasError: true
      }))
      .finally(() => this.setState({
        isLoading: false
      }))

    console.log(data)

    this.setState({ tempDataList: data, isLoading: false })
  }


  handleContinents = (data: any) => {
    let params = {
      search: { area_kota: data.filters }
    }
    this.getData(params)
  }

  handleSearchData = (data: any) => {
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.setState({ dataList: data, isLoading: false })
    }, 400);
  }

  render() {
    const { dataList, tempDataList, showModal } = this.state;
    // (dataList)
    // if (isLoading) {
    //   return <p>Loading...</p>
    // }
    console.log(tempDataList)

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="action-containers">
          <button className="button-add" onClick={() => this.setState({ showModal: true })}>Add Data</button>
          <ModalComponent
            onClose={() => this.setState({ showModal: false })}
            show={showModal}
            title="Add Data Price List"
          >
            <AddPriceListComponent onClose={() => this.setState({ showModal: false })} />
          </ModalComponent>
          <SearchComponent data={dataList} onChangeValue={this.handleSearchData} />
        </div>
        <div className="containers-content flex flex-jc-sb">
          <FilterItemsComponent dataArea={tempDataList} onSelectContinents={this.handleContinents} />
          <div className="price-list-containers flex flex-jc-c flex-ai-c">
            {dataList.map(data =>
              <CardComponent
                key={data.uuid}
                id={data.uuid}
                title={data.komoditas}
                price={data.price}
                size={data.size}
                address={data.area_kota} />
            )}
          </div>
        </div>
      </Suspense>
    )
  }
}

export default PriceListComponent;