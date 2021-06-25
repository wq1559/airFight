<template>
  <div>
    <div
      class="mars_step_item "
      :class="`mars_step-${currentStatus}`"
    >
      <div class="icon">
        <i class="el-icon-check"></i>
      </div>
      <p>{{title}}</p>
      <div
        class="line"
        v-if="!isLast"
      ></div>
    </div>
  </div>

  <!-- <div
    class="el-step"
    :style="style"
    :class="[
      !isSimple && `is-${$parent.direction}`,
      isSimple && 'is-simple',
      isLast && !space && !isCenter && 'is-flex',
      isCenter && !isVertical && !isSimple && 'is-center'
     ]"
  >
  
    <div
      class="el-step__head"
      :class="`is-${currentStatus}`"
    >
      <div
        class="el-step__line"
        :style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }"
      >
        <i
          class="el-step__line-inner"
          :style="lineStyle"
        ></i>
      </div>

      <div
        class="el-step__icon"
        :class="`is-${icon ? 'icon' : 'text'}`"
      >
        <slot
          v-if="currentStatus !== 'success' && currentStatus !== 'error'"
          name="icon"
        >
          <i
            v-if="icon"
            class="el-step__icon-inner"
            :class="[icon]"
          ></i>
          <div
            class="el-step__icon-inner"
            v-if="!icon && !isSimple"
          >{{ index + 1 }}</div>
        </slot>
        <i
          v-else
          :class="['el-icon-' + (currentStatus === 'success' ? 'check' : 'close')]"
          class="el-step__icon-inner is-status"
        >
        </i>
      </div>
    </div>
    
    <div class="el-step__main">
      <div
        class="el-step__title"
        ref="title"
        :class="['is-' + currentStatus]"
      >
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        v-if="isSimple"
        class="el-step__arrow"
      ></div>
      <div
        v-else
        class="el-step__description"
        :class="['is-' + currentStatus]"
      >
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "PwcStep",
  props: {
    title: String,
    icon: String,
    description: String,
    status: String
  },
  data() {
    return {
      index: -1,
      lineStyle: {},
      internalStatus: ""
    };
  },
  beforeCreate() {
    this.$parent.steps.push(this);
  },
  beforeDestroy() {
    const steps = this.$parent.steps;
    const index = steps.indexOf(this);
    if (index >= 0) {
      steps.splice(index, 1);
    }
  },
  computed: {
    currentStatus() {
      return this.status || this.internalStatus;
    },
    prevStatus() {
      const prevStep = this.$parent.steps[this.index - 1];
      return prevStep ? prevStep.currentStatus : "wait";
    },
    isCenter() {
      return this.$parent.alignCenter;
    },
    isVertical() {
      //   return this.$parent.direction === 'vertical';
      return false;
    },
    isSimple() {
      return this.$parent.simple;
    },
    isLast() {
      const parent = this.$parent;
      return parent.steps[parent.steps.length - 1] === this;
    },
    stepsCount() {
      return this.$parent.steps.length;
    },
    space() {
      const {
        isSimple,
        $parent: { space }
      } = this;
      return isSimple ? "" : space;
    },
    style: function() {
      const style = {};
      const parent = this.$parent;
      const len = parent.steps.length;
      const space =
        typeof this.space === "number"
          ? this.space + "px"
          : this.space
          ? this.space
          : 100 / (len - (this.isCenter ? 0 : 1)) + "%";
      style.flexBasis = space;
      if (this.isVertical) return style;
      if (this.isLast) {
        style.maxWidth = 100 / this.stepsCount + "%";
      } else {
        style.marginRight = -this.$parent.stepOffset + "px";
      }
      return style;
    }
  },
  methods: {
    updateStatus(val) {
      const prevChild = this.$parent.$children[this.index - 1]; //这个step的上一个
      if (val > this.index) {
        this.internalStatus = this.$parent.finishStatus;
      } else if (val === this.index && this.prevStatus !== "error") {
        this.internalStatus = this.$parent.processStatus;
      } else {
        this.internalStatus = "wait";
      }
      if (prevChild) prevChild.calcProgress(this.internalStatus);
    },
    calcProgress(status) {
      let step = 100;
      const style = {};
      style.transitionDelay = 150 * this.index + "ms";
      if (status === this.$parent.processStatus) {
        step = this.currentStatus !== "error" ? 0 : 0;
      } else if (status === "wait") {
        step = 0;
        style.transitionDelay = -150 * this.index + "ms";
      }
      style.borderWidth = step && !this.isSimple ? "1px" : 0;
      this.$parent.direction === "vertical"
        ? (style.height = step + "%")
        : (style.width = step + "%");
      this.lineStyle = style;
    }
  },
  mounted() {
    const unwatch = this.$watch("index", val => {
      this.$watch("$parent.active", this.updateStatus, { immediate: true });
      this.$watch(
        "$parent.processStatus",
        () => {
          const activeIndex = this.$parent.active;
          this.updateStatus(activeIndex);
        },
        { immediate: true }
      );
      unwatch();
    });
  }
};
</script>
<style lang="scss" scoped>
$red: #e0301e;
.mars_step_item {
  display: flex;
  align-items: center;
  margin-left: 12px;
  .icon {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    border: 2px solid;
    display: flex;
    align-content: center;
    justify-content: center;
    i {
      color: #fff;
      text-align: center;
      line-height: 16px;
      font-weight: bold;
      display: none;
    }
  }
  p {
    line-height: 20px;
    color: #404041;
    font-size: 12px;
    padding: 0 10px;
  }
  .line {
    width: 100px;
    height: 1px;
    background: url("./bar.png");
  }
}
.mars_step-finish {
  .icon {
    border-color: $red;
    background: $red;
    i {
      display: block;
    }
  }
}
.mars_step-process {
  .icon {
    border-color: $red;
    background: #fceae8;
  }
}
.mars_step-wait {
  .icon {
    border-color: #c4c6cc;
  }
  p {
    color: #c4c6cc;
  }
}
</style>
