import React, { Component } from 'react';
import { DataTable, DataTableCell, DataTableRow, DataTablePagination } from 'material-bread';

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      perPage: 2,
    }
  }

  changeDateFormat(date) {
    var local = new Date(date).toISOString().slice(0, 10);
    return local
  }
  render() {
   const {data} = this.props;

    return (
      <DataTable>
          <DataTableRow style={{marginTop: 10}}>
              <DataTableCell text={'Patient ID'} type={'header'} />
              <DataTableCell text={'Date'}  type={'header'}   />
              <DataTableCell text={'Action'}  type={'header'}   />
          </DataTableRow>
          {data
            .slice(
              this.state.page * this.state.perPage,
              this.state.page * this.state.perPage + this.state.perPage,
            )
            .map(row => (
              <DataTableRow key={row.name} hover>
                <DataTableCell text={row.patientID} flex={2} />
                <DataTableCell text={this.changeDateFormat(row.lastUpdateDate)} />
                <DataTableCell text="Call Patient" onPress={() => console.log('Pressed')} />
              </DataTableRow>
            ))}

          <DataTablePagination
            page={this.state.page}
            numberOfPages={data.length / this.state.perPage}
            numberOfRows={data.length}
            perPage={this.state.perPage}
            onChangePage={page => this.setState({ page: page })}
            onChangeRowsPerPage={perPage => this.setState({ perPage: perPage })}
          />
      </DataTable>
    );
  }
}

export default Table;