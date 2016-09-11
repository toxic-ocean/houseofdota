import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import LinearProgress from 'material-ui/LinearProgress';
import _ from 'lodash';

import ContentHolder from '../../components/ContentHolder.jsx';

const CounterStatistics = (props) => {
  const counters = _.orderBy( props.counters ,[props.orderBy], ['desc']);
  const maxCoeffient = _.maxBy( counters , 'counterCoefficient');
  const minCoeffient = _.minBy( counters , 'counterCoefficient');
  debugger;
  return(
    <ContentHolder>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{ textAlign: 'center', width: "20%" }}>Heroes</TableHeaderColumn>
            <TableHeaderColumn style={{ textAlign: 'center', width: "20%" }}></TableHeaderColumn>
            <TableHeaderColumn style={{ textAlign: 'center' }}>
              Counter Coefficient
            </TableHeaderColumn>
            <TableHeaderColumn style={{ textAlign: 'center' }}>
              Rate Advantage
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover={true}>
          { counters.map( (row) => (
            <TableRow key={row.counterId}  >
              <TableRowColumn style={{ textAlign: 'center', width: "20%"}}>
                  <img src={'/static/images/' + row.counterId + '.png'} style={{height: '3em', marginRight: '1em'}}/>
              </TableRowColumn>
              <TableRowColumn style={{ width: "20%" }}>
                { row.counterName }
              </TableRowColumn>
              <TableRowColumn>
                { _.round(row.counterCoefficient, 2) }
                <LinearProgress
                  color={ props.orderBy == 'counterCoefficient' ? 'rgb(183, 28, 28)' : ''  }
                  mode="determinate"
                  value={ _.round(row.counterCoefficient, 2) }
                  max={ maxCoeffient.counterCoefficient }
                  min={ minCoeffient.counterCoefficient }
                />
              </TableRowColumn>
              <TableRowColumn>
                { _.round(row.rateAdvantageNormalized , 2) }
                <LinearProgress
                  color={ props.orderBy == 'rateAdvantageNormalized' ? 'rgb(183, 28, 28)' : ''  }
                  mode="determinate"
                  value={ _.round(row.rateAdvantageNormalized, 2) } />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ContentHolder>
  );
}

CounterStatistics.propTypes = {
  counters: React.PropTypes.array.isRequired,
  orderBy: React.PropTypes.string.isRequired,
};

export default CounterStatistics;