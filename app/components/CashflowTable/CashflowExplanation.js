import React, { PropTypes } from 'react'
import { container, title, totalContainer } from './styles.css'
import ReactDataGrid from 'react-data-grid'
import { CashflowRowRenderer } from 'components'

const { Row } = ReactDataGrid
const RowRenderer = React.createClass({
  propTypes: {
    idx: React.PropTypes.number.isRequired
  },

  setScrollLeft (scrollBy) {
    // if you want freeze columns to work, you need to make sure you implement this as apass through
    this.refs.row.setScrollLeft(scrollBy);
  },

  getRowStyle () {
    return {
      fontWeight: this.getRowWeight(),
      border: 'none',
      fontSize: 14,
    }
  },

  getRowWeight () {
    return this.props.row.bold ?  '600' : 'normal'
  },

  render: function () {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return (<div style={this.getRowStyle()}><Row ref="row" {...this.props}/></div>)
  }
})

export default function CashflowExplanation (props) {
  const rowHeight = 30
  function getHeight () {
    return rowHeight * (props.rows.length + 1) + 2  // cell height + border height
  }

  function rowGetter (i) {
    return props.rows[i]
  }
  return (
    <div className={container}>
      <div className={title}>{props.itemData.title}</div>
      <ReactDataGrid
        columns={props.columns}
        rowGetter={rowGetter}
        rowsCount={props.rows.length}
        rowHeight={rowHeight}
        minHeight={getHeight()}
        rowRenderer={RowRenderer}
        />
      <div className={totalContainer}>
        <div>{`Total: $${props.itemData.total}`}</div>
      </div>
    </div>
  )
}
