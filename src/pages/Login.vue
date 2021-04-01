<template>
    <div class="login">
        <button class="btn-sbpk" @click="test">AVAILABLE NOW</button>
    </div>
</template>
    
<script>
export default {
  data() { 	
    return { 	
    
    }	
  },
  methods: {
    test() {
        console.log(1)
    }
  },	
}
</script>
    
    
<style lang='less'>
.login{
    background-color: #f8f005;
    width: 100%;
    height: 100%;
    .btn-sbpk{
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .btn-sbpk, .btn-sbpk::after{
        width: 380px;
        height: 86px;
        font-size: 36px;
        background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
        letter-spacing: 3px;
        border: 0;
        color: #fff;
        outline: transparent;
        box-shadow: 6px 0px 0px #00E6F6;
        position: relative;
        cursor: pointer;
    }
    .btn-sbpk::after{
        --slice-0: inset(50% 50% 50% 50%);
        --slice-1: inset(80% -6px 0 0);
        --slice-2: inset(50% -6px  30% 0);
        --slice-3: inset(10% -6px  85% 0);
        --slice-4: inset(40% -6px  43% 0);
        --slice-5: inset(80% -6px  5% 0);


        content: 'AVAILABLE NOW';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        line-height: 86px;
        background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00e6f6 5%, #ff013c 5%);
        text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
        clip-path: var(--slice-0);
        // transform: translate(-20px, 10px);
    }
    .btn-sbpk:hover::after{
        animation: robot 1s steps(2, end);
    }
}

@keyframes robot {
    0% {
        clip-path: var(--slice-1);
        transform: translate(-20px, -10px);
    }
    10% {
        clip-path: var(--slice-3);
        transform: translate(10px, 10px);
    }
    20% {
        clip-path: var(--slice-1);
        transform: translate(-10px, 10px);
    }
    30% {
        clip-path: var(--slice-3);
        transform: translate(0, 5px);
    }
    40% {
        clip-path: var(--slice-2);
        transform: translate(-5px, 0px);
    }
    50% {
        clip-path: var(--slice-4);
        transform: translate(5px, 0px);
    }
    60% {
        clip-path: var(--slice-4);
        transform: translate(-10px, 10px);
    }
    70% {
        clip-path: var(--slice-5);
        transform: translate(20px, -10px);
    }
    80% {
        clip-path: var(--slice-2);
        transform: translate(-10px, 0px);
    }
    90% {
        clip-path: var(--slice-1);
        transform: translate(-10px, 10px);
    }
    100% {
        clip-path: var(--slice-1);
        transform: translate(0);
    }
}
</style>