import React from 'react';
import isEqualWith from 'lodash.isequalwith';

import {
  CSSGrid,
  makeResponsive,
  measureItems,
  layout as layouts,
 } from './pinterest/index';


class PinGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createGrid(props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !isEqualWith(nextProps, this.props, (a, b, key) => {
        if (key === 'children') return true;
      })
    ) {
      this.setState(this.createGrid(nextProps));
    }
  }

  createGrid = () => {
    let Grid = CSSGrid;

    Grid = measureItems(Grid);

    Grid = makeResponsive(Grid, {
      maxWidth: 1920,
      minPadding: 100
    });

    return { Grid };
  };
  
  
  render() {
    const { Grid } = this.state;
    const { children } = this.props;
    return (
      <div>
        <Grid
          className="grid"
          component="ul"
          columnWidth={200}
          gutterWidth={15}
          gutterHeight={15}
          layout={layouts.pinterest}
          lengthUnit="px"
          duration={800}
          easing="ease"
        >
          {children}
        </Grid>
      </div>
    );
  }
};

export default PinGrid;
