// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, FormProps, reduxForm } from 'redux-form'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'
import { Button } from 'primereact/components/button/Button'
import { Panel } from 'primereact/components/panel/Panel'

import { Routes } from '../../../constants'
import { TextAreaField } from '../../../components/TextAreaField'
import { RatingField } from '../../../components/RatingField'
import type { ReviewState, State } from '../../../types'
import { getReviewForm } from '../../../redux/selectors/review'

type Props = {
  productId: number,
  push: (route: string) => void,
  reviewForm: ReviewState,
} & FormProps

export const ReviewForm = ({ handleSubmit, productId, push, reviewForm = {} }: Props) => {
  const Rating = reviewForm.rating && (
    <div className="ui-g-2 ui-md-2">
      ({reviewForm.rating})
    </div>
  )
  return (
    <form onSubmit={handleSubmit}>
      <div className="ui-g">
        <div className="ui-g-12 ui-md-2 ui-lg-3"/>
        <div className="ui-g-12 ui-md-8 ui-lg-6">
          <Panel header="Review">
            <div className="ui-g">
              <div className="ui-g-12">
                <label htmlFor="description">Description:</label>
              </div>
              <div className="ui-g-12 ui-fluid">
                <Field
                  name="description"
                  component={TextAreaField}
                  rows={5}
                  cols={30}
                  autoResize={true}
                />
              </div>
              <div className="ui-g-2 ui-md-1">
                <label htmlFor="rating">Rating:</label>
              </div>
              <div className="ui-g-5 ui-md-3 ui-lg-2">
                <Field
                  name="rating"
                  component={RatingField}
                  cancel={false}
                />
              </div>
              {Rating}
            </div>
          </Panel>
          <div className="ui-g-12 ui-md-4">
            <Button label="Cancel" icon="fa-chevron-left" onClick={() => push(Routes.PRODUCT_FUNC(productId))} style={{ width: '100%' }} />
          </div>
          <div className="ui-g-12 ui-md-4" />
          <div className="ui-g-12 ui-md-4" style={{ textAlign: 'right' }}>
            <Button type="submit" label="Save" icon="fa-save" style={{ width: '100%' }} />
          </div>
        </div>
        <div className="ui-lg-12 ui-md-2 ui-lg-3"/>
      </div>
    </form>
  )
}

const reviewForm = reduxForm({
  form: 'review',
})(ReviewForm)

const mapStateToProps = (state: State) => ({
  reviewForm: getReviewForm(state)
})

const mapDispatchToProps = {
  push,
}

export default connect(mapStateToProps, mapDispatchToProps)(reviewForm)
