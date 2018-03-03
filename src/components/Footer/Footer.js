import React, { PureComponent } from 'react';

import './Footer.css';

export default class Footer extends PureComponent {
    render() {
        return (<div className="Footer">
            <span>
                Background picture by <a href="https://wallpapertag.com/bitcoin-wallpapers#753884" rel="noopener noreferrer" target="_blank">wallpapertag.com</a>
                <br />
                Not affiliated with the Electrum software or Electrum Technologies GmbH
            </span>
            <span>
                Released under the MIT Licence.
                <br />
                <a href="https://github.com/Fensterbank/electrum-bitcoin-paper-wallet" rel="noopener noreferrer" target="_blank">View source code on Github</a>
            </span>
        </div>);
    }
}
