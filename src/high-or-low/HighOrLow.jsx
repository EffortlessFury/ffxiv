import React, { Component } from 'react'
import cn from 'classnames'

import zf from '../foundation.scss'
import styles from './HighOrLow.scss'

class HighOrLow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tb1: null,
      tb2: null,
      me: null
    }

    this.handleOnInputTb1 = this.handleOnInputDigit.bind(this, 'tb1')
    this.handleOnInputTb2 = this.handleOnInputDigit.bind(this, 'tb2')
    this.handleOnInputMe = this.handleOnInputDigit.bind(this, 'me')
    this.handleReset = this.handleReset.bind(this)
    this.noop = () => {}
  }

  componentDidMount () {
    document.title = 'High or Low'
  }

  handleOnInputDigit (stateKey, event) {
    const digit = this.getDigitFromEvent(event)
    if (digit !== undefined) {
      this.setState({ [stateKey]: digit })
    }
  }

  handleReset () {
    this.setState({
      tb1: null,
      tb2: null,
      me: null
    })
  }

  getDigitFromEvent (event) {
    // Support 'Clear', 'Cut', 'EraseEof'?
    if (event.key === 'Backspace' || event.key === 'Delete') {
      return null
    } else {
      const digit = Number(event.key)
      if (digit >= 1 && digit <= 9) {
        return digit
      }
    }
  }

  render () {
    const { tb1, tb2, me } = this.state
    const handleOnChange = this.noop

    const tb1Error = tb1 && (tb1 === tb2 || tb1 === me)
    const tb2Error = tb2 && (tb2 === tb1 || tb2 === me)
    const meError = me && (me === tb1 || me === tb2)

    let complete = false
    let tbEv, meEv
    if (tb1 && tb2 && me && !tb1Error && !tb2Error && !meError) {
      complete = true
      tbEv = 7 * (tb1 + tb2)
      meEv = 5 * me + 45
    }

    return (
      <>
        <h1>High or Low</h1>
        <div className={styles.container}>
          <div className={cn(styles.card, tb1Error && styles.error)}>
            <input type='text' onChange={handleOnChange} onKeyDown={this.handleOnInputTb1} value={tb1 || ''} />
          </div>
          <div className={cn(styles.card, tb2Error && styles.error)}>
            <input type='text' onChange={handleOnChange} onKeyDown={this.handleOnInputTb2} value={tb2 || ''} />
          </div>
          <div className={cn(styles.card, styles.hidden)} />
          <br />
          <div className={cn(styles.card, meError && styles.error)}>
            <input type='text' onChange={handleOnChange} onKeyDown={this.handleOnInputMe} value={me || ''} />
          </div>
          <div className={cn(styles.card, styles.hidden)} />
          <div className={cn(styles.card, styles.hidden)} />
          <br />
          <span className={styles.result}>
            {complete
              ? <>You are {meEv > tbEv ? <b>High</b> : meEv < tbEv ? <b>Low</b> : <><b>High</b> or <b>Low</b></>}</>
              : 'Input cards'}
          </span>
        </div>

        <div className={zf.buttonGroup}>
          <button type='button' className={cn(zf.button, zf.alert)} onClick={this.handleReset}>Reset</button>
        </div>
        <div className={cn(zf.gridX, zf.gridPaddingX)}>
          <div className={zf.cell}>
            {(tb1Error || tb2Error || meError) &&
              <><strong>Error</strong><p>Cannot have two of the same number.</p></>}
          </div>
        </div>
      </>
    )
  }
}

export default HighOrLow
