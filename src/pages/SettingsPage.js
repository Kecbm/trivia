import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SettingsPage extends Component {
  render() {
    return (
      <>
        <h1 data-testid="settings-title">Configurações do Jogo</h1>
        <Link to="/">Retornar</Link>
      </>
    );
  }
}

export default SettingsPage;
