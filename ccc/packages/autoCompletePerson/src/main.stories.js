import '../../../main.stories'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

export default {
  title: 'autoCompletePerson',
  decorators: [withKnobs]
}

export const normal = () => ({
  props: {
    value: {
      default: text('value', 'dark')
    },
    readonly: {
      default: boolean('readonly', false)
    }
  },
  template: '<PwcAutoCompletePerson></PwcAutoCompletePerson>'
})
