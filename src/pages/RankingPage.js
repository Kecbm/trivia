import React, { Component } from 'react';
import './rankingpage.css';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';

class RankingPage extends Component {
  handleButtonHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.props;
    const descendingRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.handleButtonHome }
          data-testid="btn-go-home"
        >
          Play Again
        </button>
        <div className="ranking-container">
          { descendingRanking.map((player, index) => (
            <div className="ranking-card" key={ index }>
              <img src={ player.picture } alt="" />
              <div className="ranking-personal">
                <h3 data-testid={ `player-name-${index}` }>{ player.name }</h3>
                <h3 data-testid={ `player-score-${index}` }>{ player.score }</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ranking: state.ranking.ranking,
});

RankingPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  ranking: PropTypes.arrayOf(object),
}.isRequired;

export default connect(mapStateToProps)(RankingPage);
