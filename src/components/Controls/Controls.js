import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import './Controls.css';

import wallet from '../../state/wallet';

class Controls extends Component {
    render() {
        return (
            <div className="controls">
                <div className="controls-row">
                    <Label>Seed:</Label>
                    <div className="controls-grow">
                        <TextField placeholder='enter your electrum seed' value={this.props.seed} onChanged={value => this.props.setSeed(value)} />
                    </div>
                </div>
                <div className="controls-row">
                    <Label>Amount:</Label>
                    <div className="controls-amount">
                        <TextField placeholder='enter your electrum seed' value={this.props.amount} onChanged={value => this.props.setAmount(value)} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    seed: wallet.selectors.getSeed(state),
    amount: wallet.selectors.getAmount(state),
});

const mapDispatchToProps = dispatch => ({
    setSeed: (text) => dispatch(wallet.actions.setSeed(text)),
    setAmount: (amount) => dispatch(wallet.actions.setAmount(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
