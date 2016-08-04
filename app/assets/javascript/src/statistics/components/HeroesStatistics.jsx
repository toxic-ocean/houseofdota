import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
import LinearProgress from 'material-ui/LinearProgress';
import Star from 'material-ui/svg-icons/toggle/star';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import _ from 'lodash';

export default class HeroesStatistics extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      orderBy: 'pick_rate',
    }
    this.orderByPickRate = this.orderByPickRate.bind(this);
    this.orderByWinRate = this.orderByWinRate.bind(this);
  }

  shouldCompnentUpdate() {
    return !_.isEmpty(statistics);
  }

  orderByPickRate(){
    this.setState({
      orderBy: 'pick_rate',
    })
  }

  orderByWinRate(){
    this.setState({
      orderBy: 'win_rate',
    })
  }

  render(){
    const statistics = _.orderBy(this.props.statistics, [this.state.orderBy], ['desc']);
    return(
      <div>
        <Tabs>
          <Tab
            icon={<CheckBox />}
            label="MOST PICKED"
            onActive={ this.orderByPickRate }
            />
          <Tab
            icon={<Star />}
            label="MOST SUCCESSFUL"
            onActive={ this.orderByWinRate }
            />
        </Tabs>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan={2} style={{width: '35%'}}>Hero</TableHeaderColumn>
              <TableHeaderColumn style={{width: '10%'}}>Matches Played</TableHeaderColumn>
              <TableHeaderColumn>Pick Rate</TableHeaderColumn>
              <TableHeaderColumn style={{width: '10%'}}>Matches Won</TableHeaderColumn>
              <TableHeaderColumn>Win Rate</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {statistics.map( (row) => (
              <TableRow key={row.hero_id} >
                <TableRowColumn style={{width: '10%'}}>
                  <img src={'/static/images/' + row.hero_id + '.png'} style={{height: '3em'}}/>
                </TableRowColumn>
                <TableRowColumn style={{width: '25%'}}>
                  { row.hero_name }
                </TableRowColumn>
                <TableRowColumn style={{width: '10%'}}>{ row.played }</TableRowColumn>
                <TableRowColumn>
                  { _.round(row.pick_rate, 2) }
                  <LinearProgress mode="determinate" value={ _.round(row.pick_rate, 2) } />
                </TableRowColumn>
                <TableRowColumn style={{width: '10%'}}>{ row.won }</TableRowColumn>
                <TableRowColumn>
                  { _.round(row.win_rate, 2) }
                  <LinearProgress mode="determinate" value={ _.round(row.win_rate, 2) } />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

HeroesStatistics.propTypes = {
  matchQuantity: React.PropTypes.number.isRequired,
  statistics: React.PropTypes.array.isRequired,
};
