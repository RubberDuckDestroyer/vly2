import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Layout } from 'antd'
import Navigation from '../Navigation/Navigation'
import links from './FooterMenu'
import styled from 'styled-components'
const getAllowedLinks = isAuthenticated => links()
  .filter(l => !l.authRequired || (l.authRequired && isAuthenticated))
  .filter(l => !isAuthenticated || (isAuthenticated && !l.anonymousOnly))


const FooterBackground = styled.div`
width: 100vw;
background-color: #fff;
`

const FooterContainer = styled.div`
width: 80vw;
`

const FooterLogo = styled.img`

`

const FooterText = styled.h1`

`
const FooterGrid=styled.div`
display: grid;
grid-template-columns: 18.5rem 18.5rem 18.5rem 18.5rem;
`
const FooterGridItem=styled.div`

`
const FooterGridItemTitle = styled.h1`

`

const FooterGridItemLink = styled.a`

`


const Footer = ({ isAuthenticated, ...props }) =>
  <Layout.Footer>
    <Navigation items={getAllowedLinks(isAuthenticated)} {...props} />

    <div className='footer' >
      <span>&copy; 2019 &middot; <a href='http://voluntari.ly'>Voluntari.ly</a></span>
      <p>
        <FormattedMessage
          id='footerCredit'
          defaultMessage='Voluntari.ly is an initiative of the { pfctlink }&nbsp;Supported by: Datacom, Spark, ATEED'
          description='message in the footer giving credit to sponsors'
          values={{
            pfctlink: <a href='https://www.pamfergusson.org.nz/' className='external_link' target='_blank'>Pam Fergusson Charitable Trust.</a>
          }}
        />
      </p>
    </div>
    <style jsx>{`

      .footer{
        padding: 3em;
        background-size: cover;
        background-color: #f4f4f4;
      }
      
      .footer span {
        font-size: 14px;
        color: #111;
      }
      
      .footer a{
        color: #111;
        text-decoration: none;
        font-weight: 700;
      }
    `}</style>
  </Layout.Footer>

Footer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default Footer
