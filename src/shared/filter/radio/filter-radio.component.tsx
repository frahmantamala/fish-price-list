import React, { useState } from 'react'
import { Radio, Collapse } from 'antd';

import './filter-radio.component.scss'

const { Panel } = Collapse

function FilterRadio(props: any) {

  const [Value, setValue] = useState('0')

  // const handleToggle = (value: any) => {
  //   const currentIndex = Checked.indexOf(value);
  //   const newChecked = [...Checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value)
  //   } else {
  //     newChecked.splice(currentIndex, 1)
  //   }

  //   setChecked(newChecked)
  //   props.handleFilters(newChecked)
  //   //update this checked information into Parent Component 

  // }
  const renderRadioBox = () => (
    props.list && props.list.map((value: any) => (
      <Radio className="value-checkbox" key={value.id} value={`${value.area_kota}`}>{value.area_kota}</Radio>
    ))
  )

  const handleChange = (event: any) => {
    setValue(event.target.value)
    props.handleFilters(event.target.value)
  }

  // const renderCheckboxLists = () => props.list && props.list.map((value: any, index: number) => (
  //   <React.Fragment key={index}>
  //     <div className="checboxk-containers">
  //       <Checkbox
  //         onChange={() => handleToggle(value.area_kota)}
  //         type="checkbox"
  //         checked={Checked.indexOf(value.area_kota) === -1 ? false : true}
  //       />
  //       <span className="value-checkbox">{value.area_kota}</span>
  //     </div>
  //   </React.Fragment>
  // ))

  // return (
  //   <div>
  //     <Collapse defaultActiveKey={['0']} >
  //       <Panel header="Continents" key="1">
  //         {renderCheckboxLists()}
  //       </Panel>
  //     </Collapse>
  //   </div>
  // )

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Area" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            <div className="checboxk-containers">
              {renderRadioBox()}
            </div>
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  )
}

export default FilterRadio