import React from 'react';
import LineUp from './LineUp.jsx';
import ContentHolder from '../../components/ContentHolder.jsx';
import $ from 'jquery';

import { Toolbar, ToolbarGroup, ToolbarTitle,
  ToolbarSeparator, FontIcon, AutoComplete, MenuItem } from 'material-ui';
import StatisticsService from '../../statistics/services/StatisticsService.js';

export default class Recommendation extends React.Component {

  constructor(props) {
    super(props);
    this.statisticsService = new StatisticsService();
    this.state = {
      selectedAllies: [],
      selectedEnemies: [],
      heroes: [],
    };
    this.fetchHeroesList();
  }

  fetchHeroesList() {
    $.when(
      this.statisticsService.fetchHeroes()
    ).done(result => {
      this.setState({
        heroes: result.heroes,
      });
    });
  }

  selectAlly(chosen, index) {
    const hero = this.state.heroes.filter((h) => h.heroId === chosen.valueKey);
    this.setState({
      heroes: this.state.heroes.filter((h) => h.heroId !== chosen.valueKey),
      selectedAllies: this.state.selectedAllies.concat(hero),
    });
  }

  selectEnemy(chosen, index) {
    const hero = this.state.heroes.filter((h) => h.heroId === chosen.valueKey);
    this.setState({
      heroes: this.state.heroes.filter((h) => h.heroId !== chosen.valueKey),
      selectedEnemies: this.state.selectedEnemies.concat(hero),
    });
  }

  constructHeroesOptions() {
    if (this.state.heroes !== undefined) return this.state.heroes.map( (hero) => {
      return {
        valueKey: hero.heroId,
        text: hero.localizedName,
        value: (
          <MenuItem
            primaryText={ hero.localizedName } >
          </MenuItem>
        ),
      };
    });
    return [];
  }

  render() {
    return (
      <ContentHolder>

          <Toolbar>
            <ToolbarGroup>
              <FontIcon className="material-icons"
                style={{ marginRight: '0.5em' }}>person_pin</FontIcon>
              <AutoComplete
                filter={AutoComplete.fuzzyFilter}
                openOnFocus={true}
                dataSource={this.constructHeroesOptions()}
                hintText="Select an Ally"
                onNewRequest={this.selectAlly.bind(this)} />
              <ToolbarSeparator />
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarSeparator />
              <FontIcon className="material-icons"
                style={{ marginRight: '0.5em' }}>person_pin</FontIcon>
              <AutoComplete
                filter={AutoComplete.fuzzyFilter}
                openOnFocus={true}
                dataSource={ this.constructHeroesOptions() }
                hintText="Select an Enemy"
                onNewRequest={this.selectEnemy.bind(this)} />
            </ToolbarGroup>
          </Toolbar>
          <LineUp
            allies={this.state.selectedAllies}
            enemies={this.state.selectedEnemies}
          />
      </ContentHolder>
    );
  }
}