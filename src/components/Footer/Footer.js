import React, { PureComponent } from 'react';

import './Footer.css';

export default class Footer extends PureComponent {
    render() {
        return (<div className="Footer">
            <span>Not affiliated with the Electrum software or Electrum Technologies GmbH</span>
            <span>Released under the MIT Licence. <a href="https://github.com/Fensterbank/electrum-paper-wallet" rel="noopener noreferrer" target="_blank">View source code on Github</a></span>
        </div>);
    }
}