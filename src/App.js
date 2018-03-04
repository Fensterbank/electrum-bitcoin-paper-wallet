import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './state/Store';
import Header from './components/Header/Header';
import Preview from './components/Preview/Preview';
import Controls from './components/Controls/Controls';
import Footer from './components/Footer/Footer';
import './App.css';

import { loadTheme } from 'office-ui-fabric-react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import fabricTheme from './fabricTheme';
initializeIcons('fonts/');

loadTheme(fabricTheme.theme);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            store: Store,
            notLocalWarning: false,
        };
    }

    componentWillMount() {
        this.setState({ notLocalWarning: (window.location.hostname !== 'localhost') });
    }

    closeDialog = () => this.setState({ notLocalWarning: false });

    getWarning = () => {
        return (<Dialog
            key="notLocalWarning"
            hidden={!this.state.notLocalWarning}
            onDismiss={this.closeDialog}
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: 'Warning',
                subText: (<div><p>
                    This website is hosted on the internet and your computer is online.
                    <br />
                    If you want 100% security, you should never enter your wallet seed on a computer with an internet connection, and especially not on a website.
                </p>
                <p>
                        Although this app is open source and doesn't want to harm you, your computer may still be infected with viruses and Trojan horses, or malicious browser plug-ins may be just waiting for you to open this page.
                    <br />
                        In addition, anyone can take the code of this page, modify it and host it on a different domain.
                </p>
                <p>
                    We strongly encourage you to download the code yourself, install the dependencies with npm and run the application locally, preferably on an offline computer.
                    <br />
                    That's not difficult, and how to do that can be read in the <a href="https://github.com/Fensterbank/electrum-bitcoin-paper-wallet" rel="noopener noreferrer" target="_blank">README on Github</a>.
                </p>
                <p class="strong-advise">
                    If you want to keep the money of a wallet, you should never ever enter the seed anywhere on a potentially compromised computer with an online connection!
                </p>
                </div>),
            }}
            modalProps={{
                isBlocking: true,
                containerClassName: 'ms-DialogMainOverride',
            }}
        >
            <DialogFooter>
                <PrimaryButton onClick={this.closeDialog} text='I understand' />
            </DialogFooter>
        </Dialog>);
    }

    render() {
        return ([
            <Provider key="provider" store={this.state.store}>
                <div className="container">
                    <Header />
                    <Preview />
                    <Controls />
                </div>
            </Provider>,
            <Footer key="footer" />,
            (this.state.notLocalWarning ? this.getWarning() : null),
        ]);
    }
}

export default App;
