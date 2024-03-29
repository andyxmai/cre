import React from 'react'
import { CashflowTable } from 'components'
import { CashflowExplanationContainer } from 'containers'
import SplitPane from 'react-split-pane'
import {
  mockExplanationColumns, mockExplanationRows,
  mockExplanationCashflowColumns, mockExplanationCashflowRows,
  mockItemData,
} from 'config/fixtures'

import {CashflowRowRenderer} from 'components'

const columns = [  // get it from props
  { key: 'item', name: '', width: 250, locked: true },
  { key: 'year1', name: '01/2017', width: 125,},
  { key: 'year2', name: '01/2018', width: 125,},
  { key: 'year3', name: '01/2019', width: 125,},
  { key: 'year4', name: '01/2020', width: 125,},
  { key: 'year5', name: '01/2021', width: 125,},
]

const rows = [  // get it from props
  {id: 1, item: 'Potential Gross Revenue', bold: true},
  {id: 2, item: 'Base Rental Revenue', year1: '500,000', year2: '515,000', year3: '530,450', year4: '546,364', year5: '562,754', },
  {id: 3, item: 'Total Rental Revenue', year1: '500,000', year2: '515,000', year3: '530,450', year4: '546,364', year5: '562,754', },
  {id: 4, item: ''},
  {id: 5, item: 'Reimbursable Expenses', },
  {id: 6, item: 'Insurance', year1: '', year2: '20', year3: '40', year4: '60', year5: '82', },
  {id: 7, item: 'Total Reimbursable Expenses', year1: '', year2: '20', year3: '40', year4: '60', year5: '82', },
  {id: 8, item: ''},
  {id: 9, item: 'Total Gross Revenue', bold: true, year1: '500,000', year2: '515,020', year3: '530,490', year4: '546,424', year5: '562,836', },
  {id: 10, item: ''},
  {id: 11, item: 'Operating Expenses', bold: true},
  {id: 12, item: 'Insurance', year1: '1,000', year2: '1,020', year3: '1,040', year4: '1,060', year5: '1,082', },
  {id: 13, item: 'Total Expenses', bold: true, year1: '1,000', year2: '1,020', year3: '1,040', year4: '1,060', year5: '1,082', },
  {id: 14, item: ''},
  {id: 15, item: 'Net Operating Income', bold: true, year1: '499,000', year2: '514,000', year3: '529,450', year4: '545,364', year5: '561,754', },
]

const toggleRows = [  // get it from props
  {id: 1, item: 'Potential Gross Revenue', bold: true},
  {id: 2, item: 'Base Rental Revenue', year1: '512,928', year2: '535,345', year3: '560,450', year4: '596,123', year5: '612,281', },
  {id: 3, item: 'Total Rental Revenue', year1: '512,928', year2: '535,345', year3: '560,450', year4: '596,123', year5: '612,281', },
  {id: 4, item: ''},
  {id: 5, item: 'Reimbursable Expenses', },
  {id: 6, item: 'Insurance', year1: '', year2: '31', year3: '54', year4: '109', year5: '134', },
  {id: 7, item: 'Total Reimbursable Expenses', year1: '', year2: '31', year3: '54', year4: '109', year5: '134', },
  {id: 8, item: ''},
  {id: 9, item: 'Total Gross Revenue', bold: true, year1: '512,928', year2: '535,376', year3: '560,504', year4: '596,232', year5: '612,415', },
  {id: 10, item: ''},
  {id: 11, item: 'Operating Expenses', bold: true},
  {id: 12, item: 'Insurance', year1: '1,000', year2: '1,031', year3: '1,054', year4: '1,109', year5: '1,134', },
  {id: 13, item: 'Total Expenses', bold: true, year1: '1,000', year2: '1,031', year3: '1,054', year4: '1,109', year5: '1,134', },
  {id: 14, item: ''},
  {id: 15, item: 'Net Operating Income', bold: true, year1: '511,928', year2: '534,345', year3: '559,450', year4: '595,123', year5: '611,281', },
]

