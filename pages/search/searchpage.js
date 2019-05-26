import publicPage, { FullPage } from '../../hocs/publicPage'
import TitleSection from '../../components/HeroPage/TitleSectionSub'
import BigSearch from '../../components/VTheme/BigSearch'
import { Spacer } from '../../components/VTheme/VTheme'
import OpListSection from '../../components/Op/OpListSection'
import { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router';
import reduxApi, { withOps } from '../../lib/redux/reduxApi'

// const TitleString = {NumberResults} + "results for " + {SearchQuery}

export class SearchPage extends Component {
  static getInitialProps({ query }) {
    console.log('testing ----------------')
  }

  state = {
    query: {}
  }

  componentDidMount() {
    this.setState({
      query: Router.query
    })
  }

  render () {
    return (
      <FullPage>
        <TitleSection title='Search results for tech' />
        <BigSearch />
        <Spacer />
        <OpListSection />
      </FullPage>
    )
  }
}

SearchPage.propTypes = {
  ops: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      imgUrl: PropTypes.any,
      description: PropTypes.string,
      duration: PropTypes.string,
      status: PropTypes.string,
      _id: PropTypes.string
    })
  )
  //  showAddOp: PropTypes.bool.isRequired,
  // dispatch: PropTypes.func.isRequired
}

export default publicPage(withOps(SearchPage))
