import React, { Suspense, useState } from 'react';

import { Col, Row } from 'antd';

interface FilterData {
  dataArea?: any;
  onSelectContinents(data: any): void
}

interface FilterState {
  area: any;
  isLoading: boolean;
  continents: any;
}

const FilterRadio = React.lazy(() => import('../../../shared/filter/radio/filter-radio.component'));

class FilterItemsComponent extends React.Component<FilterData, FilterState> {

  constructor(props: FilterData) {
    super(props);

    this.state = {
      area: [{ city: 'All', id: 'all' }],
      isLoading: false,
      continents: []
    }

    this.handleFilters = this.handleFilters.bind(this)
  }

  // componentDidMount() {
  //   // this.setState({ isLoading: true })
  //   // setTimeout(() => {
  //   const area = this.props.dataArea.map((items: any, idx: number) => { return { area_kota: items.city, id: items.idx } });

  //   this.setState({ area: [...area], isLoading: false })
  //   // }, 500);
  // }

  handleFilters = (filters: any, category: any) => {
    const newFilters = { ...this.state.continents }
    console.log('filters category', filters, category)
    newFilters[category] = filters

    this.showFilteredResults(newFilters)
    this.setState({ continents: newFilters, isLoading: false })
  }


  showFilteredResults = (filters: any) => {

    const variables = {
      filters: filters.continents
    }
    this.props.onSelectContinents(variables);
  }

  render() {
    const { area, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>
    }
    console.log(area, this.props.dataArea)

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="side-filter-containers">
          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24} >
              <FilterRadio
                list={this.props.dataArea.map((items: any, idx: number) => { return { area_kota: [...items.city], id: items.idx } })}
                handleFilters={(filters: any) => this.handleFilters(filters, "continents")}
              />
            </Col>
          </Row>
        </div>
      </Suspense>
    )
  }
}

export default FilterItemsComponent;