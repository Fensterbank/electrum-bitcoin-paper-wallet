import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';

import background from './background.jpg';
import electrumLogo from './electrum_logo.png';

import wallet from '../../state/wallet';

import './Preview.css';

const qrsize = 256;

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

        this._qrCodeImg = new Image();

        this._electrumLogo = new Image();
        this._electrumLogo.src = electrumLogo;

        this._qrSvg = document.querySelector('svg');

        this._img.onload = () => this.draw(true);
        this._qrCodeImg.onload = () => this._context.drawImage(this._qrCodeImg, this.canvas.width - (this.canvas.width / 3) + qrsize / 2, this.canvas.height / 2 - qrsize / 2);
    }

    drawSeed = () => {
        const offset = 30;
        const width = this.canvas.width - offset * 2;
        const height = 60;
        const posY = this.canvas.height - height - offset;

        this._context.fillStyle = 'rgba(255,255,255,0.7)';
        this._context.fillRect(offset, posY, width, height);

        let fontSize;
        if (this.props.seed.length < 80)
            fontSize = 40;
        else if (this.props.seed.length < 90)
            fontSize = 35;
        else if (this.props.seed.length < 100)
            fontSize = 30;
        else
            fontSize = 25;

        this._context.fillStyle = 'black';
        this._context.font = `${fontSize}px Tahoma, "Nimbus Sans"`;
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

    drawQRCode = () => {
        const xml = new XMLSerializer().serializeToString(this._qrSvg);

        // make it base64
        const svg64 = btoa(xml);
        const b64Start = 'data:image/svg+xml;base64,';

        // prepend a "header"
        const image64 = b64Start + svg64;

        // set it as the source of the img element
        this._qrCodeImg.src = image64;
    }

    draw(init) {
        if (!init)
            this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this._context.drawImage(this._img, 0, 0, this.canvas.width, this.canvas.width * (this._img.height / this._img.width))

        this.drawElectrumLogo();
        this.drawAmount();
        this.drawSeed();
        this.drawQRCode();

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
                <QRCode value={this.props.seed} renderAs="svg" level="M" size={qrsize} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    seed: wallet.selectors.getSeed(state),
    amount: wallet.selectors.getAmount(state),
});

export default connect(mapStateToProps)(Preview);
