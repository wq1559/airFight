import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import dragTableTest from '../test/dragTable/test.vue'
import paginationTest from '../test/pagination/test.vue'
import stepTest from '../test/step/test.vue'
import stepsTest from '../test/steps/test.vue'
import richTextTest from '../test/richText/test.vue'
import waterfallTest from '../test/waterfall/test.vue'
import menuTest from '../test/menu/test.vue'
import modalTest from '../test/modal/test.vue'
import filterTest from '../test/filter/test.vue'
import filterItemTest from '../test/filterItem/test.vue'
import uploadTest from '../test/upload/test.vue'
import uploadAssistantTest from '../test/uploadAssistant/test.vue'
import settingListTest from '../test/settingList/test.vue'
import autoCompletePersonTest from '../test/autoCompletePerson/test.vue'
import buttonTest from '../test/button/test.vue'
import inputAutoCompleteTest from '../test/inputAutoComplete/test.vue'
import switchWithConfirmTest from '../test/switchWithConfirm/test.vue'
import cardTest from '../test/card/test.vue'
// new_test_component

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test/dragTableTest',
      name: 'dragTableTest',
      component: dragTableTest
    },
    {
      path: '/test/paginationTest',
      name: 'paginationTest',
      component: paginationTest
    },
    {
      path: '/test/stepTest',
      name: 'stepTest',
      component: stepTest
    },
    {
      path: '/test/stepsTest',
      name: 'stepsTest',
      component: stepsTest
    },
    {
      path: '/test/richTextTest',
      name: 'richTextTest',
      component: richTextTest
    },
    {
      path: '/test/waterfallTest',
      name: 'waterfallTest',
      component: waterfallTest
    },
    {
      path: '/test/menuTest',
      name: 'menuTest',
      component: menuTest,
      children: [
        {
          path: 'waterfallTest',
          name: 'waterfallTest',
          component: waterfallTest
        }, {
          path: 'dragTableTest',
          name: 'dragTableTest',
          component: dragTableTest
        },
        {
          path: 'stepsTest',
          name: 'stepsTest',
          component: stepsTest
        },
        {
          path: 'richTextTest',
          name: 'richTextTest',
          component: richTextTest
        },
      ]
    },
    {
      path: '/test/modalTest',
      name: 'modalTest',
      component: modalTest
    },
    {
      path: '/test/filterTest',
      name: 'filterTest',
      component: filterTest
    },
    {
      path: '/test/filterItemTest',
      name: 'filterItemTest',
      component: filterItemTest
    }, {
      path: '/test/uploadTest',
      name: 'uploadTest',
      component: uploadTest
    },
    {
      path: '/test/uploadAssistantTest',
      name: 'uploadAssistantTest',
      component: uploadAssistantTest
    },
    {
      path: '/test/settingListTest',
      name: 'settingListTest',
      component: settingListTest
    },
    {
      path: '/test/autoCompletePersonTest',
      name: 'autoCompletePersonTest',
      component: autoCompletePersonTest
    },
    {
      path: '/test/buttonTest',
      name: 'buttonTest',
      component: buttonTest
    },
    {
      path: '/test/inputAutoCompleteTest',
      name: 'inputAutoCompleteTest',
      component: inputAutoCompleteTest
    },
    {
      path: '/test/switchWithConfirmTest',
      name: 'switchWithConfirmTest',
      component: switchWithConfirmTest
    },
    {
      path: '/test/cardTest',
      name: 'cardTest',
      component: cardTest
    },
    // new_test_route
  ]
})