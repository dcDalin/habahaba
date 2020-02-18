import _ from 'lodash';
import faker from 'faker';
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import styles from './Search.module.scss';

const initialState = { isLoading: false, results: [], value: '' };

const source = _.times(5, () => ({
  image: faker.internet.avatar(),
  title: faker.company.companyName(),
}));

export default class SearchExampleStandard extends Component {
  state = initialState;

  handleResultSelect = (e: any, { result }: any) => this.setState({ value: result.title });

  handleSearchChange = (e: any, { value }: any) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result: any) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
        {...this.props}
        size="mini"
        fluid
        className={styles.searchBar}
      />
    );
  }
}