const sqftRows = [  // get it from props
  {id: 1, item: 'Potential Gross Revenue', bold: true},
  {id: 2, item: 'Base Rental Revenue', year1: '74.56', year2: '79.84', year3: '84.36', year4: '87.59', year5: '89.12', },
  {id: 3, item: 'Total Rental Revenue', year1: '74.56', year2: '79.84', year3: '84.36', year4: '87.59', year5: '89.12', },
  {id: 4, item: ''},
  {id: 5, item: 'Reimbursable Expenses', },
  {id: 6, item: 'Insurance', year1: '', year2: '0.50', year3: '1.00', year4: '1.20', year5: '1.42', },
  {id: 7, item: 'Total Reimbursable Expenses', year1: '', year2: '0.50', year3: '1.00', year4: '1.20', year5: '1.42', },
  {id: 8, item: ''},
  {id: 9, item: 'Total Gross Revenue', bold: true, year1: '74.56', year2: '80.34', year3: '85.36', year4: '88.79', year5: '90.54', },
  {id: 10, item: ''},
  {id: 11, item: 'Operating Expenses', bold: true},
  {id: 12, item: 'Insurance', year1: '10', year2: '10.20', year3: '10.40', year4: '10.60', year5: '10.82', },
  {id: 13, item: 'Total Expenses', bold: true, year1: '10', year2: '10.20', year3: '10.40', year4: '10.60', year5: '10.82', },
  {id: 14, item: ''},
  {id: 15, item: 'Net Operating Income', bold: true, year1: '64.56', year2: '70.14', year3: '74.96', year4: '78.19', year5: '79.72', },
]

const CashflowTableContainer = React.createClass({
  getInitialState () {
    return {
      rowSelected: '',
      colSelected: '',
      showCalculation: false,
      explanationColumns: [],
      explanationRows: [],
      explanationCashflowColumns: [],
      explanationCashflowRows: [],
      itemData: {},
      useNominal: true,
    }
  },

  onCellSelected ({ rowIdx, idx }) {  // should be a props function
    const key = '(' + rowIdx + ',' + idx + ')'
    const explanationColumns = mockExplanationColumns[rowIdx]
    if (explanationColumns === undefined) {
      this.setState({showCalculation: false})
      return
    }

    const explanationRows = mockExplanationRows[key]
    const explanationCashflowColumns = mockExplanationCashflowColumns
    const explanationCashflowRows = mockExplanationCashflowRows[rowIdx]
    const itemData = mockItemData[key]

    this.setState({
      rowSelected: rowIdx,
      colSelected: idx,
      showCalculation: true,
      explanationColumns,
      explanationRows,
      explanationCashflowRows,
      explanationCashflowColumns,
      itemData,
    })
  },

  onCellDeSelected ({ rowIdx, idx }) {
    this.setState({showCalculation: false})
  },

  handleSqftToggle () {
    this.setState({useNominal: false})
  },

  handleNominalToggle () {
    this.setState({useNominal: true})
  },

  getRows () {
    if (this.state.useNominal) {
      if (this.props.toggle) {
        return toggleRows
      } else {
        return rows
      }
    } else {
      return sqftRows
    }
  },

  render () {
    return (
      <div>
        <CashflowTable
          columns={columns}
          rows={this.getRows()}
          onCellSelected={this.onCellSelected}
          onCellDeSelected={this.onCellDeSelected}
          hideButton={this.props.hideButton}
          handleNominalToggle={this.handleNominalToggle}
          handleSqftToggle={this.handleSqftToggle}
          useNominal={this.state.useNominal}
        />
        <br/>
        { this.state.showCalculation
          ? <CashflowExplanationContainer
              rowSelected={this.state.rowSelected}
              showCalculation={this.state.showCalculation}
              explanationColumns={this.state.explanationColumns}
              explanationRows={this.state.explanationRows}
              explanationCashflowRows={this.state.explanationCashflowRows}
              explanationCashflowColumns={this.state.explanationCashflowColumns}
              itemData={this.state.itemData}
            />
          : null
        }
      </div>
    )
  }
})

export default CashflowTableContainer
