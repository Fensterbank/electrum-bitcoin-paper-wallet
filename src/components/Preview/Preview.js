import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import background from './background.jpg';
import electrumLogo from './electrum_logo.png';

import wallet from '../../state/wallet';

import './Preview.css';

class Preview extends PureComponent {
    constructor(props) {
        super(props);

        this.redraw = true;
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this._context = this.canvas.getContext('2d');
        this._img = new Image();
        this._img.src = background;

        this._electrumLogo = new Image();
        this._electrumLogo.src = electrumLogo;

        this._img.onload = () => this.draw(true);
    }

    drawSeed = () => {
        const offset = 30;
        const width = this.canvas.width - offset * 2;
        const height = 60;
        const posY = this.canvas.height - height - offset;

        this._context.fillStyle = 'rgba(255,255,255,0.7)';
        this._context.fillRect(offset, posY, width, height);

        this._context.fillStyle = 'black';
        this._context.font = '40px Tahoma, "Nimbus Sans"';
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        this._context.fillText(this.props.seed, offset + (width / 2), posY + height / 2);
    }

    drawElectrumLogo = () => {
        this._context.drawImage(this._electrumLogo, 30, 30);

        this._context.fillStyle = '#5588ff';
        this._context.font = '30px Tahoma, "Nimbus Sans"';
        this._context.textAlign = 'left';
        this._context.textBaseline = 'top';

        this._context.fillText('Use this seed with', 170, 35);
        this._context.fillText('Electrum Bitcoin Wallet', 170, 75);

        this._context.font = '24px Tahoma, "Nimbus Sans"';
        this._context.textBaseline = 'bottom';
        this._context.fillText('electrum.org', 170, 146);
    }

    drawAmount = () => {
        const offset = 100;
        const width = (this.canvas.width / 3) - offset * 2;
        const height = 60;
        const posY = this.canvas.height / 2 - height / 2;

        this._context.fillStyle = 'rgba(255,255,255,0.7)';
        this._context.fillRect(offset, posY, width, height);

        this._context.fillStyle = 'black';
        this._context.font = '40px Tahoma, "Nimbus Sans"';
        this._context.textAlign = 'center';
        this._context.textBaseline = 'top';
        this._context.fillText(this.props.amount, offset + (width / 2), posY + 15);
    }

    draw(init) {
        if (!init)
            this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this._context.drawImage(this._img, 0, 0, this.canvas.width, this.canvas.width * (this._img.height / this._img.width))

        this.drawElectrumLogo();
        this.drawAmount();
        this.drawSeed();

        this.redraw = false;
    }

    componentWillReceiveProps(nextProps) {
        this.redraw = (this.props.seed !== nextProps.seed || this.props.amount !== nextProps.amount);
    }

    componentDidUpdate() {
        if (this.redraw)
            this.draw();
    }

    render() {
        return (
            <div className="wallet">
                <canvas id="canvas" ref={canvas => this.canvas = canvas} width="1544" height="657" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    seed: wallet.selectors.getSeed(state),
    amount: wallet.selectors.getAmount(state),
});

export default connect(mapStateToProps)(Preview);
