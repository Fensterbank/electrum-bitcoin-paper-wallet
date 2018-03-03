import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

import FileSaver from 'file-saver';

import wallet from '../../state/wallet';

import './Header.css';

class Header extends Component {
    onResetClick = () => {
        this.props.reset();
    }

    onDownloadClick = () => {
        document.getElementById('canvas').toBlob((blob) => {
            FileSaver.saveAs(blob, 'paper-wallet.png');
        });
    }

    render() {
        return (
            <div>
                <CommandBar
                    isSearchBoxVisible={false}
                    items={
                        [
                            {
                                key: 'download',
                                iconProps: {
                                    iconName: 'Save',
                                },
                                onClick: this.onDownloadClick,
                                name: 'Download',
                            },

                        ]
                    }
                    farItems={
                        [{
                            key: 'reset',
                            iconProps: {
                                iconName: 'Refresh',
                                style: {
                                    color: '#a11100',
                                },
                            },
                            onClick: this.onResetClick,
                            name: 'Reset',
                        }]
                    }
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    reset: () => dispatch(wallet.actions.reset()),
});

export default connect(null, mapDispatchToProps)(Header);
