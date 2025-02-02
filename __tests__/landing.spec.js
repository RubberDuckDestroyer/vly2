import React from 'react'
import test from 'ava'
import { LandingTest } from '../pages/landing/landing'
import { mountWithIntl } from '../lib/react-intl-test-helper'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import objectid from 'objectid'
import ops from '../server/api/opportunity/__tests__/opportunity.fixture'
import people from '../server/api/person/__tests__/person.fixture'

test.before('Setup fixtures', (t) => {
  // not using mongo or server here so faking ids
  people.map(p => { p._id = objectid().toString() })
  const me = people[0]
  // setup list of opportunities, I am owner for the first one
  ops.map((op, index) => {
    op._id = objectid().toString()
    op.requestor = people[index]._id
  })

  // setup list of interests, i'm interested in first 5 ops
  const interestStates = [ 'interested', 'invited', 'committed', 'declined', 'completed', 'cancelled' ]
  const interests = ops.filter(op => op.requestor !== me._id).map((op, index) => {
    return ({
      _id: objectid().toString(),
      person: me._id,
      opportunity: op,
      comment: `${index}: ${me.nickname} is interested in ${op.title}`,
      status: index < interestStates.length ? interestStates[index] : 'interested'
    })
  })

  t.context = {
    me,
    people,
    ops,
    interests
  }

  t.context.sessionAuth = {
    isAuthenticated: true,
    user: { nickname: me.nickname },
    me
  }
  t.context.sessionAnon = {
    isAuthenticated: false,
    user: {},
    me: {}
  }

  t.context.mockStore = configureStore()(
    {
      session: t.context.sessionAnon,
      opportunities: {
        sync: false,
        syncing: false,
        loading: false,
        data: ops,
        request: null
      },
      interests: {
        sync: false,
        syncing: false,
        loading: false,
        data: interests,
        request: null
      }
    }
  )
})

test.after.always(() => {

})

test('render landing page ', t => {
  const props = {
    me: false,
    isAuthenticated: false

  }

  const wrapper = mountWithIntl(
    <Provider store={t.context.mockStore}>
      <LandingTest {...props} />
    </Provider>)
  t.is(wrapper.find('h1').first().text(), 'volunteer yo—self.')

  // there should be a list of ops
  t.is(wrapper.find('.requestTitle').length, ops.length)
})
