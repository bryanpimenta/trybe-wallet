import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet__page">
        <div className="bg__white">
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
