/*
  Display an activity record in card format with a picture, title, and commitment.
*/
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import { Button } from 'antd'
import { connect } from 'react-redux'

// todo if image is not present then use a fallback.
const ActAdd = ({ roles, ...props }) => {
  if (roles && roles.includes('activity-provider')) {
    return (
      <Link href={'/act/new'}>
        <Button type='primary' shape='round' size='large'>
          <FormattedMessage
            id='landing.newAct'
            defaultMessage='New Activity'
            description='Button to create a new activity on Landing page'
          />
        </Button>
      </Link>
    )
  } else {
    return null
  }
}

ActAdd.propTypes = {
  roles: PropTypes.array
}

const mapStateToProps = store => ({
  roles: store.session.me.role
})

export default connect(
  mapStateToProps
)(ActAdd)
