<template>
  <div class="mars-steps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "PwcSteps",
  props: {
    space: [Number, String],
    active: Number,
    direction: {
      //暂时没用
      type: String,
      default: "horizontal"
    },
    alignCenter: Boolean, //暂时没用
    simple: Boolean, //暂时没用
    finishStatus: {
      type: String,
      default: "finish"
    },
    processStatus: {
      type: String,
      default: "process"
    }
  },
  data() {
    return {
      steps: [],
      stepOffset: 0
    };
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          center: "center is removed."
        }
      };
    }
  },
  watch: {
    active(newVal, oldVal) {
      this.$emit("change", newVal, oldVal);
    },
    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mars-steps {
  width: 100%;
  display: flex;
}
</style>
