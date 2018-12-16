import React, { Component } from 'react';
import * as math from 'mathjs';

import Number from './number';


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      dot: false,
    }
    this.handleClickNum = this.handleClickNum.bind(this)
    this.handleClickOp = this.handleClickOp.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleEqual = this.handleEqual.bind(this)
    this.handleDot = this.handleDot.bind(this)
  }

  handleClear() {
    this.setState({ value: '' });
  }

  handleClickNum(e) {
    this.setState({ value: this.state.value + e.target.innerHTML })
  }

  handleEqual() {
    this.setState({ value: math.eval(this.state.value).toString() });
  }

  handleDot(e) {
    const ops = ['+', '-', '*', '/']
    if (ops.some((el) => this.state.value.includes(el))) {
      for (let item of ops) {
        if (this.state.value.includes(item)) {
          let operator = item
          if (this.state.value.split(operator)[1].includes('.')) {
            return null
          } else {
            this.setState({ value: this.state.value + e.target.innerHTML })
          }
        }
      }
    } else {
      if (this.state.value.includes('.')) {
        return null
      } else {
        this.setState({ value: this.state.value + e.target.innerHTML })
      }
    }

  }

  handleClickOp(e) {
    const ops = ['+', '-', '*', '/']
    if (ops.includes(this.state.value[this.state.value.length - 1])) {
      this.setState({ value: this.state.value.slice(0, this.state.value.length - 1) + e.target.innerHTML });
    } else if (this.state.value == '' || this.state.value == 0) {
      return null
    } else {
      this.setState({ value: math.eval(this.state.value) + e.target.innerHTML })
    }
  }

  render() {
    let someNum = parseFloat(this.state.value)
    let background = { backgroundImage: `linear-gradient(to right, white ${someNum * .1}%, skyblue` }
    return (
      <div className='app-wrap' style={background}>
        <div className='app'>
          <h2 className='heading'> Simple Calculator</h2>
          <h1 className='total'>{this.state.value == '' ? 0 : this.state.value}</h1>
          <div className='calc-wrap'>
            <div className='num-wrap'>
              <Number click={this.handleClickNum} num={1} />
              <Number click={this.handleClickNum} num={2} />
              <Number click={this.handleClickNum} num={3} />
              <Number click={this.handleClickNum} num={4} />
              <Number click={this.handleClickNum} num={5} />
              <Number click={this.handleClickNum} num={6} />
              <Number click={this.handleClickNum} num={7} />
              <Number click={this.handleClickNum} num={8} />
              <Number click={this.handleClickNum} num={9} />
              <Number click={this.handleDot} num={'.'} />
              <Number click={this.handleClickNum} num={0} zero='zero' />

            </div>
            <div className='op-wrap'>
              <div onClick={this.handleClear} className='op'>AC</div>
              <div onClick={this.handleClickOp} className='op'>+</div>
              <div onClick={this.handleClickOp} className='op'>-</div>
              <div onClick={this.handleClickOp} className='op'>*</div>
              <div onClick={this.handleClickOp} className='op'>/</div>
              <div onClick={this.handleEqual} className='op'>=</div>
            </div>
          </div>
          <div className='info'>Gradient Shifts As Total Gets Bigger <br />(Between -1000 and 1000)</div>
        </div>
      </div>
    );
  }
}
